'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { PromptCard } from '@/components/PromptCard';
import { ALL_REAL_PROMPTS, MAIN_CATEGORIES, SUBCATEGORIES, RealPromptItem } from '@/lib/real-prompts';
import { PromptCustomizerModal } from '@/components/PromptCustomizerModal';
import { PromptModal } from '@/components/PromptModal';
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { toast } from 'sonner';

export default function CatalogPage() {
  const [activeMainCategory, setActiveMainCategory] = useState<string>('All');
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'title'>('popular');
  const [viewMode, setViewMode] = useState<'preview' | 'list'>('preview');
  
  // Modals
  const [activeDetailItem, setActiveDetailItem] = useState<RealPromptItem | null>(null);
  const [activeCustomizerItem, setActiveCustomizerItem] = useState<RealPromptItem | null>(null);
  
  const [displayCount, setDisplayCount] = useState(36);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Subcategory counts calculated from actual records
  const subcategoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_REAL_PROMPTS.forEach((item) => {
      // check main category filter
      const matchesMain =
        activeMainCategory === 'All' ||
        item.category.toLowerCase() === activeMainCategory.toLowerCase();
      if (!matchesMain) return;

      const subs = item.subcategories || [item.subcategory];
      subs.forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      });
    });
    return counts;
  }, [activeMainCategory]);

  // Toggle multi-select subcategories
  const handleToggleSubcategory = (sub: string) => {
    if (sub === 'All') {
      setActiveSubcategories([]);
      return;
    }
    setActiveSubcategories((prev) => {
      if (prev.includes(sub)) {
        return prev.filter((s) => s !== sub);
      } else {
        return [...prev, sub];
      }
    });
  };

  const handleClearAllFilters = () => {
    setActiveMainCategory('All');
    setActiveSubcategories([]);
    setSearchQuery('');
    setSortBy('popular');
  };

  const hasActiveFilters =
    activeMainCategory !== 'All' ||
    activeSubcategories.length > 0 ||
    searchQuery.trim() !== '' ||
    sortBy !== 'popular';

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      // Main category match
      const matchesMain =
        activeMainCategory === 'All' ||
        item.category.toLowerCase() === activeMainCategory.toLowerCase() ||
        item.categorySlug === activeMainCategory.toLowerCase().replace(/\s+/g, '-');

      // Subcategory multi-select match (if any selected, must match at least one)
      const itemSubs = (item.subcategories || [item.subcategory]).map((s) => s.toLowerCase());
      const matchesSub =
        activeSubcategories.length === 0 ||
        activeSubcategories.some((sel) => itemSubs.includes(sel.toLowerCase()));

      // Search match
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.author.toLowerCase().includes(q) ||
        item.handle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        (item.originalPrompt && item.originalPrompt.toLowerCase().includes(q)) ||
        (item.improvedPrompt && item.improvedPrompt.toLowerCase().includes(q)) ||
        item.contentBody.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchesMain && matchesSub && matchesSearch;
    });
  }, [activeMainCategory, activeSubcategories, searchQuery]);

  // Sort items
  const sortedItems = useMemo(() => {
    const list = [...filteredItems];
    if (sortBy === 'popular') {
      return list.sort((a, b) => (b.views || 0) + (b.likes || 0) * 10 - ((a.views || 0) + (a.likes || 0) * 10));
    }
    if (sortBy === 'newest') {
      return list.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
    }
    if (sortBy === 'title') {
      return list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [filteredItems, sortBy]);

  const displayedItems = sortedItems.slice(0, displayCount);

  const handleCopyPrompt = (e: React.MouseEvent, item: RealPromptItem) => {
    e.stopPropagation();
    const textToCopy = item.originalPrompt || item.improvedPrompt || item.contentBody;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    toast.success(`Copied prompt: "${item.title}"`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      
      {/* 1. Airbnb-Style Clean Category & Filter Bar */}
      <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-md">
        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-3">
          
          {/* Top Row: Search, Category Links & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3">
            
            {/* Brand Title / Status & Direct Nav */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              <Link href="/prompts" className="font-display font-medium text-base text-ink hover:text-cool transition-colors">
                ZainAxes Library
              </Link>
              <span className="text-xs text-muted font-mono px-2 py-0.5 rounded-pill bg-paper-3 border border-rule">
                {ALL_REAL_PROMPTS.length} motion directives
              </span>
            </div>

            {/* Middle Search Input */}
            <div className="relative w-full sm:max-w-md">
              <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 transition-colors duration-150 overflow-hidden px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-muted mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search prompts, motion ads, UI states, creators…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-ink placeholder:text-muted outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-muted hover:text-ink ml-1 p-0.5"
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Quick Links, Sort & View Switcher */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              
              {/* Sort Selector */}
              <div className="flex items-center border border-rule rounded-pill bg-paper-3 px-2 py-1 text-xs">
                <ArrowUpDown className="w-3 h-3 text-muted mr-1.5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs text-ink outline-none cursor-pointer"
                >
                  <option value="popular" className="bg-paper-2 text-ink">Popular</option>
                  <option value="newest" className="bg-paper-2 text-ink">Newest</option>
                  <option value="title" className="bg-paper-2 text-ink">Title A–Z</option>
                </select>
              </div>

              {/* View Switcher: Previews (Grid) vs Registry List */}
              <div className="flex items-center gap-1 bg-paper-3 border border-rule rounded-pill p-1">
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-medium transition-colors duration-150 ${
                    viewMode === 'preview'
                      ? 'bg-ink text-paper shadow-none'
                      : 'text-muted hover:text-ink'
                  }`}
                  title="Card Previews"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-medium transition-colors duration-150 ${
                    viewMode === 'list'
                      ? 'bg-ink text-paper shadow-none'
                      : 'text-muted hover:text-ink'
                  }`}
                  title="Registry Table"
                >
                  <List className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Registry</span>
                </button>
              </div>

            </div>

          </div>

          {/* Airbnb Category Tier 1: Main Categories */}
          <div className="flex items-center gap-2 border-t border-rule pt-2.5 pb-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => {
                setActiveMainCategory('All');
                setActiveSubcategories([]);
              }}
              className={`text-xs px-3.5 py-1.5 rounded-pill border transition-colors duration-150 whitespace-nowrap font-medium ${
                activeMainCategory === 'All'
                  ? 'bg-ink text-paper border-ink'
                  : 'bg-paper-3 text-muted hover:text-ink border-rule hover:border-rule-2'
              }`}
            >
              All Directives ({ALL_REAL_PROMPTS.length})
            </button>
            {MAIN_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setActiveMainCategory(cat.name);
                  setActiveSubcategories([]);
                }}
                className={`text-xs px-3.5 py-1.5 rounded-pill border transition-colors duration-150 whitespace-nowrap font-medium ${
                  activeMainCategory === cat.name
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper-3 text-muted hover:text-ink border-rule hover:border-rule-2'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}

            <div className="h-4 w-px bg-rule mx-1 shrink-0" />

            <Link
              href="/customize"
              className="text-xs px-3 py-1.5 rounded-pill border border-rule bg-paper-3 text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 whitespace-nowrap flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-3 h-3 text-cool" />
              <span>Customize</span>
            </Link>

            <Link
              href="/templates"
              className="text-xs px-3 py-1.5 rounded-pill border border-rule bg-paper-3 text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150 whitespace-nowrap flex items-center gap-1.5"
            >
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Templates</span>
            </Link>
          </div>

          {/* Airbnb Subcategory Row: Multi-Select with Accurate Dynamic Counts */}
          <div className="flex items-center gap-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-muted uppercase tracking-wider font-mono mr-1 flex-shrink-0">
              Filter by:
            </span>
            
            <button
              type="button"
              onClick={() => handleToggleSubcategory('All')}
              className={`text-[11px] px-2.5 py-1 rounded-pill transition-colors duration-150 whitespace-nowrap ${
                activeSubcategories.length === 0
                  ? 'bg-paper-2 text-ink border border-rule-2 font-medium'
                  : 'text-muted hover:text-ink hover:bg-paper-3 border border-transparent'
              }`}
            >
              All Topics
            </button>

            {SUBCATEGORIES.filter((s) => s !== 'All').map((sub) => {
              const isSelected = activeSubcategories.includes(sub);
              const count = subcategoryCounts[sub] || 0;
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => handleToggleSubcategory(sub)}
                  className={`text-[11px] px-2.5 py-1 rounded-pill transition-colors duration-150 whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-ink text-paper border border-ink font-medium'
                      : 'text-muted hover:text-ink hover:bg-paper-3 border border-rule/60'
                  }`}
                >
                  <span>{sub}</span>
                  {count > 0 && (
                    <span className={`text-[10px] font-mono px-1 rounded ${
                      isSelected ? 'bg-paper/20 text-paper' : 'text-muted'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearAllFilters}
                className="text-[11px] px-2.5 py-1 rounded-pill border border-rule bg-paper-3 text-cool hover:text-ink hover:bg-paper-2 transition-colors whitespace-nowrap flex items-center gap-1 ml-2"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset filters</span>
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. Main Content Canvas */}
      <main className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-8">
        
        {/* Active Stats Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-muted mb-6 pb-2 border-b border-rule">
          <div className="flex items-center gap-2 flex-wrap">
            <span>
              Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {filteredItems.length} directives
            </span>
            {activeMainCategory !== 'All' && (
              <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-ink font-medium">
                {activeMainCategory}
              </span>
            )}
            {activeSubcategories.map((s) => (
              <span key={s} className="px-2 py-0.5 rounded-pill bg-cool-soft border border-cool text-cool text-[11px]">
                {s}
              </span>
            ))}
            {searchQuery && (
              <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                "{searchQuery}"
              </span>
            )}
          </div>
          <div className="text-xs text-muted font-mono flex items-center gap-2">
            <span>Default Brand: <strong className="text-ink font-sans">ZainAxes</strong></span>
          </div>
        </div>

        {/* Empty Search / Filter State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-24 space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-paper-3 border border-rule flex items-center justify-center mx-auto text-muted">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-display font-medium text-ink">
              No matching directives found
            </h3>
            <p className="text-xs text-muted leading-relaxed">
              We couldn't find any motion prompts matching your filters. Try clearing your search query or reset your category selections.
            </p>
            <button
              type="button"
              onClick={handleClearAllFilters}
              className="text-xs px-4 py-2 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 transition-opacity"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* VIEW 1: PREVIEW FIRST CLEAN GRID */}
        {viewMode === 'preview' && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedItems.map((item, index) => (
              <PromptCard
                key={item.id}
                item={item}
                index={index}
                copied={copiedId === item.id}
                onCopy={(e) => handleCopyPrompt(e, item)}
                onClick={() => setActiveDetailItem(item)}
                onCustomize={(e) => {
                  e.stopPropagation();
                  setActiveCustomizerItem(item);
                }}
              />
            ))}
          </div>
        )}

        {/* VIEW 2: DENSE REGISTRY LIST VIEW */}
        {viewMode === 'list' && filteredItems.length > 0 && (
          <div className="border border-rule rounded-card bg-paper overflow-hidden">
            {displayedItems.map((item, index) => (
              <PromptRegistryRow
                key={item.id}
                item={{
                  ...item,
                  chars: (item.originalPrompt || item.improvedPrompt || item.contentBody).length,
                  videoUrl: item.preview || item.video || item.poster,
                  posterUrl: item.poster
                }}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Load More Trigger */}
        {displayedItems.length < filteredItems.length && (
          <div className="text-center pt-10">
            <button
              type="button"
              onClick={() => setDisplayCount((prev) => prev + 36)}
              className="px-6 py-2.5 rounded-pill bg-paper-3 border border-rule text-ink hover:border-rule-2 hover:bg-paper-2 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              Load more directives ({filteredItems.length - displayedItems.length} remaining)
            </button>
          </div>
        )}

      </main>

      {/* Detail Inspection Modal */}
      {activeDetailItem && (
        <PromptModal
          item={activeDetailItem}
          isOpen={true}
          onClose={() => setActiveDetailItem(null)}
          onOpenCustomizer={(item) => {
            setActiveDetailItem(null);
            setActiveCustomizerItem(item);
          }}
        />
      )}

      {/* Interactive Customizer Modal */}
      {activeCustomizerItem && (
        <PromptCustomizerModal
          item={activeCustomizerItem}
          isOpen={true}
          onClose={() => setActiveCustomizerItem(null)}
        />
      )}

    </div>
  );
}
