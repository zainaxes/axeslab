'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PreFooter } from '@/components/PreFooter';
import { Wand2, Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { toast } from 'sonner';

export default function RestylePage() {
  const [existingCode, setExistingCode] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('liquid-glass');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const styles = [
    { id: 'liquid-glass', name: 'Liquid Glass & Specular Glow', desc: 'Frosted surfaces, subtle 1px border highlight, ambient refraction.' },
    { id: 'cyber-obsidian', name: 'Cybernetic Obsidian', desc: 'Pure void background (#050507), neon cyan/violet accents, monospace accents.' },
    { id: 'editorial-brutalist', name: 'Editorial Luxury Brutalist', desc: 'Instrument Serif typography, high-fashion monochrome hierarchy.' },
    { id: '3d-particle-shader', name: '3D Particle Shader', desc: 'WebGL point-cloud lattice, smooth canvas motion physics.' },
    { id: 'linear-saas', name: 'Linear-Style High Velocity', desc: 'Ultra-compact typography, keyboard navigation shortcuts, status pills.' },
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const chosen = styles.find((s) => s.id === selectedStyle);

    const prompt = `// Official Axes Lab Master Refactoring Prompt
// Target Architecture: Transform existing interface into "${chosen?.name}"
// Visual Direction: ${chosen?.desc}

Role: You are a Principal UI/UX Motion Designer at Axes Lab.
Refactor the provided component code completely, applying the following design system rules:

1. Color Palette:
   - Background Canvas: #050507 (Deep Obsidian Void)
   - Elevated Card Surfaces: #0B0B0F / #0E0E14 with backdrop-blur-2xl
   - Borders: 1px solid rgba(255, 255, 255, 0.07), enhancing to rgba(255, 255, 255, 0.18) on hover.
   - Text Tokens: #FAFAFA foreground, #A1A1AA muted secondary, #71717A metadata.

2. Typography:
   - Primary: 'Plus Jakarta Sans'
   - Accents: 'Instrument Serif' italic for highlighted words.
   - Badges & Telemetry: 'JetBrains Mono' uppercase text-[11px].

3. Motion & Micro-Interactions:
   - Card elevation: hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)].
   - Interactive buttons: active:scale-95 duration-200.

Existing Code to Refactor:
\`\`\`tsx
${existingCode || '// [No code provided — generate standalone template]'}
\`\`\`

Produce the complete, copy-pasteable production React 19 + Tailwind CSS component.`;

    setGeneratedPrompt(prompt);
    toast.success("Generated Master Restyle Prompt!");
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success("Copied Restyle Prompt to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Wand2 className="w-3.5 h-3.5 text-violet-400" />
          <span>Interactive AI Restyler</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Redesign Any Site with <GlowWord text="Restyle Studio" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5">
          Paste your existing ugly UI or component code, pick a signature Axes Lab aesthetic, and generate a customized Master Refactoring Prompt for Cursor or Claude Code.
        </p>
      </section>

      <section className="max-w-3xl mx-auto rounded-3xl bg-[#0B0B10] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Step 1: Pick Style */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              1. Choose Visual Direction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {styles.map((s) => {
                const isSelected = selectedStyle === s.id;
                return (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStyle(s.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-violet-600/15 border-violet-500 text-white shadow-glow'
                        : 'bg-[#0E0E14] border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.15]'
                    }`}
                  >
                    <h4 className="text-xs font-bold text-white">{s.name}</h4>
                    <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">{s.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Paste Code */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              2. Paste Current UI Component Code (or description)
            </label>
            <textarea
              rows={6}
              value={existingCode}
              onChange={(e) => setExistingCode(e.target.value)}
              placeholder="export default function OldHero() { return <div className='p-4 bg-gray-100'>...</div> }"
              className="w-full rounded-2xl bg-[#07070B] border border-white/[0.08] p-4 text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black hover:bg-zinc-200 font-bold text-sm py-3 rounded-2xl transition-transform hover:scale-[1.01] active:scale-95 shadow-xl flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4 text-violet-600" />
            <span>Generate Master Refactoring Prompt</span>
          </button>
        </form>

        {generatedPrompt && (
          <div className="pt-6 border-t border-white/[0.08] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-violet-300">Generated Master Refactor Prompt</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200 shadow-md transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Prompt'}</span>
              </button>
            </div>
            <pre className="max-h-72 overflow-y-auto rounded-2xl bg-[#07070B] border border-white/[0.08] p-4 font-mono text-xs text-zinc-200 whitespace-pre-wrap select-text">
              <code>{generatedPrompt}</code>
            </pre>
          </div>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
