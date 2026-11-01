'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowWord } from '@/components/GlowWord';
import { PromptCard } from '@/components/PromptCard';
import { PreFooter } from '@/components/PreFooter';
import { ITEMS_DATABASE } from '@/lib/items-data';
import { Sparkles, ArrowRight, Video, Flame } from 'lucide-react';
import { AnimatedCanvasPreview } from '@/components/AnimatedCanvasPreview';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Recent',
    'Apps',
    'Sections',
    'Skills',
    'Hero',
    'Landing Page',
    'SaaS',
    '3D',
    'Creative',
    'Agency',
    'Portfolio',
    'AI',
    'Travel',
    'Fintech',
    'Technology',
    'Wellness',
    '3D Website',
    'Ecommerce',
    'Interactive',
  ];

  const filteredItems = ITEMS_DATABASE.filter((item) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Recent') return true;
    if (selectedCategory === 'Sections') return item.type === 'section';
    if (selectedCategory === 'Skills') return item.type === 'skill';
    if (selectedCategory === '3D' || selectedCategory === '3D Website') return item.type === '3d';
    return item.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const firstBatch = filteredItems.slice(0, 9);
  const secondBatch = filteredItems.slice(9);

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA]">
      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-12 px-4 text-center overflow-hidden">
        {/* Radial Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] hero-glow pointer-events-none -z-10" />

        {/* Live Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-300 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Fresh Drops Everyday</span>
        </div>

        {/* Main Headline with Signature Glow Word */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] max-w-4xl mx-auto">
          Unlock your AI <br />
          Design <GlowWord text="Superpowers" />
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 font-normal leading-relaxed mt-5 mb-8">
          Build beautiful landing pages, animated interfaces, and agentic workflows in minutes with our ready-to-use prompts, skills, and MCP. Just copy, paste, and launch.
        </p>

        {/* Hero Action Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#grid"
            className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-medium text-xs sm:text-sm px-5 py-3 rounded-full transition-all"
          >
            Explore Full Library ↓
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

      {/* 2. Sticky Category Filter Bar */}
      <section id="grid" className="sticky top-16 z-30 bg-[#050507]/85 backdrop-blur-lg py-3 border-b border-white/[0.05]">
        <div className="no-scrollbar flex items-center gap-2 overflow-x-auto max-w-[1440px] mx-auto px-4 sm:px-8">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-white text-[#050507] border border-white font-semibold shadow-sm"
                    : "bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.07] border border-white/[0.05]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Site Preview Card Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstBatch.map((item) => (
            <PromptCard key={item.id} item={item} />
          ))}

          {/* 3.4 Mid-Grid Interstitial Banner */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 my-4">
            <div className="relative rounded-3xl overflow-hidden border border-white/[0.1] bg-gradient-to-r from-[#0E0E18] via-[#131124] to-[#0B1520] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
              {/* Left Content */}
              <div className="max-w-xl space-y-3 text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-violet-400" />
                  Backgrounds & Motion Shaders
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                  Animated backgrounds designed to convert, impress, and amaze.
                </h3>
                <p className="text-sm text-zinc-400">
                  Drop ultra-fast WebGL canvas shaders and looping video backgrounds straight into your hero sections with one click.
                </p>
                <div className="pt-2">
                  <Link
                    href="/backgrounds"
                    className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <span>Explore Videos →</span>
                  </Link>
                </div>
              </div>

              {/* Right Visual Floating Preview Cards */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                {['neon-pulse', 'synaptic-forge', 'shelf-hero'].map((th, idx) => (
                  <div
                    key={idx}
                    className={`w-28 sm:w-36 h-20 sm:h-24 rounded-2xl overflow-hidden border border-white/[0.15] bg-black shadow-2xl transition-transform hover:scale-110 ${
                      idx === 1 ? "-translate-y-2 border-violet-500/50" : ""
                    }`}
                  >
                    <AnimatedCanvasPreview theme={th} isHovered={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Remaining Items */}
          {secondBatch.map((item) => (
            <PromptCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 4. Pre-Footer Academy & Showcase */}
      <PreFooter />
    </div>
  );
}
