"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { toast } from "sonner";

const ENDPOINT_URL = "https://axeslab.zainaxes.com/api/mcp";
const INSTALL_ALL_CMD = `npx add-mcp ${ENDPOINT_URL} --name axeslab`;
const CLAUDE_CODE_CMD = `claude mcp add --transport http axeslab ${ENDPOINT_URL}`;
const REMOTE_BRIDGE_CMD = `npx -y mcp-remote ${ENDPOINT_URL}`;

const CONFIGS = [
  {
    title: "Cursor · Windsurf · VS Code · Antigravity",
    file: "mcp.json / mcp_config.json",
    content: JSON.stringify(
      {
        mcpServers: {
          axeslab: {
            url: ENDPOINT_URL,
          },
        },
      },
      null,
      2
    ),
  },
  {
    title: "Claude Desktop (stdio bridge)",
    file: "claude_desktop_config.json",
    content: JSON.stringify(
      {
        mcpServers: {
          axeslab: {
            command: "npx",
            args: ["-y", "mcp-remote", ENDPOINT_URL],
          },
        },
      },
      null,
      2
    ),
  },
];

const EXAMPLE_PROMPTS = [
  'Use the "Interactive Discovery" prompt from axeslab',
  'Build a hero section using the "Asme" prompt from axeslab',
  'Fetch the "Bold Studio" prompt from axeslab and scaffold it',
  'Customize "Claude motion designer showreel" for my brand using axeslab',
];

const MCP_TOOLS = [
  {
    name: "axeslab_get_prompt",
    description:
      "Retrieve the full verbatim specification for any prompt by name, title, or slug across all 377 updated prompts, motion directives, templates, and skills.",
  },
  {
    name: "axeslab_search_templates",
    description:
      "Search across all 377 website UI prompts, motion prompts, UI sections, 3D sites, apps, backgrounds, templates, and skills.",
  },
  {
    name: "axeslab_list_categories",
    description:
      "List every active design category across Website UI and Motion collections with exact item counts.",
  },
  {
    name: "axeslab_generate_scaffold",
    description:
      "Return framework implementation notes and exact specifications for any prompt name or slug.",
  },
  {
    name: "axeskit_list_asset_categories",
    description:
      "List AxesKit asset taxonomy categories and subcategories.",
  },
  {
    name: "axeskit_get_design_guidelines",
    description:
      "Retrieve Axes Lab Console / AxesKit design tokens, typography pairings, and motion defaults.",
  },
];

export function McpClient({ totalPrompts }: { totalPrompts: number }) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Primary One-Command Installer + Streamable HTTP URL */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-5 rounded-card bg-paper-2 border border-rule space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-medium text-ink flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cool" />
              <span>Install in any coding agent (Cursor, Claude, Windsurf, Codex, VS Code)</span>
            </span>
            <button
              type="button"
              onClick={() => handleCopy(INSTALL_ALL_CMD, "install-all")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-accent text-accent-ink font-medium hover:opacity-90 shrink-0"
            >
              {copiedId === "install-all" ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule text-cool font-mono text-xs overflow-x-auto select-all">
            {INSTALL_ALL_CMD}
          </pre>
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <span className="text-muted font-mono truncate">
              Claude Code: <span className="text-ink-2">{CLAUDE_CODE_CMD}</span>
            </span>
            <button
              type="button"
              onClick={() => handleCopy(CLAUDE_CODE_CMD, "claude-code")}
              className="text-cool hover:underline font-mono shrink-0"
            >
              {copiedId === "claude-code" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        <div className="p-5 rounded-card bg-paper-2 border border-rule space-y-3">
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-medium text-ink">
              Remote MCP URL (Streamable HTTP · {totalPrompts} prompts live)
            </span>
            <button
              type="button"
              onClick={() => handleCopy(ENDPOINT_URL, "http")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-ink shrink-0"
            >
              {copiedId === "http" ? (
                <>
                  <Check className="w-3 h-3 text-cool" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-muted" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule text-ink-2 font-mono text-xs overflow-x-auto select-all">
            {ENDPOINT_URL}
          </pre>
          <div className="flex items-center justify-between gap-2 pt-1 text-xs">
            <span className="text-muted font-mono truncate">
              Stdio proxy: <span className="text-ink-2">{REMOTE_BRIDGE_CMD}</span>
            </span>
            <button
              type="button"
              onClick={() => handleCopy(REMOTE_BRIDGE_CMD, "bridge")}
              className="text-cool hover:underline font-mono shrink-0"
            >
              {copiedId === "bridge" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </section>

      {/* Ask by Name */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-display font-medium text-ink">
            Use any prompt by name
          </h2>
          <span className="text-xs text-muted">
            Supports MCP tools, native <span className="font-mono text-ink-2">prompts/get</span>, and <span className="font-mono text-ink-2">resources/read</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAMPLE_PROMPTS.map((example, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleCopy(example, `ex-${idx}`)}
              className="text-left p-3.5 rounded-card bg-paper-2 border border-rule hover:border-rule-2 transition-colors flex items-center justify-between gap-3"
            >
              <span className="font-mono text-xs text-ink-2 truncate">
                {example}
              </span>
              <span className="text-[11px] font-mono text-cool shrink-0">
                {copiedId === `ex-${idx}` ? "Copied" : "Copy"}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Client JSON Configuration Files */}
      <section className="space-y-4">
        <h2 className="text-lg font-display font-medium text-ink">
          Manual Client Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CONFIGS.map((cfg) => (
            <div
              key={cfg.title}
              className="p-5 rounded-card bg-paper-2 border border-rule space-y-3"
            >
              <div className="flex items-center justify-between text-xs">
                <div>
                  <h3 className="font-medium text-ink">{cfg.title}</h3>
                  <span className="font-mono text-muted">{cfg.file}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(cfg.content, cfg.title)}
                  className="px-3 py-1 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs text-ink flex items-center gap-1.5"
                >
                  {copiedId === cfg.title ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cool" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-muted" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-card bg-paper-3 border border-rule font-mono text-xs text-ink-2 overflow-x-auto leading-relaxed select-all">
                {cfg.content}
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Exposed MCP Tools */}
      <section className="space-y-4">
        <h2 className="text-lg font-display font-medium text-ink">
          Exposed MCP Tools
        </h2>

        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-paper-3 border-b border-rule text-muted">
                <tr>
                  <th className="p-3.5 font-medium">Tool Name</th>
                  <th className="p-3.5 font-medium">Capability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {MCP_TOOLS.map((tool) => (
                  <tr key={tool.name}>
                    <td className="p-3.5 font-mono text-cool whitespace-nowrap">
                      {tool.name}
                    </td>
                    <td className="p-3.5 text-ink-2">{tool.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
