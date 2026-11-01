'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ItemRecord } from '@/lib/items-data';
import { AnimatedCanvasPreview } from './AnimatedCanvasPreview';
import { Copy, Check, Heart, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

interface PromptCardProps {
  item: ItemRecord;
}

export function PromptCard({ item }: PromptCardProps) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(item.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const handleCopyPrompt = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(item.rawPrompt);
      setCopied(true);
      toast.success(`Copied "${item.title}" prompt!`, {
        description: "Ready to paste into Cursor, Claude Code, or Lovable.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy prompt.");
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
      toast("Added to favorites!", { description: item.title });
    }
  };

  const handleCardClick = () => {
    router.push(`/?prompt=${item.slug}`, { scroll: false });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      className="group relative rounded-2xl bg-[#0B0B0F] border border-white/[0.07] hover:border-white/[0.18] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)] cursor-pointer flex flex-col justify-between"
    >
      {/* 16:10 Live Animated Motion Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#060609]">
        <AnimatedCanvasPreview theme={item.previewTheme} isHovered={isHovered} />

        {/* Top-Left Badge */}
        {item.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className="rounded-full bg-black/60 border border-white/[0.1] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-zinc-300 backdrop-blur-md">
              {item.badge}
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
        {/* Left: Title */}
        <div className="min-w-0 pr-2">
          <h3 className="text-[15px] font-semibold text-zinc-100 group-hover:text-white truncate">
            {item.title}
          </h3>
          <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5 font-normal">
            {item.description}
          </p>
        </div>

        {/* Right: Category Pill & Like Button */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-zinc-400 bg-white/[0.04] border border-white/[0.06] px-2.5 py-0.5 rounded-full">
            {item.category}
          </span>
          <button
            type="button"
            onClick={handleLike}
            className={`flex items-center gap-1 text-xs font-mono px-2 py-0.5 rounded-full border transition-all ${
              hasLiked
                ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                : "bg-white/[0.03] border-white/[0.06] text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Heart className={`w-3 h-3 ${hasLiked ? "fill-current" : ""}`} />
            <span>{likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
