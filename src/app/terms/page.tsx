import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use | Axes Lab",
  description:
    "Terms of Use and conditions governing access to Axes Lab AI prompt directories, agent skills, WebGL modules, and MCP technical specifications.",
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      <Breadcrumbs items={[{ label: "Terms of Use", href: "/terms" }]} />

      <header className="border-b border-white/[0.08] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Technical Reference Directory Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Terms of Use
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Last updated: 2 November 2026 • Legal & Open Source Governance
        </p>
      </header>

      <div className="prose prose-invert prose-sm leading-relaxed space-y-8 text-zinc-300 text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or utilizing the prompts, skills, MCP definitions, and design patterns provided on <strong>Axes Lab</strong> (axeslab.com), you acknowledge and agree to be bound by these Terms of Use and our <Link href="/licensing" className="text-indigo-400 underline underline-offset-2">Licensing & Redistribution Policy</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            2. Permitted Use & Commercial Freedom
          </h2>
          <p>
            Unless explicitly designated otherwise in a specific resource record:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li><strong>Prompts & Templates:</strong> You are free to copy, modify, adapt, and deploy prompts and system directives in your personal, educational, and commercial AI applications without licensing fees or royalties.</li>
            <li><strong>Component Scaffolding:</strong> UI snippets, Tailwind compositions, and WebGL animation recipes are provided for integration into your applications.</li>
            <li><strong>Agent Directives & MCP Configurations:</strong> Server manifests and tool schemas may be copied into your developer environments (Cursor, Claude Code, Antigravity, Open-Next, etc.).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            3. Intellectual Property & Prohibited Activities
          </h2>
          <p>
            To protect our community, contributors, and the integrity of the open index, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
            <li>Wholesale scrape, mirror, or repackage the entire Axes Lab catalog for resale in competing closed-source paywalled repositories.</li>
            <li>Misrepresent authorship or strip open-source author attributions when redistributing original creators’ work.</li>
            <li>Submit malicious payloads, prompt injections, destructive bash commands, or exfiltration hooks masquerading as agent skills.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            4. Disclaimer of Warranties & AI Model Execution
          </h2>
          <p>
            AI model architectures and prompt outputs can be non-deterministic. All prompts, code blocks, MCP configurations, and skill files are provided <em>&ldquo;as is&rdquo;</em> and <em>&ldquo;as available&rdquo;</em> without warranty of any kind.
          </p>
          <p className="text-xs text-zinc-400 bg-white/[0.02] border border-white/[0.08] p-3.5 rounded-xl">
            Axes Lab makes no guarantee that any third-party AI model (such as Claude 3.7, GPT-4.5, Gemini 2.0, or Qwen 2.5) will produce identical responses or will remain backward-compatible over time. You are solely responsible for testing AI outputs before deployment in production systems.
          </p>
        </section>

        <section className="space-y-3 border-t border-white/[0.08] pt-6">
          <h2 className="text-base font-bold text-white tracking-tight">Questions & Legal Notices</h2>
          <p className="text-xs text-zinc-400">
            For inquiries regarding terms, takedown requests, or intellectual property concerns, review our{" "}
            <Link href="/licensing" className="text-indigo-400 underline underline-offset-2">
              Licensing & Rights Policy
            </Link>{" "}
            or write to{" "}
            <a href="mailto:legal@axeslab.com" className="text-indigo-400 underline underline-offset-2">
              legal@axeslab.com
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
