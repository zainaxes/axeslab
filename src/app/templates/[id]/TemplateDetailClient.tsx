"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Pause,
  Play,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import { TemplateItem } from "@/lib/templates-data";
import { SafeMediaImage } from "@/components/SafeMediaImage";

export default function TemplateDetailClient({
  template,
}: {
  template: TemplateItem;
}) {
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.template);
      setCopied(true);
      toast.success("Template prompt copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.info("Select the prompt text below to copy");
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <Link
          href="/templates"
          className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All templates</span>
        </Link>

        <header className="border-b border-rule pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-mono text-muted">{template.model}</p>
            <h1 className="text-2xl sm:text-4xl font-display font-medium text-ink">
              {template.title}
            </h1>
            <p className="text-sm text-muted leading-relaxed">
              {template.description}
            </p>
          </div>

          <Link
            href={`/templates/${template.slug}/customize`}
            className="inline-flex items-center gap-2 h-10 px-5 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Customize</span>
          </Link>
        </header>

        <div className="relative aspect-[16/9] w-full rounded-card overflow-hidden bg-paper-3 border border-rule">
          <div
            className={`w-full h-full ${
              isPlaying ? "opacity-0" : "opacity-100"
            }`}
          >
            <SafeMediaImage
              src={template.poster}
              alt={template.title}
              fallbackLabel={template.title}
              loading="eager"
              className="w-full h-full object-cover"
            />
          </div>
          <video
            ref={videoRef}
            src={template.video}
            poster={template.poster}
            loop
            muted
            playsInline
            className={`absolute inset-0 w-full h-full object-cover ${
              isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          />

          <button
            type="button"
            onClick={toggleVideo}
            className="absolute bottom-3 right-3 h-8 px-3 rounded-pill bg-paper/90 border border-rule hover:border-rule-2 text-xs font-medium text-ink inline-flex items-center gap-1.5 backdrop-blur-sm"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        <section className="space-y-4">
          <h2 className="text-base font-display font-medium text-ink">
            Customizable Fields ({template.fields.length})
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {template.fields.map((f) => (
              <div
                key={f.key}
                className="p-4 rounded-card bg-paper-2 border border-rule space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-ink">{f.label}</span>
                  <code className="font-mono text-[11px] text-cool">
                    {`{{${f.key}}}`}
                  </code>
                </div>
                <p className="text-xs text-muted">{f.hint}</p>
                <p className="text-[11px] font-mono text-ink-2 truncate pt-1">
                  Default: {f.default}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3 pt-4 border-t border-rule">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-display font-medium text-ink">
              Template Prompt
            </h2>
            <button
              type="button"
              onClick={handleCopy}
              className="h-8 px-3 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs text-ink flex items-center gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-cool" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted" />
              )}
              <span>{copied ? "Copied" : "Copy template"}</span>
            </button>
          </div>

          <pre className="p-4 sm:p-5 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink leading-relaxed whitespace-pre-wrap select-all max-h-[500px] overflow-y-auto">
            {template.template}
          </pre>
        </section>
      </div>
    </div>
  );
}
