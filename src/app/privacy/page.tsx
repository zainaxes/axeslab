import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Server, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Axes Lab",
  description:
    "Privacy and data protection policy for Axes Lab. Understand how we treat telemetry, cookies, local storage, and user privacy.",
};

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-8 text-ink">
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />

      <header className="border-b border-rule pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-paper-3 border border-rule text-cool text-xs font-sans mb-4">
          <Lock className="w-3.5 h-3.5" />
          <span>Data Privacy & Zero Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-muted">
          Last revised: 2 November 2026 • Security & Privacy Architecture
        </p>
      </header>

      <div className="prose prose-invert prose-sm leading-relaxed space-y-8 text-muted text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <Eye className="w-4 h-4 text-cool" />
            1. Zero-Tracking Privacy Architecture
          </h2>
          <p>
            Axes Lab is designed with a fundamental commitment: <strong>we do not track, monetize, or sell user identity</strong>.
            You can browse our complete index of AI prompts, agent skills, WebGL backgrounds, and MCP directives without ever creating an account, surrendering personal information, or being tracked across the web.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-muted">
            <li>No invasive third-party cross-site behavioral ad trackers (no Google Ads, Meta Pixels, or fingerprinting).</li>
            <li>No forced authentication or paywalled access gates to copy prompts and skill files.</li>
            <li>No telemetry harvesting your clipboard when you copy prompts or CLI installation scripts.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <Server className="w-4 h-4 text-cool" />
            2. Local Storage & Client-Side Preferences
          </h2>
          <p>
            Axes Lab utilizes browser LocalStorage solely for client-side functionality requested directly by you:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs my-3">
            <div className="p-3.5 rounded-card border border-rule bg-paper-2">
              <strong className="text-ink block mb-1">Saved Items & Bookmarks</strong>
              <p className="text-muted">Your bookmarked and saved prompts reside strictly on your local browser machine via LocalStorage.</p>
            </div>
            <div className="p-3.5 rounded-card border border-rule bg-paper-2">
              <strong className="text-ink block mb-1">Theme & UI State</strong>
              <p className="text-muted">Your UI toggles, view filters, and category selections are retained locally for your convenience.</p>
            </div>
          </div>
          <p className="text-xs text-muted">
            You can clear these preferences at any time by wiping your browser’s site data for axeslab.zainaxes.com or through your browser’s Developer Tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cool" />
            3. Contact & Submission Data
          </h2>
          <p>
            When you submit a new resource via <Link href="/submit" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">Submit Resource</Link> or reach out through <Link href="/contact" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">Contact</Link>, we collect only the information provided explicitly by you (such as your name, handle, repository link, and email address).
          </p>
          <p>
            This data is used solely to verify open-source attribution, evaluate resource safety, and communicate editorial updates regarding your submission. We will never sell or share submission contact details.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-ink tracking-tight flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-cool" />
            4. External Links & Model Repositories
          </h2>
          <p>
            Our library catalogs external tools, GitHub repositories, and AI model weight distributions (e.g. Hugging Face, Anthropic, Google DeepMind, OpenAI). Once you navigate outside Axes Lab via an external link, the respective host’s terms and privacy policies govern your interactions.
          </p>
        </section>

        <section className="space-y-3 border-t border-rule pt-6">
          <h2 className="text-base font-bold text-ink tracking-tight">Questions & Privacy Contact</h2>
          <p className="text-xs text-muted">
            If you have questions regarding privacy, security reviews, or data handling at Axes Lab, please contact us directly at{" "}
            <a href="mailto:privacy@axeslab.zainaxes.com" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">
              privacy@axeslab.zainaxes.com
            </a>{" "}
            or visit our <Link href="/contact" className="text-cool underline underline-offset-2 rounded focus-visible:outline-2 focus-visible:outline-accent active:opacity-80">Contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
