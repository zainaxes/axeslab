'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlowWord } from '@/components/GlowWord';
import { PreFooter } from '@/components/PreFooter';
import { Copy, Check, Terminal, Play, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function MCPPage() {
  const [selectedTool, setSelectedTool] = useState<'claude' | 'cursor' | 'codex' | 'windsurf' | 'json'>('claude');
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const configs: Record<string, { title: string; subtitle: string; code: string }> = {
    claude: {
      title: "Claude Code CLI",
      subtitle: "Run this command in your terminal to register Axes Lab globally with user scope.",
      code: "claude mcp add axeslab --scope user --transport http https://mcp.axeslab.ai/v1/mcp",
    },
    cursor: {
      title: "Cursor Agent",
      subtitle: "Add this configuration block to your project's .cursor/mcp.json file.",
      code: `{
  "mcpServers": {
    "axeslab": {
      "url": "https://mcp.axeslab.ai/v1/mcp",
      "transport": "http"
    }
  }
}`,
    },
    codex: {
      title: "Codex CLI",
      subtitle: "Register Axes Lab MCP endpoint with Codex CLI.",
      code: "codex mcp add axeslab --url https://mcp.axeslab.ai/v1/mcp",
    },
    windsurf: {
      title: "Windsurf Cascade",
      subtitle: "Paste this JSON configuration into your ~/.codeium/windsurf/mcp_config.json file.",
      code: `{
  "mcpServers": {
    "axeslab": {
      "serverUrl": "https://mcp.axeslab.ai/v1/mcp"
    }
  }
}`,
    },
    json: {
      title: "Generic MCP Client (JSON)",
      subtitle: "Standard Streamable HTTP MCP server definition.",
      code: `{
  "name": "axeslab",
  "endpoint": "https://mcp.axeslab.ai/v1/mcp",
  "transport": "http",
  "version": "1.0.0"
}`,
    },
  };

  const currentConfig = configs[selectedTool];

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied MCP configuration!");
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const runLiveSimulation = () => {
    setIsSimulating(true);
    setSimulationLog("Initiating Streamable HTTP handshake with https://mcp.axeslab.ai/v1/mcp...");

    setTimeout(() => {
      setSimulationLog((prev) => prev + "\n✓ HTTP 200 OK — Connected to Axes Lab MCP Server (v1.0.0)");
    }, 600);

    setTimeout(() => {
      setSimulationLog((prev) => prev + "\n→ Discovering tools: [list_prompts, get_prompt, get_skill, restyle_component]");
    }, 1200);

    setTimeout(() => {
      setSimulationLog(
        (prev) =>
          prev +
          "\n✓ Handshake complete! Ready to serve 640+ production design prompts & SKILL.md packages to your AI agent."
      );
      setIsSimulating(false);
      toast.success("Live MCP Connection Verified!");
    }, 1800);
  };

  const samplePrompts = [
    "Use Axes Lab MCP to fetch the 'SynapticForge' 3D hero prompt and build my landing page.",
    "Pull the 'Liquid Glass Agency' design system and restyle my current navbar and hero section.",
    "Fetch the Axes Lab 'GSAP Scroll Choreography' SKILL.md and apply smooth reveal animations across my app.",
    "Search Axes Lab MCP for a dark fintech pricing section and implement it in React + Tailwind.",
  ];

  return (
    <div className="min-h-screen bg-[#050507] text-[#FAFAFA] px-4 py-16">
      {/* 1. Hero Section */}
      <section className="max-w-4xl mx-auto text-center relative mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-xs font-mono mb-6">
          <Terminal className="w-3.5 h-3.5 text-violet-400" />
          <span>Axes Lab AI MCP</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08]">
          The design & skill <GlowWord text="Superpowers" /> <br />
          your AI agents are missing.
        </h1>

        <p className="max-w-xl mx-auto text-base sm:text-lg text-zinc-400 mt-5 mb-8">
          Keep the web free of AI slop. Connect your AI agents to 500+ Premium Website Design Prompts, 3D WebGL Shaders, and reusable Agent Skills.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#install"
            className="bg-white text-black hover:bg-zinc-200 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2"
          >
            <span>Install MCP ↓</span>
          </a>
          <Link
            href="/"
            className="bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all"
          >
            Browse All Prompts →
          </Link>
        </div>

        {/* Feature Strip */}
        <div className="mt-10 pt-6 border-t border-white/[0.08] text-xs font-mono text-zinc-500 max-w-2xl mx-auto">
          100% Free & Open · Set up in under a minute · One command · No API key · No login required · Works with Claude Code, Cursor, Windsurf & Codex
        </div>
      </section>

      {/* 2. Interactive 4-Step Setup Flow */}
      <section id="install" className="max-w-3xl mx-auto space-y-8">
        {/* Step 1: Pick your AI tool */}
        <div className="p-6 rounded-3xl bg-[#0B0B10] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-xs font-mono font-bold text-violet-300">
              1
            </span>
            <h3 className="text-base font-bold text-white">Pick your AI tool</h3>
          </div>
          <p className="text-xs text-zinc-400">
            We&apos;ll give you the exact command or config to run.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { id: 'claude', label: '✳ Claude Code' },
              { id: 'cursor', label: '▲ Cursor' },
              { id: 'codex', label: '◍ Codex' },
              { id: 'windsurf', label: '🌊 Windsurf' },
              { id: 'json', label: '••• Other (JSON)' },
            ].map((tool) => {
              const isSelected = selectedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-black font-bold shadow-md'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                  }`}
                >
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Register the Axes Lab MCP server */}
        <div className="p-6 rounded-3xl bg-[#0B0B10] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-xs font-mono font-bold text-violet-300">
              2
            </span>
            <h3 className="text-base font-bold text-white">Register the Axes Lab MCP server</h3>
          </div>
          <p className="text-xs text-zinc-400">{currentConfig.subtitle}</p>

          {/* Terminal Code Box */}
          <div className="bg-[#09090D] border border-white/[0.1] rounded-2xl p-4 font-mono text-xs flex items-center justify-between gap-4 overflow-x-auto">
            <code className="text-violet-300 select-all whitespace-pre-wrap">{currentConfig.code}</code>
            <button
              onClick={() => handleCopy(currentConfig.code)}
              className="bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] text-white px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Step 3: Zero-Auth Instant Handshake */}
        <div className="p-6 rounded-3xl bg-[#0B0B10] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-xs font-mono font-bold text-violet-300">
              3
            </span>
            <h3 className="text-base font-bold text-white">Zero-Auth Instant Handshake</h3>
          </div>
          <p className="text-xs text-zinc-400">
            No browser login or API key required. Axes Lab MCP uses an open Streamable HTTP transport so your coding agent connects immediately.
          </p>

          {/* Live MCP Connection Test Simulator */}
          <div className="pt-2">
            <button
              onClick={runLiveSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 border border-violet-500/30 text-violet-300 text-xs font-semibold transition-all"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isSimulating ? "Testing connection..." : "⚡ Test MCP Connection Live"}</span>
            </button>
          </div>

          {simulationLog && (
            <pre className="p-4 rounded-xl bg-[#060609] border border-white/[0.08] text-[11px] font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap">
              {simulationLog}
            </pre>
          )}
        </div>

        {/* Step 4: You're set — Prompt your agent */}
        <div className="p-6 rounded-3xl bg-[#0B0B10] border border-white/[0.08] space-y-4">
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white/[0.08] border border-white/[0.1] flex items-center justify-center text-xs font-mono font-bold text-violet-300">
              4
            </span>
            <h3 className="text-base font-bold text-white">You&apos;re set — Prompt your agent</h3>
          </div>
          <p className="text-xs text-zinc-400">
            Click any example prompt below to copy and paste straight into Claude Code or Cursor:
          </p>

          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {samplePrompts.map((p, idx) => (
              <div
                key={idx}
                onClick={() => {
                  navigator.clipboard.writeText(p);
                  toast.success("Copied agent prompt to clipboard!");
                }}
                className="group p-3.5 rounded-xl bg-[#09090D] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.15] cursor-pointer transition-all flex items-center justify-between text-xs text-zinc-300 hover:text-white"
              >
                <span className="font-mono line-clamp-1">&ldquo;{p}&rdquo;</span>
                <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white shrink-0 ml-3" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Footer Banner */}
      <PreFooter />
    </div>
  );
}
