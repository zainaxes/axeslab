'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { ITEMS_DATABASE, ItemRecord } from '@/lib/items-data';
import { AnimatedCanvasPreview } from '@/components/AnimatedCanvasPreview';
import { PreFooter } from '@/components/PreFooter';
import { Copy, Check, Maximize2, Code, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

export default function BackgroundsPage() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeSort, setActiveSort] = useState<'Featured' | 'Popular' | 'Recent'>('Featured');
  const [activeTag, setActiveTag] = useState('All');

  const backgrounds = ITEMS_DATABASE.filter((i) => i.type === 'background');

  const tags = ['All', 'Dark', 'Light', 'Abstract', 'Nature', 'Space', 'Surreal', 'Tech'];

  const handleCopyUrl = async (bg: ItemRecord) => {
    const url = bg.backgroundUrl || `https://assets.zainaxes.com/backgrounds/${bg.slug}.mp4`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(bg.slug);
      toast.success("Copied direct background video URL!", {
        description: "Drop this direct CDN URL straight into your video tag.",
      });
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch {}
  };

  const handleCopyCode = async (bg: ItemRecord) => {
    const snippet = `<div className="fixed inset-0 -z-10 overflow-hidden bg-[#050507]">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-full object-cover opacity-60"
    src="${bg.backgroundUrl || `https://assets.zainaxes.com/backgrounds/${bg.slug}.mp4`}"
  />
  <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050507] opacity-80" />
</div>`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedCode(bg.slug);
      toast.success("Copied React/Tailwind Background snippet!");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-zinc-300 text-xs font-mono mb-6">
          <span>New Videos &amp; Shaders Added Daily</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Jaw-dropping <GlowWord text="Animated Backgrounds" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5">
          A huge collection of handcrafted Animated Video Loops &amp; WebGL Shaders ready to drop into any hero section.
        </p>
      </section>

      {/* 2. Dual-Row Filter Bar */}
      <section className="max-w-6xl mx-auto mb-10 space-y-3">
        {/* Row 1: Sort */}
        <div className="flex items-center gap-2">
          {(['Featured', 'Popular', 'Recent'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setActiveSort(s)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                activeSort === s
                  ? 'bg-white text-black font-semibold'
                  : 'text-zinc-400 hover:text-white bg-white/[0.04]'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Row 2: Style Tags */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-3.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeTag === t
                  ? 'bg-white/[0.12] text-white border border-white/[0.15]'
                  : 'text-zinc-400 hover:text-white bg-white/[0.03] border border-white/[0.05]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Backgrounds Card Grid */}
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backgrounds.map((bg) => (
          <div
            key={bg.id}
            className="group rounded-3xl bg-[#0B0B10] border border-white/[0.08] hover:border-white/[0.2] overflow-hidden transition-all duration-300 flex flex-col justify-between"
          >
            {/* Viewport */}
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <AnimatedCanvasPreview theme={bg.previewTheme} isHovered={true} />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/[0.1] text-[10px] font-mono text-zinc-300 backdrop-blur-md">
                Seamless Loop
              </div>
            </div>

            {/* Metadata & Actions */}
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-base font-bold text-white">{bg.title}</h3>
                <p className="text-xs text-zinc-400 line-clamp-1 mt-1">{bg.description}</p>
              </div>

              {/* Direct Card Actions (Bottom Overlay Bar) */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                <button
                  onClick={() => handleCopyUrl(bg)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-xs transition-all shadow-md active:scale-95"
                >
                  {copiedUrl === bg.slug ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUrl === bg.slug ? "Copied URL!" : "Copy URL"}</span>
                </button>

                <button
                  onClick={() => handleCopyCode(bg)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white font-medium text-xs transition-all active:scale-95"
                >
                  {copiedCode === bg.slug ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
                  <span>{copiedCode === bg.slug ? "Copied Code!" : "Copy Code"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      <PreFooter />
    </div>
  );
}
