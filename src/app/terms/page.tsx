import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of Use governing access to Axes Lab directories, prompts, skills, and technical specifications.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/terms",
  },
};

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms of Use"
      subtitle="Conditions governing use of the Axes Lab directory and tools."
      lastUpdated="Last updated: 2 November 2026"
      breadcrumbs={[{ label: "Terms of Use", href: "/terms" }]}
    >
      <section className="space-y-3">
        <h2 className="text-lg font-display font-medium text-ink">
          1. Acceptance of Terms
        </h2>
        <p className="text-muted">
          By accessing or using the prompts, skills, MCP definitions, and design references provided on{" "}
          <strong className="text-ink">Axes Lab</strong> (axeslab.zainaxes.com), you agree to these Terms of Use and our{" "}
          <Link href="/licensing" className="text-cool hover:underline">
            Licensing &amp; Rights Policy
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          2. Permitted Use &amp; Attribution
        </h2>
        <p className="text-muted">
          Usage permissions depend on each resource&apos;s original license and attribution record, as detailed on our{" "}
          <Link href="/licensing" className="text-cool hover:underline">
            Licensing &amp; Rights page
          </Link>
          :
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-muted">
          <li>
            <strong className="text-ink">Open &amp; Hosted Resources:</strong> Resources verified under permissive open-source licenses or hosted directly by Axes Lab may be copied and adapted subject to their stated license terms.
          </li>
          <li>
            <strong className="text-ink">Third-Party Directory References:</strong> Resources owned by third-party creators remain subject to the original creator&apos;s license, terms, and applicable usage restrictions.
          </li>
          <li>
            <strong className="text-ink">MCP Configurations:</strong> Server configuration snippets may be copied into compatible client setups for accessing Axes Lab endpoints.
          </li>
        </ul>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          3. Prohibited Activities
        </h2>
        <p className="text-muted">
          To protect contributors and maintain library integrity, you agree not to:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-muted">
          <li>
            Wholesale scrape or mirror the Axes Lab catalog for resale in closed-source paywalled repositories.
          </li>
          <li>
            Misrepresent authorship or remove original creator attributions.
          </li>
          <li>
            Submit malicious payloads, prompt injections, destructive commands, or exfiltration hooks.
          </li>
        </ul>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          4. Disclaimer of Warranties
        </h2>
        <p className="text-muted">
          AI model outputs can vary across versions and providers. All prompts, templates, MCP configurations, and skill references are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranty of any kind.
        </p>
        <p className="text-xs text-muted bg-paper-2 border border-rule p-4 rounded-card">
          Axes Lab makes no guarantee that third-party AI models will produce identical responses over time. You are responsible for reviewing and testing generated code before production deployment.
        </p>
      </section>

      <section className="space-y-2 pt-4 border-t border-rule">
        <h2 className="text-base font-display font-medium text-ink">
          Legal Notices
        </h2>
        <p className="text-xs text-muted">
          For questions regarding terms, attribution, or removal requests, review our{" "}
          <Link href="/licensing" className="text-cool hover:underline">
            Licensing &amp; Rights Policy
          </Link>{" "}
          or write to{" "}
          <a
            href="mailto:legal@axeslab.zainaxes.com"
            className="text-cool hover:underline"
          >
            legal@axeslab.zainaxes.com
          </a>
          .
        </p>
      </section>
    </PolicyLayout>
  );
}
