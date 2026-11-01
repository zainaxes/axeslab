'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowWord } from '@/components/GlowWord';
import { ITEMS_DATABASE, ItemRecord } from '@/lib/items-data';
import { PreFooter } from '@/components/PreFooter';
import { Copy, Check, Terminal, Download, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function SkillsPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copiedMasterSkill, setCopiedMasterSkill] = useState(false);

  const skills = ITEMS_DATABASE.filter((i) => i.type === 'skill');

  const handleCopySkill = async (item: ItemRecord) => {
    try {
      await navigator.clipboard.writeText(item.skillContent);
      setCopiedSlug(item.slug);
      toast.success(`Copied "${item.title}" SKILL.md!`, {
        description: "Drop this directly into your project's .gemini/skills/ or Claude Code.",
      });
      setTimeout(() => setCopiedSlug(null), 2000);
    } catch {}
  };

  const handleCopyMasterSkill = async () => {
    try {
      const res = await fetch('/api/skill/download');
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedMasterSkill(true);
      toast.success('Copied axeslab skill (SKILL.md)!', {
        description: 'Ready to paste into your .gemini/skills/ or project agent config.',
      });
      setTimeout(() => setCopiedMasterSkill(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>axeslab skill &amp; intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Production-Grade AI <GlowWord text="Skills" /> &amp; Rules
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Download or copy the official <strong>axeslab skill</strong> to guide Claude Code, Cursor, Windsurf, or Google Antigravity in scaffolding verified, production-grade UI components.
        </p>
      </section>

      {/* Featured Master: axeslab skill */}
      <section className="max-w-4xl mx-auto mb-16">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#12111E] to-[#0A0A0F] border border-violet-500/30 p-8 sm:p-10 shadow-[0_0_50px_rgba(139,92,246,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-inner">
                <Sparkles className="w-5 h-5" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">axeslab skill</h2>
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                    Official
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">SKILL.md · Autonomous UI Scaffolding</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/api/skill/download"
                download="SKILL.md"
                className="bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download SKILL.md</span>
              </a>

              <button
                onClick={handleCopyMasterSkill}
                className="bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
              >
                {copiedMasterSkill ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedMasterSkill ? 'Copied!' : 'Copy Skill'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400">Target Agents</h4>
              <p className="text-xs text-zinc-300">Claude Code, Cursor, Windsurf, Codex, Google Antigravity</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400">What It Does</h4>
              <p className="text-xs text-zinc-300">Enforces dark luxury palette, Framer Motion choreography, and accessible Next.js scaffolding</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400">Companion Server</h4>
              <Link href="/mcp" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                <span>axeslab mcp server</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="max-w-5xl mx-auto">
        <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Specialized Design Blueprints</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="group rounded-3xl bg-[#0B0B10] border border-white/[0.08] hover:border-violet-500/40 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 uppercase font-semibold">
                    SKILL.md
                  </span>
                  <span className="text-xs font-mono text-zinc-500">v1.2</span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                  {skill.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {skill.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {skill.tags.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/[0.06] mt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopySkill(skill)}
                  className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold text-xs py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  {copiedSlug === skill.slug ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied SKILL.md!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy SKILL.md</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PreFooter />
    </div>
  );
}
