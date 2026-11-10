"use client";

import React, { useState } from "react";
import { Copy, Check, FolderTree } from "lucide-react";
import { toast } from "sonner";
import { Resource } from "@/types";
import { VideoPlayer } from "./VideoPlayer";

export default function TypePreview({ resource }: { resource: Resource }) {
  const [copied, setCopied] = useState(false);
  const [promptRevealed, setPromptRevealed] = useState(false);
  const metadata = resource.parsed_metadata || {};

  const handleCopy = async (text: string, reveal = false) => {
    if (reveal) setPromptRevealed(true);
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.info("Text is visible below for manual copying");
    }
  };

  if (resource.resource_type === "prompt") {
    const videoUrl =
      metadata.custom_video_url ||
      metadata.effectUrl ||
      metadata.default_video_url;
    const youtubeUrl = metadata.youtube_video_id || metadata.custom_video_url;
    const posterUrl = metadata.posterUrl;
    const categoryName =
      metadata.categoryName || resource.subcategory_name || "Prompt";

    return (
      <div className="space-y-6">
        <VideoPlayer
          posterUrl={posterUrl}
          videoUrl={videoUrl}
          youtubeUrl={youtubeUrl}
          title={resource.title}
          aspectRatio="aspect-[16/10]"
          controls={true}
          categoryName={categoryName}
        />

        {resource.content_body && (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleCopy(resource.content_body || "", true)}
              className="h-10 px-5 rounded-pill bg-accent text-accent-ink text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Show and copy the prompt</span>
                </>
              )}
            </button>

            {promptRevealed && (
              <div className="rounded-card border border-rule-2 bg-paper-3 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-paper-2 border-b border-rule text-xs">
                  <span className="font-medium text-ink">Original Prompt</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(resource.content_body || "", true)}
                    className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-pill bg-paper-3 border border-rule text-ink hover:border-rule-2"
                  >
                    {copied ? <Check className="w-3 h-3 text-cool" /> : <Copy className="w-3 h-3 text-muted" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <div className="p-4 sm:p-5 overflow-x-auto max-h-[60vh]">
                  <pre className="font-mono text-xs sm:text-[13px] text-ink whitespace-pre-wrap leading-relaxed select-all">
                    {resource.content_body}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {metadata.prompt_variables && metadata.prompt_variables.length > 0 && (
          <div className="rounded-card border border-rule bg-paper-2 p-4">
            <h4 className="text-xs font-medium text-ink mb-3">
              Variables &amp; Placeholders
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-rule text-muted">
                  <tr>
                    <th className="py-2 pr-4 font-medium">Variable</th>
                    <th className="py-2 pr-4 font-medium">Description</th>
                    <th className="py-2 font-medium">Default</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {metadata.prompt_variables.map((v, i) => (
                    <tr key={i}>
                      <td className="py-2 pr-4 font-mono text-cool">
                        {`{{${v.name}}}`}
                      </td>
                      <td className="py-2 pr-4 text-ink-2">{v.description}</td>
                      <td className="py-2 font-mono text-muted">
                        {v.default_value || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {metadata.tested_models && metadata.tested_models.length > 0 && (
          <div className="rounded-card border border-rule bg-paper-2 p-4 space-y-2">
            <h4 className="text-xs font-medium text-ink">
              Verified Model Compatibility
            </h4>
            <div className="flex flex-wrap gap-2">
              {metadata.tested_models.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded-pill bg-paper-3 border border-rule text-xs font-mono text-ink-2"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (resource.resource_type === "skill") {
    return (
      <div className="space-y-6">
        {metadata.install_command && (
          <div className="rounded-card border border-rule bg-paper-2 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-rule text-xs">
              <span className="font-medium text-ink">Installation Command</span>
              <button
                type="button"
                onClick={() => handleCopy(metadata.install_command || "")}
                className="inline-flex items-center gap-1 text-xs text-muted hover:text-ink"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cool" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="p-3.5 bg-paper-3 font-mono text-xs text-cool overflow-x-auto select-all">
              <code>{metadata.install_command}</code>
            </div>
          </div>
        )}

        {resource.content_body && (
          <div className="rounded-card border border-rule bg-paper-3 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-paper-2 border-b border-rule text-xs">
              <span className="font-medium text-ink">SKILL.md Definition</span>
              <button
                type="button"
                onClick={() => handleCopy(resource.content_body || "")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-pill bg-accent text-accent-ink hover:opacity-90"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Content"}</span>
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed select-all">
                {resource.content_body}
              </pre>
            </div>
          </div>
        )}

        {metadata.skill_files && metadata.skill_files.length > 0 && (
          <div className="rounded-card border border-rule bg-paper-2 p-4 space-y-2">
            <h4 className="text-xs font-medium text-ink flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-muted" />
              <span>Package File Structure</span>
            </h4>
            <ul className="font-mono text-xs space-y-1 text-muted pl-2">
              {metadata.skill_files.map((file, i) => (
                <li key={i}>├── {file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (resource.resource_type === "mcp_server") {
    const perm = metadata.permissions_summary || {};
    return (
      <div className="space-y-6">
        <div className="rounded-card border border-rule bg-paper-2 p-4 space-y-3">
          <h4 className="text-xs font-medium text-ink">
            Permission &amp; Access Matrix
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-pill bg-paper-3 border border-rule">
              <span className="text-muted block text-[11px]">Filesystem Reads</span>
              <span className={`font-medium ${perm.reads_filesystem ? "text-accent" : "text-muted"}`}>
                {perm.reads_filesystem ? "Yes (Scoped)" : "No"}
              </span>
            </div>
            <div className="p-3 rounded-pill bg-paper-3 border border-rule">
              <span className="text-muted block text-[11px]">Filesystem Writes</span>
              <span className={`font-medium ${perm.writes_filesystem ? "text-accent" : "text-cool"}`}>
                {perm.writes_filesystem ? "Yes (Modifies)" : "Read-Only"}
              </span>
            </div>
            <div className="p-3 rounded-pill bg-paper-3 border border-rule">
              <span className="text-muted block text-[11px]">Network Access</span>
              <span className="font-medium text-cool">
                {perm.network_access ? "External" : "Local Only"}
              </span>
            </div>
            <div className="p-3 rounded-pill bg-paper-3 border border-rule">
              <span className="text-muted block text-[11px]">Command Execution</span>
              <span className={`font-medium ${perm.executes_commands ? "text-bad" : "text-cool"}`}>
                {perm.executes_commands ? "Executes" : "None"}
              </span>
            </div>
          </div>
        </div>

        {resource.content_body && (
          <div className="rounded-card border border-rule bg-paper-3 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-paper-2 border-b border-rule text-xs">
              <span className="font-medium text-ink">MCP Configuration</span>
              <button
                type="button"
                onClick={() => handleCopy(resource.content_body || "")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-pill bg-accent text-accent-ink hover:opacity-90"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied" : "Copy Config"}</span>
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed select-all">
                {resource.content_body}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {resource.content_body && (
        <div className="rounded-card border border-rule bg-paper-3 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-paper-2 border-b border-rule text-xs">
            <span className="font-medium text-ink">Resource Specification</span>
            <button
              type="button"
              onClick={() => handleCopy(resource.content_body || "")}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-pill bg-accent text-accent-ink hover:opacity-90"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="font-mono text-xs text-ink whitespace-pre-wrap leading-relaxed select-all">
              {resource.content_body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
