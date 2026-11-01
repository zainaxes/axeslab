export interface ItemRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  subcategory?: string;
  type: "prompt" | "skill" | "3d" | "background" | "section";
  badge?: string;
  previewType: "canvas" | "shader" | "video";
  previewTheme:
    | "shelf-hero"
    | "orvante-agency"
    | "synaptic-forge"
    | "facet-glass"
    | "axon"
    | "stellarmind"
    | "liquid-glass"
    | "particle-self"
    | "obsidian"
    | "agent-wave"
    | "tide-footer"
    | "glow-features"
    | "smart-pricing"
    | "veilguard-cta"
    | "bento-stats"
    | "planet-404"
    | "neon-pulse"
    | "cosmic-ripple"
    | "liquid-chrome"
    | "cyber-grid"
    | "quantum-field"
    | "aurora-flow"
    | "solar-wind"
    | "deep-neural";
  description: string;
  tags: string[];
  likes: number;
  featured?: boolean;
  rawPrompt: string;
  sourceCode: string;
  skillContent: string;
  mcpCommand: string;
  backgroundUrl?: string;
}

export const ITEMS_DATABASE: ItemRecord[] = [
  // 1. Websites & Heroes
  {
    id: "item-shelf-hero",
    slug: "shelf-hero",
    title: "Shelf Hero",
    category: "Portfolio",
    type: "prompt",
    badge: "Featured Hero",
    previewType: "canvas",
    previewTheme: "shelf-hero",
    description: "Multi-layered dynamic 3D exhibition shelf displaying floating card assets with interactive tilt and glass specular reflection.",
    tags: ["React", "Tailwind", "Framer Motion", "3D Tilt"],
    likes: 142,
    featured: true,
    rawPrompt: `// Official Specification: "Shelf Hero" — 3D Exhibition Showcase
// Target: React 19 + TypeScript + Tailwind CSS + Framer Motion
// Visual Direction: Obsidian dark theme (#050507), ambient violet-cyan rim lighting, glass reflection cards.

Build a production-grade 3D Shelf Hero section:
1. Centered display headline with dual-layer chromatic glowing text: "Showcase Your Work With Dynamic Depth".
2. Multi-tier floating 3D shelf perspective (perspective: 1200px) holding 3 interactive portfolio cards with tilt-physics on hover.
3. Frosted glass pedestals (backdrop-blur-xl, border border-white/10, shadow-glow).
4. Smooth particle stars drifting in the background on HTML5 Canvas.
5. Primary CTA button with magnetic hover depression and electric violet gradient borders.`,
    sourceCode: `'use client';
import React, { useState } from 'react';
import { ArrowRight, Sparkles, ExternalLink } from 'lucide-react';

export default function ShelfHero() {
  const [activeCard, setActiveCard] = useState(1);

  const cards = [
    { title: "Quantum OS", tag: "System UI", desc: "Autonomous agent runtime environment." },
    { title: "Neural Canvas", tag: "Generative", desc: "Real-time WebGL latent space visualizer." },
    { title: "Vector Vault", tag: "Database", desc: "Sub-millisecond semantic search engine." }
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 py-20 bg-[#050507] text-white overflow-hidden">
      {/* Ambient Radial Spotlight */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-violet-600/20 via-indigo-500/10 to-cyan-500/10 blur-[130px] pointer-events-none -z-10" />

      {/* Hero Headline */}
      <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>SHELF ARCHITECTURE 2.0</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          Showcase Your Work With <span className="italic font-serif bg-gradient-to-r from-violet-300 via-indigo-200 to-cyan-300 bg-clip-text text-transparent">Dynamic Depth</span>
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
          Next-generation 3D viewport featuring fluid perspective layering, physical tilt acoustics, and frosted glass cards.
        </p>
      </div>

      {/* 3D Shelf Stage */}
      <div className="relative w-full max-w-5xl [perspective:1200px] flex justify-center items-center gap-6 flex-wrap">
        {cards.map((c, i) => (
          <div
            key={i}
            onMouseEnter={() => setActiveCard(i)}
            className={\`relative w-72 h-96 rounded-2xl p-6 transition-all duration-500 cursor-pointer border \${
              activeCard === i
                ? "bg-[#0E0E16]/90 border-violet-500/50 shadow-[0_20px_50px_rgba(139,92,246,0.3)] -translate-y-4 [transform:rotateY(-5deg)_scale(1.05)]"
                : "bg-[#0B0B0F]/70 border-white/[0.07] hover:border-white/[0.18] [transform:rotateY(0deg)]"
            } backdrop-blur-2xl flex flex-col justify-between\`}
          >
            <div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-zinc-400 uppercase tracking-wider">{c.tag}</span>
              <h3 className="text-xl font-bold text-white mt-4">{c.title}</h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{c.desc}</p>
            </div>
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-zinc-300">
              <span>View Case Study</span>
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}`,
    skillContent: `# SKILL.md — Shelf Hero Component Guidelines
## Role
You are a senior Motion & 3D UI developer specialized in React 19 and Tailwind CSS.
## Requirements
1. Maintain 1200px perspective on the shelf viewport.
2. Apply hardware-accelerated transforms (translate3d, rotateY).
3. Ensure obsidian dark mode tokens (#050507, #0B0B0F, rgba(255,255,255,0.07)).`,
    mcpCommand: `Use Axes Lab MCP to generate the Shelf Hero exhibition component with glass specular cards and 3D tilt.`,
  },

  {
    id: "item-orvante-agency",
    slug: "orvante-agency",
    title: "Orvante Agency",
    category: "Agency",
    type: "prompt",
    badge: "Editorial Hero",
    previewType: "canvas",
    previewTheme: "orvante-agency",
    description: "Ultra-luxury brutalist agency landing page with oversized editorial serif typography and dynamic cursor spotlight.",
    tags: ["Editorial", "Brutalist", "Luxury", "Tailwind CSS"],
    likes: 98,
    featured: true,
    rawPrompt: `// Official Specification: "Orvante Agency" — High-Fashion Digital Studio
// Visual Direction: Minimal luxury obsidian canvas, oversized Instrument Serif typography, fluid horizontal marquee ticker.

Recreate the Orvante Agency landing page:
1. Editorial headline pairing: Large sans-serif display mixed with italic editorial serif accent words.
2. Ambient cursor glow spotlight following mouse movement with ease-out physics.
3. Interactive project index table with thumbnail preview popover on hover.
4. Minimalist dark palette: #050507 void, zinc-400 body, crisp #FAFAFA titles.`,
    sourceCode: `'use client';
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function OrvanteAgency() {
  const projects = [
    { title: "Vogue Meta", year: "2026", type: "3D Editorial" },
    { title: "Aura Fragrance", year: "2025", type: "Brand System" },
    { title: "Kinetics Lab", year: "2025", type: "Spatial Interface" }
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-white px-6 py-20 max-w-6xl mx-auto">
      <div className="space-y-6 mb-20">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-500">DIGITAL ATELIER / ZAINAXES</p>
        <h1 className="text-5xl sm:text-8xl font-normal tracking-tight font-serif">
          Crafting <span className="italic bg-gradient-to-r from-violet-300 via-white to-cyan-200 bg-clip-text text-transparent">Unforgettable</span> Digital Artifacts.
        </h1>
      </div>
      <div className="border-t border-white/[0.1] divide-y divide-white/[0.06]">
        {projects.map((p, idx) => (
          <div key={idx} className="group py-8 flex items-center justify-between cursor-pointer hover:px-4 transition-all duration-300">
            <span className="text-2xl sm:text-4xl font-light text-zinc-300 group-hover:text-white">{p.title}</span>
            <div className="flex items-center gap-6">
              <span className="text-xs font-mono text-zinc-500">{p.type}</span>
              <span className="text-xs font-mono text-zinc-400">{p.year}</span>
              <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
    skillContent: `# SKILL.md — Orvante Editorial System
Use Instrument Serif for title accents, strict 8pt grid, and hairline 1px borders with rgba(255,255,255,0.08).`,
    mcpCommand: `Use Axes Lab MCP to apply the Orvante Agency editorial design system and typography pairing.`,
  },

  // 2. 3D WebGL & Interactive Sites
  {
    id: "item-synaptic-forge",
    slug: "synaptic-forge",
    title: "SynapticForge 3D",
    category: "3D Website",
    type: "3d",
    badge: "WebGL / Three.js",
    previewType: "canvas",
    previewTheme: "synaptic-forge",
    description: "Neural brain mesh pulsating with real-time reactive nodes, GLSL shader displacement, and interactive mouse orbit.",
    tags: ["Three.js", "WebGL", "GLSL", "React Three Fiber"],
    likes: 215,
    featured: true,
    rawPrompt: `// Official Specification: "SynapticForge 3D" — Interactive Neural WebGL Scene
// Tech Stack: React 19 + Three.js / Canvas + WebGL Shaders + Tailwind CSS

Build a dynamic WebGL neural lattice scene:
1. 3D point-cloud sphere with 200 interconnected nodes and pulsing synaptic electrical arcs.
2. Custom vertex shader displacing geometry based on audio / mouse velocity.
3. Clean overlay UI: HUD telemetry data (FPS, Node Count, Memory usage, Active Synapses).
4. Direct one-click prompt injection for AI code generation.`,
    sourceCode: `'use client';
import React, { useRef, useEffect } from 'react';

export default function SynapticForge() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const nodes = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: Math.random() * 2 + 1.5,
    }));

    const render = () => {
      ctx.fillStyle = '#050507';
      ctx.fillRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = \`rgba(139, 92, 246, \${(1 - dist / 120) * 0.4})\`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw Nodes
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = '#38BDF8';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-[500px] rounded-3xl overflow-hidden border border-white/[0.08] bg-[#050507]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-6 left-6 pointer-events-none">
        <span className="font-mono text-xs text-violet-400 uppercase tracking-widest">SYNAPTIC MESH // v3.4</span>
        <h2 className="text-xl font-bold text-white mt-1">Autonomous Neural Fabric</h2>
      </div>
    </div>
  );
}`,
    skillContent: `# SKILL.md — SynapticForge 3D Engine
Configure WebGL particle density, lerp easing for camera orbit, and electric cyan-to-violet bloom post-processing.`,
    mcpCommand: `Use Axes Lab MCP to fetch the SynapticForge 3D neural WebGL template and implementation code.`,
  },

  {
    id: "item-facet-glass",
    slug: "facet-glass",
    title: "Facet Glass 3D",
    category: "3D",
    type: "3d",
    badge: "Three.js Refraction",
    previewType: "canvas",
    previewTheme: "facet-glass",
    description: "Real-time physical glass prism refracting vibrant chromatic spectrums across a dark responsive viewport.",
    tags: ["Three.js", "Glassmorphism", "Refraction", "GLSL"],
    likes: 184,
    featured: true,
    rawPrompt: `// Official Specification: "Facet Glass 3D" — Chromatic Prism Refraction
Build a 3D glass crystal simulation using WebGL and Three.js MeshPhysicalMaterial with transmission, roughness 0.05, and chromatic aberration dispersion.`,
    sourceCode: `// Facet Glass 3D Component Source Code
import React from 'react';
export default function FacetGlass() {
  return <div className="p-8 text-center text-white bg-[#050507]">Facet Glass 3D Component Loaded</div>;
}`,
    skillContent: `# SKILL.md — Facet Glass Optics
Use transmission: 0.98, ior: 1.52, chromaticAberration: 0.08 for realistic glass dispersion.`,
    mcpCommand: `Use Axes Lab MCP to insert Facet Glass 3D physical refraction scene into my hero section.`,
  },

  // 3. UI Sections & Blocks
  {
    id: "item-tide-footer",
    slug: "tide-footer",
    title: "Tide Minimal Footer",
    category: "Footer",
    type: "section",
    badge: "Component",
    previewType: "canvas",
    previewTheme: "tide-footer",
    description: "High-density multi-column navigation footer with live system status beacon, timezone indicator, and newsletter input.",
    tags: ["Footer", "Navigation", "System Status"],
    likes: 89,
    featured: true,
    rawPrompt: `// Official Specification: "Tide Footer" — Modern Developer Navigation Footer
Build a responsive dark-mode multi-column footer with real-time operational status pill, copyright line, newsletter field, and social links.`,
    sourceCode: `'use client';
import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function TideFooter() {
  return (
    <footer className="w-full bg-[#050507] border-t border-white/[0.07] px-6 py-14 text-zinc-400 text-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="col-span-1 md:col-span-1 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold tracking-tight">
            <Terminal className="w-4 h-4 text-violet-400" />
            <span>Axes Lab</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            The open directory for production AI design prompts, agent skills, and zero-auth MCP.
          </p>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
        <div>
          <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4">Directory</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="/" className="hover:text-white transition-colors">Prompts</a></li>
            <li><a href="/skills" className="hover:text-white transition-colors">Agent Skills</a></li>
            <li><a href="/3d-websites" className="hover:text-white transition-colors">3D Websites</a></li>
            <li><a href="/backgrounds" className="hover:text-white transition-colors">Backgrounds</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4">Ecosystem</h4>
          <ul className="space-y-2.5 text-xs">
            <li><a href="/mcp" className="hover:text-white transition-colors">MCP Server</a></li>
            <li><a href="/restyle" className="hover:text-white transition-colors">Restyle Studio</a></li>
            <li><a href="/submit" className="hover:text-white transition-colors">Submit Prompt</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xs font-mono uppercase tracking-wider mb-4">Subscribe</h4>
          <p className="text-xs text-zinc-500 mb-3">Get new curated prompts in your inbox weekly.</p>
          <div className="flex gap-2">
            <input type="email" placeholder="name@domain.com" className="bg-[#0E0E14] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white outline-none w-full" />
            <button className="bg-white text-black px-3 py-2 rounded-xl text-xs font-bold hover:bg-zinc-200">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <span>© 2026 Axes Lab · Zero-Auth Architecture</span>
        <div className="flex gap-4 font-mono text-[11px]">
          <a href="/terms" className="hover:text-zinc-400">Terms</a>
          <a href="/privacy" className="hover:text-zinc-400">Privacy</a>
          <a href="/contact" className="hover:text-zinc-400">Contact</a>
        </div>
      </div>
    </footer>
  );
}`,
    skillContent: `# SKILL.md — Tide Footer Spec
Include operational beacon, newsletter input, and clean semantic <footer> markup.`,
    mcpCommand: `Use Axes Lab MCP to inject the Tide minimal developer footer component into my layout.`,
  },

  {
    id: "item-glow-features",
    slug: "glow-features",
    title: "Glow Features Section",
    category: "Features",
    type: "section",
    badge: "SaaS Section",
    previewType: "canvas",
    previewTheme: "glow-features",
    description: "3-column SaaS value proposition grid featuring radial hover spotlights, electric borders, and lucid iconography.",
    tags: ["SaaS", "Features", "Spotlight", "Grid"],
    likes: 131,
    featured: true,
    rawPrompt: `// Official Specification: "Glow Features" — SaaS Feature Grid
Build a 3-column features grid where each card illuminates a colored radial gradient directly under the mouse pointer.`,
    sourceCode: `'use client';
import React from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';

export default function GlowFeatures() {
  const feats = [
    { icon: Zap, title: "Sub-Millisecond Inference", desc: "Edge-routed token generation with zero network overhead." },
    { icon: ShieldCheck, title: "Cryptographic Attestation", desc: "Strict verification of all agent executions and logs." },
    { icon: Cpu, title: "Multi-Model Orchestration", desc: "Automated routing between Claude, GPT, and custom open weights." }
  ];

  return (
    <section className="py-24 px-6 bg-[#050507] text-white max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-16">
        <h2 className="text-3xl font-bold tracking-tight">Engineered For Velocity</h2>
        <p className="text-zinc-400 text-sm mt-3">High-performance primitives designed for the modern agentic era.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feats.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className="group relative rounded-2xl p-8 bg-[#0B0B0F] border border-white/[0.07] hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}`,
    skillContent: `# SKILL.md — Glow Features Section
Apply mousemove coordinate calculation to set CSS custom properties (--mouse-x, --mouse-y) for the spotlight effect.`,
    mcpCommand: `Use Axes Lab MCP to fetch the Glow Features section component and integration rules.`,
  },

  {
    id: "item-smart-pricing",
    slug: "smart-pricing",
    title: "Smart Pricing Matrix",
    category: "Pricing",
    type: "section",
    badge: "Conversion",
    previewType: "canvas",
    previewTheme: "smart-pricing",
    description: "Interactive monthly/yearly pricing switcher with highlighted most-popular tier and feature checklist.",
    tags: ["Pricing", "SaaS", "Conversion"],
    likes: 110,
    featured: true,
    rawPrompt: `// Official Specification: "Smart Pricing Matrix"
Build a clean dark pricing section with annual toggle (20% discount badge), highlighted middle tier with electric glow, and clear feature rows.`,
    sourceCode: `'use client';
import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function SmartPricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="py-20 px-4 bg-[#050507] text-white max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">Predictable Pricing for Teams</h2>
        <div className="inline-flex items-center gap-3 p-1 rounded-full bg-white/[0.04] border border-white/[0.08] mt-6">
          <button onClick={() => setAnnual(false)} className={\`px-4 py-1.5 rounded-full text-xs font-semibold \${!annual ? "bg-white text-black" : "text-zinc-400"}\`}>Monthly</button>
          <button onClick={() => setAnnual(true)} className={\`px-4 py-1.5 rounded-full text-xs font-semibold \${annual ? "bg-white text-black" : "text-zinc-400"}\`}>Annual (20% OFF)</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        <div className="p-8 rounded-2xl bg-[#0B0B0F] border border-white/[0.07]">
          <h3 className="font-bold text-lg">Hobbyist</h3>
          <p className="text-3xl font-extrabold mt-4">$0 <span className="text-xs font-normal text-zinc-500">/ forever</span></p>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-white/[0.1] text-xs font-bold hover:bg-white/[0.05]">Start Free</button>
        </div>
        <div className="p-8 rounded-2xl bg-[#0E0E16] border border-violet-500/50 shadow-glow relative">
          <span className="absolute -top-3 right-6 text-[10px] font-mono uppercase bg-violet-500 text-white px-2.5 py-0.5 rounded-full">POPULAR</span>
          <h3 className="font-bold text-lg">Pro Agent</h3>
          <p className="text-3xl font-extrabold mt-4">\${annual ? "39" : "49"} <span className="text-xs font-normal text-zinc-500">/ month</span></p>
          <button className="w-full mt-6 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200">Upgrade to Pro</button>
        </div>
      </div>
    </section>
  );
}`,
    skillContent: `# SKILL.md — Smart Pricing
Toggle math, responsive grid layout, and highlighted popular tier styling with glow shadow.`,
    mcpCommand: `Use Axes Lab MCP to generate the Smart Pricing matrix component with monthly/annual state.`,
  },

  // 4. Animated Backgrounds
  {
    id: "item-neon-pulse",
    slug: "neon-pulse",
    title: "Neon Pulse Tunnel",
    category: "Abstract",
    type: "background",
    badge: "Shader / Video",
    previewType: "shader",
    previewTheme: "neon-pulse",
    description: "Cyberpunk wireframe tunnel with neon pink and electric cyan pulses rushing through a high-speed perspective corridor.",
    tags: ["Shader", "Cyberpunk", "Video Loop", "Tunnel"],
    likes: 178,
    featured: true,
    rawPrompt: `// Official Specification: "Neon Pulse Tunnel" Background Loop
Recreate this high-speed geometric tunnel shader using HTML5 Canvas or WebGL. Neon violet (#8B5CF6) and cyan (#38BDF8) light trails.`,
    sourceCode: `// Neon Pulse Background Wrapper
export default function NeonPulseBg() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#050507] overflow-hidden">
      {/* Active canvas shader layer */}
    </div>
  );
}`,
    skillContent: `# SKILL.md — Neon Pulse Background
Render responsive fullscreen canvas with fixed inset-0 -z-10 positioning and dark contrast vignette mask.`,
    mcpCommand: `Use Axes Lab MCP to fetch Neon Pulse animated shader background and drop it into my hero.`,
    backgroundUrl: "https://assets.zainaxes.com/backgrounds/neon-pulse.mp4",
  },

  {
    id: "item-cosmic-ripple",
    slug: "cosmic-ripple",
    title: "Cosmic Ripple",
    category: "Space",
    type: "background",
    badge: "GLSL Fluid",
    previewType: "shader",
    previewTheme: "cosmic-ripple",
    description: "Deep space gravitational waves warping starlight in concentric violet ripples across infinite obsidian darkness.",
    tags: ["Space", "Fluid", "Gravitational", "Dark"],
    likes: 195,
    featured: true,
    rawPrompt: `// Official Specification: "Cosmic Ripple" WebGL Background
Simulate radial gravitational ripple waves displacing a starry background with smooth sinusoidal decay.`,
    sourceCode: `// Cosmic Ripple Component
export default function CosmicRipple() { return <div className="fixed inset-0 -z-10 bg-black" />; }`,
    skillContent: `# SKILL.md — Cosmic Ripple Shader
Set amplitude, frequency, and harmonic decay for realistic spacetime distortion waves.`,
    mcpCommand: `Use Axes Lab MCP to add the Cosmic Ripple animated background shader to my app.`,
    backgroundUrl: "https://assets.zainaxes.com/backgrounds/cosmic-ripple.mp4",
  },

  // 5. Agent Skills (Core Differentiators)
  {
    id: "item-skill-obsidian-glass",
    slug: "skill-obsidian-glass",
    title: "Obsidian Glass Design System",
    category: "Skills",
    type: "skill",
    badge: "SKILL.md",
    previewType: "canvas",
    previewTheme: "obsidian",
    description: "Official design tokens, blur levels, border opacity, and micro-interaction rules for high-contrast obsidian dark mode.",
    tags: ["Claude Code", "Cursor Rules", "Design Tokens", "Dark Mode"],
    likes: 260,
    featured: true,
    rawPrompt: `// Axes Lab Agent Skill: Obsidian Glass & Micro-Interactions
Follow these strict tokens: Canvas #050507, Surface #0B0B0F, Border rgba(255,255,255,0.07), Active rgba(255,255,255,0.9).`,
    sourceCode: `// Obsidian Glass Token Definition
export const obsidianTokens = {
  canvas: "#050507",
  surface: "#0B0B0F",
  border: "rgba(255, 255, 255, 0.07)",
  hover: "rgba(255, 255, 255, 0.18)"
};`,
    skillContent: `---
name: obsidian-glass-system
description: Rules and tokens for building ultra-polished obsidian dark interfaces matching MotionSites and Axes Lab.
---
# Obsidian Glass Design System Rules
1. Never use pure black #000000 for cards — use #0B0B0F or #0E0E14.
2. Card borders must be 1px solid rgba(255, 255, 255, 0.07).
3. On hover, elevate card by -4px and enhance border to rgba(255, 255, 255, 0.18).
4. Use Instrument Serif italic for signature accent words.
5. All buttons must have active:scale-95 and smooth transition-all duration-200.`,
    mcpCommand: `claude mcp add axeslab --scope user --transport http https://mcp.axeslab.ai/v1/mcp`,
  },

  {
    id: "item-skill-gsap-scroll",
    slug: "skill-gsap-scroll",
    title: "GSAP ScrollTrigger & Lenis Choreography",
    category: "Skills",
    type: "skill",
    badge: "SKILL.md",
    previewType: "canvas",
    previewTheme: "agent-wave",
    description: "Battle-tested smooth scroll choreography rules, pin triggers, and scrub timelines to eliminate jerky scroll lag.",
    tags: ["GSAP", "Lenis", "ScrollTrigger", "Animation"],
    likes: 218,
    featured: true,
    rawPrompt: `// Axes Lab Agent Skill: GSAP ScrollTrigger Choreography
Instructions for configuring Lenis smooth scroll with GSAP ScrollTrigger pinning and scrub transitions.`,
    sourceCode: `// GSAP Lenis Setup Example
import Lenis from '@studio-freight/lenis';
export function initScroll() { const lenis = new Lenis(); return lenis; }`,
    skillContent: `---
name: gsap-lenis-choreography
description: Architectural instructions for zero-lag smooth scrolling and pinned scroll transitions.
---
# Smooth Scroll & Choreography System
1. Initialize Lenis at root level with lerp: 0.1.
2. Synchronize Lenis raf loop with GSAP ticker.
3. Clean up all ScrollTrigger instances on unmount.`,
    mcpCommand: `Use Axes Lab MCP to fetch the GSAP ScrollTrigger skill and inject it into my project rules.`,
  },

  {
    id: "item-skill-threejs-hero",
    slug: "skill-threejs-hero",
    title: "Three.js & GLSL Shader Hero Architect",
    category: "Skills",
    type: "skill",
    badge: "SKILL.md",
    previewType: "canvas",
    previewTheme: "synaptic-forge",
    description: "Instructions for building 60fps WebGL canvas scenes with shader uniforms, resize handlers, and memory cleanup.",
    tags: ["Three.js", "GLSL", "Shaders", "WebGL"],
    likes: 194,
    featured: true,
    rawPrompt: `// Axes Lab Agent Skill: Three.js Hero Scene
Rules for setting up responsive camera aspect ratios, disposing geometries/materials to prevent memory leaks, and mouse lerping.`,
    sourceCode: `// Three.js Scene Cleanup Template
export function cleanupScene(scene, renderer) {
  scene.traverse(obj => { if (obj.geometry) obj.geometry.dispose(); });
  renderer.dispose();
}`,
    skillContent: `---
name: threejs-hero-architect
description: Rules for building WebGL canvas heroes in React with zero memory leaks and 60fps performance.
---
# Three.js Performance Protocol
1. Always dispose geometries and materials on useEffect return.
2. Cap pixelRatio to Math.min(window.devicePixelRatio, 2).
3. Throttle mouse interaction vectors via requestAnimationFrame.`,
    mcpCommand: `Use Axes Lab MCP to load the Three.js GLSL Hero skill into Claude Code.`,
  },
];
