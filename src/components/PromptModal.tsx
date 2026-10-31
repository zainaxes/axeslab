"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Resource } from "@/types";
import { VideoPlayer } from "./VideoPlayer";
import { Copy, Check, ExternalLink, X, Code2 } from "lucide-react";

interface PromptModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PromptModal({ resource, isOpen, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !resource) return null;

  const metadata = resource.parsed_metadata || {};
  const videoUrl = metadata.custom_video_url || metadata.effectUrl || metadata.default_video_url;
  const youtubeUrl = metadata.youtube_video_id || metadata.custom_video_url;
  const posterUrl = metadata.posterUrl;
  const categoryName = metadata.categoryName || resource.subcategory_name || "Web Design";

  const handleCopy = async () => {
    if (!resource.content_body) return;
    try {
      await navigator.clipboard.writeText(resource.content_body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-subtleBorder bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-subtleBorder px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-surface-strong border border-subtleBorder px-2.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-primaryText">
              {categoryName}
            </span>
            <h2 className="text-lg font-bold text-primaryText sm:text-xl">
              {resource.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/resource/${resource.slug}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-subtleBorder px-3 py-1.5 text-xs font-medium text-mutedText hover:bg-surface-strong hover:text-primaryText transition-colors"
            >
              <span>Full Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-mutedText hover:bg-surface-strong hover:text-primaryText transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Media Player Holder */}
          <div className="overflow-hidden rounded-xl border border-subtleBorder shadow-sm">
            <VideoPlayer
              posterUrl={posterUrl}
              videoUrl={videoUrl}
              youtubeUrl={youtubeUrl}
              title={resource.title}
              aspectRatio="aspect-[16/10]"
              controls={true}
            />
          </div>

          {/* Description & Branding Bar */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-surface-strong border border-subtleBorder p-4">
            <div>
              <p className="text-sm text-primaryText">
                {resource.summary}
              </p>
              <div className="mt-1 flex items-center gap-2 text-xs font-mono text-mutedText">
                <span>Curated by Axes Lab</span>
                <span>•</span>
                <a
                  href="https://axeslab.zainaxes.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primaryText hover:underline"
                >
                  axeslab.zainaxes.com
                </a>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-state-inverse px-4 py-2.5 text-sm font-semibold text-state-inverseText transition-all hover:opacity-90 shrink-0 shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-state-success" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Prompt</span>
                </>
              )}
            </button>
          </div>

          {/* Prompt Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-mono font-medium uppercase tracking-wider text-mutedText">
                <Code2 className="h-4 w-4" />
                Prompt Specification
              </span>
              <span className="font-mono text-xs text-mutedText">
                {resource.content_body ? `${resource.content_body.length.toLocaleString()} characters` : "Empty"}
              </span>
            </div>

            <pre className="max-h-96 overflow-x-auto rounded-xl border border-subtleBorder bg-[#09090B] p-4 font-mono text-xs text-zinc-100">
              <code>{resource.content_body}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-subtleBorder px-6 py-3 text-xs text-mutedText">
          <span>
            Verified for production use at{" "}
            <a
              href="https://axeslab.zainaxes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline hover:text-primaryText"
            >
              axeslab.zainaxes.com
            </a>
          </span>
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 font-medium hover:bg-surface-strong hover:text-primaryText transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
