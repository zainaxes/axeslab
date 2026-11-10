import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PolicyLayout } from "@/components/PolicyLayout";

export const metadata: Metadata = {
  title: "About Axes Lab — Independent Resource Library by ZainAxes",
  description:
    "Axes Lab is an independent resource discovery and reference library and a sub-brand of ZainAxes, bringing prompts, creative references, motion-design resources, and tools together in one place.",
  alternates: {
    canonical: "https://axeslab.zainaxes.com/about",
  },
};

export default function AboutPage() {
  return (
    <PolicyLayout
      title="About Axes Lab"
      subtitle="An independent resource library and a sub-brand of ZainAxes."
      breadcrumbs={[{ label: "About", href: "/about" }]}
    >
      <section className="space-y-4">
        <p className="text-ink">
          Axes Lab is an independent resource library and a sub-brand of{" "}
          <a
            href="https://zainaxes.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cool hover:underline"
          >
            ZainAxes
          </a>
          . ZainAxes is an independent, private, non-government, non-commercial brand.
        </p>

        <p className="text-muted">
          Its purpose is to bring useful prompts, creative references, motion-design resources, and other tools together in one place, making it easier for people to discover what they are looking for without searching across multiple platforms.
        </p>

        <p className="text-muted">
          The resources collected here come from different sources and creators. Their original ownership and attribution remain with their respective owners.
        </p>

        <p className="text-muted">
          Axes Lab aims to provide an accessible and consistent experience for everyone. Its purpose is to make useful resources easier to discover, not to create unnecessary barriers around access.
        </p>

        <p className="text-muted">
          We appreciate every creator, author, developer, and contributor whose work makes this collection possible.
        </p>
      </section>

      <section className="pt-6 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-card border border-rule bg-paper-2 p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h2 className="text-base font-display font-medium text-ink">
              Have a resource or prompt to contribute?
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              Submit it for review and inclusion through the submission page.
            </p>
          </div>
          <Link
            href="/submit"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cool hover:underline pt-1"
          >
            <span>Go to submission page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="rounded-card border border-rule bg-paper-2 p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-1.5">
            <h2 className="text-base font-display font-medium text-ink">
              Want to contribute your time, skills, or financial support?
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              Contact ZainAxes directly through the contact page.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cool hover:underline pt-1"
          >
            <span>Go to contact page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      <section className="pt-6 border-t border-rule space-y-4">
        <h2 className="text-base font-display font-medium text-ink">
          Governance &amp; Standards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <Link
            href="/licensing"
            className="p-4 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors"
          >
            <span className="font-medium text-ink block">
              Licensing &amp; Rights
            </span>
            <span className="text-muted mt-0.5 block">
              Resource ownership, attribution, and redistribution classifications
            </span>
          </Link>
          <Link
            href="/methodology"
            className="p-4 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors"
          >
            <span className="font-medium text-ink block">
              Curation Methodology
            </span>
            <span className="text-muted mt-0.5 block">
              Source hierarchy, verification rubric, and freshness checks
            </span>
          </Link>
          <Link
            href="/safety-and-security"
            className="p-4 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors"
          >
            <span className="font-medium text-ink block">
              Safety &amp; Security
            </span>
            <span className="text-muted mt-0.5 block">
              Untrusted content handling and MCP permission transparency
            </span>
          </Link>
          <Link
            href="/privacy"
            className="p-4 rounded-card border border-rule bg-paper-2 hover:border-rule-2 transition-colors"
          >
            <span className="font-medium text-ink block">Privacy &amp; Terms</span>
            <span className="text-muted mt-0.5 block">
              Local storage behavior and directory terms of use
            </span>
          </Link>
        </div>
      </section>
    </PolicyLayout>
  );
}
