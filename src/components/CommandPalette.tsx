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
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-paper-3/80"
        onClick={onClose}
      />

      {/* Console Modal Container */}
      <div className="relative z-10 w-full max-w-2xl bg-paper border border-rule-2 rounded-card overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-rule bg-paper-2">
          <Search className="w-4 h-4 text-muted mr-3 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
            }}
            placeholder="Search prompts, categories, or keywords…"
            className="w-full bg-transparent text-ink placeholder:text-muted text-sm outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-muted hover:text-ink px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-pill text-muted hover:text-ink hover:bg-paper-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-rule p-1">
          {results.length === 0 ? (
            <div className="py-10 text-center text-muted text-xs">
              No matching prompts found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-3.5 py-2.5 hover:bg-paper-2 rounded-pill transition-colors duration-150 flex items-center justify-between gap-3 group focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-sans font-medium text-ink group-hover:text-cool text-xs truncate">
                      {item.title}
                    </span>
                    <span className="text-xs text-muted font-sans px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted line-clamp-1">
                    {item.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs text-muted">
                    <span className="font-mono">{item.chars}</span> chars
                  </span>
                  <span className="text-xs font-sans text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                    Open
                  </span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Info */}
        <div className="px-4 py-2.5 bg-paper-3 border-t border-rule flex items-center justify-between text-xs text-muted">
          <span>{ALL_REAL_PROMPTS.length} verified system prompts</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-paper-2 border border-rule font-sans text-xs">ESC</kbd>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
