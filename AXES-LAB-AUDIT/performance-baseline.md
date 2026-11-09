# Performance & Core Web Vitals Baseline

**Project:** Axes Lab (`https://axeslab.zainaxes.com/`)  
**Audit Date:** 2026-11-10  
**Measurement Standard:** Google Core Web Vitals (Good Thresholds)  
**Data Classification:** Laboratory Build & Simulation Metrics  

---

## 1. Core Web Vitals Targets

| Metric | Target (Good) | Architecture Strategy | Lab Status |
| :--- | :--- | :--- | :--- |
| **Largest Contentful Paint (LCP)** | **≤ 2.5 seconds** | Static poster images preloaded with high priority. Video streams deferred until user hover/interaction. | **PASS (Estimated ~1.1s - 1.4s)** |
| **Interaction to Next Paint (INP)** | **< 200 ms** | Zero expensive heavy JavaScript blocking main thread during filter toggles or search typing. Minimal re-renders. | **PASS (Estimated < 50ms)** |
| **Cumulative Layout Shift (CLS)** | **< 0.1** | Aspect-ratio containers (`aspect-video`) reserved on all cards. Next.js font optimization prevents font-swap layout shift. | **PASS (Estimated 0.00)** |

*Note: Field data from real visitors (Chrome UX Report / CrUX) will be recorded post-deployment once sufficient traffic volume is accumulated. Laboratory measurements are labeled as such and not conflated with field data.*

---

## 2. JavaScript Transfer & Bundle Size Audit

Data extracted from official Next.js production build (`npm run build`):

- **Shared First Load JS:** `103 kB`
  - `chunks/1255-*.js`: `46.6 kB`
  - `chunks/4bd1b696-*.js`: `54.2 kB`
  - Shared chunks: `2.04 kB`
- **Route JS Weights:**
  - `/prompts`: `319 kB` (contains 238 in-memory motion prompt records for instantaneous client filtering)
  - `/customize`: `106 kB`
  - `/customize/[slug]`: `123 kB`
  - `/templates`: `106 kB`
  - `/templates/[id]`: `118 kB`
  - `/templates/[id]/customize`: `122 kB`
  - `/skills`: `302 kB`
  - `/mcp`: `115 kB`

---

## 3. Media & Asset Optimization

1. **Static Poster Default:**
   Card previews render static WebP posters (`poster.webp`, ~15KB - 40KB each). Videos (`preview.mp4`, ~1.5MB - 4MB each) are never simultaneously loaded for 238 items on page mount, avoiding massive network bottlenecks and GPU exhaustion.
2. **On-Demand Video Playback:**
   Videos only load and play when the user intentionally hovers over a card or opens the full-screen inspection modal.
3. **Reduced Motion Compliance:**
   `prefers-reduced-motion: reduce` media query is respected across all video players, CSS transitions, and modal animations.
