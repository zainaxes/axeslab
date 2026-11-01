'use client';

import React, { useState, useMemo } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { PreFooter } from '@/components/PreFooter';
import { Smartphone, Search } from 'lucide-react';

const APP_CATEGORIES = [
  'All',
  'AI App',
  'Mobile App',
  'Dashboard',
  'AI Assistant',
  'SaaS',
  'Analytics',
  'Fintech',
];

export default function AppsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const appItems = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      const c = item.category.toLowerCase();
      const t = item.title.toLowerCase();
      const isApp =
        c.includes('app') ||
        c.includes('mobile') ||
        c.includes('dashboard') ||
        c.includes('assistant') ||
        c.includes('analytics') ||
        c.includes('saas') ||
        t.includes('app') ||
        t.includes('dashboard');

      if (!isApp) return false;

      const matchesCategory =
        selectedCategory === 'All' ||
        c.includes(selectedCategory.toLowerCase()) ||
        t.includes(selectedCategory.toLowerCase());

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        t.includes(q) ||
        c.includes(q) ||
        item.summary.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Smartphone className="w-3.5 h-3.5 text-violet-400" />
          <span>{appItems.length} Production Web &amp; Mobile App Prompts</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          AI Web &amp; Mobile App <GlowWord text="Prompts" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Production prompts engineered for mobile apps, dashboards, conversational AI interfaces, and complex SaaS applications.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-8">
          <input
            type="text"
            placeholder="Search app prompts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B0B10]/90 border border-white/[0.12] focus:border-violet-500/60 rounded-2xl px-5 py-3 pl-11 text-sm text-white placeholder:text-zinc-500 outline-none backdrop-blur-xl transition-all"
          />
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-3.5" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {APP_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-mono font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-[#050507] font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.06]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Apps Grid */}
      <section className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {appItems.map((item) => (
          <PromptCard key={item.id} item={item} />
        ))}
      </section>

      <PreFooter />
    </div>
  );
}
