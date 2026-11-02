'use client';

import React, { useState } from 'react';
import { PreFooter } from '@/components/PreFooter';
import { toast } from 'sonner';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      toast.error('Email and message are required');
      return;
    }
    setSent(true);
    toast.success('Message sent to editorial group');
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Direct correspondence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Contact editorial and engineering
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Report broken code specifications, request resource takedowns, or suggest technical integrations.
          </p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-4 sm:px-8 py-10">
        {sent ? (
          <div className="p-8 rounded-card bg-paper-2 border border-rule text-center space-y-3">
            <span className="w-2 h-2 rounded-full bg-ok inline-block" />
            <h2 className="text-lg font-display font-medium text-ink">
              Message dispatched
            </h2>
            <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
              We respond to technical verification notes and licensing questions within 24 hours.
            </p>
            <button
              onClick={() => {
                setSent(false);
                setFormData({ name: '', email: '', message: '' });
              }}
              className="mt-4 px-4 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink hover:bg-rule transition-colors duration-150"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 rounded-card bg-paper-2 border border-rule space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                Name (optional)
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe"
                className="w-full px-3 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                Email address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@example.com"
                className="w-full px-3 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe the issue, takedown request, or question…"
                className="w-full p-3 rounded-card bg-paper-3 border border-rule text-xs text-ink placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-pill bg-accent text-accent-ink font-medium text-xs hover:opacity-90 active:opacity-100 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                Send message
              </button>
            </div>
          </form>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
