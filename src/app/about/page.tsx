import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { Terminal, Layers, Cpu, ShieldCheck, ArrowRight, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "About Axes Lab — Mission & Architecture",
  description:
    "An independent technical reference library and design engineering platform documenting AI prompts, agent skills, WebGL modules, and MCP servers.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper text-ink font-sans antialiased py-8 px-4 sm:px-8">
      <article className="max-w-4xl mx-auto space-y-12">
        <Breadcrumbs items={[{ label: "About Axes Lab", href: "/about" }]} />

        {/* Hero Header */}
        <header className="rounded-card bg-paper-2 border border-rule p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-pill bg-paper-3 border border-rule flex items-center justify-center p-2">
              <img src="/logo-white.png" alt="Axes Lab Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xs font-mono text-cool block">Official Directory &amp; Design Engine</span>
              <span className="text-xs text-muted">Created by <a href="https://instagram.com/zainaxes" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">@zainaxes</a> (<a href="https://zainaxes.com" target="_blank" rel="noopener noreferrer" className="text-ink underline underline-offset-2">zainaxes.com</a>)</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display font-medium text-ink leading-tight">
            Crafting the next generation of AI websites and autonomous workflows
          </h1>
          <p className="text-sm text-muted max-w-2xl leading-relaxed">
            Axes Lab is a free, open-access technical reference index and component platform. We give designers, engineers, and AI developers production-verified prompts, agent skills, 3D WebGL backgrounds, and Model Context Protocol (MCP) servers.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 bg-ink text-paper hover:opacity-90 font-medium text-xs sm:text-sm px-4 py-2 rounded-pill transition-opacity focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Browse 375+ Directives</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/mcp"
              className="inline-flex items-center gap-2 bg-paper-3 hover:bg-rule border border-rule text-ink font-medium text-xs sm:text-sm px-4 py-2 rounded-pill transition-colors focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span>Connect MCP Server</span>
            </Link>
          </div>
        </header>

        {/* Grid Pillars */}
        <section className="space-y-4">
          <h2 className="text-lg font-display font-medium text-ink">What powers Axes Lab</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3">
              <div className="w-9 h-9 rounded-pill bg-paper-3 border border-rule flex items-center justify-center text-cool">
                <Terminal className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-display font-medium text-ink">Production AI Prompts</h3>
              <p className="text-xs text-muted leading-relaxed">
                Curated, production-tested system directives engineered for Claude 3.7 Sonnet, GPT-4.5, Gemini 2.0, DeepSeek, and Cursor. Structured with clear variables and zero guesswork.
              </p>
            </div>

            <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3">
              <div className="w-9 h-9 rounded-pill bg-paper-3 border border-rule flex items-center justify-center text-cool">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-display font-medium text-ink">Agent Skills &amp; MCP</h3>
              <p className="text-xs text-muted leading-relaxed">
                Standardized `SKILL.md` rules and Model Context Protocol endpoints so AI agents can inspect codebases, execute verified CLI workflows, and assemble design systems automatically.
              </p>
            </div>

            <div className="p-5 rounded-card border border-rule bg-paper-2 space-y-3">
              <div className="w-9 h-9 rounded-pill bg-paper-3 border border-rule flex items-center justify-center text-cool">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-display font-medium text-ink">Interactive 3D &amp; Motion</h3>
              <p className="text-xs text-muted leading-relaxed">
                Interactive WebGL canvas animations, Three.js shaders, animated gradients, and Tailwind UI components designed for production performance.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Details */}
        <div className="space-y-8 text-sm">
          <section className="space-y-3 border-t border-rule pt-8">
            <h2 className="text-lg font-display font-medium text-ink flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cool" />
              <span>Editorial and verification standard</span>
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              The artificial intelligence design space is overloaded with low-effort regurgitations and generic prompt packs. Axes Lab operates with an uncompromising standard:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-muted leading-relaxed">
              <li><strong className="text-ink">Verified Working Code:</strong> Every prompt or component is verified to produce executable code in Next.js, React, or standard web frameworks.</li>
              <li><strong className="text-ink">Safety and Transparency:</strong> We never bundle untrusted or obfuscated shell executions. Tools with filesystem or network permissions are explicitly identified.</li>
              <li><strong className="text-ink">100% Free and Unlocked:</strong> No locked tiers, forced Discord invites, or subscriptions to access prompts and MCP schemas.</li>
            </ul>
          </section>

          <section className="space-y-3 border-t border-rule pt-8">
            <h2 className="text-lg font-display font-medium text-ink flex items-center gap-2">
              <Compass className="w-4 h-4 text-cool" />
              <span>Explore the ecosystem</span>
            </h2>
            <p className="text-xs text-muted">
              Dive deeper into our technical documentation and governance policies:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
              <Link href="/licensing" className="p-3.5 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors text-ink block">
                <span className="font-medium block mb-0.5">Licensing</span>
                <span className="text-muted text-[11px]">Usage &amp; attribution</span>
              </Link>
              <Link href="/safety-and-security" className="p-3.5 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors text-ink block">
                <span className="font-medium block mb-0.5">Safety &amp; Trust</span>
                <span className="text-muted text-[11px]">Sanitization &amp; review</span>
              </Link>
              <Link href="/privacy" className="p-3.5 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors text-ink block">
                <span className="font-medium block mb-0.5">Privacy Policy</span>
                <span className="text-muted text-[11px]">Zero tracking policy</span>
              </Link>
              <Link href="/terms" className="p-3.5 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors text-ink block">
                <span className="font-medium block mb-0.5">Terms of Use</span>
                <span className="text-muted text-[11px]">Directory agreement</span>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
