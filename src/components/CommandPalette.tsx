'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { ALL_REAL_PROMPTS, PromptItem } from '@/lib/real-prompts';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) return ALL_REAL_PROMPTS.slice(0, 8);
    const q = query.toLowerCase();
    return ALL_REAL_PROMPTS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (item: PromptItem) => {
    onClose();
    router.push(`/?prompt=${item.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="fixed inset-0" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#0E0E14] border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/[0.08] gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search across all 640+ Prompts & 125+ Categories (e.g. Hero, SaaS, Glass, 3D, Bento)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs font-mono">
              No matching prompts found in the 640+ library.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="group p-3 rounded-2xl hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-7 rounded-lg overflow-hidden bg-black shrink-0 relative border border-white/[0.08]">
                    {item.posterUrl ? (
                      <img src={item.posterUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-zinc-900" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-1 font-mono">
                      {item.chars.toLocaleString()} chars · {item.summary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-zinc-400 uppercase">
                    {item.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#08080C] border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <span>Axes Lab · 642 Real Production Prompts Index</span>
          <span>ESC to close · Press ↵ to inspect</span>
        </div>
      </div>
    </div>
  );
}
