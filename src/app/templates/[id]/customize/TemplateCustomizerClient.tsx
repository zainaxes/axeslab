"use client";

import React, { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Pause, Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { TemplateItem } from "@/lib/templates-data";
import { getProxiedMediaUrl } from "@/lib/video-utils";
import {
  DEFAULT_DIALS,
  DialsState,
  customizeTemplate,
} from "@/lib/customizer-engine";
import {
  MinimalistDials,
  MinimalistFieldControls,
} from "@/components/CustomizerFields";

export default function TemplateCustomizerClient({
  template,
}: {
  template: TemplateItem;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    template.fields.forEach((f) => {
      if (f.key === "concept") {
        init[f.key] = "ZainAxes — motion design showcase";
      } else {
        init[f.key] = f.default || "";
      }
    });
    return init;
  });

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
      reset[f.key] = f.default || "";
    });
    setValues(reset);
    setDials(DEFAULT_DIALS);
    toast.success("Reset to defaults");
  };

  const handleCopyCustomized = async () => {
    try {
      await navigator.clipboard.writeText(customizedPrompt);
      setCopied(true);
      toast.success("Customized prompt copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.info("Select the prompt text to copy");
    }
  };

  const handleCopyOriginal = async () => {
    try {
      await navigator.clipboard.writeText(template.template);
      setCopiedOriginal(true);
      toast.success("Template copied");
      setTimeout(() => setCopiedOriginal(false), 1800);
    } catch {
      toast.info("Select the prompt text to copy");
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
    <div className="min-h-screen bg-paper text-ink py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[var(--container)] mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rule/60">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={`/templates/${template.slug}`}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill bg-paper-2/50 border border-rule/70 hover:border-rule-2 text-xs text-ink transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <h1 className="text-base sm:text-lg font-medium text-ink truncate">
              {template.title}
            </h1>
            <span className="hidden sm:inline text-xs font-mono text-muted shrink-0">
              {template.model}
            </span>
          </div>

          <button
            type="button"
            onClick={resetDefaults}
            className="h-8 px-3 rounded-pill text-xs text-muted hover:text-ink hover:bg-paper-2/50 transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 lg:pr-6 lg:border-r lg:border-rule/60">
            <MinimalistFieldControls
              idPrefix={`tpl-${template.id}`}
              isMethodA={true}
              fields={template.fields}
              methodAValues={values}
              onMethodAChange={handleFieldChange}
            />

            <MinimalistDials
              idPrefix={`tpl-${template.id}`}
              dials={dials}
              onChange={handleDialChange}
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="relative aspect-[16/9] w-full rounded-card overflow-hidden bg-paper-2/20">
              <video
                ref={videoRef}
                src={getProxiedMediaUrl(template.video)}
                poster={posterFailed ? undefined : getProxiedMediaUrl(template.poster)}
                preload="metadata"
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              {!isPlaying && template.poster && !posterFailed && (
                <img
                  src={getProxiedMediaUrl(template.poster)}
                  alt={template.title}
                  onError={() => setPosterFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
              <button
                type="button"
                onClick={toggleVideo}
                className="absolute bottom-3 right-3 w-8 h-8 rounded-pill bg-paper/75 backdrop-blur-sm border border-rule/50 text-ink flex items-center justify-center hover:border-rule-2 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule/40 pb-2">
              <span className="text-[11px] font-mono text-muted/80">
                ~{Math.round(customizedPrompt.length / 4)} tokens
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyOriginal}
                  className="h-8 px-3 rounded-pill text-xs text-muted hover:text-ink hover:bg-paper-2/40 transition-colors inline-flex items-center gap-1.5"
                >
                  {copiedOriginal ? (
                    <Check className="w-3.5 h-3.5 text-cool" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedOriginal ? "Copied" : "Copy blueprint"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCustomized}
                  className="h-8 px-4 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copied ? "Copied" : "Copy customized"}</span>
                </button>
              </div>
            </div>

            <pre className="p-4 rounded-lg bg-paper-2/20 font-mono text-xs text-ink-2 leading-relaxed whitespace-pre-wrap select-all max-h-[520px] overflow-y-auto">
              {customizedPrompt}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
