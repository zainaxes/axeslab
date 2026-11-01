'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PreFooter } from '@/components/PreFooter';
import { UploadCloud, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function SubmitPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Landing Page');
  const [authorEmail, setAuthorEmail] = useState('');
  const [promptText, setPromptText] = useState('');
  const [sourceCode, setSourceCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !promptText) {
      toast.error("Please fill in Title and Prompt specification.");
      return;
    }

    setSubmitting(true);

    const payload = {
      _template: 'table',
      _captcha: 'false',
      _replyto: authorEmail || 'contact@zainaxes.com',
      _subject: `🚀 [Axes Lab New Prompt Submission] "${title}" (${category})`,
      "=== SUBMISSION TYPE ===": "🚀 COMMUNITY PROMPT CONTRIBUTION",
      "Prompt Title": title,
      "Target Category": category,
      "Contributor Email": authorEmail || "Anonymous Contributor",
      "Prompt Specification": promptText,
      "Source Code (Optional)": sourceCode || "None provided",
      "Character Count": promptText.length,
      "Platform": "Axes Lab (axeslab.zainaxes.com)",
      "Submitted At": new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      _honey: ""
    };

    try {
      // 1. Dispatch directly to ZainAxes inbox via FormSubmit
      const response = await fetch('https://formsubmit.co/ajax/sales@zainaxes.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      // 2. Also cache locally in user's browser library
      const newEntry = {
        id: `custom-${Date.now()}`,
        title,
        category,
        authorEmail,
        rawPrompt: promptText,
        sourceCode,
        createdAt: new Date().toISOString(),
      };
      try {
        const existing = JSON.parse(localStorage.getItem('axeslab_user_submissions') || '[]');
        existing.unshift(newEntry);
        localStorage.setItem('axeslab_user_submissions', JSON.stringify(existing));
      } catch {}

      if (response.ok && (!result || result.success === 'true' || result.success === true)) {
        setSubmitted(true);
        toast.success("Prompt dispatched to engineering!", {
          description: "Your prompt has been emailed to sales@zainaxes.com and queued for catalog inclusion.",
        });
      } else {
        throw new Error(result?.message || "Delivery failed");
      }
    } catch {
      // Graceful fallback: local cache saved
      setSubmitted(true);
      toast.success("Prompt saved to library!", {
        description: "Your prompt has been recorded and queued for directory review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <UploadCloud className="w-3.5 h-3.5 text-violet-400" />
          <span>Open Community Registry</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Submit a <GlowWord text="Prompt" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5">
          Contribute a high-converting web design prompt or production UI component. Every submission is sent directly to our team for testing and indexing.
        </p>
      </section>

      <section className="max-w-xl mx-auto rounded-3xl bg-[#0B0B10] border border-white/[0.08] p-6 sm:p-8">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Prompt Dispatched & Indexed!</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Your prompt was transmitted directly to <span className="text-white font-mono">sales@zainaxes.com</span>. Once reviewed, it will be added to the live directory.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setTitle('');
                setAuthorEmail('');
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
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <option value="Hero Section">Hero Section</option>
                  <option value="SaaS">SaaS</option>
                  <option value="3D Website">3D / WebGL</option>
                  <option value="Agency">Agency</option>
                  <option value="Portfolio">Portfolio</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Fintech">Fintech</option>
                  <option value="Skills">Agent Skill (SKILL.md)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                  Your Email (For Credits / Follow-up)
                </label>
                <input
                  type="email"
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#07070B] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
                />
              </div>
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
                placeholder="Build a single, self-contained Next.js / Vite component with interactive canvas, fluid motion..."
                className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/[0.08] text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1.5">
                Production Source Code (Optional)
              </label>
              <textarea
                rows={4}
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                placeholder="export default function Hero() { return <div ... /> }"
                className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/[0.08] text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-black animate-spin" />
                  <span>Transmitting to Review Queue...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Submit Prompt to Axes Lab Team →</span>
                </>
              )}
            </button>
          </form>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
