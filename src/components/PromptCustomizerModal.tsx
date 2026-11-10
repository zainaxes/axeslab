'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, Copy, Check, RotateCcw, ExternalLink, Play, Pause } from 'lucide-react';
import { toast } from 'sonner';
import { RealPromptItem } from '@/lib/real-prompts';
import { getProxiedMediaUrl } from '@/lib/video-utils';
import {
  DEFAULT_DIALS,
  DialsState,
  DETAILS_STORAGE_KEY,
  PM_DETAILS_STORAGE_KEY,
  withDetails,
  customizeTemplate,
} from '@/lib/customizer-engine';
import {
  MinimalistDials,
  MinimalistFieldControls,
} from '@/components/CustomizerFields';

export interface PromptCustomizerModalProps {
  item: RealPromptItem;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptCustomizerModal({
  item,
  isOpen,
  onClose,
}: PromptCustomizerModalProps) {
  const [activeTab, setActiveTab] = useState<'customized' | 'original'>('customized');
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMethodA =
    item.customizerType === 'field_replacement' &&
    Boolean(item.template && item.fields);

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

  const [methodBValues, setMethodBValues] = useState<Record<string, string>>({
    about: 'A motion launch for ZainAxes',
    format: '',
    length: '',
    colours: '',
    typeface: '',
    notes: '',
  });

  const [dials, setDials] = useState<DialsState>(DEFAULT_DIALS);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(DETAILS_STORAGE_KEY) ||
        localStorage.getItem(PM_DETAILS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === 'object' && parsed !== null) {
          setMethodBValues((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isMethodA && item.fields) {
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
    setActiveTab('customized');
    setIsPlaying(false);
    setPosterFailed(false);
  }, [item.id, isMethodA, item.fields]);

  const customizedPrompt = useMemo(() => {
    if (isMethodA && item.template && item.fields) {
      return customizeTemplate(item.template, item.fields, methodAValues, dials);
    }
    const base = item.originalPrompt || item.contentBody || '';
    return withDetails(base, methodBValues, dials);
  }, [
    isMethodA,
    item.template,
    item.fields,
    item.originalPrompt,
    item.contentBody,
    methodAValues,
    methodBValues,
    dials,
  ]);

  if (!isOpen) return null;

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
      setMethodBValues({
        about: '',
        format: '',
        length: '',
        colours: '',
        typeface: '',
        notes: '',
      });
      try {
        localStorage.removeItem(DETAILS_STORAGE_KEY);
      } catch {}
    }
    setDials(DEFAULT_DIALS);
    toast.success('Reset to defaults');
  };

  const copyText = async (text: string, kind: 'customized' | 'original') => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    if (kind === 'customized') {
      setCopied(true);
      toast.success('Prompt copied');
      setTimeout(() => setCopied(false), 1800);
    } else {
      setCopiedOriginal(true);
      toast.success('Original prompt copied');
      setTimeout(() => setCopiedOriginal(false), 1800);
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

  const originalText = item.originalPrompt || item.contentBody;
  const activeText = activeTab === 'customized' ? customizedPrompt : originalText;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Customize ${item.title}`}
      className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-paper/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-5xl bg-paper/95 border border-rule/80 rounded-card overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Minimalist Top Bar */}
        <div className="px-5 py-3.5 border-b border-rule/60 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="min-w-0 flex items-baseline gap-2.5">
            <h2 className="text-sm font-medium text-ink truncate">
              {item.title}
            </h2>
            <span className="text-xs text-muted font-mono shrink-0">
              @{item.handle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              type="button"
              onClick={resetToDefaults}
              className="h-7 px-2.5 rounded-pill text-xs text-muted hover:text-ink hover:bg-paper-2/60 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              title="Reset to defaults"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-2/60 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close customizer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Open 2-Column Workspace (Hairline divider only, zero heavy boxes) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          <div className="lg:col-span-5 p-5 border-b lg:border-b-0 lg:border-r border-rule/60 space-y-5 overflow-y-auto max-h-[460px] lg:max-h-none">
            <MinimalistFieldControls
              idPrefix={`modal-${item.id}`}
              isMethodA={isMethodA}
              fields={item.fields}
              methodAValues={methodAValues}
              methodBValues={methodBValues}
              onMethodAChange={handleMethodAChange}
              onMethodBChange={handleMethodBChange}
            />

            <MinimalistDials
              idPrefix={`modal-${item.id}`}
              dials={dials}
              onChange={handleDialChange}
            />
          </div>

          <div className="lg:col-span-7 p-5 flex flex-col justify-between space-y-4 overflow-y-auto">
            {/* Quiet Media + Source Line */}
            <div className="space-y-2">
              <div className="relative aspect-[16/9] w-full max-w-md mx-auto rounded-lg overflow-hidden bg-paper-2/25">
                {item.video && (
                  <video
                    ref={videoRef}
                    src={getProxiedMediaUrl(item.video)}
                    poster={posterFailed ? undefined : getProxiedMediaUrl(item.poster)}
                    preload="metadata"
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                {!isPlaying && item.poster && !posterFailed && (
                  <img
                    src={getProxiedMediaUrl(item.poster)}
                    alt={item.title}
                    onError={() => setPosterFailed(true)}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                {item.video && (
                  <button
                    type="button"
                    onClick={toggleVideo}
                    className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-pill bg-paper/75 backdrop-blur-sm border border-rule/50 text-ink flex items-center justify-center hover:border-rule-2 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                    aria-label={isPlaying ? 'Pause preview' : 'Play preview'}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted px-0.5">
                <span>
                  {item.width && item.height ? `${item.width}×${item.height}` : '16:9'} · @{item.handle}
                </span>
                {item.sourceUrl && (
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cool hover:underline inline-flex items-center gap-1"
                  >
                    <span>Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Clean Prompt Output */}
            <div className="flex-1 flex flex-col space-y-2.5 min-h-[210px]">
              <div className="flex items-center justify-between gap-2 border-b border-rule/40 pb-2">
                <div className="inline-flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('customized')}
                    className={`text-xs pb-0.5 border-b transition-colors ${
                      activeTab === 'customized'
                        ? 'border-ink text-ink font-medium'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    Customized
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('original')}
                    className={`text-xs pb-0.5 border-b transition-colors ${
                      activeTab === 'original'
                        ? 'border-ink text-ink font-medium'
                        : 'border-transparent text-muted hover:text-ink'
                    }`}
                  >
                    Original
                  </button>
                </div>

                <span className="text-[11px] font-mono text-muted/80">
                  ~{Math.round(activeText.length / 4)} tokens
                </span>
              </div>

              <div className="flex-1 rounded-lg bg-paper-2/20 p-3.5 overflow-y-auto max-h-[300px] font-mono text-xs leading-relaxed selection:bg-accent-soft">
                <pre className="text-ink-2 whitespace-pre-wrap font-mono">
                  {activeText}
                </pre>
              </div>
            </div>

            {/* Minimalist Bottom Action Row */}
            <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-rule/40 flex-shrink-0">
              <button
                type="button"
                onClick={() => copyText(originalText, 'original')}
                className="h-8 px-3.5 rounded-pill text-muted hover:text-ink hover:bg-paper-2/50 text-xs transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                {copiedOriginal ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-cool" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy original</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => copyText(customizedPrompt, 'customized')}
                className="h-8 px-4 rounded-pill bg-accent hover:opacity-90 text-accent-ink text-xs font-medium transition-opacity inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy customized</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
