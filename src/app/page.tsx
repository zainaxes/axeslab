'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { PreFooter } from '@/components/PreFooter';
import { ALL_REAL_PROMPTS, ALL_PROMPT_CATEGORIES } from '@/lib/real-prompts';
import { Sparkles, ArrowRight, Flame, Search, ChevronDown } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(36);

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
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA]">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-12 px-4 text-center overflow-hidden">
        {/* Radial Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[480px] hero-glow pointer-events-none -z-10" />

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>640+ Production Prompts · 125+ Categories Online</span>
        </div>

        {/* Main Headline with Signature Glow Word */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl mx-auto">
          Unlock your AI <br />
          Design <GlowWord text="Superpowers" />
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mt-5 mb-8">
          The comprehensive production catalog of 640+ web design prompts, full landing pages, interactive 3D WebGL scenes, and agent skills. Real visual previews, copy-ready specifications, zero auth.
        </p>

        {/* Search Bar in Hero */}
        <div className="max-w-xl mx-auto relative mb-8">
          <input
            type="text"
            placeholder="Search all 640+ prompts (e.g. Hero, SaaS, Glassmorphism, 3D, Bento)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0B10]/90 border border-white/[0.12] hover:border-white/[0.22] focus:border-violet-500/60 rounded-2xl px-5 py-3.5 pl-12 text-sm text-white placeholder:text-zinc-500 outline-none backdrop-blur-xl shadow-2xl transition-all"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-4.5 top-4.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-3.5 text-xs font-mono text-zinc-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Hero Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#library"
            className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full transition-all"
          >
            Explore All {ALL_REAL_PROMPTS.length} Prompts ↓
          </a>
          <Link
            href="/mcp"
            className="bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2"
          >
            <span>Install MCP in 60s</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 2. Sticky 125+ Category Filter Bar */}
      <section id="library" className="sticky top-16 z-30 bg-[#050507]/90 backdrop-blur-xl py-3 border-b border-white/[0.05]">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto max-w-[1440px] mx-auto px-4 sm:px-8">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
              selectedCategory === 'All'
                ? 'bg-white text-[#050507] border border-white font-semibold shadow-sm'
                : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.05]'
            }`}
          >
            All Prompts ({ALL_REAL_PROMPTS.length})
          </button>
          {ALL_PROMPT_CATEGORIES.map((cat) => {
            const isSelected =
              selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
              selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.name)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? 'bg-white text-[#050507] border border-white font-semibold shadow-sm'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.05]'
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Stats Counter */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-6 flex items-center justify-between text-xs font-mono text-zinc-400">
        <span>
          Showing <span className="font-bold text-white">{displayedItems.length}</span> of {filteredItems.length} prompts
          {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
        </span>
        <span>Real-Time Video &amp; Poster Previews Active</span>
      </div>

      {/* 3. Real 640+ Prompts Card Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, idx) => (
            <React.Fragment key={item.id}>
              <PromptCard item={item} />

              {/* Interstitial banner after 9 cards */}
              {idx === 8 && (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 my-4">
                  <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-r from-[#0E0E18] via-[#131124] to-[#0B1520] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="max-w-xl space-y-3 text-left">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono uppercase tracking-wider">
                        <Flame className="w-3.5 h-3.5 text-violet-400" />
                        Backgrounds &amp; Motion Shaders
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                        Animated backgrounds designed to convert, impress, and amaze.
                      </h3>
                      <p className="text-sm text-zinc-400">
                        Drop seamless looping MP4 video backgrounds and WebGL canvas shaders straight into your hero sections.
                      </p>
                      <div className="pt-2">
                        <Link
                          href="/backgrounds"
                          className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg"
                        >
                          <span>Explore Backgrounds →</span>
                        </Link>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-44 h-28 rounded-2xl overflow-hidden border border-white/[0.15] bg-black shadow-2xl">
                        <video
                          src="/media/videos/orbis-nft-landing.mp4"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < filteredItems.length && (
          <div className="text-center pt-12 pb-6">
            <button
              onClick={() => setDisplayCount((prev) => prev + 36)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.12] text-sm font-semibold text-white transition-all shadow-lg hover:scale-105"
            >
              <span>Load More Prompts ({filteredItems.length - displayCount} remaining)</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 4. Pre-Footer Academy Banner */}
      <PreFooter />
    </div>
  );
}
