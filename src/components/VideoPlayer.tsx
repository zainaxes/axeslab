"use client";

import React, { useState } from "react";
import { Play } from "lucide-react";
import {
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  isYouTubeUrl,
  getProxiedMediaUrl,
  getCategoryFallbackPoster,
} from "@/lib/video-utils";

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
  const rawPoster =
    posterUrl || ytThumb || getCategoryFallbackPoster(categoryName, title);
  const effectivePoster = rawPoster ? getProxiedMediaUrl(rawPoster) : undefined;
  const effectiveVideo = videoUrl ? getProxiedMediaUrl(videoUrl) : undefined;

  if (isYT && youtubeUrl) {
    if (isPlayingYouTube) {
      const ytEmbed = getYouTubeEmbedUrl(youtubeUrl, true);
      return (
        <div
          className={`relative w-full overflow-hidden rounded-card bg-paper-3 border border-rule ${aspectRatio} ${className}`}
        >
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
        className={`group relative w-full cursor-pointer overflow-hidden rounded-card bg-paper-3 border border-rule ${aspectRatio} ${className}`}
      >
        {effectivePoster && (
          <img
            src={effectivePoster}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-paper-3/45 transition-colors group-hover:bg-paper-3/30">
          <button
            type="button"
            aria-label={`Play video for ${title}`}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-paper/90 border border-rule-2 text-ink transition-colors"
          >
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </button>
        </div>
      </div>
    );
  }

  if (effectiveVideo) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-card bg-paper-3 border border-rule ${aspectRatio} ${className}`}
      >
        <video
          src={effectiveVideo}
          poster={effectivePoster}
          controls={controls}
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (effectivePoster) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-card bg-paper-3 border border-rule ${aspectRatio} ${className}`}
      >
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
    <div
      className={`flex items-center justify-center rounded-card bg-paper-3 border border-rule font-mono text-xs text-muted ${aspectRatio} ${className}`}
    >
      Preview unavailable
    </div>
  );
}
