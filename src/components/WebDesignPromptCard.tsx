"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Resource } from "@/types";
import { Copy, Check, Eye } from "lucide-react";
import {
  getYouTubeThumbnailUrl,
  isYouTubeUrl,
  getProxiedMediaUrl,
  getCategoryFallbackPoster,
} from "@/lib/video-utils";

interface WebDesignPromptCardProps {
  resource: Resource;
  onOpenModal?: (resource: Resource) => void;
}

export function WebDesignPromptCard({
  resource,
  onOpenModal,
}: WebDesignPromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const metadata = resource.parsed_metadata || {};
  const rawVideoUrl = metadata.custom_video_url || metadata.effectUrl || metadata.default_video_url;
  const youtubeUrl = metadata.youtube_video_id || metadata.custom_video_url;
  const rawPoster = metadata.posterUrl;
  const categoryName = metadata.categoryName || resource.subcategory_name || "Web Design";

  const isYT = isYouTubeUrl(youtubeUrl);
  // Resolve reliable poster (either direct poster, youtube thumb, or category fallback)
  const posterCandidate = rawPoster || (isYT ? getYouTubeThumbnailUrl(youtubeUrl) : null) || getCategoryFallbackPoster(categoryName, resource.title);
  const posterUrl = posterCandidate ? getProxiedMediaUrl(posterCandidate) : null;
  const videoUrl = rawVideoUrl ? getProxiedMediaUrl(rawVideoUrl) : null;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && !isYT) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !isYT) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!resource.content_body) return;
    try {
      await navigator.clipboard.writeText(resource.content_body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (onOpenModal) {
      e.preventDefault();
      onOpenModal(resource);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-xl dark:border-white/10 dark:bg-[#111111] dark:hover:border-white/20 cursor-pointer"
    >
      {/* 16/10 Ultra-Light Media Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5 dark:bg-black">
        {/* Lightweight Poster Image (Always visible first, 0 video weight) */}
        {posterUrl && (
          <img
            src={posterUrl}
            alt={resource.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered && videoUrl && !isYT ? "opacity-0" : "opacity-100"
            }`}
          />
        )}

        {/* Looping Hover Video (Strictly preload="none" - only streams on active mouse hover) */}
        {videoUrl && !isYT && (
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl || undefined}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Category Pill on top left */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-black/70 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-md dark:bg-white/90 dark:text-black">
            {categoryName}
          </span>
        </div>

        {/* Quick Action Overlay (View prompt + Copy) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onOpenModal) onOpenModal(resource);
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>View Prompt</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-black/80 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
            title="Copy prompt text"
          >
            {copied ? (
              <>
                <Check className="h-3.5 h-3.5 text-cool" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-black group-hover:underline dark:text-white">
            {resource.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-black/60 dark:text-white/60 leading-relaxed">
            {resource.summary}
          </p>
        </div>

        {/* Footer Brand reference */}
        <div className="mt-3 flex items-center justify-between border-t border-black/5 pt-2.5 text-[11px] font-mono text-black/40 dark:border-white/5 dark:text-white/40">
          <span>Axes Lab</span>
          <span className="text-black/60 dark:text-white/60 hover:underline">
            axeslab.zainaxes.com
          </span>
        </div>
      </div>
    </div>
  );
}
