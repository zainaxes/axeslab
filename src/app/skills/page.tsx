'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ExternalLink, Terminal, GitBranch, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { REAL_PROMPTS, RealPromptItem } from '@/lib/real-prompts';

export default function SkillsPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const skills: RealPromptItem[] = REAL_PROMPTS.filter((p: RealPromptItem) => p.category === 'Skills');

  const handleCopy = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(id);
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
            Curated capability packages for Claude Code, Cursor, and agentic workflows. Build, animate, and score motion directly from code.
          </p>
        </header>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill: RealPromptItem) => {
            const hasCommand = Boolean(skill.skillCommand);
            const cmd = skill.skillCommand || (skill.skillRepo ? `git clone ${skill.skillRepo}` : '');

            return (
              <div
                key={skill.id}
                className="rounded-card border border-rule bg-paper-2 overflow-hidden flex flex-col justify-between hover:border-rule-2 transition-all duration-200"
              >
                <div>
                  {/* Poster / Video Preview */}
                  <div className="relative aspect-video bg-paper-3 border-b border-rule overflow-hidden group">
                    <img
                      src={skill.poster}
                      alt={skill.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-pill bg-paper/90 backdrop-blur-md border border-rule text-xs text-ink">
                      <Sparkles className="w-3 h-3 text-cool" />
                      <span>{skill.subcategory}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-base font-display font-medium text-ink">
                          {skill.title}
                        </h2>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                          <span>by @{skill.handle}</span>
                          <span>•</span>
                          <span className="font-mono text-cool">{skill.model}</span>
                        </div>
                      </div>

                      {skill.skillRepo && (
                        <a
                          href={skill.skillRepo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-pill bg-paper-3 border border-rule text-muted hover:text-ink hover:border-rule-2 transition-colors duration-150"
                          title="View repository on GitHub"
                        >
                          <GitBranch className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-muted leading-relaxed">
                      {skill.skillDescription}
                    </p>
                  </div>
                </div>

                {/* Command & Actions Footer */}
                <div className="p-5 pt-0 space-y-3">
                  {cmd && (
                    <div className="flex items-center justify-between gap-2 p-2 rounded-card bg-paper-3 border border-rule font-mono text-xs">
                      <span className="truncate text-cool select-all">{cmd}</span>
                      <button
                        onClick={() => handleCopy(cmd, skill.id)}
                        className="shrink-0 p-1 rounded hover:bg-rule text-muted hover:text-ink transition-colors duration-150"
                        title="Copy command"
                      >
                        {copied === skill.id ? (
                          <Check className="w-3.5 h-3.5 text-cool" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-rule">
                    <span className="text-[11px] font-mono text-muted">
                      License: {skill.license || 'MIT'}
                    </span>
                    <a
                      href={skill.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-ink transition-colors"
                    >
                      <span>Creator post</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
