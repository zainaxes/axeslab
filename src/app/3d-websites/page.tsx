'use client';

import React from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { ITEMS_DATABASE } from '@/lib/items-data';
import { PreFooter } from '@/components/PreFooter';
import { Box, Sparkles } from 'lucide-react';

export default function ThreeDWebsitesPage() {
  const threeDItems = ITEMS_DATABASE.filter((i) => i.type === '3d');

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 text-xs font-mono mb-6">
          <Box className="w-3.5 h-3.5 text-cyan-400" />
          <span>New 3D Prompts Added Daily</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Build real 3D <GlowWord text="Websites" /> with AI
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          100+ Future 3D Websites, Three.js Shaders, React Three Fiber Scenes &amp; Interactive WebGL Prompts.
        </p>
      </section>

      {/* 2. Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {threeDItems.map((item) => (
          <PromptCard key={item.id} item={item} />
        ))}
      </section>

      <PreFooter />
    </div>
  );
}
