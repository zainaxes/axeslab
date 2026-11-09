'use client';

import React, { useState, useMemo } from 'react';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { PreFooter } from '@/components/PreFooter';
import { Search } from 'lucide-react';

export default function TopPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const topItems = useMemo(() => {
    return [...ALL_REAL_PROMPTS]
      .sort((a, b) => (b.contentBody?.length || 0) - (a.contentBody?.length || 0))
      .slice(0, 50)
      .filter((item) => {
        const q = searchQuery.trim().toLowerCase();
        return (
          q === '' ||
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.subcategory.toLowerCase().includes(q)
        );
      });
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Curated selection</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Curated staff picks & essential directives
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            The 50 most comprehensive, production-tested motion architectures in the catalog, ranked by specification depth.
          </p>

          <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 overflow-hidden">
            <div className="pl-3.5 pr-2 text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search top prompts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-ink placeholder:text-muted outline-none"
            />
          </div>
        </div>
      </section>

      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <span>Showing <strong className="text-ink font-medium">{topItems.length}</strong> essential directives</span>
          <span>Ranked by specification depth & architecture</span>
        </div>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3">
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">Rank</span>
              <span className="w-1.5"></span>
              <span>Prompt and architecture</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {topItems.length === 0 ? (
            <div className="py-16 text-center text-muted text-xs">
              No matching prompts found.
            </div>
          ) : (
            topItems.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>
      </section>

      <PreFooter />
    </div>
  );
}
