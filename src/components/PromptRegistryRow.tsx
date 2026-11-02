'use client';

import React, { useState } from 'react';
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

  // Approximate tokens from char length (~4 chars per token)
  const tokenCount = Math.round(item.chars / 4);

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
      className={`group border-b border-rule transition-colors duration-150 cursor-pointer ${
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

          {/* Title & Slug Identifier */}
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="font-sans font-medium text-ink truncate">
              {item.title}
            </span>
            <span className="hidden md:inline-block font-sans text-xs text-muted truncate">
              /{item.slug}
            </span>
          </div>

          {/* Category Technical Badge */}
          <span className="flex-shrink-0 font-sans text-xs px-1.5 py-0.5 rounded-pill bg-paper-3 text-muted border border-rule">
            {item.category}
          </span>
        </div>

        {/* Right: Technical Badges, Fast Copy Button & Toggle */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          
          {/* Metadata: Token Estimate */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted">
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule">
              <span className="font-mono">{tokenCount}</span> tok
            </span>
            <span className="px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-ok">
              verified
            </span>
          </div>

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
                <Copy className="w-3 h-3" />
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
