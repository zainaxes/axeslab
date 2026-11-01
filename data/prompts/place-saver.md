---
id: "res_wd_place_saver"
slug: "place-saver"
title: "Place Saver"
category: "Travel"
categorySlug: "travel"
collection: "prompts"
likes: 41
tier: "free"
chars: 4673
preview_video: "https://heydesign.ai/api/design-prompt-media/v1/effects/place-saver.mp4"
preview_poster: "https://heydesign.ai/api/design-prompt-media/v1/effects/place-saver.mp4"
---

# Place Saver (Travel)

// Verified & Optimized by Axes Lab (https://axeslab.zainaxes.com)
// Documentation & Live Previews: https://axeslab.zainaxes.com

Recreate this exact high-converting Travel component — pixel-perfect match.

═══════════════════════════════════════
TECH / STACK SPECIFICATION
═══════════════════════════════════════
- Framework: React 19 + TypeScript + Tailwind CSS
- Animation: Lucide React icons, Framer Motion transitions, CSS keyframe micro-interactions
- Responsive: Fully fluid responsive design (Mobile 375px+, Tablet 768px+, Desktop 1440px+)
- Accessibility: Semantic HTML5, WCAG AAA contrast ratio, keyboard focus traps and ARIA live regions
- Visual Reference: https://heydesign.ai/api/design-prompt-media/v1/effects/place-saver.mp4
- Video Preview Demonstration: https://heydesign.ai/api/design-prompt-media/v1/effects/place-saver.mp4

═══════════════════════════════════════
COMPONENT ARCHITECTURE & DESIGN SYSTEM
═══════════════════════════════════════
1. Container & Viewport:
   - Modern glassmorphism or minimalist high-contrast dark/light mode surface.
   - Smooth backdrop blur (`backdrop-blur-xl`), subtle border tokens (`border-white/10` or `border-black/10`).
   - Clean spacing using standard 8pt grid tokens.

2. Typography & Contrast:
   - Headings: Display typography with tight tracking (`tracking-tight`) and fluid font scaling.
   - Body & Supporting Copy: Clear, readable sans-serif typography with comfortable line-height (`leading-relaxed`).
   - Category Badge: Pill badge styled with `font-mono uppercase text-xs tracking-wider px-3 py-1 rounded-full`.

3. Interactive States & Micro-interactions:
   - Primary CTA: Dynamic hover lift, active scale depression, smooth shadow expansion.
   - Secondary CTA / Links: Subtle underline transition or background highlight.
   - Video / Media Container: Aspect ratio 16/10 container with graceful fallback poster, ambient glow, and hover preview trigger.

4. Implementation Guide:
```tsx
import React from 'react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export interface PlaceSaverProps {
  headline?: string;
  subheadline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function PlaceSaver({
  headline = "Place Saver",
  subheadline = "Place Saver is a Travel design prompt with a verified visual preview.",
  ctaText = "Explore with Axes Lab",
  onCtaClick
}: PlaceSaverProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-8 backdrop-blur-xl dark:border-white/10 dark:bg-black/80">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-mono font-medium tracking-wide dark:bg-white/10">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            <span>TRAVEL</span>
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
            src="https://heydesign.ai/api/design-prompt-media/v1/effects/place-saver.mp4"
            alt="Place Saver"
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
```
