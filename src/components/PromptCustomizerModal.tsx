'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  X,
  Copy,
  Check,
  SlidersHorizontal,
  RotateCcw,
  ExternalLink,
  Play,
  Pause,
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { PromptField, RealPromptItem } from '@/lib/real-prompts';
import {
  DEFAULT_DIALS,
  DIALS,
  DIAL_KEYS,
  DialsState,
  DETAIL_FIELDS,
  SIZES,
  FORMATS,
  DETAILS_STORAGE_KEY,
  PM_DETAILS_STORAGE_KEY,
  withDetails,
  fillTemplate,
  withDials,
  customizeTemplate,
  detailsBlock
} from '@/lib/customizer-engine';

export interface PromptCustomizerModalProps {
  item: RealPromptItem;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptCustomizerModal({ item, isOpen, onClose }: PromptCustomizerModalProps) {
  const [activeTab, setActiveTab] = useState<'customized' | 'original'>('customized');
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Determine method: A (field_replacement) or B (additional_block)
  const isMethodA = item.customizerType === 'field_replacement' && Boolean(item.template && item.fields);

  // Method A field values
  const [methodAValues, setMethodAValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    if (item.fields) {
      item.fields.forEach((f) => {
        // ZainAxes brand integration: default brand/concept if appropriate
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

  // Dials: Creativity, Pace, Polish
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

  // Sync item fields when item changes
  useEffect(() => {
    if (item.fields) {
      const init: Record<string, string> = {};
      item.fields.forEach((f) => {
        if (f.key === 'concept' && f.default?.includes('your pick')) {
          init[f.key] = 'ZainAxes — motion design showcase';
        } else {
          init[f.key] = f.default || '';
        }
      });
      setMethodAValues(init);
    }
    setDials(DEFAULT_DIALS);
    setActiveTab('customized');
  }, [item]);

  if (!isOpen) return null;

  // Compute live customized prompt
  const customizedPrompt = useMemo(() => {
    if (isMethodA && item.template && item.fields) {
      return customizeTemplate(item.template, item.fields, methodAValues, dials);
    } else {
      // Method B
      const base = item.originalPrompt || item.contentBody || '';
      return withDetails(base, methodBValues, dials);
    }
  }, [isMethodA, item.template, item.fields, item.originalPrompt, item.contentBody, methodAValues, methodBValues, dials]);

  // Method B state change + persistence
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
    if (item.rightsStatus === 'link_only' && item.sourceUrl) {
      navigator.clipboard.writeText(originalText);
      setCopiedOriginal(true);
      toast.success('Original prompt copied (Attribution: @' + item.handle + ')');
      setTimeout(() => setCopiedOriginal(false), 2000);
    } else {
      navigator.clipboard.writeText(originalText);
      setCopiedOriginal(true);
      toast.success('Original prompt copied');
      setTimeout(() => setCopiedOriginal(false), 2000);
    }
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
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-paper-3/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Window */}
      <div className="relative z-10 w-full max-w-5xl bg-paper border border-rule-2 rounded-card shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 border-b border-rule bg-paper-2 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-accent flex-shrink-0" />
            <div className="min-w-0">
              <h2 className="text-sm font-sans font-medium text-ink truncate">
                Customize: {item.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>By @{item.handle}</span>
                <span>·</span>
                <span className="font-mono text-[11px] text-cool">{item.category}</span>
                <span>·</span>
                <span className="text-[11px] text-muted">
                  {isMethodA ? 'Template Parameter Engine' : 'Directive Augmenter'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={resetToDefaults}
              className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-3 hover:bg-paper text-muted hover:text-ink transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              title="Reset fields to original defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close customizer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body: 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* LEFT COLUMN: Controls & Form Fields (lg:col-span-5) */}
          <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-rule bg-paper space-y-6 overflow-y-auto max-h-[500px] lg:max-h-none">
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
                  {isMethodA ? 'Prompt Parameters' : 'Make it yours'}
                </h3>
                <span className="text-[11px] font-mono text-muted">
                  Brand: <strong className="text-ink font-sans">ZainAxes</strong>
                </span>
              </div>
              <p className="text-xs text-muted leading-relaxed">
                {isMethodA
                  ? 'Change any parameter below to recalculate the directive in real time.'
                  : 'Fill in what you need and leave the rest blank. Your details are appended as an override block.'}
              </p>
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
                          <span className="text-[10px] text-muted font-mono truncate max-w-[180px]">
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
                      ) : field.key === 'shots' || field.default && field.default.length > 80 ? (
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

            {/* DIALS: CREATIVITY, PACE, POLISH SLIDERS */}
            <div className="pt-4 border-t border-rule space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-sans font-medium text-ink uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-cool" />
                  <span>Execution Dials</span>
                </h4>
                <span className="text-[11px] text-muted">5 calibrated stops</span>
              </div>

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

          {/* RIGHT COLUMN: Video Preview & Live Prompt Output (lg:col-span-7) */}
          <div className="lg:col-span-7 p-5 bg-paper-2 flex flex-col justify-between space-y-5 overflow-y-auto">
            
            {/* Top Preview Bar & Media */}
            <div className="space-y-3">
              
              {/* Media Player */}
              <div className="relative aspect-[16/9] w-full max-w-lg mx-auto rounded-pill overflow-hidden bg-paper-3 border border-rule group">
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
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-paper/90 border border-rule text-ink flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-lg focus-visible:outline-2 focus-visible:outline-accent"
                  aria-label={isPlaying ? 'Pause preview' : 'Play motion preview'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <div className="absolute bottom-2 left-2 z-10">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-pill bg-paper/90 text-muted border border-rule">
                    {item.width && item.height ? `${item.width}×${item.height}` : '1920×1080'}
                  </span>
                </div>
              </div>

              {/* Attribution & Rights Status */}
              <div className="p-3 rounded-pill bg-paper border border-rule flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-ink">Creator:</span>
                  <span className="text-muted">@{item.handle} ({item.author})</span>
                  {item.sourceUrl && (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cool hover:underline font-mono text-[11px]"
                    >
                      <span>Post</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div>
                  <span className={`px-2 py-0.5 rounded-pill text-[11px] font-mono border ${
                    item.rightsStatus === 'host_allowed'
                      ? 'bg-cool-soft border-cool text-cool'
                      : 'bg-paper-3 border-rule text-muted'
                  }`}>
                    {item.rightsStatus === 'host_allowed' ? 'Verified Open / Curated' : 'Official Source Only'}
                  </span>
                </div>
              </div>

            </div>

            {/* Prompt View Tabs & Live Code Display */}
            <div className="flex-1 flex flex-col space-y-2 min-h-[220px]">
              <div className="flex items-center justify-between">
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

                <span className="text-[11px] font-mono text-muted">
                  ~{Math.round((activeTab === 'customized' ? customizedPrompt.length : (item.originalPrompt || item.contentBody).length) / 4)} tokens
                </span>
              </div>

              {/* Code Box */}
              <div className="relative flex-1 rounded-card bg-paper-3 border border-rule p-4 overflow-y-auto max-h-[320px] font-mono text-xs leading-relaxed selection:bg-accent-soft">
                {activeTab === 'customized' ? (
                  <pre className="text-ink whitespace-pre-wrap font-mono">
                    {customizedPrompt}
                  </pre>
                ) : (
                  <div className="space-y-3">
                    <pre className="text-ink whitespace-pre-wrap font-mono">
                      {item.originalPrompt || item.contentBody}
                    </pre>
                    {item.rightsStatus === 'link_only' && item.sourceUrl && (
                      <div className="p-2.5 rounded-pill bg-paper-2 border border-rule text-xs text-muted font-sans flex items-center justify-between gap-2">
                        <span>Attribution: exact original prompt published by @{item.handle} on X.</span>
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cool hover:underline inline-flex items-center gap-1 font-mono text-[11px] shrink-0"
                        >
                          <span>View on X</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-rule flex-shrink-0">
              <div className="text-xs text-muted">
                {activeTab === 'customized' ? 'Ready for Claude Opus 5.5 / Sonnet' : 'Canonical source text'}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyOriginal}
                  className="w-full sm:w-auto px-3.5 py-1.5 rounded-pill border border-rule bg-paper hover:bg-paper-3 text-ink text-xs font-medium transition-colors flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {copiedOriginal ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cool" />
                      <span>Copied original</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy original</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCopyCustomized}
                  className="w-full sm:w-auto px-4 py-1.5 rounded-pill bg-accent hover:opacity-90 text-accent-ink text-xs font-medium transition-opacity flex items-center justify-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-accent-ink" />
                      <span>Copied customized!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Copy customized prompt</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
