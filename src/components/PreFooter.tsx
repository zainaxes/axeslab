'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

export function PreFooter() {
  return (
    <section className="max-w-5xl mx-auto my-20 px-4 sm:px-6">
      <div className="relative rounded-3xl bg-gradient-to-b from-white/[0.05] via-[#0B0B12]/80 to-[#050507] border border-white/[0.08] p-10 sm:p-14 text-center overflow-hidden shadow-2xl">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-violet-600/20 blur-[90px] pointer-events-none" />

        {/* Brand Logo Mark */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-400 p-[1px] shadow-glow mx-auto mb-6 flex items-center justify-center">
          <div className="w-full h-full bg-[#050507] rounded-[15px] flex items-center justify-center p-2.5">
            <img
              src="/logo-white.png"
              alt="Axes Lab Mark"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          Develop Your AI Design & Agent Skills That Stand Out.
        </h2>

        {/* Pull-Quote Subtitle */}
        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          &ldquo;Give Me Just a Few Minutes And Axes Lab Will Show You How To Create AI Design Websites & Agentic Workflows That Most Agencies Charge $5,000 For&rdquo;
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          <Link
            href="/mcp"
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
          >
            <span>Explore the Full Library & MCP →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
