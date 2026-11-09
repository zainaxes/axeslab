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
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

export interface PromptCustomizerProps {
  item: {
    id: string;
    slug: string;
    title: string;
    category: string;
    subcategory?: string;
    contentBody: string;
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
  const [activeTab, setActiveTab] = useState<'customize' | 'preview'>('customize');

  // Customization field state (mirrors prompt-motion customizer engine)
  const [business, setBusiness] = useState('');
  const [brandColors, setBrandColors] = useState('');
  const [lengthSeconds, setLengthSeconds] = useState('');
  const [tempoBpm, setTempoBpm] = useState('');
  const [aspectSize, setAspectSize] = useState('1920×1080 · Landscape 16:9');
  const [modelTarget, setModelTarget] = useState('Claude Opus 4.5');

  // Active focus target to highlight connected field
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Compute live interpolated prompt with user's customized values
  const customizedPrompt = useMemo(() => {
    let text = item.contentBody || '';

    const effectiveBusiness = business.trim() || 'ZainAxes high-performance developer tools';
    const effectiveColors = brandColors.trim() || '#050507 obsidian, crisp zinc, cyan accent';
    const effectiveLength = lengthSeconds.trim() || '15';
    const effectiveBpm = tempoBpm.trim() || '120';
    const effectiveAspect = aspectSize.split('·')[0].trim();

    // Replace dynamic placeholders if present, or adaptively inject parameters
    if (text.includes('30-second') || text.includes('15-second')) {
      text = text.replace(/(?:30|15)-second/g, `${effectiveLength}-second`);
    }

    if (text.includes('120 BPM')) {
      text = text.replace(/120 BPM/g, `${effectiveBpm} BPM`);
    }

    return text;
  }, [item.contentBody, business, brandColors, lengthSeconds, tempoBpm, aspectSize]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(customizedPrompt);
    setCopied(true);
    toast.success('Customized prompt copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const resetDefaults = () => {
    setBusiness('');
    setBrandColors('');
    setLengthSeconds('');
    setTempoBpm('');
    setAspectSize('1920×1080 · Landscape 16:9');
    toast.info('Reset to default ZainAxes parameters');
  };

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl max-h-[92vh] bg-paper-2 border border-rule-2 rounded-card shadow-2xl flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* 1. Modal Top Bar */}
        <div className="px-5 py-3 border-b border-rule bg-paper-3 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cool flex-shrink-0" />
            <h2 className="text-sm font-sans font-medium text-ink truncate">
              {item.title}
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
              title="Reset all inputs"
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
                  <span>Copied to Clipboard!</span>
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

        {/* 2. Dual-Panel Split View: Customizer Controls (Left) + Interactive Live Prompt (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT COLUMN: Input Customization Parameters (5 Cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-rule p-5 sm:p-6 bg-paper-3/40 space-y-5">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-ink">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cool" />
                <span>Customize Prompt Parameters</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                Tune any parameter below. Inputs immediately highlight and update live in the prompt output on the right.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Field 1: Business / Project Name */}
              <div className="space-y-1.5">
                <label className="font-medium text-ink flex items-center justify-between">
                  <span>Business / Project</span>
                  <span className="text-[10px] text-cool font-mono">default: ZainAxes</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. ZainAxes, developer tools, portfolio"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  onFocus={() => setFocusedField('business')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink placeholder:text-muted outline-none transition-colors"
                />
                <p className="text-[11px] text-muted">What the animation or website represents.</p>
              </div>

              {/* Field 2: Brand Colors */}
              <div className="space-y-1.5">
                <label className="font-medium text-ink flex items-center justify-between">
                  <span>Brand Colors / Palette</span>
                  <span className="text-[10px] text-muted font-mono">Hex or names</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. obsidian #050507, crisp zinc, cyan accent"
                  value={brandColors}
                  onChange={(e) => setBrandColors(e.target.value)}
                  onFocus={() => setFocusedField('colors')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink placeholder:text-muted outline-none transition-colors"
                />
                <p className="text-[11px] text-muted">Exact styling colors passed to the AI model.</p>
              </div>

              {/* Field 3 & 4: Timing & Tempo Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-medium text-ink">Duration (sec)</label>
                  <input
                    type="number"
                    placeholder="15"
                    value={lengthSeconds}
                    onChange={(e) => setLengthSeconds(e.target.value)}
                    onFocus={() => setFocusedField('length')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink placeholder:text-muted outline-none transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-medium text-ink">Tempo (BPM)</label>
                  <input
                    type="number"
                    placeholder="120"
                    value={tempoBpm}
                    onChange={(e) => setTempoBpm(e.target.value)}
                    onFocus={() => setFocusedField('bpm')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink placeholder:text-muted outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Field 5: Resolution Aspect Ratio */}
              <div className="space-y-1.5">
                <label className="font-medium text-ink">Viewport Canvas Size</label>
                <select
                  value={aspectSize}
                  onChange={(e) => setAspectSize(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink outline-none transition-colors cursor-pointer"
                >
                  <option value="1920×1080 · Landscape 16:9">1920×1080 · Landscape 16:9 (Desktop / Showcase)</option>
                  <option value="1080×1920 · Portrait 9:16">1080×1920 · Portrait 9:16 (Mobile / Story / Reels)</option>
                  <option value="1440×1440 · Square 1:1">1440×1440 · Square 1:1 (Feed / Dribbble)</option>
                  <option value="1920×816 · Cinematic 21:9">1920×816 · Cinematic 21:9 (Ultra-wide)</option>
                </select>
              </div>

              {/* Field 6: Target LLM Engine */}
              <div className="space-y-1.5">
                <label className="font-medium text-ink">Target Generation Model</label>
                <select
                  value={modelTarget}
                  onChange={(e) => setModelTarget(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-pill bg-paper border border-rule focus:border-accent text-ink outline-none transition-colors cursor-pointer"
                >
                  <option value="Claude Opus 4.5">Claude 3.7 Sonnet / Opus 4.5</option>
                  <option value="Cursor / Cline">Cursor / Cline IDE Agent</option>
                  <option value="GPT-4.5 / Codex">GPT-4.5 / Codex</option>
                  <option value="Gemini 2.0 Flash">Gemini 2.0 Flash</option>
                </select>
              </div>

            </div>

            {/* Video Preview Miniature */}
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

          {/* RIGHT COLUMN: Real-Time Live Rendered Prompt (7 Cols) */}
          <div className="lg:col-span-7 p-5 sm:p-6 flex flex-col justify-between bg-paper space-y-4">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-rule">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-cool" />
                  <span className="text-xs font-medium text-ink">Customized AI Directive</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-pill bg-ok-soft text-ok border border-ok/30">
                    Ready to copy
                  </span>
                </div>
                <div className="text-xs text-muted font-mono">
                  ~{Math.round(customizedPrompt.length / 4)} tokens
                </div>
              </div>

              {/* Parameter Chip Summary */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                  Brand: <strong className="text-ink font-medium">{business.trim() || 'ZainAxes'}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                  Palette: <strong className="text-ink font-medium">{brandColors.trim() || 'obsidian/cyan'}</strong>
                </span>
                <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                  Length: <strong className="text-ink font-medium">{lengthSeconds || '15'}s</strong>
                </span>
                <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                  Tempo: <strong className="text-ink font-medium">{tempoBpm || '120'} BPM</strong>
                </span>
                <span className="px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                  Aspect: <strong className="text-ink font-medium">{aspectSize.split('·')[0]}</strong>
                </span>
              </div>

              {/* Main Code Terminal / Prompt Output */}
              <div className="relative rounded-card border border-rule bg-paper-3/60 p-4 font-mono text-xs text-ink-2 leading-relaxed overflow-x-auto max-h-[50vh] whitespace-pre-wrap selection:bg-accent-soft">
                {customizedPrompt}
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
