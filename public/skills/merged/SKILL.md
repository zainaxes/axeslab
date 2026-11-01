---
name: axeslab-axeskit-master-skill
description: Comprehensive Full-Stack UI/UX Design System, Motion Choreography, and Production Scaffolding Intelligence merging Axes Lab's verified motion blueprints and component catalog with AxesKit's production design system, style taxonomies, and multi-asset tools.
version: 2.0.0
author: Zain Axes (axeslab.zainaxes.com & axeskit.zainaxes.com)
tools:
  - axeslab mcp server
tags:
  - ui-ux-design
  - tailwindcss
  - nextjs
  - motion
  - framer-motion
  - design-system
  - ui-kits
  - icons
  - sound-effects
  - lottie
---

# Axes Lab & AxesKit Unified Master Skill

> The single master intelligence layer uniting **Axes Lab** (137 verified motion blueprints, 3D interactive canvases, dynamic feature cards, and landing page scaffolding) with **AxesKit** (design tokens, 79 UI styles, 192 product palettes, 74 font pairings, 119 UX guidelines, and multi-asset suites).

---

## 1. Quick Integration

You can use this unified skill in Claude Code, Cursor, Windsurf, or Google Antigravity agents.

### A. Live MCP Server Connection
Register the unified **Axes Lab MCP Server** (which indexes both Axes Lab prompts and AxesKit asset taxonomy):
```bash
claude mcp add axeslab --scope user --transport http https://axeslab.zainaxes.com/api/mcp
```

Or add to `.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "axeslab": {
      "url": "https://axeslab.zainaxes.com/api/mcp",
      "transport": "http"
    }
  }
}
```

---

## 2. Dual Architecture Framework

### Layer 1: AxesKit Design System & Taxonomies
Before writing layout code, establish design foundations using AxesKit rules:
- **Style Taxonomy**: Clean SaaS, Dark Luxury, Cyberpunk, Neo-Brutalism, Glassmorphism, Editorial.
- **Palette & Contrast**: WCAG AAA compliant background-to-text ratios. Base `#050507` or `#09090B`, cards `#0B0B10` with `border-white/[0.08]`.
- **Typography Pairing**:
  - Headings: `Geist`, `Inter`, `Syne`, or italic serif display accents (`Playfair Display`).
  - Monospace: `Geist Mono`, `JetBrains Mono` for badges, counters, chips, and metadata.
- **Asset Categories Supported**:
  - `icons`: 105+ actions, navigation, status, media, controls
  - `svg-vector-graphics`: Abstract marks, badges, decorative shapes
  - `fonts`: Curated pairings for tech, fintech, creative, agency
  - `sound-effects` & `music-audio-loops`: Subtle UI feedback clicks and ambient loops
  - `lottie-animations`: Micro-interactions and loaders
  - `ui-kits` & `ui-components`: Bento grids, tables, forms, modals, sidebars

### Layer 2: Axes Lab Motion Blueprint & Component Scaffolding
When scaffolding sections, pages, or interactive widgets:
1. **Search Catalog**: Call `axeslab_search_templates` (e.g. `query: "bento"` or `category: "Hero Section"`).
2. **Fetch Exact Blueprint**: Call `axeslab_get_prompt` with the component slug.
3. **Motion Principles**:
   - Prefer `cubic-bezier(0.16, 1, 0.3, 1)` or `easeOut` over standard linear animations.
   - Micro-interactions: `hover:-translate-y-1 hover:border-violet-500/40 transition-all duration-300`.
   - Dynamic cursor spotlights and canvas animations must run inside `requestAnimationFrame` without blocking main DOM rendering.
4. **Scaffolding Dependencies**:
   - `npm install lucide-react clsx tailwind-merge motion/react`

---

## 3. Autonomous Execution Rules
When an agent is asked to build a page or component:
1. **Never generate generic AI slop**: Use real, expressive typography, subtle grid borders, radial gradient accents, and precise padding.
2. **Accessible by default**: Semantic HTML (`<nav>`, `<header>`, `<main>`, `<section>`, `<article>`), explicit focus rings, and proper ARIA labels.
3. **Full Responsiveness**: Mobile-first (`w-full`, `sm:`, `md:`, `lg:`, `xl:`), dynamic viewport heights (`100dvh`).

---

## 4. Official Ecosystem Endpoints
- **Axes Lab**: [axeslab.zainaxes.com](https://axeslab.zainaxes.com) (Prompts, 3D canvases, MCP server)
- **AxesKit**: [axeskit.zainaxes.com](https://axeskit.zainaxes.com) (UI kits, design assets, free tools)
- **Main Studio**: [zainaxes.com](https://zainaxes.com)
