'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowWord } from '@/components/GlowWord';
import { ITEMS_DATABASE, ItemRecord } from '@/lib/items-data';
import { PreFooter } from '@/components/PreFooter';
import { Copy, Check, Terminal, Download, ArrowRight, ShieldCheck, Sparkles, Layers, Box } from 'lucide-react';
import { toast } from 'sonner';

export default function SkillsPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [copiedSkillType, setCopiedSkillType] = useState<string | null>(null);

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

  const handleCopyNamedSkill = async (type: 'merged' | 'axeslab' | 'axeskit') => {
    try {
      const res = await fetch(`/api/skill/download?type=${type}`);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
      setCopiedSkillType(type);
      toast.success(`Copied ${type.toUpperCase()} SKILL.md!`, {
        description: 'Ready to paste into your .gemini/skills/ or project agent config.',
      });
      setTimeout(() => setCopiedSkillType(null), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>axeslab &amp; axeskit unified intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Production-Grade AI <GlowWord text="Skills" /> &amp; Rules
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Equip Claude Code, Cursor, Windsurf, or Google Antigravity with verified UI/UX design intelligence, design tokens, and motion scaffolding blueprints.
        </p>
      </section>

      {/* Featured Master Merged Skill */}
      <section className="max-w-4xl mx-auto mb-10">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#161226] to-[#0A0A0F] border border-violet-500/40 p-8 sm:p-10 shadow-[0_0_60px_rgba(139,92,246,0.18)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-violet-600/25 border border-violet-500/40 flex items-center justify-center text-violet-300 shadow-inner">
                <Sparkles className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Axes Lab &amp; AxesKit Master Skill</h2>
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    Unified v2.0
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono mt-1">Merged SKILL.md · Full UI/UX Design System + Motion Scaffolding</p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="/api/skill/download?type=merged"
                download="axeslab-axeskit-master-SKILL.md"
                className="bg-white hover:bg-zinc-200 text-black font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Master SKILL.md</span>
              </a>

              <button
                onClick={() => handleCopyNamedSkill('merged')}
                className="bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white text-xs sm:text-sm px-4 py-2.5 rounded-xl font-medium transition-all flex items-center gap-2"
              >
                {copiedSkillType === 'merged' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSkillType === 'merged' ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase text-zinc-400">AxesKit Layer</h4>
              <p className="text-xs text-zinc-300">Design systems, style taxonomies, icon libraries, fonts, and sound effects.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase text-zinc-400">Axes Lab Layer</h4>
              <p className="text-xs text-zinc-300">137 production motion blueprints, 3D interactive cubes, and Next.js scaffolds.</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase text-zinc-400">Live MCP Server</h4>
              <Link href="/mcp" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                <span>axeslab mcp server (Merged v2.0)</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Skill Cards */}
      <section className="max-w-4xl mx-auto mb-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Axes Lab Standalone */}
        <div className="p-6 rounded-3xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Box className="w-5 h-5 text-violet-400" />
              <h3 className="text-lg font-bold text-white">axeslab skill</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Focuses specifically on Framer Motion choreography, dark canvas architecture, and component scaffolding.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
            <a
              href="/api/skill/download?type=axeslab"
              download="axeslab-SKILL.md"
              className="flex-1 bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs py-2 rounded-xl text-center font-medium transition-all"
            >
              Download
            </a>
            <button
              onClick={() => handleCopyNamedSkill('axeslab')}
              className="px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] rounded-xl text-xs text-zinc-300 transition-all flex items-center gap-1"
            >
              {copiedSkillType === 'axeslab' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>

        {/* AxesKit Standalone */}
        <div className="p-6 rounded-3xl bg-[#0B0B10] border border-white/[0.08] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">axeskit skill</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4">
              Focuses on UI/UX Pro design tokens, 79 style taxonomies, color palette logic, and multi-asset libraries.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
            <a
              href="/api/skill/download?type=axeskit"
              download="axeskit-SKILL.md"
              className="flex-1 bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs py-2 rounded-xl text-center font-medium transition-all"
            >
              Download
            </a>
            <button
              onClick={() => handleCopyNamedSkill('axeskit')}
              className="px-3 py-2 bg-white/[0.06] hover:bg-white/[0.12] rounded-xl text-xs text-zinc-300 transition-all flex items-center gap-1"
            >
              {copiedSkillType === 'axeskit' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy</span>
            </button>
          </div>
        </div>
      </section>

      {/* Blueprints Grid */}
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
