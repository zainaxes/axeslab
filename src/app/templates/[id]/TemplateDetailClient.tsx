'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { TemplateItem } from '@/lib/templates-data';
import { ArrowLeft, SlidersHorizontal, Copy, Check, Play, Pause, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function TemplateDetailClient({ template }: { template: TemplateItem }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(template.template);
    setCopied(true);
    toast.success('Template prompt copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back navigation */}
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Templates</span>
        </Link>

        {/* Header Block */}
        <div className="space-y-3 border-b border-rule pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-medium text-ink">
                {template.title}
              </h1>
              <p className="text-xs text-muted mt-1 max-w-xl leading-relaxed">
                {template.description}
              </p>
            </div>

            <Link
              href={`/templates/${template.slug}/customize`}
              className="self-start sm:self-auto px-4 py-2 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Customize parameters</span>
            </Link>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[16/9] w-full rounded-card overflow-hidden bg-paper-3 border border-rule group shadow-lg">
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
            className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-paper/90 border border-rule text-ink flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity shadow-lg focus-visible:outline-2 focus-visible:outline-accent"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>
        </div>

        {/* Fields list */}
        <div className="space-y-3">
          <h2 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
            Customizable Blueprint Fields ({template.fields.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {template.fields.map((f) => (
              <div key={f.key} className="p-3.5 rounded-pill bg-paper-2 border border-rule space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink">{f.label}</span>
                  <code className="text-[10px] font-mono text-cool bg-paper-3 px-1.5 py-0.5 rounded border border-rule">
                    {'{{' + f.key + '}}'}
                  </code>
                </div>
                <p className="text-[11px] text-muted leading-tight">{f.hint}</p>
                <div className="pt-1 text-[11px] text-muted font-mono truncate">
                  Default: <span className="text-ink font-sans">{f.default}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Template Prompt Text */}
        <div className="space-y-3 pt-4 border-t border-rule">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-sans font-medium text-ink uppercase tracking-wider">
              Full Canonical Template Prompt
            </h2>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs px-3 py-1 rounded-pill bg-paper-3 border border-rule hover:bg-paper-2 text-ink flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cool" /> : <Copy className="w-3.5 h-3.5 text-muted" />}
              <span>{copied ? 'Copied' : 'Copy blueprint'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap selection:bg-accent-soft max-h-96 overflow-y-auto">
            {template.template}
          </pre>
        </div>

      </div>
    </div>
  );
}
