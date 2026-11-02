'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, Terminal, ExternalLink, Cpu } from 'lucide-react';
import { toast } from 'sonner';

export default function SkillsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const skills = [
    {
      name: 'axeslab-frontend-designer',
      version: '1.4.0',
      description: 'End-to-end design system scaffolding, color tokens, and anti-slop checks for web applications.',
      command: 'npx skills add zainaxes/axeslab-frontend-designer',
    },
    {
      name: 'axeslab-motion-choreography',
      version: '1.1.2',
      description: 'Tailwind and WebGL smooth interaction choreography, canvas shaders, and scroll timelines.',
      command: 'npx skills add zainaxes/axeslab-motion-choreography',
    },
    {
      name: 'axeslab-prompt-architect',
      version: '2.0.1',
      description: 'Generates structured system directives with explicit variables and zero vague instructions.',
      command: 'npx skills add zainaxes/axeslab-prompt-architect',
    },
  ];

  const handleCopy = (cmd: string, name: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(name);
    toast.success('Installation command copied');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-10 px-4 sm:px-8">
      <div className="max-w-[var(--container)] mx-auto space-y-10">
        
        {/* Header */}
        <header className="border-b border-rule pb-8 space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-muted text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cool" />
            <span>Agent skills library</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-medium text-ink">
            Standardized skills for autonomous agents
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Plug-and-play capability bundles adhering to the agent skill format for Claude Code, Cursor, and Antigravity.
          </p>
        </header>

        {/* Skills List */}
        <div className="border border-rule rounded-card bg-paper-2 divide-y divide-rule overflow-hidden">
          {skills.map((skill) => (
            <div key={skill.name} className="p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-sans font-medium text-ink">
                    {skill.name}
                  </h2>
                  <span className="font-mono text-xs text-muted px-1.5 py-0.5 rounded-pill bg-paper-3 border border-rule">
                    v{skill.version}
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(skill.command, skill.name)}
                  className="self-start sm:self-auto px-3 py-1 rounded-pill bg-paper-3 border border-rule text-xs text-ink hover:bg-rule transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {copied === skill.name ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-ok" />
                      <span>copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy install command</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-muted max-w-2xl leading-relaxed">
                {skill.description}
              </p>

              <pre className="p-3 rounded-pill bg-paper-3 border border-rule font-mono text-xs text-cool overflow-x-auto selection:bg-accent-soft">
                {skill.command}
              </pre>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
