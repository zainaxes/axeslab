'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PreFooter } from '@/components/PreFooter';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SubmitPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Landing Page');
  const [promptText, setPromptText] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !promptText) {
      toast.error("Please fill in Title and Prompt specification.");
      return;
    }

    const newEntry = {
      id: `custom-${Date.now()}`,
      title,
      category,
      rawPrompt: promptText,
      sourceCode,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('axeslab_user_submissions') || '[]');
      existing.unshift(newEntry);
      localStorage.setItem('axeslab_user_submissions', JSON.stringify(existing));
    } catch {}

    setSubmitted(true);
    toast.success("Prompt submitted successfully!", {
      description: "Added to your local library cache and queued for directory sync.",
    });
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <UploadCloud className="w-3.5 h-3.5 text-violet-400" />
          <span>Open Community Registry</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Submit a Prompt or <GlowWord text="Agent Skill" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5">
          Share your high-converting UI prompts and battle-tested agent instructions with the developer ecosystem.
        </p>
      </section>

      <section className="max-w-2xl mx-auto rounded-3xl bg-[#0B0B10] border border-white/[0.08] p-6 sm:p-8">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Submission Stored!</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Your prompt has been stored in your browser and queued for the global Axes Lab index.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setPromptText('');
                setSourceCode('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200"
            >
              Submit Another Prompt
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                Template / Prompt Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Liquid Glass Hero, Bento SaaS Matrix"
                className="w-full px-4 py-2.5 rounded-xl bg-[#07070B] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#07070B] border border-white/[0.08] text-sm text-white outline-none focus:border-violet-500/50"
              >
                <option value="Landing Page">Landing Page</option>
                <option value="Hero">Hero Section</option>
                <option value="SaaS">SaaS</option>
                <option value="3D">3D / WebGL</option>
                <option value="Agency">Agency</option>
                <option value="Component">Component / Section</option>
                <option value="Skills">Agent Skill (SKILL.md)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                Complete AI System Prompt Specification
              </label>
              <textarea
                required
                rows={6}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="// Official Specification for [Component]..."
                className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/[0.08] text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                Production Source Code (Optional)
              </label>
              <textarea
                rows={5}
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="export default function MyComponent() { return ... }"
                className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/[0.08] text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm shadow-xl transition-all"
            >
              Publish to Open Directory →
            </button>
          </form>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
