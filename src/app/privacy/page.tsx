import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy and data handling policy for Axes Lab. Understand how browser local storage, contact submissions, and external links are treated.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="Data privacy and local browser storage commitments for Axes Lab."
      lastUpdated="Last revised: 2 November 2026"
      breadcrumbs={[{ label: "Privacy Policy", href: "/privacy" }]}
    >
      <section className="space-y-3">
        <h2 className="text-lg font-display font-medium text-ink">
          1. Zero-Tracking Privacy Architecture
        </h2>
        <p className="text-muted">
          Axes Lab is designed with a commitment not to track, monetize, or sell user identity. You can browse our index of AI prompts, agent skills, WebGL backgrounds, and MCP directives without creating an account or surrendering personal information.
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-muted">
          <li>
            No third-party cross-site behavioral ad trackers (no Google Ads, Meta Pixels, or ad fingerprinting).
          </li>
          <li>
            No forced authentication or paywalled gates to copy prompts and skill files.
          </li>
          <li>
            No clipboard telemetry when copying prompts or CLI installation commands.
          </li>
        </ul>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          2. Local Storage &amp; Client-Side Preferences
        </h2>
        <p className="text-muted">
          Axes Lab uses browser LocalStorage solely for client-side preferences requested by you:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-4 rounded-card border border-rule bg-paper-2 space-y-1">
            <strong className="text-ink block">Saved Items &amp; Bookmarks</strong>
            <p className="text-muted">
              Your bookmarked and saved prompts stay locally on your browser via LocalStorage.
            </p>
          </div>
          <div className="p-4 rounded-card border border-rule bg-paper-2 space-y-1">
            <strong className="text-ink block">Customizer Details</strong>
            <p className="text-muted">
              Optional prompt customizer form details are stored locally in your browser so you do not have to re-type them.
            </p>
          </div>
        </div>
        <p className="text-xs text-muted">
          You can clear these preferences at any time by clearing site data for{" "}
          <span className="font-mono text-ink-2">axeslab.zainaxes.com</span> in your browser settings.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          3. Contact &amp; Submission Data
        </h2>
        <p className="text-muted">
          When you submit a resource via{" "}
          <Link href="/submit" className="text-cool hover:underline">
            Submit Resource
          </Link>{" "}
          or reach out through{" "}
          <Link href="/contact" className="text-cool hover:underline">
            Contact
          </Link>
          , we collect only the information explicitly provided by you. This data is used solely to verify attribution, evaluate resource safety, and respond to your inquiry. We do not sell or share submission contact details.
        </p>
      </section>

      <section className="space-y-3 pt-4 border-t border-rule">
        <h2 className="text-lg font-display font-medium text-ink">
          4. External Links &amp; Upstream Hosts
        </h2>
        <p className="text-muted">
          Axes Lab links to external creator posts, GitHub repositories, and third-party documentation. Once you follow an external link outside Axes Lab, that destination&apos;s privacy policy and terms govern your interaction.
        </p>
      </section>

      <section className="space-y-2 pt-4 border-t border-rule">
        <h2 className="text-base font-display font-medium text-ink">
          Privacy Contact
        </h2>
        <p className="text-xs text-muted">
          For privacy or data handling inquiries, write to{" "}
          <a
            href="mailto:privacy@axeslab.zainaxes.com"
            className="text-cool hover:underline"
          >
            privacy@axeslab.zainaxes.com
          </a>{" "}
          or visit the{" "}
          <Link href="/contact" className="text-cool hover:underline">
            Contact page
          </Link>
          .
        </p>
      </section>
    </PolicyLayout>
  );
}
