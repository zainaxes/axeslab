'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { PreFooter } from '@/components/PreFooter';
import { ALL_REAL_PROMPTS, ALL_PROMPT_CATEGORIES } from '@/lib/real-prompts';
import {
  Search,
  SlidersHorizontal,
  Terminal,
  Cpu,
  Flame,
  ArrowRight,
  ChevronDown,
  Layers,
  Sparkles,
  Command,
  Check,
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
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] font-sans antialiased">
      
      {/* 1. Command Center Hero & Search Console */}
      <section className="border-b border-white/[0.08] bg-[#07070B] pt-12 pb-8 px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto space-y-6">
          
          {/* Header Title Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-[4px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[11px] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AXES LAB · PRODUCTION REGISTRY</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Command Center &amp; AI Prompt Catalog
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
                Dense technical index of 640+ production AI system directives, agent skills, WebGL modules, and MCP configurations. Razor-sharp 1-click execution.
              </p>
            </div>

            {/* Quick Action Badges */}
            <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
              <Link
                href="/mcp"
                className="px-3 py-1.5 rounded-[4px] bg-white text-black font-semibold hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Install MCP (60s)</span>
              </Link>
              <Link
                href="/skills"
                className="px-3 py-1.5 rounded-[4px] bg-white/[0.04] border border-white/[0.1] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors flex items-center gap-1.5"
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Agent Skills</span>
              </Link>
            </div>
          </div>

          {/* 2. Global Filter & Command-K Search Bar */}
          <div className="relative">
            <div className="flex items-center border border-white/[0.12] focus-within:border-violet-500/80 rounded-[4px] bg-[#020204] shadow-sm transition-colors overflow-hidden">
              <div className="pl-3.5 pr-2 text-zinc-500 flex items-center">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Filter by keyword, model target, or syntax (e.g. Hero, SaaS, Glassmorphism, 3D, Bento, Claude 3.7)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-2 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-600 outline-none font-mono"
              />
              <div className="hidden sm:flex items-center gap-2 pr-3 flex-shrink-0">
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[11px] font-mono text-zinc-400 hover:text-white px-2 py-0.5 rounded-[4px] bg-white/[0.05] border border-white/[0.08]"
                  >
                    ESC to Clear
                  </button>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-600 flex items-center gap-1 border border-white/[0.08] rounded-[4px] px-1.5 py-0.5">
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
              className={`font-mono text-[11px] px-3 py-1 rounded-[4px] border transition-colors whitespace-nowrap ${
                selectedCategory === 'All'
                  ? 'bg-white text-black font-bold border-white'
                  : 'bg-white/[0.02] text-zinc-400 hover:text-white border-white/[0.07] hover:border-white/[0.15]'
              }`}
            >
              ALL ({ALL_REAL_PROMPTS.length})
            </button>
            {ALL_PROMPT_CATEGORIES.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
                selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`font-mono text-[11px] px-2.5 py-1 rounded-[4px] border transition-colors whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-white/[0.02] text-zinc-400 hover:text-white border-white/[0.07] hover:border-white/[0.15]'
                  }`}
                >
                  {cat.name.toUpperCase()} ({cat.count})
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Dense List-View Registry Table */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6">
        
        {/* Table Control Header */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-3 border-b border-white/[0.1]">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">PROMPT_REGISTRY_INDEX</span>
            <span className="text-zinc-600">·</span>
            <span>
              Showing <strong className="text-zinc-200">{displayedItems.length}</strong> of {filteredItems.length} records
              {selectedCategory !== 'All' ? ` [${selectedCategory}]` : ''}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-zinc-500">
            <span>FORMAT: VERBATIM_PROMPT</span>
            <span>CLICK ROW TO INSPECT</span>
          </div>
        </div>

        {/* Dense Rows Container */}
        <div className="border border-white/[0.08] rounded-[4px] bg-[#07070B] overflow-hidden mt-3 shadow-sm">
          {/* Table Header Bar */}
          <div className="px-4 py-2 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider select-none">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">#</span>
              <span className="w-1.5"></span>
              <span>Name / Identifier</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Complexity</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {/* Render List Items */}
          {displayedItems.length === 0 ? (
            <div className="py-16 text-center text-zinc-500 font-mono text-xs">
              No matching prompts found for &quot;{searchQuery}&quot;. Try another query or clear filters.
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-xs font-mono font-semibold text-white transition-all active:scale-95"
            >
              <span>Load More ({filteredItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </section>

      {/* 5. Pre-Footer */}
      <PreFooter />
    </div>
  );
}
