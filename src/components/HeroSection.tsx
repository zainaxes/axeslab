"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, Layers, Video, Code2 } from "lucide-react";

interface HeroSectionProps {
  totalPublished: number;
}

export function HeroSection({ totalPublished }: HeroSectionProps) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative w-full min-h-[92dvh] sm:min-h-dvh flex items-center justify-center overflow-hidden bg-paper text-ink">
      {/* 1. Fullscreen Responsive Background Video */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          poster="/media/posters/interactive-discovery.webp"
          onCanPlay={() => setVideoLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoLoaded ? "opacity-60 scale-100" : "opacity-35 scale-105"
          }`}
        >
          {/* Background Video */}
          <source src="/videos/abstract-blue-lines-dots.mp4" type="video/mp4" />
        </video>

        {/* 2. Cybernetic Vignette & Atmospheric Fog Layers */}
        <div className="absolute inset-0 bg-radial-[at_center_center] from-transparent via-paper/70 to-paper pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper/80 via-transparent to-paper pointer-events-none" />
      </div>

      {/* 3. Centerpiece Content (Axes Lab Layout & Typography) */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 text-center space-y-8 flex flex-col items-center">
        {/* Top Eyebrow Badge */}
        <div className="inline-flex items-center gap-2.5 rounded-pill border border-cool/30 bg-paper-2/90 px-3.5 py-1 text-xs text-cool">
          <span className="flex h-1.5 w-1.5 rounded-full bg-cool" />
          <span className="font-medium">Verified AI Motion & UI Directory</span>
          <span className="text-muted">•</span>
          <span className="text-ink">Axes Lab</span>
        </div>

        {/* Headline */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl leading-[1.05] text-ink">
            Make Lovable, Bolt, Cursor & Claude build <br />
            <span className="text-cool">
              entire sites worth shipping.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg font-normal text-muted leading-relaxed">
            Discover {totalPublished.toLocaleString()}+ verified AI prompts, agent skills, MCP servers, workflows, and open-source models with live video previews and copy-ready specifications.
          </p>
        </div>

        {/* Prominent Search Bar */}
        <div className="w-full max-w-2xl pt-2">
          <Link
            href="/explore"
            className="group relative flex h-16 w-full items-center justify-between rounded-card border border-rule bg-paper-2/90 px-6 backdrop-blur-xl transition-colors duration-150 hover:border-cool/50 hover:bg-paper-3 focus-visible:outline-2 focus-visible:outline-accent active:bg-paper-3"
          >
            <div className="flex items-center gap-4 text-sm sm:text-base font-medium text-muted group-hover:text-ink">
              <Search className="h-5 w-5 text-cool motion-safe:transition-transform motion-safe:group-hover:scale-105" />
              <span>Search {totalPublished.toLocaleString()} prompts, skills, MCP servers…</span>
            </div>

            <div className="flex items-center gap-2.5">
              <kbd className="hidden sm:inline-flex items-center rounded-pill border border-rule bg-paper-3 px-2.5 py-1 font-mono text-xs font-medium text-muted">
                ⌘K
              </kbd>
              <div className="flex h-8 w-8 items-center justify-center rounded-pill bg-ink text-paper motion-safe:transition-transform motion-safe:duration-150 group-hover:bg-cool group-hover:text-paper">
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        </div>

        {/* Live Metrics Pill Trio */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <Link
            href="/web-design"
            className="group inline-flex items-center gap-2 rounded-pill border border-rule bg-paper-2/80 px-4 py-2 text-xs font-medium text-muted hover:text-ink hover:border-rule-2 hover:bg-paper-3 transition-colors duration-150"
          >
            <Code2 className="h-3.5 w-3.5 text-cool" />
            <strong className="text-ink font-semibold">86</strong>
            <span>Full Websites</span>
          </Link>

          <Link
            href="/sections"
            className="group inline-flex items-center gap-2 rounded-pill border border-rule bg-paper-2/80 px-4 py-2 text-xs font-medium text-muted hover:text-ink hover:border-rule-2 hover:bg-paper-3 transition-colors duration-150"
          >
            <Layers className="h-3.5 w-3.5 text-cool" />
            <strong className="text-ink font-semibold">48</strong>
            <span>UI Sections</span>
          </Link>

          <Link
            href="/backgrounds"
            className="group inline-flex items-center gap-2 rounded-pill border border-rule bg-paper-2/80 px-4 py-2 text-xs font-medium text-muted hover:text-ink hover:border-rule-2 hover:bg-paper-3 transition-colors duration-150"
          >
            <Video className="h-3.5 w-3.5 text-accent" />
            <strong className="text-ink font-semibold">71</strong>
            <span>Motion Backgrounds</span>
          </Link>

          <a
            href="https://axeslab.zainaxes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-pill border border-rule bg-paper-2/80 px-4 py-2 text-xs font-medium text-muted hover:text-cool hover:border-rule-2 hover:bg-paper-3 transition-colors duration-150"
          >
            <span>axeslab.zainaxes.com</span>
            <span className="h-1.5 w-1.5 rounded-full bg-cool" />
          </a>
        </div>
      </div>
    </section>
  );
}
