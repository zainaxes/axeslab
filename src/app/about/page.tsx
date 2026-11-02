import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { Sparkles, Terminal, Layers, Cpu, ShieldCheck, ArrowRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "About Axes Lab — Mission & Architecture",
  description:
    "An independent technical reference library and design engineering platform documenting AI prompts, agent skills, WebGL modules, and MCP servers.",
};

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-12">
      <Breadcrumbs items={[{ label: "About Axes Lab", href: "/about" }]} />

      {/* Hero Header */}
      <header className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] via-[#0B0B12]/80 to-[#050507] border border-white/[0.08] p-8 sm:p-12 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-40 bg-violet-600/15 blur-[80px] pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow flex items-center justify-center">
            <div className="w-full h-full bg-[#050507] rounded-[15px] flex items-center justify-center p-2">
              <img src="/logo-white.png" alt="Axes Lab Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-semibold block">Official Directory &amp; Design Engine</span>
            <span className="text-xs text-zinc-400">Created by <a href="https://instagram.com/zainaxes" target="_blank" rel="noopener noreferrer" className="text-zinc-200 underline underline-offset-2">@zainaxes</a> (<a href="https://zainaxes.com" target="_blank" rel="noopener noreferrer" className="text-zinc-200 underline underline-offset-2">zainaxes.com</a>)</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Crafting the Next Generation of AI Websites &amp; Autonomous Workflows.
        </h1>
        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed">
          Axes Lab is a free, open-access technical reference index and component platform. We give designers, engineers, and AI developers production-verified prompts, agent skills, 3D WebGL backgrounds, and Model Context Protocol (MCP) servers.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-transform hover:scale-105 active:scale-95"
          >
            <span>Browse 640+ Prompts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/mcp"
            className="inline-flex items-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            <span>Connect MCP Server</span>
          </Link>
        </div>
      </header>

      {/* Grid Pillars */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">What Powers Axes Lab</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <Terminal className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Production AI Prompts</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Curated, production-tested system directives engineered for Claude 3.7 Sonnet, GPT-4.5, Gemini 2.0, DeepSeek, and Cursor. Structured with clear variables and zero guesswork.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Agent Skills &amp; MCP</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Standardized `SKILL.md` rules and Model Context Protocol endpoints so AI agents can inspect codebases, execute verified CLI workflows, and assemble design systems automatically.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-white">Interactive 3D &amp; Motion</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Interactive WebGL canvas animations, Three.js shaders, animated gradients, and Tailwind UI components that agencies charge thousands of dollars to create.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Details */}
      <div className="prose prose-invert prose-sm leading-relaxed space-y-8 text-zinc-300 text-sm">
        <section className="space-y-3 border-t border-white/[0.08] pt-8">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Our Editorial &amp; Verification Standard
          </h2>
          <p>
            The artificial intelligence design space is overloaded with low-effort regurgitations and generic prompt packs. Axes Lab operates with an uncompromising standard:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-zinc-400">
            <li><strong>Verified Working Code:</strong> Every prompt or component is verified to produce executable code in Next.js, React, or standard web frameworks.</li>
            <li><strong>Safety &amp; Transparency:</strong> We never bundle untrusted or obfuscated shell executions. Tools with filesystem or network permissions are explicitly identified.</li>
            <li><strong>100% Free &amp; Unlocked:</strong> No locked tiers, forced Discord invites, or subscriptions to access prompts and MCP schemas.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-white/[0.08] pt-8">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Compass className="w-5 h-5 text-violet-400" />
            Explore the Ecosystem
          </h2>
          <p>
            Dive deeper into our technical documentation and governance policies:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs not-prose my-4">
            <Link href="/licensing" className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-colors text-white block">
              <span className="font-semibold block mb-0.5">Licensing</span>
              <span className="text-zinc-400 text-[11px]">Usage &amp; attribution</span>
            </Link>
            <Link href="/safety-and-security" className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-colors text-white block">
              <span className="font-semibold block mb-0.5">Safety &amp; Trust</span>
              <span className="text-zinc-400 text-[11px]">Sanitization &amp; review</span>
            </Link>
            <Link href="/privacy" className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-colors text-white block">
              <span className="font-semibold block mb-0.5">Privacy Policy</span>
              <span className="text-zinc-400 text-[11px]">Zero tracking policy</span>
            </Link>
            <Link href="/terms" className="p-3 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-colors text-white block">
              <span className="font-semibold block mb-0.5">Terms of Use</span>
              <span className="text-zinc-400 text-[11px]">Directory agreement</span>
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
