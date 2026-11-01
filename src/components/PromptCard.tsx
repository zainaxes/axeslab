'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PromptItem } from '@/lib/real-prompts';
import { Copy, Check, Heart, Play, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface PromptCardProps {
  item: PromptItem;
}

export function PromptCard({ item }: PromptCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.videoUrl) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && item.videoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
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
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="group relative rounded-2xl bg-[#0B0B0F] border border-white/[0.07] hover:border-white/[0.18] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer flex flex-col justify-between"
    >
      {/* 16:10 Live Preview Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060609]">
        {/* Poster Image */}
        {item.posterUrl && (
          <img
            src={item.posterUrl}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered && item.videoUrl ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Looping Hover Video (Streaming on demand, zero memory blocking) */}
        {item.videoUrl && (
          <video
            ref={videoRef}
            src={item.videoUrl}
            poster={item.posterUrl}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Top-Left Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-full bg-black/70 border border-white/[0.1] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-md">
            {item.category}
          </span>
        </div>

        {/* Video Indicator Pill */}
        {item.videoUrl && (
          <div className="absolute bottom-2.5 right-2.5 z-10 opacity-70 group-hover:opacity-0 transition-opacity">
            <span className="rounded-md bg-black/80 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-zinc-400 backdrop-blur-md flex items-center gap-1">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Preview</span>
            </span>
          </div>
        )}

        {/* Top-Right Floating Quick-Copy Button (Appears on Hover) */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black border border-white/[0.15] text-white text-xs font-semibold backdrop-blur-md transition-transform hover:scale-105 active:scale-95 shadow-xl"
            title="Copy complete AI prompt"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-violet-300" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Footer Metadata Bar */}
      <div className="px-4 py-3.5 flex items-center justify-between bg-[#0B0B0F] border-t border-white/[0.04]">
        {/* Left: Title & Character count */}
        <div className="min-w-0 pr-2">
          <h3 className="text-[15px] font-semibold text-zinc-100 group-hover:text-white truncate">
            {item.title}
          </h3>
          <p className="text-[11px] font-mono text-zinc-500 line-clamp-1 mt-0.5 font-normal">
            {item.chars.toLocaleString()} chars · Verified Axes Lab
          </p>
        </div>

        {/* Right: Like Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border transition-all ${
              hasLiked
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                : 'bg-white/[0.03] border-white/[0.06] text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Heart className={`w-3 h-3 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
