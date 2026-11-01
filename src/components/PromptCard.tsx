'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PromptItem } from '@/lib/real-prompts';
import { Copy, Check, Heart, Play } from 'lucide-react';
import { toast } from 'sonner';
import Hls from 'hls.js';

interface PromptCardProps {
  item: PromptItem;
}

export function PromptCard({ item }: PromptCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const isM3u8 = Boolean(item.videoUrl && item.videoUrl.includes('.m3u8'));
  const isAnimatedWebp = Boolean(item.videoUrl && item.videoUrl.includes('.webp'));

  // Attach HLS stream or standard source
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoUrl || isAnimatedWebp) return;

    let hls: Hls | null = null;

    if (isM3u8) {
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true, lowLatencyMode: true });
        hls.loadSource(item.videoUrl);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = item.videoUrl;
      }
    } else {
      video.src = item.videoUrl;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [item.videoUrl, isM3u8, isAnimatedWebp]);

  // Viewport IntersectionObserver
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInViewport(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Play video on hover or when visible in viewport
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !item.videoUrl || isAnimatedWebp) return;

    if (isHovered && isInViewport) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isHovered, isInViewport, item.videoUrl, isAnimatedWebp]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCopyPrompt = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.contentBody);
      setCopied(true);
      toast.success(`Copied "${item.title}" prompt!`, {
        description: `${item.chars.toLocaleString()} characters ready for Cursor, Claude Code, or Lovable.`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy prompt.');
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      toast('Added to favorites!', { description: item.title });
    }
  };

  const handleCardClick = () => {
    router.push(`/?prompt=${item.slug}`, { scroll: false });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="group relative rounded-2xl bg-[#0B0B0F] border border-white/[0.07] hover:border-white/[0.2] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.75)] cursor-pointer flex flex-col justify-between"
    >
      {/* 16:10 Live Preview Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#050507] border-b border-white/[0.06]">
        {/* Instant Poster Image */}
        {item.posterUrl && (
          <img
            src={item.posterUrl}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered && item.videoUrl && (isVideoLoaded || isAnimatedWebp) ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Animated WebP stream fallback */}
        {isAnimatedWebp && item.videoUrl && isHovered && (
          <img
            src={item.videoUrl}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}

        {/* Real Looping Hover Video */}
        {item.videoUrl && !isAnimatedWebp && (
          <video
            ref={videoRef}
            poster={item.posterUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${
              isHovered && isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top-Left Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-black/75 border border-white/[0.1] px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide text-zinc-300 backdrop-blur-md">
            {item.category}
          </span>
        </div>

        {/* Video Indicator Pill */}
        {item.videoUrl && (
          <div className="absolute bottom-2.5 right-2.5 z-10 opacity-70 group-hover:opacity-0 transition-opacity pointer-events-none">
            <span className="rounded-md bg-black/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400 backdrop-blur-md flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Preview</span>
            </span>
          </div>
        )}

        {/* Top-Right Floating Quick-Copy Button on Hover */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-zinc-200 text-[#050507] text-xs font-semibold shadow-xl transition-transform hover:scale-105 active:scale-95"
            title="Copy complete AI prompt"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MotionSites Signature Card Footer: Title Left, Category Pill & Likes Right */}
      <div className="px-4 py-3.5 flex items-center justify-between gap-2 bg-[#0B0B0F]">
        <div className="min-w-0 pr-2">
          <h3 className="text-[15px] font-medium text-zinc-100 group-hover:text-white truncate">
            {item.title}
          </h3>
          <p className="text-[11px] font-mono text-zinc-500 truncate mt-0.5 font-normal">
            {item.chars.toLocaleString()} chars · Verified
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border transition-all ${
              hasLiked
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-white/[0.03] border-white/[0.06] text-zinc-500 hover:text-zinc-300'
            }`}
            title="Favorite"
          >
            <Heart className={`w-3 h-3 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
