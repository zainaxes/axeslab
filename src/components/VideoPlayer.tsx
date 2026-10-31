"use client";

import React, { useState } from "react";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  isYouTubeUrl,
  getProxiedMediaUrl,
  getCategoryFallbackPoster,
} from "@/lib/video-utils";
import { Play } from "lucide-react";

interface VideoPlayerProps {
  posterUrl?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  title: string;
  aspectRatio?: string;
  controls?: boolean;
  className?: string;
  categoryName?: string;
}

export function VideoPlayer({
  posterUrl,
  videoUrl,
  youtubeUrl,
  title,
  aspectRatio = "aspect-[16/10]",
  controls = true,
  className = "",
  categoryName,
}: VideoPlayerProps) {
  const [isPlayingYouTube, setIsPlayingYouTube] = useState(false);

  const isYT = isYouTubeUrl(youtubeUrl);
  const ytThumb = isYT ? getYouTubeThumbnailUrl(youtubeUrl) : null;
  const rawPoster = posterUrl || ytThumb || getCategoryFallbackPoster(categoryName, title);
  const effectivePoster = rawPoster ? getProxiedMediaUrl(rawPoster) : undefined;
  const effectiveVideo = videoUrl ? getProxiedMediaUrl(videoUrl) : undefined;

  // 1. YouTube Facade (Lightweight click-to-load)
  if (isYT && youtubeUrl) {
    if (isPlayingYouTube) {
      const ytEmbed = getYouTubeEmbedUrl(youtubeUrl, true);
      return (
        <div className={`relative w-full overflow-hidden rounded-xl bg-black ${aspectRatio} ${className}`}>
          <iframe
            src={ytEmbed || ""}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      );
    }

    return (
      <div
        onClick={() => setIsPlayingYouTube(true)}
        className={`group relative w-full cursor-pointer overflow-hidden rounded-xl bg-black ${aspectRatio} ${className}`}
      >
        {effectivePoster ? (
          <img
            src={effectivePoster}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-zinc-900" />
        )}

        {/* Ambient Overlay & Play Facade Button */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-colors group-hover:bg-black/20">
          <button
            type="button"
            aria-label={`Play video for ${title}`}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-black shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white"
          >
            <Play className="ml-1 h-6 w-6 fill-current" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 rounded-md bg-black/70 px-2 py-0.5 font-mono text-[10px] font-semibold uppercase text-white backdrop-blur-md">
          Click to Play Video
        </div>
      </div>
    );
  }

  // 2. Standard MP4 / WebM with preload="none" (Zero initial network overhead)
  if (effectiveVideo) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-black ${aspectRatio} ${className}`}>
        <video
          src={effectiveVideo}
          poster={effectivePoster}
          controls={controls}
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  // 3. Fallback to lightweight poster
  if (effectivePoster) {
    return (
      <div className={`relative w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 ${aspectRatio} ${className}`}>
        <img
          src={effectivePoster}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center rounded-xl bg-black/5 font-mono text-xs text-black/40 dark:bg-white/5 dark:text-white/40 ${aspectRatio} ${className}`}>
      Media Preview Coming Soon
    </div>
  );
}
