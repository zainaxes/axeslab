'use client';

import React, { useState } from 'react';
import { PromptItem } from '@/lib/real-prompts';
import { Copy, Check, ChevronDown, ChevronUp, Terminal, Cpu, Sparkles, Flame, ExternalLink, Code2 } from 'lucide-react';
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
      toast.error('No prompt text available to copy');
      return;
    }
    navigator.clipboard.writeText(item.contentBody);
    setCopied(true);
    toast.success('Prompt copied to clipboard', {
      description: item.title,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRowClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group border-b border-white/[0.06] transition-colors duration-100 cursor-pointer ${
        expanded ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
      }`}
    >
      {/* 1. Primary & Secondary Layers: Dense Data Row */}
      <div className="px-3 sm:px-4 py-2.5 flex items-center justify-between gap-3 text-xs">
        
        {/* Left: Index, Status Dot, Title, Category Tag */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Numerical ID */}
          <span className="font-mono text-[11px] text-zinc-600 w-7 flex-shrink-0 text-right select-none">
            {String(index + 1).padStart(3, '0')}
          </span>

          {/* Status Ping Dot */}
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 flex-shrink-0" />

          {/* Title & Slug Identifier */}
          <div className="flex items-center gap-2 truncate min-w-0">
            <span className="font-medium text-white group-hover:text-violet-300 transition-colors truncate">
              {item.title}
            </span>
            <span className="hidden md:inline-block font-mono text-[11px] text-zinc-500 truncate">
              /{item.slug}
            </span>
          </div>

          {/* Category Technical Badge */}
          <span className="flex-shrink-0 font-mono text-[11px] px-1.5 py-0.5 rounded-[4px] bg-white/[0.04] text-zinc-400 border border-white/[0.07]">
            {item.category}
          </span>
        </div>

        {/* Right: Technical Badges, Fast Copy Button & Toggle */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          
          {/* Metadata: Token Estimate */}
          <div className="hidden lg:flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
            <span className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.02] border border-white/[0.06]">
              ~{tokenCount} tokens
            </span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.02] border border-white/[0.06] text-zinc-400">
              verified ✓
            </span>
          </div>

          {/* 1-Click Copy Prompt Button */}
          <button
            onClick={handleCopy}
            title="Copy prompt directly"
            className={`font-mono text-[11px] font-semibold px-2.5 py-1 rounded-[4px] border transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              copied
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                : 'bg-white text-black hover:bg-zinc-200 border-white'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-black" />
                <span>copy</span>
              </>
            )}
          </button>

          {/* Drawer Expand Toggle */}
          <div
            className={`p-1 rounded-[4px] text-zinc-500 hover:text-white transition-transform duration-150 ${
              expanded ? 'rotate-180 text-white' : ''
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
          className="border-t border-white/[0.07] bg-[#030305] px-4 py-3.5 space-y-3 cursor-default"
        >
          {/* Drawer Top Utility Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-400 pb-1 border-b border-white/[0.05]">
            <div className="flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-violet-400" />
              <span className="text-zinc-200 font-semibold">{item.title}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">{item.chars} characters</span>
            </div>
            
            <div className="flex items-center gap-3">
              <a
                href={`/?prompt=${item.slug}`}
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.search = `?prompt=${item.slug}`;
                }}
                className="text-violet-400 hover:text-violet-300 underline underline-offset-2 flex items-center gap-1"
              >
                <span>Full Modal View</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <button
                onClick={handleCopy}
                className="hover:text-white transition-colors flex items-center gap-1 bg-white/[0.05] hover:bg-white/[0.1] px-2 py-0.5 rounded-[4px] border border-white/[0.08]"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Full Prompt</span>
              </button>
            </div>
          </div>

          {/* Raw Prompt Specification Terminal Viewer */}
          <div className="relative rounded-[4px] border border-white/[0.08] bg-[#07070B] p-3 text-xs font-mono overflow-hidden">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-2 pb-1.5 border-b border-white/[0.05]">
              <span>SYSTEM_DIRECTIVE_BODY</span>
              <span>READ_ONLY</span>
            </div>
            <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto font-mono selection:bg-violet-600/40 text-[11px]">
              {item.contentBody || item.summary}
            </pre>
          </div>

          {/* Quick Technical Badges inside drawer */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-zinc-500 pt-1">
            <span className="text-zinc-400">Target Models:</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.03] border border-white/[0.06] text-zinc-300">Claude 3.7 Sonnet</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.03] border border-white/[0.06] text-zinc-300">Cursor / Cline</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.03] border border-white/[0.06] text-zinc-300">Gemini 2.0 Flash</span>
            <span className="px-1.5 py-0.5 rounded-[4px] bg-white/[0.03] border border-white/[0.06] text-zinc-300">GPT-4.5</span>
          </div>
        </div>
      )}
    </div>
  );
}
