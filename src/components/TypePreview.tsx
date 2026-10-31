"use client";

import React, { useState } from "react";
import { Resource } from "@/types";
import { Copy, Check, Terminal, ShieldAlert, Cpu, Box, Server, FolderTree, AlertTriangle, ExternalLink } from "lucide-react";
import { VideoPlayer } from "./VideoPlayer";

export default function TypePreview({ resource }: { resource: Resource }) {
  const [copied, setCopied] = useState(false);
  const metadata = resource.parsed_metadata || {};

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Prompts
  if (resource.resource_type === "prompt") {
    const videoUrl = metadata.custom_video_url || metadata.effectUrl || metadata.default_video_url;
    const youtubeUrl = metadata.youtube_video_id || metadata.custom_video_url;
    const posterUrl = metadata.posterUrl;
    const categoryName = metadata.categoryName || resource.subcategory_name || "Prompt";
    const hasMedia = true; // All prompts now have valid media previews or rich thematic fallbacks

    return (
      <div className="space-y-6">
        {/* Visual / Video Preview Player */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-mutedText">
              Interactive Preview & Video Demonstration
            </span>
            <a
              href="https://axeslab.zainaxes.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-mono text-mutedText hover:text-primaryText"
            >
              <span>axeslab.zainaxes.com</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="overflow-hidden rounded-panel border border-subtleBorder shadow-sm">
            <VideoPlayer
              posterUrl={posterUrl}
              videoUrl={videoUrl}
              youtubeUrl={youtubeUrl}
              title={resource.title}
              aspectRatio="aspect-[16/10]"
              controls={true}
              categoryName={categoryName}
            />
          </div>
        </div>

        {/* Main Prompt Body */}
        {resource.content_body && (
          <div className="rounded-panel border border-subtleBorder-strong bg-surface-strong overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-subtleBorder">
              <span className="text-xs font-semibold text-primaryText uppercase tracking-wider">
                Prompt Template
              </span>
              <button
                type="button"
                onClick={() => handleCopy(resource.content_body || "")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-btn bg-state-inverse text-state-inverseText hover:opacity-90 transition-opacity"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Prompt"}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-primaryText whitespace-pre-wrap leading-relaxed select-text">
                {resource.content_body}
              </pre>
            </div>
          </div>
        )}

        {/* Variables Table */}
        {metadata.prompt_variables && metadata.prompt_variables.length > 0 && (
          <div className="rounded-panel border border-subtleBorder bg-surface p-4">
            <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider mb-3">
              Variables & Input Placeholders
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-subtleBorder text-mutedText uppercase font-semibold">
                  <tr>
                    <th className="py-2 pr-4">Variable</th>
                    <th className="py-2 pr-4">Description</th>
                    <th className="py-2">Default Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-subtleBorder/60">
                  {metadata.prompt_variables.map((v, i) => (
                    <tr key={i}>
                      <td className="py-2 pr-4 font-mono font-semibold text-primaryText">
                        {`{{${v.name}}}`}
                      </td>
                      <td className="py-2 pr-4 text-mutedText-secondary">{v.description}</td>
                      <td className="py-2 font-mono text-mutedText">{v.default_value || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tested Models */}
        {metadata.tested_models && metadata.tested_models.length > 0 && (
          <div className="rounded-panel border border-subtleBorder bg-surface p-4">
            <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider mb-2">
              Verified Model Compatibility
            </h4>
            <div className="flex flex-wrap gap-2">
              {metadata.tested_models.map((m) => (
                <span
                  key={m}
                  className="px-2.5 py-1 rounded bg-surface-strong border border-subtleBorder text-xs font-mono text-primaryText"
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

  // 2. Skills
  if (resource.resource_type === "skill") {
    return (
      <div className="space-y-6">
        {/* Installation Command */}
        {metadata.install_command && (
          <div className="rounded-panel border border-subtleBorder-strong bg-surface-strong overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-subtleBorder text-xs font-semibold text-primaryText">
              <span>Installation & Setup</span>
              <button
                type="button"
                onClick={() => handleCopy(metadata.install_command || "")}
                className="inline-flex items-center gap-1 text-xs text-mutedText hover:text-primaryText"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-3 bg-canvas font-mono text-xs text-primaryText overflow-x-auto">
              <code>{metadata.install_command}</code>
            </div>
          </div>
        )}

        {/* SKILL.md Preview */}
        {resource.content_body && (
          <div className="rounded-panel border border-subtleBorder bg-surface-strong overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-subtleBorder">
              <span className="text-xs font-semibold text-primaryText uppercase tracking-wider">
                SKILL.md Definition
              </span>
              <button
                type="button"
                onClick={() => handleCopy(resource.content_body || "")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-btn bg-state-inverse text-state-inverseText hover:opacity-90"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Content"}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-primaryText whitespace-pre-wrap leading-relaxed select-text">
                {resource.content_body}
              </pre>
            </div>
          </div>
        )}

        {/* File Tree */}
        {metadata.skill_files && metadata.skill_files.length > 0 && (
          <div className="rounded-panel border border-subtleBorder bg-surface p-4">
            <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FolderTree className="w-4 h-4 text-mutedText" /> Package File Structure
            </h4>
            <ul className="font-mono text-xs space-y-1 text-mutedText-secondary pl-2">
              {metadata.skill_files.map((file, i) => (
                <li key={i}>├── {file}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  // 3. MCP Servers
  if (resource.resource_type === "mcp_server") {
    const perm = metadata.permissions_summary || {};
    return (
      <div className="space-y-6">
        {/* Permission and Risk Matrix */}
        <div className="rounded-panel border border-subtleBorder bg-surface p-4">
          <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider mb-3">
            Permission & Access Matrix
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded bg-surface-strong border border-subtleBorder">
              <span className="text-mutedText block text-[11px]">Filesystem Reads</span>
              <span className={`font-semibold ${perm.reads_filesystem ? "text-state-warning" : "text-mutedText"}`}>
                {perm.reads_filesystem ? "Yes (Scoped)" : "No"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-strong border border-subtleBorder">
              <span className="text-mutedText block text-[11px]">Filesystem Writes</span>
              <span className={`font-semibold ${perm.writes_filesystem ? "text-state-warning" : "text-state-success"}`}>
                {perm.writes_filesystem ? "Yes (Modifies)" : "No (Read-Only)"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-strong border border-subtleBorder">
              <span className="text-mutedText block text-[11px]">Network Requests</span>
              <span className={`font-semibold ${perm.network_access ? "text-state-info" : "text-state-success"}`}>
                {perm.network_access ? "Yes (External)" : "Local Only"}
              </span>
            </div>
            <div className="p-2.5 rounded bg-surface-strong border border-subtleBorder">
              <span className="text-mutedText block text-[11px]">Command Execution</span>
              <span className={`font-semibold ${perm.executes_commands ? "text-state-danger" : "text-state-success"}`}>
                {perm.executes_commands ? "Yes (Executes)" : "None"}
              </span>
            </div>
          </div>
        </div>

        {/* Configuration Snippet */}
        {resource.content_body && (
          <div className="rounded-panel border border-subtleBorder-strong bg-surface-strong overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-subtleBorder">
              <span className="text-xs font-semibold text-primaryText uppercase tracking-wider">
                MCP Client Configuration (JSON)
              </span>
              <button
                type="button"
                onClick={() => handleCopy(resource.content_body || "")}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-btn bg-state-inverse text-state-inverseText hover:opacity-90"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied" : "Copy Config"}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs sm:text-sm text-primaryText whitespace-pre-wrap leading-relaxed select-text">
                {resource.content_body}
              </pre>
            </div>
          </div>
        )}

        {/* Exposed Tools */}
        {metadata.mcp_tools && metadata.mcp_tools.length > 0 && (
          <div className="rounded-panel border border-subtleBorder bg-surface p-4">
            <h4 className="text-xs font-bold text-primaryText uppercase tracking-wider mb-3">
              Exposed Tools & Actions
            </h4>
            <div className="space-y-2">
              {metadata.mcp_tools.map((t, i) => (
                <div key={i} className="p-2.5 rounded bg-surface-strong border border-subtleBorder text-xs">
                  <div className="flex items-center justify-between font-mono font-semibold text-primaryText mb-1">
                    <span>{t.name}</span>
                    {t.permissions && (
                      <span className="text-[10px] text-mutedText font-normal uppercase">
                        {t.permissions.join(", ")}
                      </span>
                    )}
                  </div>
                  <p className="text-mutedText-secondary text-[11px]">{t.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 4. Models & Weights
  if (resource.resource_type === "model") {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-btn border border-subtleBorder bg-surface">
            <span className="text-[11px] text-mutedText block">Parameters</span>
            <span className="text-sm font-bold text-primaryText">{metadata.parameter_size || "Not stated"}</span>
          </div>
          <div className="p-3 rounded-btn border border-subtleBorder bg-surface">
            <span className="text-[11px] text-mutedText block">Context Window</span>
            <span className="text-sm font-bold text-primaryText">{metadata.context_window || "Standard"}</span>
          </div>
          <div className="p-3 rounded-btn border border-subtleBorder bg-surface col-span-2 sm:col-span-1">
            <span className="text-[11px] text-mutedText block">Hardware Baseline</span>
            <span className="text-xs font-semibold text-primaryText">{metadata.hardware_recommendation || "Standard GPU"}</span>
          </div>
        </div>

        {resource.content_body && (
          <div className="rounded-panel border border-subtleBorder bg-surface-strong overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-surface border-b border-subtleBorder text-xs font-semibold text-primaryText">
              <span>Local Serving Commands</span>
              <button
                type="button"
                onClick={() => handleCopy(resource.content_body || "")}
                className="inline-flex items-center gap-1 text-xs text-mutedText hover:text-primaryText"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-primaryText whitespace-pre-wrap leading-relaxed">
                {resource.content_body}
              </pre>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Generic fallback for workflows, tools, templates
  return (
    <div className="space-y-6">
      {resource.content_body && (
        <div className="rounded-panel border border-subtleBorder bg-surface-strong overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-subtleBorder">
            <span className="text-xs font-semibold text-primaryText uppercase tracking-wider">
              Resource Instructions & Content
            </span>
            <button
              type="button"
              onClick={() => handleCopy(resource.content_body || "")}
              className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-btn bg-state-inverse text-state-inverseText hover:opacity-90"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="font-mono text-xs sm:text-sm text-primaryText whitespace-pre-wrap leading-relaxed select-text">
              {resource.content_body}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
