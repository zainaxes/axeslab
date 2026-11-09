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
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-ink">
      <Breadcrumbs items={[{ label: "Terms of Use", href: "/terms" }]} />

      <header className="border-b border-rule pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-paper-3 border border-rule text-cool text-xs font-sans mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Technical Reference Directory Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
          Terms of Use
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Last updated: 2 November 2026 • Legal & Open Source Governance
        </p>
      </header>

      <div className="prose prose-invert prose-sm leading-relaxed space-y-8 text-muted text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-cool" />
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing, browsing, or utilizing the prompts, skills, MCP definitions, and design patterns provided on <strong>Axes Lab</strong> (axeslab.zainaxes.com), you acknowledge and agree to be bound by these Terms of Use and our <Link href="/licensing" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">Licensing & Redistribution Policy</Link>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cool" />
            2. Permitted Use & Commercial Freedom
          </h2>
          <p>
            Unless explicitly designated otherwise in a specific resource record:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted">
            <li><strong>Prompts & Templates:</strong> You are free to copy, modify, adapt, and deploy prompts and system directives in your personal, educational, and commercial AI applications without licensing fees or royalties.</li>
            <li><strong>Component Scaffolding:</strong> UI snippets, Tailwind compositions, and WebGL animation recipes are provided for integration into your applications.</li>
            <li><strong>Agent Directives & MCP Configurations:</strong> Server manifests and tool schemas may be copied into your developer environments (Cursor, Claude Code, Antigravity, Open-Next, etc.).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-accent" />
            3. Intellectual Property & Prohibited Activities
          </h2>
          <p>
            To protect our community, contributors, and the integrity of the open index, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted">
            <li>Wholesale scrape, mirror, or repackage the entire Axes Lab catalog for resale in competing closed-source paywalled repositories.</li>
            <li>Misrepresent authorship or strip open-source author attributions when redistributing original creators’ work.</li>
            <li>Submit malicious payloads, prompt injections, destructive bash commands, or exfiltration hooks masquerading as agent skills.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cool" />
            4. Disclaimer of Warranties & AI Model Execution
          </h2>
          <p>
            AI model architectures and prompt outputs can be non-deterministic. All prompts, code blocks, MCP configurations, and skill files are provided <em>&ldquo;as is&rdquo;</em> and <em>&ldquo;as available&rdquo;</em> without warranty of any kind.
          </p>
          <p className="text-xs text-muted bg-paper-2 border border-rule p-3.5 rounded-card">
            Axes Lab makes no guarantee that any third-party AI model (such as Claude 3.7, GPT-4.5, Gemini 2.0, or Qwen 2.5) will produce identical responses or will remain backward-compatible over time. You are solely responsible for testing AI outputs before deployment in production systems.
          </p>
        </section>

        <section className="space-y-3 border-t border-rule pt-6">
          <h2 className="text-base font-bold text-ink tracking-tight">Questions & Legal Notices</h2>
          <p className="text-xs text-muted">
            For inquiries regarding terms, takedown requests, or intellectual property concerns, review our{" "}
            <Link href="/licensing" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">
              Licensing & Rights Policy
            </Link>{" "}
            or write to{" "}
            <a href="mailto:legal@axeslab.zainaxes.com" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">
              legal@axeslab.zainaxes.com
            </a>.
          </p>
        </section>
      </div>
    </article>
  );
}
