"use client";

import React, { useEffect, useRef, useState } from "react";
import { Bookmark, Copy, Check, SlidersHorizontal, Terminal } from "lucide-react";
import { toast } from "sonner";
import { UnifiedCatalogItem } from "@/lib/unified-catalog";
import { isItemSaved, toggleSavedItem } from "@/lib/saved-storage";

interface UnifiedResourceCardProps {
  item: UnifiedCatalogItem;
  index?: number;
  onSelect: (item: UnifiedCatalogItem) => void;
}

export function UnifiedResourceCard({
  item,
  index = 0,
  onSelect,
}: UnifiedResourceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);

  const isM3u8 = Boolean(item.videoUrl && item.videoUrl.includes(".m3u8"));
  const isImageVideo = Boolean(
    item.videoUrl &&
      (item.videoUrl.endsWith(".webp") || item.videoUrl.endsWith(".gif"))
  );

  useEffect(() => {
    setSaved(isItemSaved(item.id, item.slug));
    const sync = () => setSaved(isItemSaved(item.id, item.slug));
    window.addEventListener("axeslab:saved-changed", sync);
    return () => window.removeEventListener("axeslab:saved-changed", sync);
  }, [item.id, item.slug]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoUrl || isImageVideo) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cancelled = false;

    if (isHovered) {
      if (isM3u8) {
        import("hls.js").then(({ default: Hls }) => {
          if (cancelled || !videoRef.current) return;
          if (Hls.isSupported()) {
            const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
            hlsRef.current = hls;
            hls.loadSource(item.videoUrl);
            hls.attachMedia(videoRef.current);
            videoRef.current
              .play()
              .then(() => !cancelled && setIsPlaying(true))
              .catch(() => {});
          } else if (
            videoRef.current.canPlayType("application/vnd.apple.mpegurl")
          ) {
            videoRef.current.src = item.videoUrl;
            videoRef.current
              .play()
              .then(() => !cancelled && setIsPlaying(true))
              .catch(() => {});
          }
        });
      } else {
        if (!video.src) {
          video.src = item.videoUrl;
        }
        video
          .play()
          .then(() => !cancelled && setIsPlaying(true))
          .catch(() => {});
      }
    } else {
      video.pause();
      setIsPlaying(false);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    }

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [isHovered, item.videoUrl, isM3u8, isImageVideo]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = toggleSavedItem({
      id: item.id,
      slug: item.slug,
      title: item.title,
      resource_type: item.resourceTypeLabel,
      summary: item.summary,
    });
    setSaved(next);
    toast.success(next ? `Saved "${item.title}"` : `Removed "${item.title}" from saved`);
  };

  const handleQuickCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = item.isSkill
      ? item.skillCommand || item.originalPrompt
      : item.originalPrompt;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(
        item.isSkill ? `Copied install command` : `Copied prompt for "${item.title}"`
      );
      setTimeout(() => setCopied(false), 1800);
    } catch {
      onSelect(item);
    }
  };

  return (
    <article
      data-catalog-card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col gap-2.5"
    >
      {/* Media Preview Frame */}
      <button
        type="button"
        onClick={() => onSelect(item)}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-paper-3 border border-rule group-hover:border-rule-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent text-left cursor-pointer"
        aria-label={`Preview ${item.title}`}
      >
        {item.posterUrl && !posterFailed ? (
          <img
            src={item.posterUrl}
            alt={item.title}
            loading={index < 8 ? "eager" : "lazy"}
            decoding="async"
            onError={() => setPosterFailed(true)}
            className={`w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.015] ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-paper-2">
            <span className="text-[11px] font-mono text-muted">{item.category}</span>
          </div>
        )}

        {item.videoUrl && !isImageVideo && (
          <video
            ref={videoRef}
            poster={item.posterUrl || undefined}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {item.videoUrl && isImageVideo && isHovered && (
          <img
            src={item.videoUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
      </button>

      {/* Clean Caption & Restrained Action Row */}
      <div className="flex items-start justify-between gap-3 px-0.5">
        <button
          type="button"
          onClick={() => onSelect(item)}
          className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-accent rounded"
        >
          <div className="flex items-baseline gap-2 min-w-0">
            <h3 className="text-sm font-medium text-ink truncate group-hover:text-cool transition-colors duration-150">
              {item.title}
            </h3>
            <span className="text-xs text-muted truncate shrink-0">
              {item.subcategory || item.category}
            </span>
          </div>
          <p className="text-xs text-muted truncate mt-0.5">
            {item.source}
            {item.model ? ` · ${item.model}` : ""}
          </p>
        </button>

        <div className="flex items-center gap-1 shrink-0 pt-0.5">
          {item.hasCustomize ? (
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              title="Open preview & customize"
              aria-label={`Open ${item.title} preview`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>
          ) : item.isSkill ? (
            <button
              type="button"
              onClick={handleQuickCopy}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              title="Copy install command"
              aria-label={`Copy install command for ${item.title}`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-cool" />
              ) : (
                <Terminal className="w-3.5 h-3.5" />
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleQuickCopy}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              title="Copy prompt"
              aria-label={`Copy prompt for ${item.title}`}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-cool" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleToggleSave}
            className={`p-1.5 rounded-pill transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
              saved
                ? "text-accent"
                : "text-muted hover:text-ink hover:bg-paper-2"
            }`}
            title={saved ? "Remove from saved" : "Save resource"}
            aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}
