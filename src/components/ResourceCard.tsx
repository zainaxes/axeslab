"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bookmark, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Resource } from "@/types";
import {
  getProxiedMediaUrl,
  getYouTubeThumbnailUrl,
  isYouTubeUrl,
} from "@/lib/video-utils";
import { isItemSaved, toggleSavedItem } from "@/lib/saved-storage";
import { SafeMediaImage } from "@/components/SafeMediaImage";

export default function ResourceCard({ resource }: { resource: Resource }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const metadata = resource.parsed_metadata || {};
  const rawVideoUrl =
    metadata.custom_video_url || metadata.effectUrl || metadata.default_video_url;
  const youtubeUrl = metadata.youtube_video_id || metadata.custom_video_url;
  const isYT = isYouTubeUrl(youtubeUrl);
  const posterCandidate =
    metadata.posterUrl || (isYT ? getYouTubeThumbnailUrl(youtubeUrl) : null);
  const posterUrl = posterCandidate ? getProxiedMediaUrl(posterCandidate) : "";
  const videoUrl = rawVideoUrl ? getProxiedMediaUrl(rawVideoUrl) : "";

  const detailUrl = `/resource/${resource.slug}`;

  useEffect(() => {
    setIsSaved(isItemSaved(resource.id, resource.slug));
    const sync = () => setIsSaved(isItemSaved(resource.id, resource.slug));
    window.addEventListener("axeslab:saved-changed", sync);
    return () => window.removeEventListener("axeslab:saved-changed", sync);
  }, [resource.id, resource.slug]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    if (videoRef.current && videoUrl && !isYT) {
      if (!videoRef.current.src) videoRef.current.src = videoUrl;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !isYT) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleSavedItem({
      id: resource.id,
      slug: resource.slug,
      title: resource.title,
      resource_type: resource.resource_type,
      summary: resource.summary,
    });
    setIsSaved(next);
    toast.success(next ? `Saved "${resource.title}"` : "Removed from saved");
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!resource.content_body) return;
    try {
      await navigator.clipboard.writeText(resource.content_body);
      setCopied(true);
      toast.success(`Copied "${resource.title}" prompt`);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const categoryLabel =
    metadata.categoryName || resource.subcategory_name || resource.category_name || resource.resource_type;

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group flex flex-col gap-2.5"
    >
      <Link
        href={detailUrl}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-paper-3 border border-rule group-hover:border-rule-2 transition-colors duration-150 block focus-visible:outline-2 focus-visible:outline-accent"
      >
        {posterUrl ? (
          <SafeMediaImage
            src={posterUrl}
            alt={resource.title}
            fallbackLabel={categoryLabel}
            className={`w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.015] ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-muted px-4 text-center">
            {categoryLabel}
          </div>
        )}

        {videoUrl && !isYT && (
          <video
            ref={videoRef}
            poster={posterUrl || undefined}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isHovered && isPlaying ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </Link>

      <div className="flex items-start justify-between gap-3 px-0.5">
        <Link
          href={detailUrl}
          className="min-w-0 flex-1 focus-visible:outline-2 focus-visible:outline-accent rounded"
        >
          <div className="flex items-baseline gap-2 min-w-0">
            <h3 className="text-sm font-medium text-ink truncate group-hover:text-cool transition-colors duration-150">
              {resource.title}
            </h3>
            <span className="text-xs text-muted truncate shrink-0">
              {categoryLabel}
            </span>
          </div>
          <p className="text-xs text-muted truncate mt-0.5">
            {resource.author_or_publisher || "Axes Lab"}
          </p>
        </Link>

        <div className="flex items-center gap-1 shrink-0 pt-0.5">
          {resource.content_body && (
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-2 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              title="Copy prompt"
              aria-label={`Copy ${resource.title}`}
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
              isSaved
                ? "text-accent"
                : "text-muted hover:text-ink hover:bg-paper-2"
            }`}
            title={isSaved ? "Remove bookmark" : "Save bookmark"}
            aria-label={isSaved ? "Remove bookmark" : "Save bookmark"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>
    </article>
  );
}
