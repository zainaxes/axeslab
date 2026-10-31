import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Curation Methodology & Inclusion Standards | Axes Lab",
  description:
    "How Axes Lab inspects, verifies, and maintains AI prompts, agent skills, and MCP servers.",
};

export default function MethodologyPage() {
  return (
    <article className="max-w-3xl mx-auto py-4 space-y-8">
      <Breadcrumbs items={[{ label: "Curation Methodology", href: "/methodology" }]} />

      <header className="border-b border-subtleBorder pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          Curation Methodology & Inclusion Standards
        </h1>
        <p className="text-xs sm:text-sm text-mutedText">
          Last revised: 31 October 2026 • Quality and Standards Committee
        </p>
      </header>

      <div className="prose prose-sm text-primaryText leading-relaxed space-y-6 text-xs sm:text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">1. Source Hierarchy</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            Before adding any resource, our editorial team establishes provenance using an authoritative
            source hierarchy:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-mutedText-secondary">
            <li><strong>Official Primary Source:</strong> The creator's repository, official MCP registry, or project documentation.</li>
            <li><strong>Maintainer-Controlled Distribution:</strong> Release tags, signed package manifests, and official container registries.</li>
            <li><strong>Reputable Curated Indexes:</strong> Verified community lists used solely as candidate discovery leads.</li>
          </ol>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">2. Quality Review Rubric</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            Every entry is evaluated against six explicit criteria:
          </p>
          <div className="border border-subtleBorder rounded-panel overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-surface border-b border-subtleBorder font-semibold text-primaryText">
                <tr>
                  <th className="p-3">Dimension</th>
                  <th className="p-3">Weight</th>
                  <th className="p-3">Evaluation Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtleBorder/60 text-mutedText-secondary">
                <tr>
                  <td className="p-3 font-semibold text-primaryText">Practical Utility</td>
                  <td className="p-3">25%</td>
                  <td className="p-3">Solves a genuine engineering or creative task without synthetic hype.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primaryText">Documentation Quality</td>
                  <td className="p-3">20%</td>
                  <td className="p-3">Clear setup instructions, parameter explanations, and reproduction examples.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primaryText">Source Health & Maintenance</td>
                  <td className="p-3">15%</td>
                  <td className="p-3">Active commits, responsive maintenance, or clear stable architecture status.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primaryText">Compatibility Clarity</td>
                  <td className="p-3">15%</td>
                  <td className="p-3">Explicit client (Claude, Cursor, Copilot) or model runtime verification.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primaryText">Provenance & Rights</td>
                  <td className="p-3">15%</td>
                  <td className="p-3">Reviewed license text, clear ownership, and clean redistribution boundaries.</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-primaryText">Security Transparency</td>
                  <td className="p-3">10%</td>
                  <td className="p-3">Explicit disclosure of filesystem access, network calls, and credentials.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">3. Verification & Freshness Cadence</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            We track three distinct timestamps on every resource:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-mutedText-secondary">
            <li><strong>Upstream Source Update:</strong> When the maintainer last pushed commits or released a version.</li>
            <li><strong>Last Checked Date:</strong> When our editorial process verified the links and terms.</li>
            <li><strong>Record Modified Date:</strong> When our catalog entry was updated.</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
