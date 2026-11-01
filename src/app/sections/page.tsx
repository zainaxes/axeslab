'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { ITEMS_DATABASE } from '@/lib/items-data';
import { PreFooter } from '@/components/PreFooter';

export default function SectionsPage() {
  const [activeSection, setActiveSection] = useState('All');

  const filterTabs = [
    'All',
    'Features',
    'Footer',
    'Pricing',
    'CTA',
    'Testimonials',
    'FAQ',
    'Bento Grid',
    'Dashboard',
    'Login / Signup',
    'Marquee',
    'Cards',
    'Slider',
    'About',
    '404',
  ];

  const sections = ITEMS_DATABASE.filter((i) => i.type === 'section');

  const filtered = sections.filter((s) => {
    if (activeSection === 'All') return true;
    return s.category.toLowerCase() === activeSection.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          The #1 Most Powerful Sections Prompt <GlowWord text="Library" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Blocks &amp; components to help you build &amp; launch premium AI websites faster.
        </p>
      </section>

      {/* 2. Section Type Filter Bar */}
      <section className="max-w-6xl mx-auto mb-10 overflow-x-auto no-scrollbar pb-2 flex items-center gap-2">
        {filterTabs.map((tab) => {
          const isSelected = activeSection === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSection(tab)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.05]'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </section>

      {/* 3. Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <PromptCard key={item.id} item={item} />
        ))}
      </section>

      <PreFooter />
    </div>
  );
}
