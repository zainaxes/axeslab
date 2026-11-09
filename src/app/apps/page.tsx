'use client';

import React, { useState, useMemo } from 'react';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { PreFooter } from '@/components/PreFooter';
import { Search, ChevronDown, Smartphone } from 'lucide-react';

const APP_CATEGORIES = [
  'All',
  'Product UI',
  'Mobile (Phone)',
  'Dashboards & Charts',
  'Developer & Code',
  'Agent Skills',
];

export default function AppsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(50);

  const appItems = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      // Strictly exclude promotional Motion Ads to prevent taxonomy conflation
      if (item.category === 'Motion Ads') return false;

      const sub = (item.subcategory || '').toLowerCase();
      const tags = (item.subcategories || []).map((t) => t.toLowerCase());
      const title = item.title.toLowerCase();
      const summary = (item.summary || '').toLowerCase();

      // Only include Product UI, application interfaces, mobile phone layouts, code directives, and agent skills
      const isAppInterface =
        sub === 'product ui' ||
        tags.includes('product ui') ||
        tags.includes('phone') ||
        tags.includes('code') ||
        item.category === 'Skills' ||
        item.isSkill === true;

      if (!isAppInterface) return false;

      // Category tab filtering
      let matchesCategory = true;
      if (selectedCategory === 'Product UI') {
        matchesCategory = sub === 'product ui' || tags.includes('product ui');
      } else if (selectedCategory === 'Mobile (Phone)') {
        matchesCategory =
          tags.includes('phone') ||
          title.includes('mobile') ||
          title.includes('phone') ||
          title.includes('ios');
      } else if (selectedCategory === 'Dashboards & Charts') {
        matchesCategory =
          tags.includes('charts') ||
          title.includes('dashboard') ||
          title.includes('chart') ||
          title.includes('analytics');
      } else if (selectedCategory === 'Developer & Code') {
        matchesCategory =
          tags.includes('code') ||
          title.includes('code') ||
          title.includes('html') ||
          title.includes('developer');
      } else if (selectedCategory === 'Agent Skills') {
        matchesCategory = item.category === 'Skills' || item.isSkill === true;
      }

      if (!matchesCategory) return false;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        title.includes(q) ||
        summary.includes(q) ||
        sub.includes(q) ||
        tags.some((t) => t.includes(q));

      return matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = appItems.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      {/* Header */}
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Full applications</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Web applications and mobile interfaces
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Production specifications for dashboards, SaaS platforms, and mobile layouts.
          </p>

          {/* Filter Bar */}
          <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 overflow-hidden">
            <div className="pl-3.5 pr-2 text-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Search application prompts…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-ink placeholder:text-muted outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {APP_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-pill border transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-accent ${
                  selectedCategory === cat
                    ? 'bg-ink text-paper font-medium border-ink'
                    : 'bg-paper-3 text-muted hover:text-ink border-rule'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <span>Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {appItems.length} application prompts</span>
          <span>Click row to inspect</span>
        </div>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3">
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">No.</span>
              <span className="w-1.5"></span>
              <span>Application and interface</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {displayedItems.length === 0 ? (
            <div className="py-16 text-center text-muted text-xs">
              No matching applications found.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>

        {displayCount < appItems.length && (
          <div className="text-center pt-8 pb-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 50)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Load more ({appItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
