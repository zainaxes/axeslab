---
id: "res_meez_luxury_escapes"
slug: "luxury-escapes"
title: "Luxury Escapes"
category: "Travel App"
categorySlug: "travel-app"
routeCollection: "apps"
videoUrl: ""
posterUrl: "/media/posters/luxury-escapes.jpg"
chars: 5544
tier: "premium"
likes: 162
---

# Build Prompt: Luxury Escapes — Travel App Experience
Comprehensive Production Web Application Specification

════════════════════════════════════════════════════════════════════════
1. EXECUTIVE DESIGN BRIEF & ARCHITECTURE
════════════════════════════════════════════════════════════════════════
Build a React + Vite showcase displaying two mobile app screens side by side inside realistic iPhone device frames, presented on a cinematic gradient …

The page architecture consists of:
• Viewport Geometry: Full viewport height hero container (`min-h-screen`) with responsive padding.
• Background Atmosphere: Ambient media backdrop with layered vignette masks (`bg-gradient-to-t from-black via-transparent`).
• Navigation Header: Frosted liquid-glass header with brand mark, navigation links, and primary CTA.
• Visual Showcase: High-contrast typography hierarchy, interactive button slots, and responsive card layouts.

════════════════════════════════════════════════════════════════════════
2. TECHNICAL SPECIFICATIONS & STACK
════════════════════════════════════════════════════════════════════════
• Framework: React 19 + TypeScript + Vite / Next.js
• Styling: Tailwind CSS v4 with fluid spacing tokens
• Icons: lucide-react (pure SVG icons with zero layout shift)
• Motion: Framer Motion / CSS Transitions with hardware acceleration
• Responsive: Mobile 375px+, Tablet 768px+, Desktop 1440px+

════════════════════════════════════════════════════════════════════════
3. DESIGN SYSTEM & COLOR TOKENS
════════════════════════════════════════════════════════════════════════
• Canvas Background: Deep Obsidian `#050507`
• Card & Glass Surface: `rgba(255, 255, 255, 0.03)` with `backdrop-blur-xl`
• Hairline Borders: `border-white/10` with hover highlight to `border-white/20`
• Typography: Headings in Inter/Geist (`tracking-tight font-semibold`), metadata in monospace (`font-mono text-xs`)
• Accent Lighting: Subtle ambient glow with radial blur (`blur-[120px]`)

════════════════════════════════════════════════════════════════════════
4. COMPLETE PRODUCTION COMPONENT SPECIFICATION
════════════════════════════════════════════════════════════════════════
```tsx
import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Shield, Zap, Globe } from 'lucide-react';

export interface LuxuryEscapesSectionProps {
  headline?: string;
  tagline?: string;
  onExplore?: () => void;
}

export function LuxuryEscapesSection({
  headline = "Luxury Escapes",
  tagline = "Build a React + Vite showcase displaying two mobile app screens side by side inside realistic iPhone device frames, presented on a cinematic gradient …",
  onExplore
}: LuxuryEscapesSectionProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-[600px] flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#08080c] p-8 md:p-12 text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 -z-10 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white">
            <Zap className="h-4 w-4 text-indigo-400" />
          </span>
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
            Travel App
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
            <Shield className="h-3 w-3 text-emerald-400" />
            Verified Specification
          </span>
        </div>
      </div>

      {/* Center Main Content */}
      <div className="my-12 max-w-2xl space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white">
          {headline}
        </h1>
        <p className="text-base text-neutral-300 leading-relaxed md:text-lg">
          {tagline}
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-neutral-950 shadow-xl transition-all hover:bg-neutral-200 hover:scale-[1.02]"
          >
            <span>Explore Experience</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer Feature Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-white/5 pt-6 text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-indigo-400" />
          <span>Universal Responsive Layout</span>
        </div>
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Framer Motion Ready</span>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span>Production TypeScript</span>
        </div>
      </div>
    </section>
  );
}
```

