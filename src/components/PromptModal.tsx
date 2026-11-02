'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ALL_REAL_PROMPTS, PromptItem } from '@/lib/real-prompts';
import {
  X,
  Copy,
  Check,
  Code2,
  Terminal,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export function PromptModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptSlug = searchParams.get('prompt');

  const [item, setItem] = useState<PromptItem | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'prompt' | 'spec' | 'mcp'>('prompt');

  useEffect(() => {
    if (!promptSlug) {
      setItem(null);
      return;
    }
    const found = ALL_REAL_PROMPTS.find((p) => p.slug === promptSlug);
    if (found) {
      setItem(found);
    }
  }, [promptSlug]);

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('prompt');
    const newQuery = params.toString();
    router.replace(newQuery ? `/?${newQuery}` : '/', { scroll: false });
  };

  const handleCopy = (text: string, label: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-paper-3/80"
        onClick={closeModal}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 max-w-4xl w-full bg-paper border border-rule-2 rounded-card overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-rule bg-paper-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cool flex-shrink-0" />
            <h2 className="text-sm font-sans font-medium text-ink truncate">
              {item.title}
            </h2>
            <span className="font-sans text-xs px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => handleCopy(item.contentBody, 'Prompt')}
              className={`text-xs font-sans font-medium px-3 py-1 rounded-pill border transition-colors duration-150 flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent ${
                copied
                  ? 'bg-ok-soft border-ok text-ok'
                  : 'bg-accent text-accent-ink border-transparent hover:opacity-90'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ok" />
                  <span>copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy prompt</span>
                </>
              )}
            </button>

            <button
              onClick={closeModal}
              className="p-1 rounded-pill text-muted hover:text-ink hover:bg-paper-3 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-rule bg-paper-3 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`pb-2.5 px-2 border-b-2 font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
              activeTab === 'prompt'
                ? 'border-accent text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            System prompt
          </button>
          <button
            onClick={() => setActiveTab('spec')}
            className={`pb-2.5 px-2 border-b-2 font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
              activeTab === 'spec'
                ? 'border-accent text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => setActiveTab('mcp')}
            className={`pb-2.5 px-2 border-b-2 font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
              activeTab === 'mcp'
                ? 'border-accent text-ink'
                : 'border-transparent text-muted hover:text-ink'
            }`}
          >
            Agent MCP directive
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          
          {/* Summary */}
          <div className="p-3.5 rounded-pill bg-paper-2 border border-rule text-xs text-muted leading-relaxed">
            {item.summary}
          </div>

          {/* Active Tab View */}
          {activeTab === 'prompt' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>Verbatim system instructions:</span>
                <span><span className="font-mono">{item.chars}</span> characters</span>
              </div>
              <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule text-ink-2 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-accent-soft max-h-80">
                {item.contentBody}
              </pre>
            </div>
          )}

          {activeTab === 'spec' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-pill bg-paper-2 border border-rule">
                  <span className="text-muted block mb-1">Target models:</span>
                  <span className="text-ink font-medium">Claude 3.7 Sonnet, Cursor, Gemini 2.0 Flash</span>
                </div>
                <div className="p-3 rounded-pill bg-paper-2 border border-rule">
                  <span className="text-muted block mb-1">Estimated token weight:</span>
                  <span className="text-ink font-medium">~<span className="font-mono">{Math.round(item.chars / 4)}</span> tokens</span>
                </div>
              </div>
              <div className="p-3.5 rounded-pill bg-paper-3 border border-rule space-y-2">
                <span className="text-ink font-medium block">Verification checklist</span>
                <ul className="space-y-1 text-muted list-disc pl-4">
                  <li>Zero placeholder strings or unfinished markup.</li>
                  <li>Responsive layout tested for desktop and mobile viewport constraints.</li>
                  <li>Clean semantic structure ready to paste directly into code editors.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'mcp' && (
            <div className="space-y-3 text-xs">
              <p className="text-muted">
                Run this directive inside any agent environment connected to the Axes Lab MCP server:
              </p>
              <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule text-cool font-mono text-xs overflow-x-auto selection:bg-accent-soft">
                {`axeslab fetch-prompt --slug "${item.slug}" --apply`}
              </pre>
              <button
                onClick={() => handleCopy(`axeslab fetch-prompt --slug "${item.slug}" --apply`, 'Command')}
                className="px-3 py-1.5 rounded-pill bg-paper-2 border border-rule text-xs text-ink hover:bg-rule transition-colors duration-150 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-muted" />
                <span>Copy CLI directive</span>
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 bg-paper-2 border-t border-rule flex items-center justify-between text-xs text-muted">
          <span>Axes Lab · Verified specification</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-paper-3 border border-rule font-sans text-xs">ESC</kbd>
            <span>to dismiss</span>
          </div>
        </div>

      </div>
    </div>
  );
}
