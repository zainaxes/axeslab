'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { ITEMS_DATABASE, ItemRecord } from '@/lib/items-data';
import { AnimatedCanvasPreview } from '@/components/AnimatedCanvasPreview';
import { PreFooter } from '@/components/PreFooter';
import { Copy, Check, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function SkillsPage() {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>Plug-and-Play Agent Intelligence</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Production-Grade AI <GlowWord text="Skills" /> &amp; Rules
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Drop battle-tested SKILL.md files, .cursorrules, and motion architecture instructions into Claude Code, Cursor, or Windsurf to eliminate generic AI UI forever.
        </p>
      </section>

      {/* Skills Grid */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </section>

      <PreFooter />
    </div>
  );
}
