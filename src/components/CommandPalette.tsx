'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Terminal, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { ITEMS_DATABASE, ItemRecord } from '@/lib/items-data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent can toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = ITEMS_DATABASE.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase()) ||
    item.description.toLowerCase().includes(query.toLowerCase()) ||
    item.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (item: ItemRecord) => {
    onClose();
    router.push(`/?prompt=${item.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-[#0E0E14] border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-white/[0.08] gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search all 640+ Prompts, Skills, 3D Sites, Backgrounds..."
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
              No matching prompts or skills found.
            </div>
          ) : (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="group p-3 rounded-2xl hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-violet-400 group-hover:text-cyan-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-1">
                      {item.description}
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
          <span>Axes Lab Command Search</span>
          <span>ESC to close · Press ↵ to inspect</span>
        </div>
      </div>
    </div>
  );
}
