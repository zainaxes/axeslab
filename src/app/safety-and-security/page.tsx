import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Safety, Security & Trust Policy",
  description:
    "Security posture, untrusted content handling, and permission transparency for AI skills and MCP servers on Axes Lab.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/safety-and-security",
  },
};

export default function SafetySecurityPage() {
  return (
    <PolicyLayout
      title="Safety, Security & Trust Policy"
      subtitle="How Axes Lab handles third-party prompts, skills, and MCP server disclosures."
      lastUpdated="Last revised: 31 October 2026 · Security Review Group"
      breadcrumbs={[
        { label: "Safety & Security", href: "/safety-and-security" },
      ]}
    >
      <section className="space-y-3">
        <h2 className="text-lg font-display font-medium text-ink">
          1. Treating Third-Party Content as Untrusted
        </h2>
        <p className="text-muted">
          AI prompts, agent skills (<code className="font-mono text-ink-2">SKILL.md</code>), MCP manifests, and workflow definitions can contain indirect prompt injections or unintended shell commands. Axes Lab treats collected third-party content as untrusted text input:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-muted">
          <li>
            We <strong className="text-ink">never execute</strong> imported scripts or skills during ingestion or preview rendering.
          </li>
          <li>
            We <strong className="text-ink">never automatically install</strong> dependencies or run external MCP servers on our hosting infrastructure.
          </li>
          <li>
            Prompt and code bodies are rendered strictly as non-executable text blocks.
          </li>
        </ul>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          2. MCP Permission Transparency
        </h2>
        <p className="text-muted">
          Each Model Context Protocol entry includes factual access disclosures across four dimensions:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-4 rounded-card border border-rule bg-paper-2 space-y-1">
            <strong className="text-ink block">Filesystem Scoping</strong>
            <p className="text-muted">
              Distinguishes read-only directory access from write/modify permissions.
            </p>
          </div>
          <div className="p-4 rounded-card border border-rule bg-paper-2 space-y-1">
            <strong className="text-ink block">Network Requests</strong>
            <p className="text-muted">
              Identifies whether a tool makes external requests or operates locally.
            </p>
          </div>
          <div className="p-4 rounded-card border border-rule bg-paper-2 space-y-1">
            <strong className="text-ink block">Command Execution</strong>
            <p className="text-muted">
              Flags servers capable of invoking shell or binary commands on the developer host.
            </p>
          </div>
          <div className="p-4 rounded-card border border-rule bg-paper-2 space-y-1">
            <strong className="text-ink block">Credentials &amp; Tokens</strong>
            <p className="text-muted">
              Discloses required API keys so secrets remain user-supplied environment variables.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          3. Responsible Vulnerability Disclosure
        </h2>
        <p className="text-muted">
          If you discover a security concern in any listed resource or skill, report it immediately via our{" "}
          <Link href="/contact" className="text-cool hover:underline">
            Contact portal
          </Link>
          . Reported items are quarantined promptly while reviewed.
        </p>
      </section>
    </PolicyLayout>
  );
}
