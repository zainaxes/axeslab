'use client';

import React, { useState, useMemo } from 'react';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { PreFooter } from '@/components/PreFooter';
import { Search, ChevronDown } from 'lucide-react';

export default function SectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(50);

  const sectionItems = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      const c = item.category.toLowerCase();
      const t = item.title.toLowerCase();
      const isSec = c.includes('section') || c.includes('hero') || c.includes('feature') || c.includes('pricing') || c.includes('footer') || t.includes('hero') || t.includes('pricing') || t.includes('section');
      if (!isSec) return false;
      const q = searchQuery.trim().toLowerCase();
      return q === '' || t.includes(q) || item.summary.toLowerCase().includes(q);
    });
  }, [searchQuery]);

  const displayedItems = sectionItems.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>UI blocks and modular sections</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Hero sections, pricing grids, and features
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Atomic components and responsive layout blocks with Tailwind styling.
          </p>

          <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 overflow-hidden">
            <div className="pl-3.5 pr-2 text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search UI sections…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-ink placeholder:text-muted outline-none"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <span>Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {sectionItems.length} section prompts</span>
          <span>Click row to inspect</span>
        </div>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3">
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">No.</span>
              <span className="w-1.5"></span>
              <span>Section and layout</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {displayedItems.length === 0 ? (
            <div className="py-16 text-center text-muted text-xs">
              No matching section prompts found.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>

        {displayCount < sectionItems.length && (
          <div className="text-center pt-8 pb-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 50)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Load more ({sectionItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
