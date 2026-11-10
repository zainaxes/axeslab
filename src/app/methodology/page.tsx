import React from "react";
import type { Metadata } from "next";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Curation Methodology & Inclusion Standards",
  description:
    "How Axes Lab inspects, verifies, and documents prompts, agent skills, and MCP servers.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/methodology",
  },
};

export default function MethodologyPage() {
  return (
    <PolicyLayout
      title="Curation Methodology & Inclusion Standards"
      subtitle="How Axes Lab evaluates provenance, documentation clarity, and rights boundaries."
      lastUpdated="Last revised: 31 October 2026 · Quality & Standards"
      breadcrumbs={[{ label: "Methodology", href: "/methodology" }]}
    >
      <section className="space-y-3">
        <h2 className="text-lg font-display font-medium text-ink">
          1. Source Hierarchy
        </h2>
        <p className="text-muted">
          Before listing a resource, provenance is established using a clear source hierarchy:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-muted">
          <li>
            <strong className="text-ink">Official Primary Source:</strong> The creator&apos;s repository, upstream post, or project documentation.
          </li>
          <li>
            <strong className="text-ink">Maintainer-Controlled Distribution:</strong> Release tags, signed package manifests, and official registries.
          </li>
          <li>
            <strong className="text-ink">Curated Discovery Indexes:</strong> Candidate discovery leads verified back to primary creator records.
          </li>
        </ol>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          2. Quality Review Rubric
        </h2>
        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-paper-3 border-b border-rule text-ink">
                <tr>
                  <th className="p-3.5 font-medium">Dimension</th>
                  <th className="p-3.5 font-medium">Weight</th>
                  <th className="p-3.5 font-medium">Evaluation Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-muted">
                <tr>
                  <td className="p-3.5 font-medium text-ink">Practical Utility</td>
                  <td className="p-3.5 font-mono num">25%</td>
                  <td className="p-3.5">Addresses a genuine design or engineering task cleanly.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-ink">Documentation Quality</td>
                  <td className="p-3.5 font-mono num">20%</td>
                  <td className="p-3.5">Clear setup instructions, parameters, and examples.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-ink">Source Health</td>
                  <td className="p-3.5 font-mono num">15%</td>
                  <td className="p-3.5">Accessible upstream source and stable architecture.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-ink">Compatibility Clarity</td>
                  <td className="p-3.5 font-mono num">15%</td>
                  <td className="p-3.5">Explicit client or model runtime details where verified.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-ink">Provenance &amp; Rights</td>
                  <td className="p-3.5 font-mono num">15%</td>
                  <td className="p-3.5">Clear creator attribution, license, and distribution status.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-ink">Security Transparency</td>
                  <td className="p-3.5 font-mono num">10%</td>
                  <td className="p-3.5">Disclosure of filesystem, network, and command access.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          3. Verification &amp; Freshness Timestamps
        </h2>
        <ul className="list-disc pl-5 space-y-1.5 text-muted">
          <li>
            <strong className="text-ink">Upstream Source Update:</strong> When the maintainer last updated or published the resource.
          </li>
          <li>
            <strong className="text-ink">Last Checked Date:</strong> When links and rights metadata were last inspected.
          </li>
          <li>
            <strong className="text-ink">Record Modified Date:</strong> When the library entry itself was last updated.
          </li>
        </ul>
      </section>
    </PolicyLayout>
  );
}
