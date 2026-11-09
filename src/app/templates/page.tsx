import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { TEMPLATES } from '@/lib/templates-data';
import { ArrowRight, Sparkles, SlidersHorizontal, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Templates · Axes Lab Motion Library',
  description: 'Reusable prompt templates written for motion design and real-time generation, with verified parameter fields and live outputs.',
};

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-10 px-4 sm:px-8">
      <main className="max-w-[var(--container)] mx-auto space-y-10">
        
        {/* Header */}
        <section className="pt-4 pb-4 border-b border-rule space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-muted text-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Curated Reusable Blueprints</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-ink">
            Templates
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Prompts written specifically to be customized: every variable you’d change is an explicit parameter. Each blueprint has been verified in production with Claude Opus 5.5.
          </p>
        </section>

        {/* Template Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <Link
              key={tpl.id}
              href={`/templates/${tpl.slug}`}
              className="group flex flex-col rounded-card bg-paper-2 border border-rule hover:border-rule-2 transition-all duration-150 overflow-hidden focus-visible:outline-2 focus-visible:outline-accent"
            >
              {/* Media Viewport */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper-3">
                <img
                  src={tpl.poster}
                  alt={tpl.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-pill bg-paper/90 border border-rule text-ink backdrop-blur-sm">
                    {tpl.model}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                <div>
                  <h2 className="flex items-center justify-between font-display font-medium text-sm text-ink group-hover:text-cool transition-colors">
                    <span>{tpl.title}</span>
                    <ArrowRight className="w-4 h-4 text-muted group-hover:text-cool group-hover:translate-x-0.5 transition-all" />
                  </h2>
                  <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-3">
                    {tpl.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-rule/50 text-[11px] font-mono text-muted">
                  <span>{tpl.fields.length} dynamic fields</span>
                  {tpl.subtext && <span className="text-cool">{tpl.subtext}</span>}
                </div>
              </div>
            </Link>
          ))}

          {/* Coming Soon Card per Reference */}
          <div className="flex flex-col rounded-card border border-dashed border-rule bg-paper-3/40 p-6 justify-center items-center text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-paper-2 border border-rule flex items-center justify-center text-muted">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-medium text-ink">More coming soon</h3>
            <p className="text-xs text-muted max-w-xs leading-relaxed">
              Next up: the explainer, product film and short film templates.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
