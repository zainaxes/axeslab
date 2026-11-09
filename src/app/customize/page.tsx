import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { TEMPLATES } from '@/lib/templates-data';
import { SlidersHorizontal, Sparkles, ArrowRight, Play } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Customize a Prompt · Axes Lab',
  description: 'Start from a verified prompt that already generated production motion. Adjust format, style, and parameters, then copy your customized version.',
};

export default function CustomizeHubPage() {
  // Most liked / curated customizable prompts
  const customizablePrompts = ALL_REAL_PROMPTS.filter((p) => p.hasCustomize).slice(0, 36);

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-10 px-4 sm:px-8">
      <main className="max-w-[var(--container)] mx-auto space-y-12">
        
        {/* Header per Reference */}
        <section className="pt-4 pb-6 border-b border-rule space-y-2">
          <h1 className="flex items-center gap-2.5 text-2xl sm:text-3xl font-display font-medium text-ink">
            <SlidersHorizontal className="w-6 h-6 text-cool" />
            <span>Customize a prompt</span>
          </h1>
          <p className="mt-2 max-w-2xl text-xs sm:text-sm text-muted leading-relaxed">
            Start from a prompt that already made something good. Add what your video is for, its format, colours and anything else, then copy a version made for you. It's free, and your details stay in your browser.
          </p>
        </section>

        {/* Section 1: Curated Templates */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-display font-medium text-ink">
              Templates
            </h2>
            <p className="text-xs text-muted">
              Written to be customized: every part you'd change is an explicit parameter field.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {TEMPLATES.map((tpl) => (
              <Link
                key={tpl.id}
                href={`/templates/${tpl.slug}/customize`}
                className="group flex items-center gap-4 rounded-card bg-paper-2 border border-rule hover:border-rule-2 p-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-pill bg-paper-3">
                  <img
                    src={tpl.poster}
                    alt={tpl.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display font-medium text-xs sm:text-sm text-ink group-hover:text-cool transition-colors truncate">
                    {tpl.title}
                  </h3>
                  <p className="text-[11px] text-muted line-clamp-2 mt-0.5">
                    {tpl.description}
                  </p>
                  <span className="font-mono text-[10px] text-cool mt-1 inline-block">
                    {tpl.fields.length} editable fields · Launch customizer →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Most Liked / Trending Customizable Prompts */}
        <section className="space-y-4 pt-4 border-t border-rule">
          <div>
            <h2 className="text-lg font-display font-medium text-ink">
              Customizable Prompts ({ALL_REAL_PROMPTS.filter(p => p.hasCustomize).length})
            </h2>
            <p className="text-xs text-muted">
              Select any motion directive to launch its prompt customizer engine.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {customizablePrompts.map((item) => (
              <Link
                key={item.id}
                href={`/customize/${item.slug}`}
                className="group flex items-center gap-3.5 rounded-card bg-paper-2 border border-rule hover:border-rule-2 p-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-pill bg-paper-3">
                  {item.poster && (
                    <img
                      src={item.poster}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-mono text-[10px] text-muted block mb-0.5">
                    {item.subcategory} · @{item.handle}
                  </span>
                  <h3 className="font-sans font-medium text-xs text-ink group-hover:text-cool transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-paper-3 border border-rule text-muted">
                      {item.customizerType === 'field_replacement' ? 'Parameter rewrite' : 'Override block'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

