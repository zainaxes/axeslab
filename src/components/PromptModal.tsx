'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ITEMS_DATABASE, ItemRecord } from '@/lib/items-data';
import { AnimatedCanvasPreview } from './AnimatedCanvasPreview';
import {
  X,
  Copy,
  Check,
  Heart,
  Share2,
  ExternalLink,
  Code2,
  FileText,
  Terminal,
  Play,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';

export function PromptModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptSlug = searchParams.get('prompt');

  const [activeTab, setActiveTab] = useState<'prompt' | 'code' | 'skill'>('prompt');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [viewMode, setViewMode] = useState<'video' | 'interactive'>('video');

  const item: ItemRecord | undefined = ITEMS_DATABASE.find((i) => i.slug === promptSlug);

  useEffect(() => {
    if (item) {
      setLikes(item.likes);
      setHasLiked(false);
    }
  }, [item]);

  if (!promptSlug || !item) return null;

  const handleClose = () => {
    // Remove query param while keeping user scroll
    const params = new URLSearchParams(searchParams.toString());
    params.delete('prompt');
    const newPath = params.toString() ? `?${params.toString()}` : window.location.pathname;
    router.push(newPath, { scroll: false });
  };

  const copyToClipboard = async (text: string, type: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      toast.success(`Copied ${label}!`, {
        description: "100% Free & Unlocked. Paste directly into your project.",
      });
      setTimeout(() => setCopiedType(null), 2000);
    } catch {
      toast.error("Failed to copy.");
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch {}
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      toast("Favorited prompt!", { description: item.title });
    }
  };

  const relatedItems = ITEMS_DATABASE.filter((i) => i.id !== item.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md">
      <div className="fixed inset-0" onClick={handleClose} />

      {/* Main Modal Dialog */}
      <div className="relative z-10 max-w-5xl w-full max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0B0B10] border border-white/[0.12] shadow-2xl p-0 text-white flex flex-col">
        {/* 1. Sticky Modal Header */}
        <div className="px-6 py-4 border-b border-white/[0.07] flex items-center justify-between sticky top-0 z-20 bg-[#0B0B10]/95 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-violet-300">
              {item.category}
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white truncate max-w-xs sm:max-w-md">
              {item.title}
            </h2>
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-white/[0.08]">
              {item.tags.slice(0, 3).map((t, idx) => (
                <span key={idx} className="text-[10px] font-mono text-zinc-500 bg-white/[0.03] px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs font-mono px-3 py-1.5 rounded-xl border transition-all ${
                hasLiked
                  ? "bg-rose-500/20 border-rose-500/40 text-rose-300"
                  : "bg-white/[0.04] border-white/[0.08] text-zinc-400 hover:text-white"
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? "fill-current" : ""}`} />
              <span>{likes}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
              title="Copy share link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Main 16:9 Interactive Preview Stage */}
        <div className="bg-black relative aspect-video w-full overflow-hidden border-b border-white/[0.07]">
          <AnimatedCanvasPreview theme={item.previewTheme} isHovered={true} />

          {/* Top-Right Toggle Switch */}
          <div className="absolute top-4 right-4 z-10 flex items-center bg-black/70 backdrop-blur-md border border-white/[0.1] rounded-full p-1 text-[11px] font-mono">
            <button
              onClick={() => setViewMode('video')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                viewMode === 'video' ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Play className="w-3 h-3" />
              <span>Video Preview</span>
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all ${
                viewMode === 'interactive' ? "bg-white text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Live Interactive</span>
            </button>
          </div>

          <div className="absolute bottom-4 left-4 z-10 px-3 py-1 rounded-xl bg-black/75 backdrop-blur-md border border-white/[0.1] text-xs font-mono text-zinc-300">
            Rendered at 60fps · Zero Video Lag
          </div>
        </div>

        {/* 3. Primary Action & Instant Copy Bar (All 100% Free & Unlocked) */}
        <div className="p-6 bg-[#0E0E15] border-b border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Copy Prompt */}
            <button
              onClick={() => copyToClipboard(item.rawPrompt, 'prompt', 'Full AI Prompt')}
              className="bg-white text-black hover:bg-zinc-200 font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform hover:scale-105 active:scale-95"
            >
              {copiedType === 'prompt' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-black" />}
              <span>{copiedType === 'prompt' ? "Copied Prompt!" : "Copy Prompt"}</span>
            </button>

            {/* Copy Source Code */}
            <button
              onClick={() => copyToClipboard(item.sourceCode, 'code', 'Component Source Code')}
              className="bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-white font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm transition-transform hover:scale-105 active:scale-95"
            >
              {copiedType === 'code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Code2 className="w-4 h-4 text-zinc-300" />}
              <span>{copiedType === 'code' ? "Copied Code!" : "Copy Source Code"}</span>
            </button>

            {/* Copy Agent Skill */}
            <button
              onClick={() => copyToClipboard(item.skillContent, 'skill', 'Agent SKILL.md')}
              className="bg-violet-500/15 hover:bg-violet-500/25 border border-violet-500/30 text-violet-200 font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm transition-transform hover:scale-105 active:scale-95"
            >
              {copiedType === 'skill' ? <Check className="w-4 h-4 text-emerald-400" /> : <Terminal className="w-4 h-4 text-violet-400" />}
              <span>{copiedType === 'skill' ? "Copied Skill!" : "Copy SKILL.md"}</span>
            </button>
          </div>

          {/* "Open directly in" AI Launchers */}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="hidden sm:inline">Open in:</span>
            <div className="flex items-center gap-1.5">
              {[
                { name: "Lovable", url: "https://lovable.dev" },
                { name: "Cursor", url: "cursor://open" },
                { name: "Claude", url: "https://claude.ai" },
                { name: "Bolt", url: "https://bolt.new" },
              ].map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => copyToClipboard(item.rawPrompt, 'prompt', `${tool.name} Prompt`)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-300 hover:text-white transition-colors"
                >
                  {tool.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Full Prompt & Source Code Inspector Tabs */}
        <div className="p-6 space-y-6">
          {/* Tab Selector Buttons */}
          <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3">
            {[
              { id: 'prompt', label: "Full AI Prompt", icon: FileText },
              { id: 'code', label: "React / Tailwind Code", icon: Code2 },
              { id: 'skill', label: "SKILL.md & MCP Protocol", icon: Terminal },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-white/[0.1] text-white border border-white/[0.15]"
                      : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.03]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          {activeTab === 'prompt' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Production AI System Prompt</span>
                <span>{item.rawPrompt.length.toLocaleString()} characters</span>
              </div>
              <pre className="max-h-96 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07070B] p-5 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap select-text">
                <code>{item.rawPrompt}</code>
              </pre>
            </div>
          )}

          {activeTab === 'code' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>React 19 + TypeScript + Tailwind Component</span>
                <span>Ready to paste</span>
              </div>
              <pre className="max-h-96 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07070B] p-5 font-mono text-xs text-zinc-200 leading-relaxed select-text">
                <code>{item.sourceCode}</code>
              </pre>
            </div>
          )}

          {activeTab === 'skill' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300">
                <span className="font-bold">Axes Lab MCP Agent Directive:</span>
                <p className="mt-1 font-mono text-zinc-300">{item.mcpCommand}</p>
              </div>
              <pre className="max-h-96 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#07070B] p-5 font-mono text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap select-text">
                <code>{item.skillContent}</code>
              </pre>
            </div>
          )}
        </div>

        {/* 5. Related Prompts Grid */}
        <div className="px-6 pb-8 border-t border-white/[0.06] pt-6">
          <h3 className="text-sm font-bold text-white mb-4">More like this</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedItems.map((r) => (
              <div
                key={r.id}
                onClick={() => router.push(`/?prompt=${r.slug}`, { scroll: false })}
                className="group p-3 rounded-2xl bg-[#09090D] border border-white/[0.07] hover:border-white/[0.18] cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="w-16 h-12 rounded-xl overflow-hidden bg-black shrink-0">
                  <AnimatedCanvasPreview theme={r.previewTheme} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white group-hover:text-violet-300 truncate">
                    {r.title}
                  </h4>
                  <span className="text-[10px] font-mono text-zinc-500">{r.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
