'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS, MAIN_CATEGORIES, SUBCATEGORIES, RealPromptItem } from '@/lib/real-prompts';
import { PromptCustomizerModal } from '@/components/PromptCustomizerModal';
import {
  Search,
  Terminal,
  Cpu,
  Layers,
  ChevronDown,
  Command,
  LayoutGrid,
  List,
  Sparkles,
  Play,
  Copy,
  Check,
  Eye,
  SlidersHorizontal,
  X
} from 'lucide-react';

export default function CatalogPage() {
  const [activeMainCategory, setActiveMainCategory] = useState<string>('All');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'list'>('preview');
  const [activeModalItem, setActiveModalItem] = useState<RealPromptItem | null>(null);
  const [displayCount, setDisplayCount] = useState(36);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter items dynamically
  const filteredItems = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      // Main category match
      const matchesMain =
        activeMainCategory === 'All' ||
        item.category.toLowerCase() === activeMainCategory.toLowerCase() ||
        item.categorySlug === activeMainCategory.toLowerCase().replace(/\s+/g, '-');

      // Subcategory match
      const matchesSub =
        activeSubcategory === 'All' ||
        item.subcategory.toLowerCase() === activeSubcategory.toLowerCase() ||
        item.tags.some(t => t.toLowerCase() === activeSubcategory.toLowerCase());

      // Search match
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.subcategory.toLowerCase().includes(q) ||
        item.contentBody.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));

      return matchesMain && matchesSub && matchesSearch;
    });
  }, [activeMainCategory, activeSubcategory, searchQuery]);

  const displayedItems = filteredItems.slice(0, displayCount);

  const handleCopyPrompt = (e: React.MouseEvent, item: RealPromptItem) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.contentBody);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      
      {/* 1. Airbnb-Style Clean Category & Filter Bar */}
      <header className="sticky top-0 z-30 border-b border-rule bg-paper/95 backdrop-blur-md">
        <div className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-3">
          
          {/* Top Row: Search & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3">
            
            {/* Brand Title / Status */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="w-2 h-2 rounded-full bg-cool" />
              <span className="font-display font-medium text-base text-ink">
                ZainAxes Library
              </span>
              <span className="text-xs text-muted font-mono px-2 py-0.5 rounded-pill bg-paper-3 border border-rule">
                {ALL_REAL_PROMPTS.length} motion prompts
              </span>
            </div>

            {/* Middle Search Input */}
            <div className="relative w-full sm:max-w-md">
              <div className="flex items-center border border-rule focus-within:border-accent rounded-pill bg-paper-3 transition-colors duration-150 overflow-hidden px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-muted mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search prompts, animations, UI states…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-ink placeholder:text-muted outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs text-muted hover:text-ink ml-1 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* View Switcher: Preview First (Grid) vs Technical Dense List */}
            <div className="flex items-center gap-1.5 bg-paper-3 border border-rule rounded-pill p-1 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium transition-colors duration-150 ${
                  viewMode === 'preview'
                    ? 'bg-ink text-paper shadow-none'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Previews</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium transition-colors duration-150 ${
                  viewMode === 'list'
                    ? 'bg-ink text-paper shadow-none'
                    : 'text-muted hover:text-ink'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                <span>Registry</span>
              </button>
            </div>

          </div>

          {/* Airbnb Category Tier 1: Main Categories */}
          <div className="flex items-center gap-2 border-t border-rule pt-2.5 pb-1 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => {
                setActiveMainCategory('All');
                setActiveSubcategory('All');
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
                  setActiveSubcategory('All');
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
          </div>

          {/* Airbnb Subcategory Carousel Row */}
          <div className="flex items-center gap-1.5 pt-2 pb-1 overflow-x-auto no-scrollbar">
            <span className="text-[11px] text-muted uppercase tracking-wider font-mono mr-1 flex-shrink-0">
              Filter by:
            </span>
            {SUBCATEGORIES.map((sub) => {
              const isSelected = activeSubcategory.toLowerCase() === sub.toLowerCase();
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setActiveSubcategory(sub)}
                  className={`text-[11px] px-2.5 py-1 rounded-pill transition-colors duration-150 whitespace-nowrap ${
                    isSelected
                      ? 'bg-paper-2 text-ink border border-rule-2 font-medium'
                      : 'text-muted hover:text-ink hover:bg-paper-3 border border-transparent'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>

        </div>
      </header>

      {/* 2. Main Content Canvas */}
      <main className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-8">
        
        {/* Active Stats Header */}
        <div className="flex items-center justify-between text-xs text-muted mb-6 pb-2 border-b border-rule">
          <div>
            Showing <strong className="text-ink font-medium">{displayedItems.length}</strong> of {filteredItems.length} prompts
            {activeMainCategory !== 'All' ? ` in ${activeMainCategory}` : ''}
            {activeSubcategory !== 'All' ? ` · ${activeSubcategory}` : ''}
          </div>
          <div className="text-xs text-muted font-mono">
            Brand: ZainAxes (default)
          </div>
        </div>

        {/* VIEW 1: PREVIEW FIRST CLEAN GRID */}
        {viewMode === 'preview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayedItems.map((item, index) => (
              <PreviewCard
                key={item.id}
                item={item}
                index={index}
                copied={copiedId === item.id}
                onCopy={(e) => handleCopyPrompt(e, item)}
                onClick={() => setActiveModalItem(item)}
              />
            ))}
          </div>
        )}

        {/* VIEW 2: DENSE REGISTRY LIST VIEW */}
        {viewMode === 'list' && (
          <div className="border border-rule rounded-card bg-paper overflow-hidden">
            {displayedItems.map((item, index) => (
              <PromptRegistryRow
                key={item.id}
                item={{
                  ...item,
                  chars: item.contentBody.length,
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
              Load more prompts ({filteredItems.length - displayedItems.length} remaining)
            </button>
          </div>
        )}

      </main>

      {/* Interactive Prompt Customizer & Generator Modal */}
      {activeModalItem && (
        <PromptCustomizerModal
          item={{
            id: activeModalItem.id,
            slug: activeModalItem.slug,
            title: activeModalItem.title,
            category: activeModalItem.category,
            subcategory: activeModalItem.subcategory,
            contentBody: activeModalItem.contentBody,
            summary: activeModalItem.summary,
            video: activeModalItem.video,
            preview: activeModalItem.preview,
            poster: activeModalItem.poster,
            tags: activeModalItem.tags,
            width: activeModalItem.width,
            height: activeModalItem.height
          }}
          isOpen={true}
          onClose={() => setActiveModalItem(null)}
        />
      )}

    </div>
  );
}

// Clean Minimal Preview Card Component (Zero Fluff, Strict 4px/6px borders, Pure Preview First)
function PreviewCard({
  item,
  index,
  copied,
  onCopy,
  onClick
}: {
  item: RealPromptItem;
  index: number;
  copied: boolean;
  onCopy: (e: React.MouseEvent) => void;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered && item.preview) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHovered, item.preview]);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-card bg-paper-2 border border-rule hover:border-rule-2 transition-all duration-150 cursor-pointer overflow-hidden"
    >
      {/* 1. Preview Media Viewport (Aspect ratio locked, plays cleanly on hover) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-paper-3">
        {item.poster && (
          <img
            src={item.poster}
            alt={item.title}
            loading={index < 8 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        )}

        {item.preview && (
          <video
            ref={videoRef}
            src={item.preview}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Minimal Category Tag */}
        <div className="absolute top-2 left-2">
          <span className="font-sans text-[11px] font-medium px-2 py-0.5 rounded-pill bg-paper/90 border border-rule text-ink backdrop-blur-sm">
            {item.subcategory || item.category}
          </span>
        </div>

        {/* Action Buttons on Hover */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium border border-rule bg-paper/90 hover:bg-paper text-ink backdrop-blur-sm transition-colors"
            title="Customize parameters"
          >
            <SlidersHorizontal className="w-3 h-3 text-cool" />
            <span>Customize</span>
          </button>
          
          <button
            type="button"
            onClick={onCopy}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-pill text-xs font-medium border transition-colors duration-150 ${
              copied
                ? 'bg-ok-soft border-ok text-ok'
                : 'bg-paper/90 hover:bg-paper border-rule text-ink backdrop-blur-sm'
            }`}
            title="Copy prompt text"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-ok" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-muted" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Metadata Content Footer (Clean & Dense) */}
      <div className="p-3 flex flex-col justify-between flex-1 gap-2">
        <div>
          <h3 className="font-sans font-medium text-xs text-ink line-clamp-1 group-hover:text-cool transition-colors duration-150">
            {item.title}
          </h3>
          <p className="font-sans text-[11px] text-muted line-clamp-2 mt-1 leading-relaxed">
            {item.contentBody.slice(0, 120)}…
          </p>
        </div>

        {/* Bottom Technical Indicators */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-1 border-t border-rule/50">
          <span>{item.tokens} tokens</span>
          <span className="text-cool font-sans">ZainAxes verified</span>
        </div>
      </div>
    </div>
  );
}
