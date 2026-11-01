---
id: "res_wd_veloce_cards"
slug: "veloce-cards"
title: "Veloce Cards"
category: "Cards"
categorySlug: "cards"
collection: "sections"
likes: 194
tier: "free"
chars: 4392
preview_video: "/media/videos/veloce-cards.mp4"
preview_poster: "/media/posters/veloce-cards.jpg"
---

# Veloce Cards (Cards)

// Verified & Optimized by Axes Lab (https://axeslab.zainaxes.com)
// Documentation & Live Previews: https://axeslab.zainaxes.com

Recreate this exact high-converting Cards design — pixel-perfect match.

═══════════════════════════════════════
TECH / STACK SPECIFICATION
═══════════════════════════════════════
- Framework: React 19 + TypeScript + Vite / Next.js
- Styling: Tailwind CSS v4 / modern utility styling
- Motion & Interactions: Framer Motion / Lucide React icons
- Responsive: Fully fluid responsive design (Mobile 375px+, Tablet 768px+, Desktop 1440px+)
- Visual Reference: https://meez.design/web/prompt-previews/veloce-cards-poster.jpg
- Video Motion Demonstration: https://meez.design/web/prompt-previews/prompt-media/ed8dd2aa545a6515.mp4

═══════════════════════════════════════
COMPONENT ARCHITECTURE & DESIGN SYSTEM
═══════════════════════════════════════
1. Layout & Grid:
   - Modern clean background with smooth ambient lighting and subtle borders (`border-black/10` or `border-white/10`).
   - Standard 8pt spacing grid with fluid viewport container.

2. Typography & Hierarchy:
   - Primary Headings: Display font with tight letter spacing (`tracking-tight`).
   - Body & Supporting Copy: Highly legible sans-serif with comfortable line height (`leading-relaxed`).
   - Category Pill: `font-mono uppercase text-xs tracking-wider px-3 py-1 rounded-full`.

3. Micro-Interactions:
   - Hover lift, magnetic CTA buttons, and smooth transition states.
   - 16/10 aspect ratio preview media container with fallback poster.

4. Production Component Implementation:
```tsx
import React from 'react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export interface VeloceCardsProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function VeloceCards({
  headline = "Veloce Cards",
  subheadline = "Build an \"Insights\" stats section for a fintech landing page using React + TypeScript + Vite + Tailwind CSS + Framer Motion. This is a standalone section …",
  ctaText = "Explore with Axes Lab",
  onCtaClick
}: VeloceCardsProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-black/80">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-mono font-medium tracking-wide dark:bg-white/10">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            <span>CARDS</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
            {headline}
          </h2>
          <p className="text-base text-black/60 dark:text-white/60 leading-relaxed">
            {subheadline}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onCtaClick}
              className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-black/80 hover:shadow-lg dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <span>{ctaText}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="https://axeslab.zainaxes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors"
            >
              <span>axeslab.zainaxes.com</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60" />
            </a>
          </div>
        </div>
        
        <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-black/5 bg-black/5 dark:border-white/5 dark:bg-white/5">
          <img
            src="https://meez.design/web/prompt-previews/veloce-cards-poster.jpg"
            alt="Veloce Cards"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
```
