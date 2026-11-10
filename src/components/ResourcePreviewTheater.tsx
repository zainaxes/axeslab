"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bookmark,
  Check,
  Copy,
  ExternalLink,
  GitBranch,
  Pause,
  Play,
  SlidersHorizontal,
  Volume2,
  VolumeX,
} from "lucide-react";
import { toast } from "sonner";
import { UnifiedCatalogItem } from "@/lib/unified-catalog";
import { isItemSaved, toggleSavedItem } from "@/lib/saved-storage";
import { gsap, MOTION, useGSAP } from "@/lib/motion";

interface ResourcePreviewTheaterProps {
  item: UnifiedCatalogItem;
  onBack?: () => void;
  onOpenCustomizer?: (item: UnifiedCatalogItem) => void;
  showPermalink?: boolean;
}

export function ResourcePreviewTheater({
  item,
  onBack,
  onOpenCustomizer,
  showPermalink = true,
}: ResourcePreviewTheaterProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<{ destroy: () => void } | null>(null);
  const promptPanelRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [saved, setSaved] = useState(false);

  // Prompt reveal & copy states
  const [promptVisible, setPromptVisible] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [clipboardBlocked, setClipboardBlocked] = useState(false);
  const [copiedSkillCmd, setCopiedSkillCmd] = useState(false);

  const isM3u8 = Boolean(item.videoUrl && item.videoUrl.includes(".m3u8"));
  const isImageVideo = Boolean(
    item.videoUrl &&
      (item.videoUrl.endsWith(".webp") || item.videoUrl.endsWith(".gif"))
  );

  useEffect(() => {
    setSaved(isItemSaved(item.id, item.slug));
    setPromptVisible(false);
    setCopiedPrompt(false);
    setClipboardBlocked(false);
    setIsPlaying(false);
  }, [item.id, item.slug]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoUrl || isImageVideo) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let cancelled = false;

    if (isM3u8) {
      import("hls.js").then(({ default: Hls }) => {
        if (cancelled || !videoRef.current) return;
        if (Hls.isSupported()) {
          const hls = new Hls({ enableWorker: true, lowLatencyMode: true });
          hlsRef.current = hls;
          hls.loadSource(item.videoUrl);
          hls.attachMedia(videoRef.current);
          if (!reduceMotion) {
            videoRef.current
              .play()
              .then(() => !cancelled && setIsPlaying(true))
              .catch(() => {});
          }
        } else if (
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          videoRef.current.src = item.videoUrl;
          if (!reduceMotion) {
            videoRef.current
              .play()
              .then(() => !cancelled && setIsPlaying(true))
              .catch(() => {});
          }
        }
      });
    } else {
      video.src = item.videoUrl;
      if (!reduceMotion) {
        video
          .play()
          .then(() => !cancelled && setIsPlaying(true))
          .catch(() => {});
      }
    }

    return () => {
      cancelled = true;
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [item.videoUrl, isM3u8, isImageVideo]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-theater-animate]", {
          autoAlpha: 0,
          y: 12,
          duration: MOTION.durPanel,
          ease: MOTION.easeOut,
          stagger: 0.045,
          clearProps: "transform,opacity,visibility",
        });
      });
    },
    { scope: rootRef, dependencies: [item.slug], revertOnUpdate: true }
  );

  useGSAP(
    () => {
      if (!promptVisible || !promptPanelRef.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(promptPanelRef.current, {
          autoAlpha: 0,
          y: 10,
          duration: MOTION.durCard,
          ease: MOTION.easeOut,
          clearProps: "transform,opacity,visibility",
        });
      });
    },
    { dependencies: [promptVisible] }
  );

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleToggleSave = () => {
    const next = toggleSavedItem({
      id: item.id,
      slug: item.slug,
      title: item.title,
      resource_type: item.resourceTypeLabel,
      summary: item.summary,
    });
    setSaved(next);
    toast.success(next ? `Saved "${item.title}"` : "Removed from saved");
  };

  const handleShowAndCopyPrompt = async () => {
    // Always reveal full original prompt visibly inside preview screen
    setPromptVisible(true);
    setClipboardBlocked(false);

    if (!item.originalPrompt) return;
    try {
      await navigator.clipboard.writeText(item.originalPrompt);
      setCopiedPrompt(true);
      toast.success("Prompt copied to clipboard");
      setTimeout(() => setCopiedPrompt(false), 2400);
    } catch {
      // Clipboard failed — prompt remains visibly displayed and manually selectable
      setClipboardBlocked(true);
      toast.info("Prompt shown below for manual selection");
    }

    requestAnimationFrame(() => {
      promptPanelRef.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest",
      });
    });
  };

  const handleCopySkillCommand = async () => {
    const cmd = item.skillCommand || (item.skillRepo ? `git clone ${item.skillRepo}` : "");
    if (!cmd) return;
    try {
      await navigator.clipboard.writeText(cmd);
      setCopiedSkillCmd(true);
      toast.success("Install command copied");
      setTimeout(() => setCopiedSkillCmd(false), 2000);
    } catch {
      toast.info("Select the command below to copy");
    }
  };

  const handleCustomizeClick = () => {
    if (onOpenCustomizer) {
      onOpenCustomizer(item);
      return;
    }
    const currentReturn =
      typeof window !== "undefined"
        ? `${window.location.pathname}${window.location.search}`
        : `/?prompt=${item.slug}`;
    router.push(
      `/customize/${encodeURIComponent(item.slug)}?returnTo=${encodeURIComponent(
        currentReturn
      )}`
    );
  };

  const hasCustomPrompt = Boolean(item.originalPrompt && item.originalPrompt.trim().length > 0);
  const skillCmd =
    item.skillCommand || (item.skillRepo ? `git clone ${item.skillRepo}` : "");

  return (
    <div ref={rootRef} className="w-full space-y-6">
      {/* Top Action Bar */}
      <div
        data-theater-animate
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3 min-w-0">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 h-8 px-3 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-8 px-3 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Library</span>
            </Link>
          )}

          <span className="text-xs text-muted truncate">
            {item.resourceTypeLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSave}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-pill border text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
              saved
                ? "bg-accent-soft border-accent text-accent"
                : "bg-paper-2 border-rule text-ink hover:border-rule-2"
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
            <span>{saved ? "Saved" : "Save"}</span>
          </button>

          {showPermalink && (
            <Link
              href={item.detailHref}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs text-muted hover:text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Permalink</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Split Preview Surface (MotionSites Theater Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Primary Area: Large Resource Preview */}
        <div data-theater-animate className="lg:col-span-8 space-y-4">
          <div className="relative aspect-[16/10] w-full rounded-card overflow-hidden bg-paper-3 border border-rule">
            {item.posterUrl && (
              <img
                src={item.posterUrl}
                alt={item.title}
                className={`w-full h-full object-cover ${
                  isPlaying ? "opacity-0" : "opacity-100"
                }`}
              />
            )}

            {item.videoUrl && !isImageVideo && (
              <video
                ref={videoRef}
                poster={item.posterUrl || undefined}
                loop
                muted={isMuted}
                playsInline
                controls={false}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
                  isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            )}

            {item.videoUrl && isImageVideo && (
              <img
                src={item.videoUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Subtle Video Controls */}
            {item.videoUrl && !isImageVideo && (
              <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill bg-paper/90 border border-rule text-xs font-medium text-ink hover:border-rule-2 backdrop-blur-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-pill bg-paper/90 border border-rule text-ink hover:border-rule-2 backdrop-blur-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-muted" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Complete Revealed Prompt Panel (shown cleanly inside preview screen) */}
          {promptVisible && hasCustomPrompt && !item.isSkill && (
            <div
              ref={promptPanelRef}
              className="rounded-card border border-rule-2 bg-paper-3 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-rule bg-paper-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-medium text-ink">
                    Original Prompt
                  </span>
                  <span className="font-mono text-muted num">
                    {item.chars.toLocaleString()} chars · ~{item.tokens.toLocaleString()} tokens
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleShowAndCopyPrompt}
                  className="inline-flex items-center gap-1.5 h-7 px-3 rounded-pill border border-rule bg-paper-3 hover:border-rule-2 text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cool" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy prompt</span>
                    </>
                  )}
                </button>
              </div>

              {clipboardBlocked && (
                <div className="px-4 py-2 bg-paper-2 border-b border-rule text-xs text-muted">
                  Clipboard permission was restricted by the browser. Select the prompt text below to copy manually.
                </div>
              )}

              <div className="p-4 sm:p-5 max-h-[52vh] overflow-y-auto">
                <pre className="font-mono text-xs sm:text-[13px] text-ink leading-relaxed whitespace-pre-wrap break-words select-all">
                  {item.originalPrompt}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Information & Action Area */}
        <aside
          data-theater-animate
          className="lg:col-span-4 rounded-card bg-paper-2 border border-rule p-5 sm:p-6 space-y-6"
        >
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
              <span>{item.category}</span>
              {item.subcategory && item.subcategory !== item.category && (
                <>
                  <span aria-hidden="true">/</span>
                  <span className="text-ink-2">{item.subcategory}</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-medium text-ink leading-tight">
              {item.title}
            </h2>

            {item.summary && (
              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {item.summary}
              </p>
            )}
          </div>

          {/* Primary Action Area — Strictly matched to resource capability */}
          <div className="space-y-3 pt-2 border-t border-rule">
            {item.isSkill ? (
              <>
                {skillCmd && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={handleCopySkillCommand}
                      className="w-full h-11 px-4 rounded-pill bg-accent text-accent-ink font-medium text-sm hover:opacity-90 transition-opacity duration-150 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      {copiedSkillCmd ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied install command</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy install command</span>
                        </>
                      )}
                    </button>

                    <pre className="p-3 rounded-pill bg-paper-3 border border-rule font-mono text-xs text-cool overflow-x-auto select-all">
                      {skillCmd}
                    </pre>
                  </div>
                )}

                {item.skillDescription && (
                  <p className="text-xs text-ink-2 leading-relaxed pt-1">
                    {item.skillDescription}
                  </p>
                )}
              </>
            ) : item.hasCustomize ? (
              <>
                <button
                  type="button"
                  onClick={handleCustomizeClick}
                  className="w-full h-11 px-4 rounded-pill bg-accent text-accent-ink font-medium text-sm hover:opacity-90 transition-opacity duration-150 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Customize</span>
                </button>

                {hasCustomPrompt && (
                  <button
                    type="button"
                    onClick={handleShowAndCopyPrompt}
                    className="w-full h-10 px-4 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-ink font-medium text-xs transition-colors duration-150 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-cool" />
                        <span>Copied original prompt</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted" />
                        <span>
                          {promptVisible
                            ? "Copy original prompt"
                            : "Show and copy original prompt"}
                        </span>
                      </>
                    )}
                  </button>
                )}
              </>
            ) : (
              /* Non-customizable Website / Section / App / 3D Prompts */
              <button
                type="button"
                onClick={handleShowAndCopyPrompt}
                className="w-full h-11 px-4 rounded-pill bg-accent text-accent-ink font-medium text-sm hover:opacity-90 transition-opacity duration-150 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Show and copy the prompt</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Metadata & Attribution */}
          <dl className="pt-4 border-t border-rule space-y-2.5 text-xs">
            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">Creator / Source</dt>
              <dd className="text-ink font-medium text-right truncate">
                {item.handle && item.handle !== "axeslab"
                  ? `@${item.handle} (${item.author})`
                  : item.author}
              </dd>
            </div>

            {item.model && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Model / Platform</dt>
                <dd className="font-mono text-ink-2 text-right">{item.model}</dd>
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <dt className="text-muted">License &amp; Rights</dt>
              <dd className="font-mono text-ink-2 text-right">
                {item.license || "Creator attribution"}
              </dd>
            </div>

            {item.width && item.height && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Format</dt>
                <dd className="font-mono text-ink-2 num text-right">
                  {item.width}×{item.height}
                </dd>
              </div>
            )}

            {item.date && (
              <div className="flex items-center justify-between gap-3">
                <dt className="text-muted">Recorded</dt>
                <dd className="font-mono text-muted num text-right">
                  {item.date}
                </dd>
              </div>
            )}
          </dl>

          {/* Existing Stored External Links (only rendered when present in data) */}
          {(item.sourceUrl || item.skillRepo) && (
            <div className="pt-4 border-t border-rule space-y-2">
              <p className="text-xs font-medium text-muted">
                Source &amp; External Links
              </p>

              <div className="space-y-2">
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs text-ink flex items-center justify-between transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span>
                      {item.isSkill ? "View creator post" : "Open original source post"}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted" />
                  </a>
                )}

                {item.skillRepo && (
                  <a
                    href={item.skillRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs text-ink flex items-center justify-between transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-cool" />
                      <span>Open GitHub repository</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-muted" />
                  </a>
                )}
              </div>
            </div>
          )}

          {item.rightsStatus === "link_only" && (
            <p className="text-[11px] text-muted leading-relaxed pt-2 border-t border-rule">
              Original ownership and rights remain with @{item.handle}. Listed as a directory reference with attribution.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}
