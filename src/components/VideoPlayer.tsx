import React from "react";
import { getYouTubeEmbedUrl, isYouTubeUrl } from "@/lib/video-utils";

interface VideoPlayerProps {
  posterUrl?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  title: string;
  aspectRatio?: string;
  autoPlayOnHover?: boolean;
  controls?: boolean;
  className?: string;
}

export function VideoPlayer({
  posterUrl,
  videoUrl,
  youtubeUrl,
  title,
  aspectRatio = "aspect-[16/10]",
  controls = true,
  className = "",
}: VideoPlayerProps) {
  // If a YouTube URL or Video ID is provided, render high-performance YouTube iframe
  const ytEmbed = getYouTubeEmbedUrl(youtubeUrl);
  if (ytEmbed) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-black ${aspectRatio} ${className}`}
      >
        <iframe
          src={ytEmbed}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  // If standard MP4 video URL is provided
  if (videoUrl) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-black ${aspectRatio} ${className}`}
      >
        <video
          src={videoUrl}
          poster={posterUrl}
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

  // Fallback to poster image if no video available
  if (posterUrl) {
    return (
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-black/5 dark:bg-white/5 ${aspectRatio} ${className}`}
      >
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 font-mono text-xs text-black/40 dark:text-white/40 ${aspectRatio} ${className}`}
    >
      Preview Media Available Soon
    </div>
  );
}
