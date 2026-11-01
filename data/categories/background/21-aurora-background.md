---
id: "res_meez_21_aurora_background"
slug: "21-aurora-background"
title: "Aurora Background"
category: "Background"
categorySlug: "background"
routeCollection: "backgrounds"
videoUrl: "/media/videos/21-aurora-background.mp4"
posterUrl: "/media/posters/21-aurora-background.jpg"
chars: 3666
tier: "premium"
likes: 199
---

# Aurora Background Component Specification
Interactive Glowing Light Rays with Smooth CSS/Canvas Blend Modes

════════════════════════════════════════════════════════════════════════
1. OVERVIEW & VISUAL BEHAVIOR
════════════════════════════════════════════════════════════════════════
The Aurora Background creates an ethereal, fluid northern-lights ambient glow behind page content. It utilizes multi-layered radial color gradients blending over a deep midnight background with smooth CSS animation loops.

Features:
• Zero external 3D engine overhead (pure modern CSS keyframes and backdrop filters).
• Dark mode optimized with high dynamic range color stops (#3b82f6, #8b5cf6, #ec4899, #10b981).
• Content slot isolation with high contrast legibility.

════════════════════════════════════════════════════════════════════════
2. CSS KEYFRAME SPECIFICATION
════════════════════════════════════════════════════════════════════════
```css
@keyframes aurora {
  0% {
    background-position: 50% 50%, 50% 50%;
  }
  50% {
    background-position: 100% 50%, 0% 50%;
  }
  100% {
    background-position: 50% 50%, 50% 50%;
  }
}
.aurora-layer {
  background-image: 
    repeating-linear-gradient(100deg, var(--aurora-1) 10%, var(--aurora-2) 15%, var(--aurora-3) 20%, var(--aurora-4) 25%, var(--aurora-1) 30%),
    repeating-linear-gradient(200deg, var(--aurora-2) 10%, var(--aurora-3) 15%, var(--aurora-4) 20%, var(--aurora-1) 25%, var(--aurora-2) 30%);
  background-size: 300%, 200%;
  animation: aurora 60s linear infinite;
  filter: blur(60px);
  opacity: 0.5;
}
```

════════════════════════════════════════════════════════════════════════
3. PRODUCTION REACT IMPLEMENTATION
════════════════════════════════════════════════════════════════════════
```tsx
import React from 'react';

export interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  showRadialGradient?: boolean;
}

export function AuroraBackground({
  className = "",
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={`relative flex flex-col h-[100vh] items-center justify-center bg-zinc-950 text-slate-100 transition-bg ${className}`}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,#3b82f6_10%,#a855f7_15%,#ec4899_20%,#06b6d4_25%,#3b82f6_30%)]
            [background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 
            after:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] opacity-50 will-change-transform
            ${showRadialGradient ? '[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]' : ''}
          `}
        />
      </div>
      <div className="relative z-10 w-full max-w-5xl px-6 text-center">
        {children}
      </div>
    </div>
  );
}
```

