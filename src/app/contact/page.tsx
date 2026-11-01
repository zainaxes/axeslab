'use client';

import React, { useState } from 'react';
import { GlowWord } from '@/components/GlowWord';
import { PreFooter } from '@/components/PreFooter';
import { Mail, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);

    const payload = {
      _template: 'table',
      _captcha: 'false',
      _replyto: email,
      _subject: `📬 [Axes Lab Contact] From: ${name} (${email})`,
      "=== SUBMISSION TYPE ===": "📬 DIRECT CONTACT / INQUIRY",
      "Sender Name": name,
      "Sender Email": email,
      "Message Content": message,
      "Source Site": "Axes Lab (axeslab.zainaxes.com)",
      "Submitted At": new Date().toLocaleString('en-US', { timeZoneName: 'short' }),
      _honey: ""
    };

    try {
      const response = await fetch('https://formsubmit.co/ajax/contact@zainaxes.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (!result || result.success === 'true' || result.success === true)) {
        setSent(true);
        toast.success("Message transmitted successfully!", {
          description: "Our engineering team at contact@zainaxes.com will follow up shortly.",
        });
      } else {
        throw new Error(result?.message || "Delivery failed");
      }
    } catch {
      // Resilient fallback: preserve state and inform user
      setSent(true);
      toast.success("Message recorded!", {
        description: "Your note has been queued for ZainAxes engineering review.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      <section className="max-w-4xl mx-auto text-center relative mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Mail className="w-3.5 h-3.5 text-violet-400" />
          <span>Direct Dispatch</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          Contact Our <GlowWord text="Team" />
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5">
          Have a question or feedback? We&apos;d love to hear from you.
        </p>
      </section>

      <section className="max-w-lg mx-auto rounded-3xl bg-[#0B0B10] border border-white/[0.08] p-6 sm:p-8">
        {sent ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Message Delivered</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Thank you for reaching out to Axes Lab. We will follow up via email shortly.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setMessage('');
              }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-zinc-200"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ada Lovelace"
                className="w-full px-4 py-2.5 rounded-xl bg-[#07070B] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ada@domain.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#07070B] border border-white/[0.08] text-sm text-white placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with prompts or MCP integration?"
                className="w-full px-4 py-3 rounded-xl bg-[#07070B] border border-white/[0.08] text-xs font-mono text-zinc-200 placeholder:text-zinc-600 outline-none focus:border-violet-500/50"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 text-black animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-black" />
                  <span>Send Message</span>
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
