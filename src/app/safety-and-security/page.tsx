import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Safety, Security & Trust Policy | Axes Lab",
  description:
    "Security guidelines, untrusted content handling, and permission transparency for AI skills and MCP servers.",
};

export default function SafetySecurityPage() {
  return (
    <article className="max-w-3xl mx-auto py-4 space-y-8">
      <Breadcrumbs items={[{ label: "Safety & Security", href: "/safety-and-security" }]} />

      <header className="border-b border-subtleBorder pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          Safety, Security & Trust Policy
        </h1>
        <p className="text-xs sm:text-sm text-mutedText">
          Last revised: 31 October 2026 • Security Review Group
        </p>
      </header>

      <div className="prose prose-sm text-primaryText leading-relaxed space-y-6 text-xs sm:text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">1. Treating Third-Party Content as Untrusted</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            AI prompts, agent skills (`SKILL.md`), MCP server manifests, and workflow definitions can contain
            indirect prompt injections, malicious shell instructions, or exfiltration payloads. Axes Lab
            treats 100% of collected third-party content as untrusted input.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-mutedText-secondary">
            <li>We <strong>never execute</strong> imported scripts or skills during ingestion or preview rendering.</li>
            <li>We <strong>never automatically install</strong> dependencies or spin up external MCP servers on our infrastructure.</li>
            <li>All content bodies are strictly sanitized and rendered as non-executable text or static code blocks.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">2. MCP Permission Transparency</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            Instead of displaying a vague, deceptive "Safe" mark, every Model Context Protocol server
            and Agent Skill includes a factual access disclosure:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded border border-subtleBorder bg-surface">
              <strong className="text-primaryText block mb-1">Filesystem Scoping</strong>
              <p className="text-mutedText-secondary">Distinguishes read-only directory indexing from destructive write/overwrite capabilities.</p>
            </div>
            <div className="p-3 rounded border border-subtleBorder bg-surface">
              <strong className="text-primaryText block mb-1">Network & Web Sockets</strong>
              <p className="text-mutedText-secondary">Identifies whether the server communicates with external web APIs or remains strictly local.</p>
            </div>
            <div className="p-3 rounded border border-subtleBorder bg-surface">
              <strong className="text-primaryText block mb-1">Command Execution</strong>
              <p className="text-mutedText-secondary">Flags servers capable of invoking bash, PowerShell, or external binaries on the developer host.</p>
            </div>
            <div className="p-3 rounded border border-subtleBorder bg-surface">
              <strong className="text-primaryText block mb-1">Credentials & Tokens</strong>
              <p className="text-mutedText-secondary">Discloses required API keys and ensures secrets are represented as user-supplied environment variables.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">3. Responsible Vulnerability Disclosure</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            If you discover a security flaw in any indexed tool or prompt injection vulnerability in a listed skill,
            report it immediately through our <a href="/contact" className="underline font-semibold">Contact portal</a>.
            Reported items are quarantined immediately pending analysis.
          </p>
        </section>
      </div>
    </article>
  );
}
