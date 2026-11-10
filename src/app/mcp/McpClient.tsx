"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

const CONFIGS = [
  {
    title: "Claude Desktop",
    file: "claude_desktop_config.json",
    content: JSON.stringify(
      {
        mcpServers: {
          axeslab: {
            command: "npx",
            args: ["-y", "axeslab-mcp@latest"],
          },
        },
      },
      null,
      2
    ),
  },
  {
    title: "Cursor & Windsurf",
    file: "mcp.json",
    content: JSON.stringify(
      {
        mcpServers: {
          axeslab: {
            command: "npx",
            args: ["-y", "axeslab-mcp@latest"],
          },
        },
      },
      null,
      2
    ),
  },
];

const MCP_TOOLS = [
  {
    name: "axeslab_search_templates",
    description:
      "Search Axes Lab UI templates and motion prompts by query, topic, or category.",
  },
  {
    name: "axeslab_get_prompt",
    description:
      "Retrieve the complete prompt and specification instructions for a resource slug.",
  },
  {
    name: "axeslab_list_categories",
    description:
      "List available design categories with active resource counts.",
  },
  {
    name: "axeslab_generate_scaffold",
    description:
      "Return framework implementation notes and exact specifications for a slug.",
  },
  {
    name: "axeskit_list_asset_categories",
    description:
      "List AxesKit asset taxonomy categories and subcategories.",
  },
  {
    name: "axeskit_get_design_guidelines",
    description:
      "Retrieve AxesKit UI/UX design tokens, typography pairings, and motion defaults.",
  },
];

export function McpClient() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.info("Select the snippet to copy");
    }
  };

  return (
    <div className="max-w-[var(--container)] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* CLI Quick Start & Streamable HTTP Endpoint */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-card bg-paper-2 border border-rule space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink">Quick start via CLI</span>
            <button
              type="button"
              onClick={() => handleCopy("npx axeslab-mcp@latest", "cli")}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-ink"
            >
              {copiedId === "cli" ? (
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
          <pre className="p-3.5 rounded-pill bg-paper-3 border border-rule text-cool font-mono text-xs overflow-x-auto select-all">
            npx axeslab-mcp@latest
          </pre>
        </div>

        <div className="p-5 rounded-card bg-paper-2 border border-rule space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-ink">
              Streamable HTTP Endpoint
            </span>
            <button
              type="button"
              onClick={() =>
                handleCopy("https://axeslab.zainaxes.com/api/mcp", "http")
              }
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-ink"
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
            https://axeslab.zainaxes.com/api/mcp
          </pre>
        </div>
      </section>

      {/* Configuration Files */}
      <section className="space-y-4">
        <h2 className="text-lg font-display font-medium text-ink">
          Client Configuration Files
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
