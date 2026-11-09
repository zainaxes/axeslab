'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ALL_REAL_PROMPTS, RealPromptItem } from '@/lib/real-prompts';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  SlidersHorizontal,
  Play,
  Pause,
  ShieldCheck,
  Code2,
  Sparkles,
  Info
} from 'lucide-react';
import { toast } from 'sonner';

interface PromptModalProps {
  item?: RealPromptItem | null;
  isOpen?: boolean;
  onClose?: () => void;
  onOpenCustomizer?: (item: RealPromptItem) => void;
}

export function PromptModal({
  item: propItem,
  isOpen = true,
  onClose,
  onOpenCustomizer
}: PromptModalProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const promptSlug = searchParams.get('prompt');

  const [item, setItem] = useState<RealPromptItem | null>(propItem || null);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedImproved, setCopiedImproved] = useState(false);
  const [copiedSkillCmd, setCopiedSkillCmd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (propItem) {
      setItem(propItem);
      return;
    }
    if (!promptSlug) {
      setItem(null);
      return;
    }
    const found = ALL_REAL_PROMPTS.find((p) => p.slug === promptSlug);
    if (found) {
      setItem(found);
    }
  }, [promptSlug, propItem]);

  const closeModal = () => {
    if (onClose) {
      onClose();
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.delete('prompt');
    const newQuery = params.toString();
    router.replace(newQuery ? `/?${newQuery}` : '/', { scroll: false });
  };

  const handleCopy = (text: string, type: 'original' | 'improved' | 'skill') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (type === 'original') {
      setCopiedOriginal(true);
      setTimeout(() => setCopiedOriginal(false), 2000);
      toast.success('Original prompt copied to clipboard');
    } else if (type === 'improved') {
      setCopiedImproved(true);
      setTimeout(() => setCopiedImproved(false), 2000);
      toast.success('Curated tested prompt copied to clipboard');
    } else {
      setCopiedSkillCmd(true);
      setTimeout(() => setCopiedSkillCmd(false), 2000);
      toast.success('Skill installation command copied');
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

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-paper-3/85 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      />

      {/* Modal Dialog Window */}
      <div className="relative z-10 w-full max-w-4xl bg-paper border border-rule-2 rounded-card shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="px-5 py-3.5 border-b border-rule bg-paper-2 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-cool flex-shrink-0" />
            <h2 className="text-sm font-sans font-medium text-ink truncate">
              {item.title}
            </h2>
            <span className="font-mono text-xs px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted shrink-0">
              {item.category}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {item.hasCustomize && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenCustomizer) {
                    onOpenCustomizer(item);
                  } else {
                    router.push(`/customize/${item.slug}`);
                  }
                }}
                className="text-xs px-3 py-1 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            )}

            <button
              type="button"
              onClick={closeModal}
              className="p-1.5 rounded-pill text-muted hover:text-ink hover:bg-paper-3 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* 1. Preview Media (Aspect 16:9 or locked aspect) */}
          <div className="relative aspect-[16/9] w-full max-w-2xl mx-auto rounded-pill overflow-hidden bg-paper-3 border border-rule group">
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
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-paper/90 border border-rule text-ink flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity shadow-lg focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={isPlaying ? 'Pause video' : 'Play motion video'}
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-2">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-pill bg-paper/90 text-muted border border-rule">
                {item.width && item.height ? `${item.width}×${item.height}` : '1920×1080'}
              </span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-pill bg-paper/90 text-cool border border-rule">
                {item.model || 'Opus 5.5'}
              </span>
            </div>
          </div>

          {/* 2 & 3. Title & Creator Attribution Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rule pb-4">
            <div>
              <h1 className="text-xl font-display font-medium text-ink">
                {item.title}
              </h1>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted">
                <span>By <strong className="text-ink font-medium">@{item.handle}</strong> ({item.author})</span>
                {item.sourceUrl && (
                  <>
                    <span>·</span>
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cool hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Original {item.isSkill ? 'Repo' : 'Post on X'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* 4. Subcategories Tags */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-sans text-xs px-2.5 py-0.5 rounded-pill bg-paper-2 border border-rule text-ink font-medium">
                {item.subcategory}
              </span>
              {(item.subcategories || []).filter(s => s !== item.subcategory).map(s => (
                <span key={s} className="font-sans text-[11px] px-2 py-0.5 rounded-pill bg-paper-3 border border-rule text-muted">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* 5. Original Prompt Section */}
          {!item.isSkill && item.originalPrompt && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
                    Original Prompt
                  </h3>
                  <span className="text-[11px] font-mono text-muted">
                    by @{item.handle}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item.originalPrompt!, 'original')}
                  className="text-xs px-3 py-1 rounded-pill border border-rule bg-paper-2 hover:bg-paper-3 text-ink transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {copiedOriginal ? (
                    <>
                      <Check className="w-3 h-3 text-cool" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-muted" />
                      <span>Copy original prompt</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto selection:bg-accent-soft">
                {item.originalPrompt}
              </div>

              {item.rightsStatus === 'link_only' && item.sourceUrl && (
                <div className="p-3 rounded-pill bg-paper-2 border border-rule text-xs text-muted flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-cool flex-shrink-0" />
                    <span>Distribution notice: Rights belong to @{item.handle}. Listed as directory reference.</span>
                  </div>
                  <a
                    href={item.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cool hover:underline inline-flex items-center gap-1 font-mono text-[11px] self-start sm:self-auto shrink-0"
                  >
                    <span>View creator post</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 6. Improved/Tested Prompt (where available) */}
          {!item.isSkill && item.improvedPrompt && (
            <div className="space-y-2.5 pt-2 border-t border-rule">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <h3 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
                    Curated Tested Rewrite / Template
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {item.hasCustomize && (
                    <button
                      type="button"
                      onClick={() => {
                        if (onOpenCustomizer) {
                          onOpenCustomizer(item);
                        } else {
                          router.push(`/customize/${item.slug}`);
                        }
                      }}
                      className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-2 hover:bg-paper-3 text-muted hover:text-ink transition-colors flex items-center gap-1"
                    >
                      <SlidersHorizontal className="w-3 h-3 text-cool" />
                      <span>Customize this</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => handleCopy(item.improvedPrompt!, 'improved')}
                    className="text-xs px-3 py-1 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    {copiedImproved ? (
                      <>
                        <Check className="w-3 h-3 text-accent-ink" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy tested template</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto selection:bg-accent-soft">
                {item.improvedPrompt}
              </div>
            </div>
          )}

          {/* SKILL SPECIFIC SECTION */}
          {item.isSkill && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
                  Skill Capability & Overview
                </h3>
                <p className="text-xs text-ink/90 leading-relaxed max-w-2xl">
                  {item.skillDescription}
                </p>
              </div>

              {item.skillCommand && (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted">CLI Install Directive</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.skillCommand!, 'skill')}
                      className="text-xs px-2.5 py-1 rounded-pill border border-rule bg-paper-2 hover:bg-paper text-ink transition-colors flex items-center gap-1"
                    >
                      {copiedSkillCmd ? <Check className="w-3 h-3 text-cool" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSkillCmd ? 'Copied' : 'Copy command'}</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded-pill bg-paper-3 border border-rule font-mono text-xs text-cool overflow-x-auto selection:bg-accent-soft">
                    {item.skillCommand}
                  </pre>
                </div>
              )}

              {item.skillRepo && (
                <div className="pt-2">
                  <a
                    href={item.skillRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-ink underline underline-offset-4 hover:text-cool transition-colors"
                  >
                    <span>View upstream GitHub repository</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 7. Model, Effort & Technical Specifications Table */}
          <div className="pt-4 border-t border-rule">
            <h4 className="text-xs font-sans font-medium text-ink uppercase tracking-wider mb-3">
              Technical Verification Parameters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-pill bg-paper-3 border border-rule">
                <span className="text-muted block text-[11px]">Validated Model</span>
                <span className="font-mono text-ink font-medium mt-0.5 block">{item.model || 'Opus 5.5'}</span>
              </div>
              <div className="p-2.5 rounded-pill bg-paper-3 border border-rule">
                <span className="text-muted block text-[11px]">Effort Setting</span>
                <span className="font-mono text-ink font-medium mt-0.5 block">{item.effort || 'Standard / None'}</span>
              </div>
              <div className="p-2.5 rounded-pill bg-paper-3 border border-rule">
                <span className="text-muted block text-[11px]">Publication Date</span>
                <span className="font-mono text-ink font-medium mt-0.5 block">{item.date || '2026-09'}</span>
              </div>
              <div className="p-2.5 rounded-pill bg-paper-3 border border-rule">
                <span className="text-muted block text-[11px]">Distribution Status</span>
                <span className="font-mono text-cool font-medium mt-0.5 block truncate">
                  {item.rightsStatus === 'host_allowed' ? 'host_allowed' : 'link_only'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-rule bg-paper-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-muted flex-shrink-0">
          <div>
            <span>Brand: <strong className="text-ink font-medium">ZainAxes</strong> (motion prompt directory reference)</span>
          </div>

          <div className="flex items-center gap-3">
            {item.hasCustomize && (
              <button
                type="button"
                onClick={() => {
                  if (onOpenCustomizer) {
                    onOpenCustomizer(item);
                  } else {
                    router.push(`/customize/${item.slug}`);
                  }
                }}
                className="text-xs px-3 py-1 rounded-pill bg-ink text-paper font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Launch Customizer</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
