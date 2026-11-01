---
name: axeslab skill
description: Autonomous UI component and landing page scaffolding using Axes Lab's catalog of verified production design patterns, motion blueprints, and React/Tailwind architectures.
version: 1.0.0
author: Zain Axes (axeslab.zainaxes.com)
tools:
  - axeslab mcp server
tags:
  - ui-design
  - tailwindcss
  - nextjs
  - motion
  - framer-motion
  - scaffolding
---

# axeslab skill

> Master engineering prompt and agent workflow instructions to scaffold production-grade landing pages, bento grids, 3D interactive cubes, dynamic glassmorphic cards, and cinematic micro-interactions without generic AI UI tropes.

---

## 1. Quick Integration

You can use **axeslab skill** inside Claude Code, Cursor, Windsurf, or Google Antigravity agents.

### A. Automatic Setup via MCP
If you have connected `axeslab mcp server`:
```bash
claude mcp add axeslab --scope user --transport http https://axeslab.zainaxes.com/api/mcp
```
Or in Cursor `.cursor/mcp.json`:
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

### B. Standalone Agent Directives
When creating components or pages, instruct the agent to adhere to the **Axes Lab Motion & UI Architecture**:

1. **Dark Canvas & Depth**:
   - Base background: `#050507` or `#09090B`.
   - Card background: `#0B0B10` with subtle border `rgba(255, 255, 255, 0.08)`.
   - Violet / Emerald / Indigo / Amber glow accents using radial gradients or backdrop filters (`backdrop-blur-xl`).

2. **Typography & Layout**:
   - Primary heading font: Clean sans-serif (`Geist`, `Inter`, or system sans).
   - Monospace accents: Labels, badges, status chips (`Geist Mono`, `JetBrains Mono`).
   - Tight letter-spacing on display headings: `tracking-tight` or `tracking-tighter`.
   - High contrast hierarchy: white titles (`#FAFAFA`), slate/zinc secondary copy (`text-zinc-400`).

3. **Motion Principles**:
   - Avoid generic bouncing or jarring jumps.
   - Use cubic-bezier easing: `cubic-bezier(0.16, 1, 0.3, 1)` or `easeOut`.
   - Micro-interactions: `hover:-translate-y-1 hover:border-violet-500/40 transition-all duration-300`.
   - Canvas/Interactive components should dynamically adapt to cursor coordinates without lagging DOM elements.

4. **Component Dependencies**:
   - Always install: `npm install lucide-react clsx tailwind-merge motion/react` (or `framer-motion`).

---

## 2. Component Scaffolding Workflow

When asked to build a section (e.g. "Create a modern 3D feature grid" or "Build an agency hero"):

1. **Search Axes Lab Catalog**:
   - Query `axeslab_search_templates` with the relevant keyword (e.g. `query: "bento"` or `category: "Hero"`).
2. **Fetch Exact Prompt Spec**:
   - Call `axeslab_get_prompt` with the matched `slug`.
3. **Generate Production Code**:
   - Create clean, single-responsibility React / Next.js Client Components (`'use client';`).
   - Include TypeScript interfaces for all props.
   - Inject accessible ARIA labels, semantic HTML tags (`<header>`, `<section>`, `<article>`), and full responsiveness (mobile-first `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).

---

## 3. Official Catalog Categories

Axes Lab provides 137 verified components across 34 categories:
- **Hero & Landing**: Cosmic Hero, Minimal Agency, Split Interactive, 3D Mesh Hero
- **Features & Bento**: Interactive Bento Grids, Dynamic Feature Cards, Bento Tilt
- **3D & Canvas**: 3D Interactive Cubes, Orbit Particles, Fluid Shader Fields
- **Commerce & Pricing**: Tiered Interactive Sliders, Comparison Matrices, Dark Checkout
- **Navigation & Headers**: Floating Island Dock, Glassmorphic Headers, Command Palettes

---

## 4. Support & Contributions
- Live Platform: [axeslab.zainaxes.com](https://axeslab.zainaxes.com)
- Main Studio: [zainaxes.com](https://zainaxes.com)
- Submit New Prompts: [axeslab.zainaxes.com/submit](https://axeslab.zainaxes.com/submit)
