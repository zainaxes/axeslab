'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { TemplateItem } from '@/lib/templates-data';
import {
  ArrowLeft,
  SlidersHorizontal,
  RotateCcw,
  Copy,
  Check,
  Play,
  Pause,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DEFAULT_DIALS,
  DIALS,
  DIAL_KEYS,
  DialsState,
  SIZES,
  customizeTemplate
} from '@/lib/customizer-engine';

export default function TemplateCustomizerClient({ template }: { template: TemplateItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Field values state
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    template.fields.forEach((f) => {
      // ZainAxes brand integration: default concept
      if (f.key === 'concept') {
        init[f.key] = 'ZainAxes — motion design showcase';
      } else {
        init[f.key] = f.default || '';
      }
    });
    return init;
  });

  // Dials
  const [dials, setDials] = useState<DialsState>(DEFAULT_DIALS);

  const customizedPrompt = useMemo(() => {
    return customizeTemplate(template.template, template.fields, values, dials);
  }, [template, values, dials]);

  const handleFieldChange = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const handleDialChange = (key: keyof DialsState, val: number) => {
    setDials((prev) => ({ ...prev, [key]: val }));
  };

  const resetDefaults = () => {
    const reset: Record<string, string> = {};
    template.fields.forEach((f) => {
      reset[f.key] = f.default || '';
    });
    setValues(reset);
    setDials(DEFAULT_DIALS);
    toast.success('Reset fields to defaults');
  };

  const handleCopyCustomized = () => {
    navigator.clipboard.writeText(customizedPrompt);
    setCopied(true);
    toast.success('Customized prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyOriginal = () => {
    navigator.clipboard.writeText(template.template);
    setCopiedOriginal(true);
    toast.success('Original blueprint prompt copied');
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
        
        {/* Navigation link */}
        <div className="flex items-center justify-between">
          <Link
            href={`/templates/${template.slug}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {template.title}</span>
          </Link>

          <Link
            href="/templates"
            className="text-xs text-muted hover:text-ink transition-colors"
          >
            All templates
          </Link>
        </div>

        {/* Top Header Card */}
        <header className="rounded-card bg-paper-2 border border-rule p-6 flex flex-col md:flex-row items-start gap-6">
          <div className="relative aspect-[16/9] w-full md:w-72 shrink-0 rounded-pill overflow-hidden bg-paper-3 border border-rule group shadow-sm">
            <img
              src={template.poster}
              alt={template.title}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <video
              ref={videoRef}
              src={template.video}
              poster={template.poster}
              loop
              muted
              playsInline
              className={`w-full h-full object-cover ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
            />
            <button
              type="button"
              onClick={toggleVideo}
              className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-paper/90 border border-rule text-ink flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity shadow-md"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
          </div>

          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-cool font-mono text-[11px]">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Production Template Blueprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
              Customize: {template.title}
            </h1>
            <p className="text-xs text-muted leading-relaxed max-w-xl">
              Written for automated generation with Claude Opus 5.5. The video preview represents the output generated with canonical defaults.
            </p>
          </div>
        </header>

        {/* Customization Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-card bg-paper-2 border border-rule p-5 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-rule">
              <div>
                <h2 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
                  Template Fields
                </h2>
                <span className="text-[11px] text-muted font-mono">
                  Brand: <strong className="text-ink font-sans">ZainAxes</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={resetDefaults}
                className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-3 hover:bg-paper text-muted hover:text-ink transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Field Inputs */}
            <div className="space-y-4">
              {template.fields.map((field) => {
                const val = values[field.key] ?? '';
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
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
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
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="w-full text-xs bg-paper-3 border border-rule focus:border-accent rounded-pill p-2.5 text-ink placeholder:text-muted/60 outline-none transition-colors resize-y"
                      />
                    ) : (
                      <input
                        type="text"
                        value={val}
                        placeholder={field.default || `Enter ${field.label}...`}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
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

            {/* Dials Section */}
            <div className="pt-4 border-t border-rule space-y-4">
              <h3 className="text-xs font-sans font-medium text-ink uppercase tracking-wider flex items-center gap-1.5">
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
                <Sparkles className="w-4 h-4 text-accent" />
                <h2 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
                  Live Customized Output
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyOriginal}
                  className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-3 hover:bg-paper text-muted hover:text-ink transition-colors flex items-center gap-1"
                >
                  {copiedOriginal ? <Check className="w-3 h-3 text-cool" /> : <Copy className="w-3 h-3" />}
                  <span>Copy blueprint</span>
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

            <pre className="p-4 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap selection:bg-accent-soft max-h-[640px] overflow-y-auto">
              {customizedPrompt}
            </pre>

            <div className="pt-2 text-[11px] font-mono text-muted flex items-center justify-between">
              <span>~{Math.round(customizedPrompt.length / 4)} tokens</span>
              <span className="text-cool">Validated with Claude Opus 5.5</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

