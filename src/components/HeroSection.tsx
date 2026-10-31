"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, ShieldCheck, Layers } from "lucide-react";

interface HeroSectionProps {
  totalPublished: number;
}

export function HeroSection({ totalPublished }: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#070709] text-white shadow-2xl">
      {/* 1. Background Video Holder */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-45 scale-100" : "opacity-0 scale-105"
          }`}
        >
          {/* Default local or linked video source */}
          <source src="/videos/abstract-neon-tunnel.mp4" type="video/mp4" />
          {/* High-performance fallback CDN motion tunnel stream */}
          <source src="https://meez.design/web/media/bg-videos/ms-3d.mp4" type="video/mp4" />
        </video>

        {/* 2. Deep Multi-Layer Vignette & Contrast Gradients for Maximum Legibility */}
        {/* Ambient radial blur so center text pops */}
        <div className="absolute inset-0 bg-radial-[at_center_center] from-black/80 via-black/85 to-[#070709] pointer-events-none" />
        
        {/* Linear vertical darkening gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/90 via-black/75 to-[#070709] pointer-events-none" />
        
        {/* Subtle geometric grid texture */}
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      {/* 3. High-Contrast Hero Foreground Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 text-center space-y-8">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
          <span>INDEPENDENT AI RESOURCE DIRECTORY</span>
          <span className="text-white/40">•</span>
          <span className="text-white/80">AXES LAB</span>
        </div>

        {/* High-Contrast Main Title with Subtle Glow & Shadow */}
        <div className="space-y-4">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl leading-[1.08] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Discover the tools <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              behind AI.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-medium text-zinc-300 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            A precise, verified reference library of prompts, agent skills, MCP servers, workflows, and open-source models. Clean, ad-free, and legally documented.
          </p>
        </div>

        {/* High-Contrast Search Bar (Prominent) */}
        <div className="mx-auto max-w-xl">
          <Link
            href="/explore"
            className="group relative flex h-14 w-full items-center justify-between rounded-2xl border border-white/20 bg-black/70 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-white/40 hover:bg-black/85 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <div className="flex items-center gap-3.5 text-sm font-medium text-zinc-300 group-hover:text-white">
              <Search className="h-4 w-4 text-white" />
              <span>Search {totalPublished.toLocaleString()} verified resources...</span>
            </div>

            <div className="flex items-center gap-2">
              <kbd className="hidden sm:inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-2 py-1 font-mono text-[11px] font-bold text-white shadow-xs">
                ⌘K
              </kbd>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-black transition-transform duration-200 group-hover:scale-105">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Feature Badges with High-Contrast Glass Backgrounds */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono font-medium text-zinc-300">
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 backdrop-blur-md">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>100% Tested & Verified</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/50 px-3.5 py-1.5 backdrop-blur-md">
            <Layers className="h-3.5 w-3.5 text-sky-400" />
            <span>Open Source & Free Access</span>
          </div>
          <a
            href="https://axeslab.zainaxes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <span>axeslab.zainaxes.com</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>
        </div>
      </div>
    </section>
  );
}
