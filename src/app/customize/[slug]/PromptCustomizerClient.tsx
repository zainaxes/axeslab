'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { RealPromptItem } from '@/lib/real-prompts';
import {
  ArrowLeft,
  SlidersHorizontal,
  RotateCcw,
  Copy,
  Check,
  Play,
  Pause,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DEFAULT_DIALS,
  DIALS,
  DIAL_KEYS,
  DialsState,
  DETAIL_FIELDS,
  SIZES,
  DETAILS_STORAGE_KEY,
  PM_DETAILS_STORAGE_KEY,
  withDetails,
  customizeTemplate
} from '@/lib/customizer-engine';

export default function PromptCustomizerClient({ item }: { item: RealPromptItem }) {
  const [activeTab, setActiveTab] = useState<'customized' | 'original'>('customized');
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMethodA = item.customizerType === 'field_replacement' && Boolean(item.template && item.fields);

  // Method A field values
  const [methodAValues, setMethodAValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    if (item.fields) {
      item.fields.forEach((f) => {
        if (f.key === 'concept' && f.default?.includes('your pick')) {
          init[f.key] = 'ZainAxes — motion design showcase';
        } else {
          init[f.key] = f.default || '';
        }
      });
    }
    return init;
  });

  // Method B field values
  const [methodBValues, setMethodBValues] = useState<Record<string, string>>({
    about: 'A motion launch for ZainAxes',
    format: '',
    length: '',
    colours: '',
    typeface: '',
    notes: ''
  });

  // Dials
  const [dials, setDials] = useState<DialsState>(DEFAULT_DIALS);

  // Load browser-local preferences for Method B
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DETAILS_STORAGE_KEY) || localStorage.getItem(PM_DETAILS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null) {
          setMethodBValues((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
  }, []);

  const customizedPrompt = useMemo(() => {
    if (isMethodA && item.template && item.fields) {
      return customizeTemplate(item.template, item.fields, methodAValues, dials);
    } else {
      const base = item.originalPrompt || item.contentBody || '';
      return withDetails(base, methodBValues, dials);
    }
  }, [isMethodA, item.template, item.fields, item.originalPrompt, item.contentBody, methodAValues, methodBValues, dials]);

  const handleMethodBChange = (key: string, val: string) => {
    setMethodBValues((prev) => {
      const next = { ...prev, [key]: val };
      try {
        localStorage.setItem(DETAILS_STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleMethodAChange = (key: string, val: string) => {
    setMethodAValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleDialChange = (key: keyof DialsState, val: number) => {
    setDials((prev) => ({ ...prev, [key]: val }));
  };

  const resetToDefaults = () => {
    if (isMethodA && item.fields) {
      const init: Record<string, string> = {};
      item.fields.forEach((f) => {
        init[f.key] = f.default || '';
      });
      setMethodAValues(init);
    } else {
      const emptyB: Record<string, string> = {
        about: '',
        format: '',
        length: '',
        colours: '',
        typeface: '',
        notes: ''
      };
      setMethodBValues(emptyB);
      try {
        localStorage.removeItem(DETAILS_STORAGE_KEY);
      } catch {}
    }
    setDials(DEFAULT_DIALS);
    toast.success('Reset all fields to defaults');
  };

  const handleCopyCustomized = () => {
    navigator.clipboard.writeText(customizedPrompt);
    setCopied(true);
    toast.success('Customized prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOriginal = () => {
    const originalText = item.originalPrompt || item.contentBody;
    navigator.clipboard.writeText(originalText);
    setCopiedOriginal(true);
    toast.success('Original prompt copied (Attribution: @' + item.handle + ')');
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/customize"
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All customizable prompts</span>
          </Link>

          <Link
            href={`/?prompt=${item.slug}`}
            className="text-xs text-cool hover:underline flex items-center gap-1"
          >
            <span>View directory record</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Top Header Card */}
        <header className="rounded-card bg-paper-2 border border-rule p-6 flex flex-col md:flex-row items-start gap-6">
          <div className="relative aspect-[16/9] w-full md:w-72 shrink-0 rounded-pill overflow-hidden bg-paper-3 border border-rule group shadow-sm">
            {item.poster && (
              <img
                src={item.poster}
                alt={item.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                  isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
              />
            )}
            {item.video && (
              <video
                ref={videoRef}
                src={item.video}
                poster={item.poster}
                loop
                muted
                playsInline
                className={`w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
            <button
              type="button"
              onClick={toggleVideo}
              className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-paper/90 border border-rule text-ink flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity shadow-md"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-cool">
                {item.category} · {item.subcategory}
              </span>
              <span className="text-xs text-muted">
                Created by <strong className="text-ink font-medium">@{item.handle}</strong> ({item.author})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
              Customize: {item.title}
            </h1>
            
            <p className="text-xs text-muted leading-relaxed max-w-xl">
              {isMethodA
                ? 'Rewrite template with explicit parameters: adjustments update live directive output in real time.'
                : 'Direct creator prompt: original instructions remain pure, while your overrides are added in a dedicated block.'}
            </p>
          </div>
        </header>

        {/* Customization Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-card bg-paper-2 border border-rule p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div>
                <h2 className="text-xs font-sans font-medium text-ink">
                  {isMethodA ? 'Prompt Parameters' : 'Make it yours'}
                </h2>
                <span className="text-[11px] text-muted font-mono">
                  Default Brand: <strong className="text-ink font-sans">ZainAxes</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={resetToDefaults}
                className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-3 hover:bg-paper text-muted hover:text-ink transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* METHOD A: DYNAMIC FIELD LIST */}
            {isMethodA && item.fields && (
              <div className="space-y-4">
                {item.fields.map((field) => {
                  const val = methodAValues[field.key] ?? '';
                  const isSize = field.key.toLowerCase().includes('size');

                  return (
                    <div key={field.key} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-sans font-medium text-ink">
                          {field.label}
                        </label>
                        {field.default && (
                          <span className="text-[10px] text-muted font-mono truncate max-w-[170px]">
                            Default: {field.default}
                          </span>
                        )}
                      </div>

                      {isSize ? (
                        <select
                          value={val}
                          onChange={(e) => handleMethodAChange(field.key, e.target.value)}
                          className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill px-3 py-1.5 text-ink outline-none transition-colors"
                        >
                          {SIZES.map((s) => (
                            <option key={s.value} value={s.value} className="bg-paper-2 text-ink">
                              {s.label}
                            </option>
                          ))}
                        </select>
                      ) : field.key === 'shots' || (field.default && field.default.length > 80) ? (
                        <textarea
                          rows={3}
                          value={val}
                          placeholder={field.default || `Enter ${field.label}...`}
                          onChange={(e) => handleMethodAChange(field.key, e.target.value)}
                          className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill p-2.5 text-ink placeholder:text-muted/60 outline-none transition-colors resize-y"
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          placeholder={field.default || `Enter ${field.label}...`}
                          onChange={(e) => handleMethodAChange(field.key, e.target.value)}
                          className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill px-3 py-1.5 text-ink placeholder:text-muted/60 outline-none transition-colors"
                        />
                      )}

                      {field.hint && (
                        <p className="text-[11px] text-muted leading-tight">
                          {field.hint}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* METHOD B: STANDARD ADDITIONAL DETAILS FIELDS */}
            {!isMethodA && (
              <div className="space-y-4">
                {DETAIL_FIELDS.map((field) => {
                  const val = methodBValues[field.key] || '';
                  return (
                    <div key={field.key} className="space-y-1.5">
                      <label className="text-xs font-sans font-medium text-ink block">
                        {field.label}
                      </label>

                      {field.key === 'format' ? (
                        <select
                          value={val}
                          onChange={(e) => handleMethodBChange(field.key, e.target.value)}
                          className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill px-3 py-1.5 text-ink outline-none transition-colors"
                        >
                          <option value="" className="bg-paper-2 text-ink">As in the prompt (Default)</option>
                          <option value="landscape" className="bg-paper-2 text-ink">1920×1080 (Landscape 16:9)</option>
                          <option value="vertical" className="bg-paper-2 text-ink">1080×1920 (Vertical 9:16)</option>
                          <option value="square" className="bg-paper-2 text-ink">1080×1080 (Square 1:1)</option>
                          <option value="portrait" className="bg-paper-2 text-ink">1080×1350 (Portrait 4:5)</option>
                        </select>
                      ) : field.key === 'notes' ? (
                        <textarea
                          rows={2}
                          value={val}
                          placeholder={field.placeholder}
                          onChange={(e) => handleMethodBChange(field.key, e.target.value)}
                          className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill p-2.5 text-ink placeholder:text-muted/60 outline-none transition-colors resize-y"
                        />
                      ) : (
                        <input
                          type="text"
                          value={val}
                          placeholder={field.placeholder}
                          onChange={(e) => handleMethodBChange(field.key, e.target.value)}
                          className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill px-3 py-1.5 text-ink placeholder:text-muted/60 outline-none transition-colors"
                        />
                      )}

                      {field.hint && (
                        <p className="text-[11px] text-muted leading-tight">
                          {field.hint}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Dials Section */}
            <div className="pt-4 border-t border-rule space-y-4">
              <h3 className="text-xs font-sans font-medium text-ink flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cool" />
                <span>Execution Dials</span>
              </h3>

              {DIAL_KEYS.map((k) => {
                const dial = DIALS[k];
                const activeStopIdx = dials[k];
                const activeStop = dial.stops[activeStopIdx];

                return (
                  <div key={k} className="space-y-1.5 p-3 rounded-pill bg-paper-3 border border-rule">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-ink">{dial.label}</span>
                      <span className={`font-mono text-[11px] px-2 py-0.5 rounded-pill border ${
                        activeStopIdx === 2
                          ? 'bg-paper-2 border-rule text-muted'
                          : 'bg-cool-soft border-cool text-cool font-medium'
                      }`}>
                        {activeStop.label}
                      </span>
                    </div>

                    <input
                      type="range"
                      min={0}
                      max={4}
                      step={1}
                      value={activeStopIdx}
                      onChange={(e) => handleDialChange(k, parseInt(e.target.value, 10))}
                      className="w-full accent-cool cursor-pointer"
                    />

                    {activeStop.line ? (
                      <p className="text-[11px] text-cool leading-relaxed pt-1">
                        "{activeStop.line}"
                      </p>
                    ) : (
                      <p className="text-[11px] text-muted leading-tight">
                        Balanced (Standard reference execution)
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Prompt Output Column (7 cols) */}
          <div className="lg:col-span-7 rounded-card bg-paper-2 border border-rule p-5 space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-rule">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-paper border border-rule rounded-pill p-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('customized')}
                    className={`text-xs px-3 py-1 rounded-pill transition-colors ${
                      activeTab === 'customized'
                        ? 'bg-ink text-paper font-medium'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    Customized Prompt
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('original')}
                    className={`text-xs px-3 py-1 rounded-pill transition-colors ${
                      activeTab === 'original'
                        ? 'bg-ink text-paper font-medium'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    Original Prompt
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyOriginal}
                  className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-3 hover:bg-paper text-muted hover:text-ink transition-colors flex items-center gap-1"
                >
                  {copiedOriginal ? <Check className="w-3 h-3 text-cool" /> : <Copy className="w-3 h-3" />}
                  <span>Copy original</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCustomized}
                  className="text-xs px-3.5 py-1 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-accent-ink" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>Copy customized</span>
                </button>
              </div>
            </div>

            {/* Prompt Text Display */}
            <pre className="p-4 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap selection:bg-accent-soft max-h-[640px] overflow-y-auto">
              {activeTab === 'customized' ? customizedPrompt : (item.originalPrompt || item.contentBody)}
            </pre>

            {/* Attribution & Rights Note */}
            <div className="p-3 rounded-pill bg-paper border border-rule text-xs text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cool flex-shrink-0" />
                <span>Original creator: @{item.handle} ({item.author})</span>
              </div>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cool hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>Upstream post on X</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <div className="pt-2 text-[11px] font-mono text-muted flex items-center justify-between">
              <span>~{Math.round((activeTab === 'customized' ? customizedPrompt.length : (item.originalPrompt || item.contentBody).length) / 4)} tokens</span>
              <span className="text-cool">{item.model || 'Claude Opus 5.5'}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

