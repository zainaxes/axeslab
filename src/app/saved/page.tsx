'use client';

import React, { useState, useEffect } from 'react';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { ALL_REAL_PROMPTS, PromptItem } from '@/lib/real-prompts';
import { PreFooter } from '@/components/PreFooter';
import Link from 'next/link';

export default function SavedPage() {
  const [savedPrompts, setSavedPrompts] = useState<PromptItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('axeslab_saved_prompts');
      if (stored) {
        const ids = JSON.parse(stored);
        const filtered = ALL_REAL_PROMPTS.filter((p) => ids.includes(p.id) || ids.includes(p.slug));
        setSavedPrompts(filtered);
      }
    } catch {}
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      <section className="border-b border-rule bg-paper-2 pt-10 pb-6 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Local machine storage</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
            Saved prompts and bookmarks
          </h1>
          <p className="text-sm text-muted max-w-xl leading-relaxed">
            Your locally saved prompts. Persisted on this machine without tracking or account creation.
          </p>
        </div>
      </section>

      <section className="max-w-[var(--container)] mx-auto px-4 sm:px-8 py-6">
        <div className="flex items-center justify-between text-xs text-muted pb-3 border-b border-rule">
          <span>{savedPrompts.length} bookmarks stored locally</span>
          <span>Zero cloud synchronization</span>
        </div>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden mt-3">
          <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted">
            <div className="flex items-center gap-3">
              <span className="w-7 text-right">No.</span>
              <span className="w-1.5"></span>
              <span>Prompt name</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="hidden lg:inline-block">Tokens</span>
              <span className="w-20 text-center">Action</span>
            </div>
          </div>

          {loaded && savedPrompts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-xs text-muted">
                No saved prompts yet. Browse the registry and click copy or inspect to save items.
              </p>
              <Link
                href="/"
                className="inline-block text-xs px-3 py-1.5 rounded-pill bg-paper-3 border border-rule text-ink hover:bg-rule transition-colors duration-150"
              >
                Browse directory
              </Link>
            </div>
          ) : (
            savedPrompts.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))
          )}
        </div>
      </section>

      <PreFooter />
    </div>
  );
}
