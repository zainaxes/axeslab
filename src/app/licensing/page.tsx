import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Licensing & Rights Policy",
  description:
    "Resource ownership, creator attribution, licensing classifications, and redistribution rules on Axes Lab.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/licensing",
  },
};

export default function LicensingPage() {
  return (
    <PolicyLayout
      title="Licensing, Ownership & Redistribution Policy"
      subtitle="How Axes Lab handles creator attribution, access versus redistribution rights, and licensing classifications."
      lastUpdated="Last revised: 31 October 2026 · Legal & IP Standards"
      breadcrumbs={[{ label: "Licensing & Rights", href: "/licensing" }]}
    >
      <section className="space-y-3">
        <h2 className="text-lg font-display font-medium text-ink">
          1. Resource Ownership and Attribution
        </h2>
        <p className="text-muted">
          Axes Lab collects and organizes references, prompts, and resources from different sources to make discovery easier.
        </p>
        <p className="text-muted">
          The inclusion of a resource in Axes Lab does not make Axes Lab its original creator or copyright owner. Third-party resources remain associated with their original creators and respective rights holders. Axes Lab does not claim ownership of their work.
        </p>
        <p className="text-muted">
          The presence of a resource in this library does not automatically grant permission to redistribute, rehost, reproduce, or commercially exploit that resource. Users must respect the original creator&apos;s license, terms, and applicable usage restrictions.
        </p>
        <p className="text-muted">
          Where available, original source links and creator attribution remain accessible. Some resources may be displayed as previews or provided through links to their original locations instead of being hosted directly by Axes Lab.
        </p>
        <p className="text-muted">
          We appreciate everyone who has contributed work, knowledge, and resources to the wider creative and development community. For attribution corrections, copyright concerns, or removal requests, use the{" "}
          <Link href="/contact" className="text-cool hover:underline">
            existing contact process
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          2. Distinguishing Access from Rights
        </h2>
        <p className="text-muted">
          A central principle of Axes Lab is that{" "}
          <strong className="text-ink">
            access is not the same as redistribution rights
          </strong>
          . Publicly visible repositories or downloadable model files do not grant automatic permission to mirror files or alter ownership.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-muted">
          <li>
            <strong className="text-ink">Access Status:</strong> Indicates whether a resource is free, open source, free with limits, or depends on a paid external API.
          </li>
          <li>
            <strong className="text-ink">Distribution Status:</strong> Indicates whether Axes Lab is permitted to host content directly or must provide an attribution link to the upstream source.
          </li>
        </ul>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          3. Controlled Distribution Classifications
        </h2>
        <div className="border border-rule rounded-card bg-paper-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-paper-3 border-b border-rule text-ink">
                <tr>
                  <th className="p-3.5 font-medium">Status</th>
                  <th className="p-3.5 font-medium">Public Label</th>
                  <th className="p-3.5 font-medium">Policy Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule text-muted">
                <tr>
                  <td className="p-3.5 font-mono text-ink whitespace-nowrap">
                    host_allowed
                  </td>
                  <td className="p-3.5 font-medium text-cool whitespace-nowrap">
                    Hosted Here / Download
                  </td>
                  <td className="p-3.5">
                    Permissive open-source license (MIT, Apache-2.0, BSD) or direct authorization verified. Mirroring permitted with notices.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono text-ink whitespace-nowrap">
                    public_domain_or_cc0
                  </td>
                  <td className="p-3.5 font-medium text-ink whitespace-nowrap">
                    Public Domain / CC0
                  </td>
                  <td className="p-3.5">
                    Verified dedication to the public domain.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono text-ink whitespace-nowrap">
                    link_only
                  </td>
                  <td className="p-3.5 font-medium text-ink-2 whitespace-nowrap">
                    Official Source Only
                  </td>
                  <td className="p-3.5">
                    Metadata, creator attribution, and direct links point to the upstream creator source.
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-mono text-ink whitespace-nowrap">
                    review_required
                  </td>
                  <td className="p-3.5 font-medium text-accent whitespace-nowrap">
                    Unpublished
                  </td>
                  <td className="p-3.5">
                    License terms unclear or ambiguous. Quarantined from public catalog.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          4. No License Means No Mirroring
        </h2>
        <p className="text-muted">
          If an upstream repository has no explicit license file, default copyright applies. Axes Lab treats unlicensed public code strictly as{" "}
          <code className="font-mono text-ink">link_only</code> and will not mirror files without permission.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          5. Attribution Corrections &amp; Takedown Protocol
        </h2>
        <p className="text-muted">
          If you are a rights holder and need an attribution correction or removal, submit a request through the{" "}
          <Link href="/contact" className="text-cool hover:underline">
            Contact &amp; Corrections
          </Link>{" "}
          page. Credible requests are quarantined promptly while reviewed.
        </p>
      </section>
    </PolicyLayout>
  );
}
