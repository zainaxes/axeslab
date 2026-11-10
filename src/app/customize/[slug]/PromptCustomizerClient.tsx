"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Copy,
  ExternalLink,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { RealPromptItem } from "@/lib/real-prompts";
import { getProxiedMediaUrl } from "@/lib/video-utils";
import {
  DEFAULT_DIALS,
  DETAILS_STORAGE_KEY,
  DialsState,
  PM_DETAILS_STORAGE_KEY,
  customizeTemplate,
  withDetails,
} from "@/lib/customizer-engine";
import {
  MinimalistDials,
  MinimalistFieldControls,
} from "@/components/CustomizerFields";

export default function PromptCustomizerClient({ item }: { item: RealPromptItem }) {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || `/resource/${item.slug}`;

  const [activeTab, setActiveTab] = useState<"customized" | "original">("customized");
  const [copied, setCopied] = useState(false);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMethodA =
    item.customizerType === "field_replacement" &&
    Boolean(item.template && item.fields);

  const [methodAValues, setMethodAValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    if (item.fields) {
      item.fields.forEach((f) => {
        if (f.key === "concept" && f.default?.includes("your pick")) {
          init[f.key] = "ZainAxes — motion design showcase";
        } else {
          init[f.key] = f.default || "";
        }
      });
    }
    return init;
  });

  const [methodBValues, setMethodBValues] = useState<Record<string, string>>({
    about: "A motion launch for ZainAxes",
    format: "",
    length: "",
    colours: "",
    typeface: "",
    notes: "",
  });

  const [dials, setDials] = useState<DialsState>(DEFAULT_DIALS);

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(DETAILS_STORAGE_KEY) ||
        localStorage.getItem(PM_DETAILS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed === "object" && parsed !== null) {
          setMethodBValues((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
  }, []);

  const customizedPrompt = useMemo(() => {
    if (isMethodA && item.template && item.fields) {
      return customizeTemplate(item.template, item.fields, methodAValues, dials);
    }
    const base = item.originalPrompt || item.contentBody || "";
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
        init[f.key] = f.default || "";
      });
      setMethodAValues(init);
    } else {
      setMethodBValues({
        about: "",
        format: "",
        length: "",
        colours: "",
        typeface: "",
        notes: "",
      });
      try {
        localStorage.removeItem(DETAILS_STORAGE_KEY);
      } catch {}
    }
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
    const originalText = item.originalPrompt || item.contentBody;
    try {
      await navigator.clipboard.writeText(originalText);
      setCopiedOriginal(true);
      toast.success("Original prompt copied");
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

  const activeText =
    activeTab === "customized"
      ? customizedPrompt
      : item.originalPrompt || item.contentBody;

  return (
    <div className="min-h-screen bg-paper text-ink py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[var(--container)] mx-auto space-y-6">
        {/* Minimal Context Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rule/60">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href={returnTo}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-pill bg-paper-2/50 border border-rule/70 hover:border-rule-2 text-xs text-ink transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <h1 className="text-base sm:text-lg font-medium text-ink truncate">
              {item.title}
            </h1>
            <span className="hidden sm:inline text-xs font-mono text-muted shrink-0">
              @{item.handle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-cool hover:underline"
              >
                <span>Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={resetToDefaults}
              className="h-8 px-3 rounded-pill text-xs text-muted hover:text-ink hover:bg-paper-2/50 transition-colors inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Open Two-Column Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-6 lg:pr-6 lg:border-r lg:border-rule/60">
            <MinimalistFieldControls
              idPrefix={`page-${item.id}`}
              isMethodA={isMethodA}
              fields={item.fields}
              methodAValues={methodAValues}
              methodBValues={methodBValues}
              onMethodAChange={handleMethodAChange}
              onMethodBChange={handleMethodBChange}
            />

            <MinimalistDials
              idPrefix={`page-${item.id}`}
              dials={dials}
              onChange={handleDialChange}
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            {(item.poster || item.video) && (
              <div className="relative aspect-[16/9] w-full rounded-card overflow-hidden bg-paper-2/20">
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
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-pill bg-paper/75 backdrop-blur-sm border border-rule/50 text-ink flex items-center justify-center hover:border-rule-2 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-3.5 h-3.5" />
                    ) : (
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    )}
                  </button>
                )}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule/40 pb-2">
              <div className="inline-flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setActiveTab("customized")}
                  className={`text-xs pb-0.5 border-b transition-colors ${
                    activeTab === "customized"
                      ? "border-ink text-ink font-medium"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  Customized
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("original")}
                  className={`text-xs pb-0.5 border-b transition-colors ${
                    activeTab === "original"
                      ? "border-ink text-ink font-medium"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  Original
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-muted/80 mr-1">
                  ~{Math.round(activeText.length / 4)} tokens
                </span>
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
                  <span>{copiedOriginal ? "Copied" : "Copy original"}</span>
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
              {activeText}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
