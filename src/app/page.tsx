import React from 'react';
import Link from 'next/link';
import { ALL_REAL_PROMPTS } from '@/lib/real-prompts';
import { PromptRegistryRow } from '@/components/PromptRegistryRow';
import { PreFooter } from '@/components/PreFooter';
import {
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  Code2,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const featuredPrompts = ALL_REAL_PROMPTS.slice(0, 8);
  const totalPrompts = ALL_REAL_PROMPTS.length;

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased">
      
      {/* 1. Hero Stage: The Developer Architecture Platform */}
      <section className="border-b border-rule bg-paper-2 pt-16 sm:pt-24 pb-16 px-4 sm:px-8">
        <div className="max-w-[var(--container)] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Clear Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted text-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cool" />
                <span>Axes Lab · Production reference library</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-ink tracking-display leading-[1.05]">
                AI web design and agent registry
              </h1>

              <p className="text-base text-muted max-w-xl leading-relaxed">
                640 verified system directives, WebGL shaders, and Model Context Protocol servers.
              </p>

              {/* Action Pair */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/prompts"
                  className="px-5 py-2.5 rounded-pill bg-accent text-accent-ink font-sans font-medium text-xs hover:opacity-90 active:opacity-100 transition-opacity duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span>Browse catalog ({totalPrompts})</span>
                </Link>
                <Link
                  href="/mcp"
                  className="px-5 py-2.5 rounded-pill bg-paper-3 border border-rule text-ink hover:bg-rule transition-colors duration-150 text-xs font-medium focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span>Connect MCP server</span>
                </Link>
              </div>

              {/* Verified Metrics Strip */}
              <div className="pt-6 border-t border-rule grid grid-cols-3 gap-4 max-w-md text-xs">
                <div>
                  <span className="font-mono text-base font-medium text-ink block">642</span>
                  <span className="text-muted">Verified prompts</span>
                </div>
                <div>
                  <span className="font-mono text-base font-medium text-ink block">125+</span>
                  <span className="text-muted">Categories</span>
                </div>
                <div>
                  <span className="font-mono text-base font-medium text-ok block">100%</span>
                  <span className="text-muted">Free and open</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Interactive CLI & Manifest Instrument */}
            <div className="lg:col-span-5">
              <div className="rounded-card bg-paper-3 border border-rule-2 p-5 space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-rule text-muted">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ok" />
                    <span className="font-medium text-ink">axeslab-mcp-terminal</span>
                  </div>
                  <span className="font-mono text-xs">v2.4.0</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="text-muted"># Quick install via npx</div>
                  <pre className="p-3 rounded-pill bg-paper border border-rule text-cool overflow-x-auto selection:bg-accent-soft">
                    npx axeslab-mcp@latest
                  </pre>
                </div>

                <div className="p-4 rounded-pill bg-paper-2 border border-rule space-y-2 text-xs">
                  <span className="text-ink font-medium block">Agent directive example:</span>
                  <p className="text-muted leading-relaxed font-sans">
                    Ask Cursor or Claude Code: &ldquo;Fetch minimal bento hero from Axes Lab MCP and scaffold the design system.&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-muted pt-1">
                  <span>Transport: stdio / JSON-RPC</span>
                  <span className="text-ok">Schema verified</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Platform Architecture: 3 Pillars */}
      <section className="py-16 px-4 sm:px-8 border-b border-rule">
        <div className="max-w-[var(--container)] mx-auto space-y-10">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-display font-medium text-ink">
              Structured architecture for autonomous coding
            </h2>
            <p className="text-sm text-muted">
              Designed specifically to eliminate non-deterministic guesswork when prompting frontier models.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card bg-paper-2 border border-rule space-y-3">
              <div className="w-8 h-8 rounded-pill bg-paper-3 border border-rule flex items-center justify-center text-cool">
                <Code2 className="w-4 h-4" />
              </div>
              <h3 className="text-base font-sans font-medium text-ink">Production prompt specs</h3>
              <p className="text-xs text-muted leading-relaxed">
                Verbatim system directives structured with explicit variables, exact framework constraints, and verified responsiveness.
              </p>
              <Link href="/prompts" className="inline-block text-xs text-cool hover:underline pt-1">
                Explore all prompts
              </Link>
            </div>

            <div className="p-6 rounded-card bg-paper-2 border border-rule space-y-3">
              <div className="w-8 h-8 rounded-pill bg-paper-3 border border-rule flex items-center justify-center text-cool">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-base font-sans font-medium text-ink">Model Context Protocol</h3>
              <p className="text-xs text-muted leading-relaxed">
                Direct JSON schema endpoints and local MCP servers so agents can query, read, and assemble components on demand.
              </p>
              <Link href="/mcp" className="inline-block text-xs text-cool hover:underline pt-1">
                Read MCP documentation
              </Link>
            </div>

            <div className="p-6 rounded-card bg-paper-2 border border-rule space-y-3">
              <div className="w-8 h-8 rounded-pill bg-paper-3 border border-rule flex items-center justify-center text-cool">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-base font-sans font-medium text-ink">Agent skill packages</h3>
              <p className="text-xs text-muted leading-relaxed">
                Pre-packaged skill folders (`SKILL.md`) providing strict aesthetic guardrails and token generation pipelines.
              </p>
              <Link href="/skills" className="inline-block text-xs text-cool hover:underline pt-1">
                Install agent skills
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Registry Preview Table */}
      <section className="py-16 px-4 sm:px-8 border-b border-rule">
        <div className="max-w-[var(--container)] mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-display font-medium text-ink">
                Featured specifications
              </h2>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Recent verified system prompts from the production index.
              </p>
            </div>

            <Link
              href="/prompts"
              className="text-xs font-medium text-ink hover:text-accent transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>View full directory ({totalPrompts})</span>
            </Link>
          </div>

          <div className="border border-rule rounded-card bg-paper-2 overflow-hidden">
            <div className="px-4 py-2 border-b border-rule bg-paper-3 flex items-center justify-between text-xs text-muted select-none">
              <div className="flex items-center gap-3">
                <span className="w-7 text-right">No.</span>
                <span className="w-1.5"></span>
                <span>Name and category</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="hidden lg:inline-block">Tokens</span>
                <span className="w-20 text-center">Action</span>
              </div>
            </div>

            {featuredPrompts.map((item, idx) => (
              <PromptRegistryRow key={item.id} item={item} index={idx} />
            ))}
          </div>

          <div className="pt-2 text-center">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-paper-2 hover:bg-paper-3 border border-rule text-xs font-medium text-ink transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Explore all {totalPrompts} prompts in the command center</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PreFooter */}
      <PreFooter />

    </div>
  );
}
