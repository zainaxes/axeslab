'use client';

import React, { useMemo } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { PreFooter } from '@/components/PreFooter';
import { Layers } from 'lucide-react';

export default function SectionsPage() {
  const sections = useMemo(() => {
    return ALL_REAL_PROMPTS.filter((item) => {
      const c = item.category.toLowerCase();
      return (
        c.includes('component') ||
        c.includes('section') ||
        c.includes('footer') ||
        c.includes('pricing') ||
        c.includes('cta') ||
        c.includes('features') ||
        c.includes('form') ||
        c.includes('card') ||
        c.includes('bento') ||
        c.includes('testimonial') ||
        c.includes('tab') ||
        c.includes('slider') ||
        c.includes('navigation') ||
        c.includes('about')
      );
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Layers className="w-3.5 h-3.5 text-violet-400" />
          <span>{sections.length} Verified UI Sections</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          The #1 Most Powerful Sections Prompt <GlowWord text="Library" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Production-grade UI blocks, bento grids, sticky cards, footers, and pricing tables ready to drop into modern websites.
        </p>
      </section>

      {/* 2. Real Sections Grid */}
      <section className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((item) => (
          <PromptCard key={item.id} item={item} />
        ))}
      </section>

      <PreFooter />
    </div>
  );
}
