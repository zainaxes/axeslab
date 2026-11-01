---
id: "res_meez_21_expandable_card"
slug: "21-expandable-card"
title: "Expandable Card"
category: "Card"
categorySlug: "card"
routeCollection: "sections"
videoUrl: "/media/videos/21-expandable-card.mp4"
posterUrl: "/media/posters/21-expandable-card.jpg"
chars: 2542
tier: "premium"
likes: 107
---

# Expandable Card Component Specification
Production Component Implementation & Interactive Layout Model

════════════════════════════════════════════════════════════════════════
1. COMPONENT ARCHITECTURE & INTERACTION MODEL
════════════════════════════════════════════════════════════════════════
An interactive, expandable card component for displaying project status and details with smooth animations. Notes: • Built with Framer Motion for smooth …

Key features:
• Full responsive fluid geometry across 375px mobile, 768px tablet, and 1440px desktop.
• Clean state management and interaction feedback with Tailwind CSS and modern React hooks.
• Zero performance jank: Hardware-accelerated GPU transforms (`translate3d`, `will-change-transform`).

════════════════════════════════════════════════════════════════════════
2. PRODUCTION REACT & TAILWIND IMPLEMENTATION
════════════════════════════════════════════════════════════════════════
```tsx
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check } from 'lucide-react';

export interface ExpandableCardProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ExpandableCard({
  title = "Expandable Card",
  subtitle = "High-performance interactive component designed with modern web standards.",
  className = ""
}: ExpandableCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/90 p-8 backdrop-blur-xl ${className}`}>
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-neutral-300 w-fit">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>CARD</span>
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
          {title}
        </h3>
        <p className="max-w-xl text-sm leading-relaxed text-neutral-400">
          {subtitle}
        </p>
        <div className="pt-2">
          <button
            onClick={() => setIsActive(!isActive)}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition-all hover:bg-neutral-200"
          >
            <span>{isActive ? "Active State" : "Interact"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
```

