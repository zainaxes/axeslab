'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PromptItem } from '@/lib/real-prompts';
import { Copy, Check, ChevronDown, Code2, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface PromptRegistryRowProps {
  item: PromptItem;
  index: number;
}

export function PromptRegistryRow({ item, index }: PromptRegistryRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Approximate tokens from char length (~4 chars per token)
  const charLength = item.chars || item.contentBody?.length || 0;
  const tokenCount = Math.round(charLength / 4);

  const isM3u8 = Boolean(item.videoUrl && item.videoUrl.includes('.m3u8'));
  const isAnimatedWebp = Boolean(item.videoUrl && item.videoUrl.includes('.webp'));
  const hasVideo = Boolean(item.videoUrl || item.posterUrl);

  // Load and play video when preview button is hovered
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showPreview || !item.videoUrl || isAnimatedWebp) return;

    let hlsInstance: any = null;
    let isCancelled = false;

    if (isM3u8) {
      import('hls.js').then(({ default: Hls }) => {
        if (isCancelled || !videoRef.current) return;
        if (Hls.isSupported()) {
          hlsInstance = new Hls({ enableWorker: true, lowLatencyMode: true });
          hlsInstance.loadSource(item.videoUrl!);
          hlsInstance.attachMedia(videoRef.current);
          videoRef.current.play().catch(() => {});
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = item.videoUrl!;
          videoRef.current.play().catch(() => {});
        }
      });
    } else {
      video.src = item.videoUrl;
      video.play().catch(() => {});
    }

    return () => {
      isCancelled = true;
      if (hlsInstance) hlsInstance.destroy();
    };
  }, [showPreview, item.videoUrl, isM3u8, isAnimatedWebp]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!item.contentBody) {
      toast.error('No prompt text available');
      return;
    }
    navigator.clipboard.writeText(item.contentBody);
    setCopied(true);
    toast.success('Prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRowClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group relative border-b border-rule transition-colors duration-150 cursor-pointer ${
        expanded ? 'bg-paper-2' : 'hover:bg-paper-2/60'
      }`}
    >
      {/* 1. Primary & Secondary Layers: Dense Data Row */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between gap-3 text-xs">
        
        {/* Left: Index, Status Dot, Title, Category Tag */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Numerical ID */}
          <span className="font-mono text-xs text-muted w-7 flex-shrink-0 text-right select-none">
            {String(index + 1).padStart(3, '0')}
          </span>

          {/* Status Instrument Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-cool flex-shrink-0" />

          {/* Title Identifier & Creator */}
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="font-sans font-medium text-ink truncate">
              {item.title}
            </span>
            <span className="text-[11px] text-muted truncate hidden md:inline">
              @{item.handle}
            </span>
          </div>

          {/* Category Technical Badge */}
          <span className="flex-shrink-0 font-sans text-xs px-1.5 py-0.5 rounded-pill bg-paper-3 text-muted border border-rule">
            {item.category}
          </span>
        </div>

        {/* Right: Technical Badges, Preview Hover Button, Fast Copy Button & Toggle */}
        <div className="flex items-center gap-2 flex-shrink-0">
          
          {/* Metadata: Token Estimate */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted">
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule">
              <span className="font-mono">{tokenCount}</span> tok
            </span>
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-ok">
              verified
            </span>
          </div>

          {/* Hover Interactive Video Preview Button */}
          {hasVideo && (
            <div className="relative">
              <button
                type="button"
                onMouseEnter={() => setShowPreview(true)}
                onMouseLeave={() => setShowPreview(false)}
                onClick={(e) => e.stopPropagation()}
                className="font-sans text-xs font-medium px-2 py-1 rounded-pill border border-rule bg-paper-3 text-muted hover:text-ink hover:bg-paper hover:border-rule-2 transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
              >
                preview
              </button>

              {/* Floating Non-Blocking Medium-Sized Video Popover */}
              {showPreview && (
                <div
                  className="pointer-events-none absolute right-0 bottom-full mb-2 z-[var(--z-tooltip)] w-72 h-44 rounded-card bg-paper-3 border border-rule-2 overflow-hidden shadow-none"
                >
                  {isAnimatedWebp || !item.videoUrl ? (
                    <img
                      src={item.videoUrl || item.posterUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      poster={item.posterUrl}
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded-pill bg-paper-3/90 border border-rule text-ink text-xs font-sans">
                    {item.title}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 1-Click Copy Prompt Button */}
          <button
            onClick={handleCopy}
            title="Copy prompt directly"
            className={`font-sans text-xs font-medium px-2.5 py-1 rounded-pill border transition-colors duration-150 flex items-center gap-1.5 cursor-pointer active:opacity-80 focus-visible:outline-2 focus-visible:outline-accent ${
              copied
                ? 'bg-ok-soft border-ok text-ok'
                : 'bg-paper-3 text-ink hover:bg-rule border-rule'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-ok" />
                <span>copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-muted" />
                <span>copy</span>
              </>
            )}
          </button>

          {/* Drawer Expand Toggle */}
          <div
            className={`p-1 rounded-pill text-muted hover:text-ink motion-safe:transition-transform motion-safe:duration-150 ${
              expanded ? 'rotate-180 text-ink' : ''
            }`}
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </div>

        </div>
      </div>

      {/* 2. Tertiary Layer: Collapsible In-Row Inspection Drawer */}
      {expanded && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="border-t border-rule bg-paper-3 px-4 py-3 space-y-3 cursor-default"
        >
          {/* Drawer Top Utility Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans text-muted pb-1 border-b border-rule">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-cool" />
              <span className="text-ink font-medium">{item.title}</span>
              <span className="text-muted">·</span>
              <span><span className="font-mono">{item.chars}</span> chars</span>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href={`/?prompt=${item.slug}`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.search = `?prompt=${item.slug}`;
                }}
                className="text-cool hover:underline flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <span>Full details</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={handleCopy}
                className="text-muted hover:text-ink transition-colors duration-150 flex items-center gap-1 bg-paper-2 hover:bg-rule px-2 py-0.5 rounded-pill border border-rule active:opacity-80 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy full text</span>
              </button>
            </div>
          </div>

          {/* Raw Prompt Specification Terminal Viewer */}
          <div className="relative rounded-card border border-rule bg-paper-3 p-3 text-xs overflow-hidden">
            <div className="flex items-center justify-between text-xs font-sans text-muted mb-2 pb-1.5 border-b border-rule">
              <span>prompt specification</span>
              <span>read-only</span>
            </div>
            <pre className="text-ink-2 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto font-mono selection:bg-accent-soft text-xs">
              {item.contentBody || item.summary}
            </pre>
          </div>

          {/* Quick Technical Badges inside drawer */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted pt-1">
            <span>Verified targets:</span>
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink">Claude 3.7 Sonnet</span>
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink">Cursor / Cline</span>
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink">Gemini 2.0 Flash</span>
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink">GPT-4.5</span>
          </div>
        </div>
      )}
    </div>
  );
}
