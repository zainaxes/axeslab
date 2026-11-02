'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Terminal, ExternalLink, Cpu, Layers } from 'lucide-react';
import { toast } from 'sonner';

export default function McpPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const configs = [
    {
      title: 'Claude Desktop',
      file: 'claude_desktop_config.json',
      content: JSON.stringify(
        {
          mcpServers: {
            axeslab: {
              command: 'npx',
              args: ['-y', 'axeslab-mcp@latest'],
            },
          },
        },
        null,
        2
      ),
    },
    {
      title: 'Cursor & Windsurf',
      file: 'mcp.json',
      content: JSON.stringify(
        {
          mcpServers: {
            axeslab: {
              command: 'npx',
              args: ['-y', 'axeslab-mcp@latest'],
            },
          },
        },
        null,
        2
      ),
    },
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast.success('Configuration copied to clipboard');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-10 px-4 sm:px-8">
      <div className="max-w-[var(--container)] mx-auto space-y-12">
        
        {/* Page Header */}
        <header className="border-b border-rule pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Model Context Protocol server</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-ink">
            Connect Axes Lab to your AI coding agents
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Provide Claude Code, Cursor, and Antigravity direct access to verified UI design system prompts and agent skills.
          </p>
        </header>

        {/* Quick CLI Banner */}
        <section className="p-5 rounded-card bg-paper-2 border border-rule space-y-3">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="font-medium text-ink">Quick start via CLI</span>
            <span>Zero installation</span>
          </div>
          <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule text-cool font-mono text-xs overflow-x-auto selection:bg-accent-soft">
            npx axeslab-mcp@latest
          </pre>
        </section>

        {/* Config Files Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-display font-medium text-ink">
            Configuration files
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configs.map((cfg, idx) => (
              <div
                key={cfg.title}
                className="p-5 rounded-card bg-paper-2 border border-rule space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-ink">{cfg.title}</h3>
                    <span className="font-mono text-muted text-xs">{cfg.file}</span>
                  </div>
                  <button
                    onClick={() => handleCopy(cfg.content, idx)}
                    className="px-2.5 py-1 rounded-pill bg-paper-3 border border-rule text-xs text-ink hover:bg-rule transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-ok" />
                        <span>copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted" />
                        <span>copy</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule font-mono text-xs text-ink-2 overflow-x-auto leading-relaxed">
                  {cfg.content}
                </pre>
              </div>
            ))}
          </div>
        </section>

        {/* Exposed Tools Overview */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-medium text-ink">
            Exposed tools and protocol capabilities
          </h2>

          <div className="border border-rule rounded-card bg-paper-2 overflow-hidden text-xs">
            <div className="p-4 border-b border-rule bg-paper-3 flex items-center justify-between font-medium text-ink">
              <span>Tool name</span>
              <span>Function</span>
            </div>

            <div className="divide-y divide-rule">
              <div className="p-4 flex items-center justify-between">
                <span className="font-mono text-cool">axeslab_search_prompts</span>
                <span className="text-muted">Search 640+ design prompts by category, keyword, or component style.</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="font-mono text-cool">axeslab_get_prompt</span>
                <span className="text-muted">Fetch verbatim production system instructions with exact code requirements.</span>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="font-mono text-cool">axeslab_list_skills</span>
                <span className="text-muted">List available agent skills for front-end architecture and animation tasks.</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
