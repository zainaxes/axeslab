import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ALL_UNIFIED_ITEMS } from "@/lib/unified-catalog";
import { TEMPLATES } from "@/lib/templates-data";
import { McpClient } from "./McpClient";

export const metadata: Metadata = {
  title: "MCP Server — Connect Axes Lab to AI Coding Agents",
  description:
    "Install the Axes Lab Model Context Protocol (MCP) server in Cursor, Claude Code, Claude Desktop, Windsurf, or Antigravity to look up any prompt by name.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/mcp",
  },
};

export default function McpPage() {
  const totalPrompts = ALL_UNIFIED_ITEMS.length + TEMPLATES.length;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Model Context Protocol (MCP)"
        meta={`${totalPrompts} prompts & templates · https://axeslab.zainaxes.com/api/mcp`}
        description="Install Axes Lab once in your coding agent, then ask for any prompt or template by name."
        breadcrumbs={[{ label: "MCP", href: "/mcp" }]}
      />
      <McpClient totalPrompts={totalPrompts} />
    </div>
  );
}
