import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "About Axes Lab — Mission & Architecture",
  description:
    "An independent technical reference library documenting the tools, protocols, skills, and models powering modern AI systems.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto py-4 space-y-8">
      <Breadcrumbs items={[{ label: "About Axes Lab", href: "/about" }]} />

      <header className="border-b border-subtleBorder pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          About Axes Lab
        </h1>
        <p className="text-xs sm:text-sm text-mutedText">
          Last revised: 31 October 2026 • Editorial Architecture Group
        </p>
      </header>

      <div className="prose prose-sm text-primaryText leading-relaxed space-y-6 text-xs sm:text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">Our Core Mission</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            Axes Lab is an independent, non-commercial directory and technical reference library of AI
            prompts, agent skills, Model Context Protocol (MCP) servers, workflows, and open-source models.
            Our purpose is to give developers, researchers, and creators a calm, reliable index to discover
            the practical tools behind modern artificial intelligence systems.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">What Axes Lab Is Not</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            We explicitly reject the generic marketing cliches common in AI landing pages. Axes Lab is not:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-mutedText-secondary">
            <li>An AI wrapper or chatbot that forces conversational friction to discover a tool.</li>
            <li>A commercial prompt marketplace promoting low-effort, copy-pasted templates.</li>
            <li>A registry that claims automated "verification" without inspecting source code.</li>
            <li>An automated scraper that republishes third-party repositories without checking licenses.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">Curation Philosophy</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            The AI ecosystem moves rapidly, often with noisy, speculative claims. We prioritize
            depth, verification timestamps, and technical transparency. If an MCP server requires write
            access to the host filesystem, we explicitly label it. If an open-weight model requires 48GB
            of VRAM, we state that upfront. If an entry has a paid third-party API dependency, it is never
            misrepresented as completely free.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">Platform Architecture</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            The platform is built on modern web standards prioritizing speed, accessibility (WCAG 2.2 AA),
            and minimal client-side overhead. Search is instantaneous, URL states are shareable, and all
            metadata is crawlable by standard search engines and machine-readable endpoints.
          </p>
        </section>
      </div>
    </article>
  );
}
