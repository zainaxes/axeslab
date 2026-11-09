'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  Copy,
  Check,
  SlidersHorizontal,
  Code2,
  Play,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { PromptField } from '@/lib/real-prompts';

export interface PromptCustomizerProps {
  item: {
    id: string;
    slug: string;
    title: string;
    category: string;
    subcategory?: string;
    contentBody: string;
    template?: string;
    fields?: PromptField[];
    originalPrompt?: string;
    summary?: string;
    video?: string;
    preview?: string;
    poster?: string;
    tags?: string[];
    width?: number;
    height?: number;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function PromptCustomizerModal({ item, isOpen, onClose }: PromptCustomizerProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'customized' | 'original'>('customized');

  // Initialize field values from item.fields defaults
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (item.fields) {
      item.fields.forEach((f) => {
        initial[f.key] = f.default || '';
      });
    }
    return initial;
  });

  // Target model selection
  const [modelTarget, setModelTarget] = useState('Claude Opus 5.5');

  // Compute live interpolated prompt matching prompt-motion engine exactly
  const livePrompt = useMemo(() => {
    if (!item.template) {
      return item.contentBody || '';
    }

    let text = item.template;
    Object.entries(fieldValues).forEach(([key, val]) => {
      const fallback = item.fields?.find((f) => f.key === key)?.default || '';
      const effectiveVal = val.trim() || fallback;
      const re = new RegExp(`{{${key}}}`, 'g');
      text = text.replace(re, effectiveVal);
    });

    return text;
  }, [item.template, item.contentBody, item.fields, fieldValues]);

  if (!isOpen) return null;

  const handleFieldChange = (key: string, val: string) => {
    setFieldValues((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleCopy = () => {
    const textToCopy = activeTab === 'original' && item.originalPrompt ? item.originalPrompt : livePrompt;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success('Prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const resetDefaults = () => {
    const reset: Record<string, string> = {};
    if (item.fields) {
      item.fields.forEach((f) => {
        reset[f.key] = f.default || '';
      });
    }
    setFieldValues(reset);
    toast.info('Reset to default template values');
  };

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] bg-paper-2 border border-rule-2 rounded-card shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* 1. Modal Top Header */}
        <div className="px-5 py-3 border-b border-rule bg-paper-3 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cool flex-shrink-0" />
            <h2 className="text-sm font-sans font-medium text-ink truncate">
              Customize: {item.title}
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded-pill bg-paper border border-rule text-muted">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={resetDefaults}
              className="text-xs font-sans text-muted hover:text-ink px-2.5 py-1 rounded-pill border border-rule hover:bg-paper-2 transition-colors flex items-center gap-1"
              title="Reset fields"
            >
              <RotateCcw className="w-3 h-3" />
              <span className="hidden sm:inline">Reset</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`text-xs font-sans font-medium px-4 py-1.5 rounded-pill border transition-all duration-150 flex items-center gap-1.5 ${
                copied
                  ? 'bg-ok-soft border-ok text-ok'
                  : 'bg-accent text-accent-ink border-transparent hover:opacity-90 active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-ok" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-3 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Dual-Panel Customizer Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT PANEL: Exact Dynamic Form Controls (5 Cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-rule p-5 sm:p-6 bg-paper-3/40 space-y-5">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-ink">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cool" />
                <span>Make It Yours</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Change any of these variables, or keep defaults. They immediately substitute into the live prompt on the right.
              </p>
            </div>

            {/* Dynamic Form Generated From Prompt Schema */}
            <div className="space-y-4 text-xs">
              {item.fields && item.fields.length > 0 ? (
                item.fields.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <label className="font-medium text-ink flex items-center justify-between">
                      <span>{field.label}</span>
                      {field.key === 'concept' || field.key === 'business' ? (
                        <span className="text-[10px] text-cool font-mono">ZainAxes brand default</span>
                      ) : null}
                    </label>
                    <input
                      type="text"
                      placeholder={field.default || `Enter ${field.label.toLowerCase()}...`}
                      value={fieldValues[field.key] ?? ''}
                      onChange={(e) => handleFieldChange(field.key, e.target.value)}
                      className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink placeholder:text-muted outline-none transition-colors"
                    />
                    {field.hint && (
                      <p className="text-[11px] text-muted">{field.hint}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="font-medium text-ink">Project / Concept</label>
                    <input
                      type="text"
                      placeholder="ZainAxes motion reel"
                      value={fieldValues['concept'] ?? ''}
                      onChange={(e) => handleFieldChange('concept', e.target.value)}
                      className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule text-ink outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Target LLM Engine */}
              <div className="space-y-1.5 pt-1">
                <label className="font-medium text-ink">Target Generation Model</label>
                <select
                  value={modelTarget}
                  onChange={(e) => setModelTarget(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink outline-none transition-colors cursor-pointer"
                >
                  <option value="Claude Opus 5.5">Claude Opus 5.5 (Recommended for Motion Graphics)</option>
                  <option value="Claude 3.7 Sonnet">Claude 3.7 Sonnet</option>
                  <option value="Cursor / Cline">Cursor / Cline Agent</option>
                  <option value="GPT-4.5 / Codex">GPT-4.5 / Codex</option>
                </select>
              </div>

            </div>

            {/* Video Preview Reference */}
            {item.video || item.preview ? (
              <div className="pt-2">
                <span className="text-[11px] text-muted block mb-1.5 font-medium">Motion Reference:</span>
                <div className="relative aspect-video rounded-card overflow-hidden bg-paper border border-rule">
                  <video
                    src={item.video || item.preview}
                    poster={item.poster}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : null}

          </div>

          {/* RIGHT PANEL: Live Generated Prompt & Original Switcher (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-paper space-y-4">
            
            <div className="space-y-3">
              
              {/* Tab Header: Improved Live Prompt vs Creator Original */}
              <div className="flex items-center justify-between pb-2 border-b border-rule">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('customized')}
                    className={`text-xs px-2.5 py-1 rounded-pill transition-colors font-medium ${
                      activeTab === 'customized'
                        ? 'bg-ink text-paper'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    Customized Prompt
                  </button>
                  {item.originalPrompt && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('original')}
                      className={`text-xs px-2.5 py-1 rounded-pill transition-colors font-medium ${
                        activeTab === 'original'
                          ? 'bg-ink text-paper'
                          : 'text-muted hover:text-ink'
                      }`}
                    >
                      Original Creator Prompt
                    </button>
                  )}
                </div>
                <div className="text-xs text-muted font-mono">
                  ~{Math.round(livePrompt.length / 4)} tokens
                </div>
              </div>

              {/* Active Substituted Values Summary */}
              {activeTab === 'customized' && (
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  {Object.entries(fieldValues).map(([k, v]) => {
                    const fallback = item.fields?.find((f) => f.key === k)?.default || '';
                    return (
                      <span key={k} className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                        {k}: <strong className="text-ink font-medium">{v || fallback}</strong>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Main Code Terminal / Prompt Output */}
              <div className="relative rounded-card border border-rule bg-paper-3/60 p-4 font-mono text-xs text-ink-2 leading-relaxed overflow-x-auto max-h-[50vh] whitespace-pre-wrap selection:bg-accent-soft">
                {activeTab === 'original' && item.originalPrompt ? item.originalPrompt : livePrompt}
              </div>
            </div>

            {/* Bottom Actions Banner */}
            <div className="pt-3 border-t border-rule flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-muted">
                One-click copies the full customized prompt for Claude, Cursor, or ChatGPT.
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="w-full sm:w-auto px-5 py-2 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-ok" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Full Directive'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
