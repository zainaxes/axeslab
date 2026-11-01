'use client';

import React from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { ITEMS_DATABASE } from '@/lib/items-data';
import { PreFooter } from '@/components/PreFooter';
import { Flame, Trophy } from 'lucide-react';

export default function TopPage() {
  const sortedItems = [...ITEMS_DATABASE].sort((a, b) => b.likes - a.likes);

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-300 text-xs font-mono mb-6">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Community Leaderboard</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Highest Converting &amp; <GlowWord text="Top Prompts" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5">
          Ranked by community favorites, prompt copies, and implementation conversions.
        </p>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedItems.map((item, idx) => (
          <div key={item.id} className="relative">
            <div className="absolute top-2 left-2 z-20 w-7 h-7 rounded-full bg-black/80 border border-white/[0.2] flex items-center justify-center font-mono text-xs font-bold text-amber-400 backdrop-blur-md shadow-lg">
              #{idx + 1}
            </div>
            <PromptCard item={item} />
          </div>
        ))}
      </section>

      <PreFooter />
    </div>
  );
}
