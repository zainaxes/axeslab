'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS, ALL_PROMPT_CATEGORIES } from '@/lib/real-prompts';
import {
  Search,
  Terminal,
  Cpu,
  ChevronDown,
  Command,
} from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(60);

  // Filter items dynamically by category & search query
  const filteredItems = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase() ||
        item.categorySlug === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.contentBody.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const displayedItems = filteredItems.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      
      {/* 1. Command Center Hero & Search Console */}
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-5">
          
          {/* Header Title Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cool" />
                <span>Axes Lab · Technical reference registry</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
                AI prompts and agent specifications
              </h1>
              <p className="text-sm text-muted mt-1 max-w-2xl leading-relaxed">
                640 verified system prompts, agent skills, WebGL modules, and MCP configurations.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <Link
                href="/mcp"
                className="px-3 py-1.5 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 transition-opacity duration-150 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Install MCP</span>
              </Link>
              <Link
                href="/skills"
                className="px-3 py-1.5 rounded-pill bg-paper-3 border border-rule text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Agent skills</span>
              </Link>
            </div>
          </div>

          {/* 2. Global Filter & Command-K Search Bar */}
          <div className="relative">
            <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 transition-colors duration-150 overflow-hidden">
              <div className="pl-3.5 pr-2 text-muted flex items-center">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Filter by keyword, model target, or syntax…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-2 py-2.5 text-xs sm:text-sm text-ink placeholder:text-muted outline-none font-sans"
              />
              <div className="hidden sm:flex items-center gap-2 pr-3 flex-shrink-0">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-sans text-muted hover:text-ink px-2 py-0.5 rounded-pill bg-paper-2 border border-rule focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    Clear
                  </button>
                ) : (
                  <span className="text-xs font-mono text-muted flex items-center gap-1 border border-rule rounded px-1.5 py-0.5 bg-paper-2">
                    <Command className="w-3 h-3" /> K
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 3. Category Bar (Dense 1px border-pinned strip) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 pb-1">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`text-xs px-3 py-1 rounded-pill border transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-accent ${
                selectedCategory === 'All'
                  ? 'bg-ink text-paper font-medium border-ink'
                  : 'bg-paper-3 text-muted hover:text-ink border-rule hover:border-rule-2'
              }`}
            >
              All ({ALL_REAL_PROMPTS.length})
            </button>
            {ALL_PROMPT_CATEGORIES.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
                selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`text-xs px-2.5 py-1 rounded-pill border transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-accent ${
                    isSelected
                      ? 'bg-ink text-paper font-medium border-ink'
                      : 'bg-paper-3 text-muted hover:text-ink border-rule hover:border-rule-2'
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Dense List-View Registry Table */}
      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        
        {/* Table Control Header */}
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <div className="flex items-center gap-3">
            <span className="font-medium text-ink">Prompt registry</span>
            <span className="text-muted">·</span>
            <span>
              Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {filteredItems.length} records
              {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-xs text-muted">
            <span>verbatim prompt specifications</span>
            <span>click row to inspect</span>
          </div>
        </div>

        {/* Dense Rows Container */}
        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3 shadow-none">
          {/* Table Header Bar */}
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted select-none">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">No.</span>
              <span className="w-1.5"></span>
              <span>Name and identifier</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {/* Render List Items */}
          {displayedItems.length === 0 ? (
            <div className="py-16 text-center text-muted text-xs">
              No matching prompts found for &ldquo;{searchQuery}&rdquo;. Try another query or clear filters.
            </div>
          ) : (
            displayedItems.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>

        {/* Load More Pagination */}
        {displayCount < filteredItems.length && (
          <div className="text-center pt-8 pb-4">
            <button
              onClick={() => setDisplayCount((prev) => prev + 60)}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Load more ({filteredItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </section>
    </div>
  );
}
