'use client';

import React, { useRef, useState, useEffect } from 'react';
import { RealPromptItem } from '@/lib/real-prompts';
import { Copy, Check, SlidersHorizontal, Play, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface PromptCardProps {
  item: RealPromptItem;
  index?: number;
  copied?: boolean;
  onCopy?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  onCustomize?: (e: React.MouseEvent) => void;
}

export function PromptCard({
  item,
  index = 0,
  copied: propCopied,
  onCopy,
  onClick,
  onCustomize
}: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [localCopied, setLocalCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const copied = propCopied !== undefined ? propCopied : localCopied;

  // Static preview by default. Only play when user deliberately hovers or clicks play!
  useEffect(() => {
    if (!videoRef.current || !item.preview) return;

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (isHovered && item.preview) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isHovered, item.preview]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCopy) {
      onCopy(e);
      return;
    }
    const textToCopy = item.originalPrompt || item.improvedPrompt || item.contentBody;
    navigator.clipboard.writeText(textToCopy);
    setLocalCopied(true);
    toast.success(`Copied "${item.title}" prompt!`);
    setTimeout(() => setLocalCopied(false), 2000);
  };

  const handleCustomize = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCustomize) {
      onCustomize(e);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-card bg-paper-2 border border-rule hover:border-rule-2 transition-all duration-150 cursor-pointer overflow-hidden justify-between focus-within:outline-2 focus-within:outline-accent"
    >
      {/* 1. Preview Media Viewport (Static poster by default, hover/interaction plays) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-3">
        {item.poster && (
          <img
            src={item.poster}
            alt={item.title}
            loading={index < 8 ? 'eager' : 'lazy'}
            decoding="async"
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlaying ? 'opacity-0' : 'opacity-100'
            }`}
          />
        )}

        {/* Video layer: only plays on deliberate hover/interaction */}
        {item.preview && (
          <video
            ref={videoRef}
            src={item.preview}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="none"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isPlaying ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Subcategory Badge (Top Left) */}
        <div className="absolute top-2 left-2 z-10">
          <span className="font-sans text-[11px] font-medium px-2 py-0.5 rounded-pill bg-paper/95 border border-rule text-ink backdrop-blur-sm shadow-sm">
            {item.subcategory}
          </span>
        </div>

        {/* Model Pill (Top Right, when not hovered) */}
        <div className="absolute top-2 right-2 z-10 group-hover:opacity-0 transition-opacity duration-150">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded-pill bg-paper/90 border border-rule text-muted backdrop-blur-sm">
            {item.model || 'Opus 5.5'}
          </span>
        </div>

        {/* Hover Action Buttons (Top Right on Hover) */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {item.hasCustomize && (
            <button
              type="button"
              onClick={handleCustomize}
              className="flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium border border-rule bg-paper/95 hover:bg-paper text-ink backdrop-blur-sm shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              title="Customize prompt parameters"
            >
              <SlidersHorizontal className="w-3 h-3 text-cool" />
              <span>Customize</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium border transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-accent ${
              copied
                ? 'bg-cool-soft border-cool text-cool'
                : 'bg-paper/95 hover:bg-paper border-rule text-ink backdrop-blur-sm'
            }`}
            title="Copy prompt text"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-cool" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Play indicator watermark (bottom right) */}
        {item.preview && !isPlaying && (
          <div className="absolute bottom-2 right-2 z-10 pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity">
            <span className="rounded-pill bg-paper/85 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted flex items-center gap-1 backdrop-blur-sm">
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>Motion</span>
            </span>
          </div>
        )}
      </div>

      {/* 2. Card Content & Creator Attribution */}
      <div className="p-3.5 flex flex-col justify-between flex-1 gap-2.5 bg-paper-2">
        <div>
          <h3 className="font-sans font-medium text-xs text-ink line-clamp-1 group-hover:text-cool transition-colors duration-150">
            {item.title}
          </h3>
          <p className="font-sans text-[11px] text-muted line-clamp-2 mt-1 leading-relaxed">
            {item.summary || item.originalPrompt?.slice(0, 100) || item.contentBody?.slice(0, 100)}
          </p>
        </div>

        {/* Creator Attribution & Verification Indicator */}
        <div className="flex items-center justify-between text-[11px] pt-2 border-t border-rule/50">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="font-medium text-ink truncate">@{item.handle}</span>
            <span className="text-muted truncate hidden sm:inline">({item.author})</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className={`font-mono text-[10px] px-1.5 py-0.2 rounded-pill border ${
              item.rightsStatus === 'host_allowed'
                ? 'bg-cool-soft border-cool text-cool'
                : 'bg-paper-3 border-rule text-muted'
            }`}>
              {item.rightsStatus === 'host_allowed' ? 'Curated' : 'Official Source'}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
