'use client';

import React, { useState } from 'react';
import { PreFooter } from '@/components/PreFooter';
import { toast } from 'sonner';

export default function SubmitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Design System',
    author: '',
    url: '',
    prompt: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.prompt) {
      toast.error('Title and prompt text are required');
      return;
    }
    setSubmitted(true);
    toast.success('Resource submitted for verification');
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Open contribution</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Submit a prompt or agent skill
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Submit production-verified prompts, MCP server definitions, or design systems.
          </p>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 sm:px-8 py-10">
        {submitted ? (
          <div className="p-8 rounded-card bg-paper-2 border border-rule text-center space-y-3">
            <span className="w-2 h-2 rounded-full bg-ok inline-block" />
            <h2 className="text-lg font-display font-medium text-ink">
              Submission received
            </h2>
            <p className="text-xs text-muted max-w-md mx-auto leading-relaxed">
              Our review group will inspect the code specification for safety, executable syntax, and license attribution before publishing to the registry.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ title: '', category: 'Design System', author: '', url: '', prompt: '' });
              }}
              className="mt-4 px-4 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink hover:bg-rule transition-colors duration-150"
            >
              Submit another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 rounded-card bg-paper-2 border border-rule space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                Resource title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Minimalist Bento Dashboard"
                className="w-full px-3 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-ink">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink outline-none focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <option value="Design System">Design System</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="SaaS & Dashboard">SaaS & Dashboard</option>
                  <option value="3D WebGL">3D WebGL</option>
                  <option value="Background & Shader">Background & Shader</option>
                  <option value="MCP & Agent Directive">MCP & Agent Directive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-ink">
                  Author / Handle
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="@yourhandle or repository"
                  className="w-full px-3 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                Live URL or Repository (optional)
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-pill bg-paper-3 border border-rule text-xs text-ink placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-ink">
                Verbatim prompt or system directive
              </label>
              <textarea
                required
                rows={6}
                value={formData.prompt}
                onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                placeholder="Paste the full, executable prompt..."
                className="w-full p-3 rounded-card bg-paper-3 border border-rule text-xs text-ink font-mono placeholder:text-muted outline-none focus-visible:outline-2 focus-visible:outline-accent"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded-pill bg-accent text-accent-ink font-medium text-xs hover:opacity-90 active:opacity-100 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                Submit for review
              </button>
            </div>
          </form>
        )}
      </section>

      <PreFooter />
    </div>
  );
}
