import React from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { McpClient } from "./McpClient";

export const metadata: Metadata = {
  title: "MCP Server — Connect Axes Lab to AI Coding Agents",
  description:
    "Configure the Axes Lab Model Context Protocol (MCP) server for Claude Desktop, Cursor, and Windsurf to search prompts, scaffolds, and categories.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/mcp",
  },
};

export default function McpPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHeader
        title="Model Context Protocol (MCP)"
        meta="HTTP JSON-RPC endpoint · /api/mcp"
        description="Connect Claude Desktop, Cursor, Windsurf, or Claude Code directly to the Axes Lab catalogue using the Model Context Protocol."
        breadcrumbs={[{ label: "MCP", href: "/mcp" }]}
      />
      <McpClient />
    </div>
  );
}
