"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, ShieldCheck, Layers, Terminal, Video, Code2 } from "lucide-react";

interface HeroSectionProps {
  totalPublished: number;
}

export function HeroSection({ totalPublished }: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#050508] text-white">
      {/* 1. Fullscreen Responsive Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-60 scale-100" : "opacity-35 scale-105"
          }`}
        >
          {/* Background Video */}
          <source src="/videos/abstract-blue-lines-dots.mp4" type="video/mp4" />
        </video>

        {/* 2. Cybernetic Vignette & Atmospheric Fog Layers */}
        <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-[#050508]/70 to-[#050508] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-transparent to-[#050508] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      {/* 3. Centerpiece Content (Axes Lab Layout & Typography) */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center space-y-8 flex flex-col items-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-500/30 bg-sky-950/40 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-sky-300 shadow-[0_0_24px_rgba(14,165,233,0.25)] backdrop-blur-xl">
          <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-ping" />
          <span>PRODUCTION-READY AI LIBRARY</span>
          <span className="text-sky-500/40">•</span>
          <span className="text-white/90">AXES LAB</span>
        </div>

        {/* Headline Styled Like Meez */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
            Make Lovable, Bolt, Cursor & Claude build <br />
            <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-white bg-clip-text text-transparent">
              entire sites worth shipping.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg md:text-xl font-normal text-zinc-300/90 leading-relaxed drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Discover {totalPublished.toLocaleString()}+ verified AI prompts, agent skills, MCP servers, workflows, and open-source models with live video previews and copy-ready specifications.
          </p>
        </div>

        {/* Prominent Meez-Style Search Bar */}
        <div className="w-full max-w-2xl pt-2">
          <Link
            href="/explore"
            className="group relative flex h-16 w-full items-center justify-between rounded-2xl border border-white/20 bg-black/75 px-6 shadow-[0_12px_48px_rgba(0,0,0,0.85)] backdrop-blur-2xl transition-all duration-300 hover:border-sky-400/50 hover:bg-black/90 hover:shadow-[0_16px_60px_rgba(14,165,233,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <div className="flex items-center gap-4 text-sm sm:text-base font-medium text-zinc-300 group-hover:text-white">
              <Search className="h-5 w-5 text-sky-400 transition-transform group-hover:scale-110" />
              <span>Search {totalPublished.toLocaleString()} prompts, skills, MCP servers...</span>
            </div>

            <div className="flex items-center gap-2.5">
              <kbd className="hidden sm:inline-flex items-center rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-xs font-bold text-zinc-200 shadow-xs">
                ⌘K
              </kbd>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black transition-transform duration-200 group-hover:scale-105 group-hover:bg-sky-300">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Live Metrics Pill Trio (Like Meez: Websites, Sections, Backgrounds) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link
            href="/web-design"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <Code2 className="h-4 w-4 text-sky-400" />
            <span className="font-bold text-white">86</span>
            <span>Full Websites</span>
          </Link>

          <Link
            href="/web-design"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <Layers className="h-4 w-4 text-cool" />
            <span className="font-bold text-white">113</span>
            <span>UI Sections</span>
          </Link>

          <Link
            href="/web-design"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-xs font-medium text-zinc-300 backdrop-blur-md transition-all hover:border-white/25 hover:bg-white/10 hover:text-white"
          >
            <Video className="h-4 w-4 text-rose-400" />
            <span className="font-bold text-white">20+</span>
            <span>Motion Backgrounds</span>
          </Link>

          <a
            href="https://axeslab.zainaxes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-950/40 px-4 py-2.5 font-mono text-xs font-semibold text-sky-300 backdrop-blur-md transition-all hover:bg-sky-900/50"
          >
            <span>axeslab.zainaxes.com</span>
            <span className="h-2 w-2 rounded-full bg-cool animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}
