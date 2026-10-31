import React from "react";
import { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Licensing & Redistribution Policy | Axes Lab",
  description:
    "How Axes Lab distinguishes access models, evaluates open source licenses, and handles redistribution rights.",
};

export default function LicensingPage() {
  return (
    <article className="max-w-3xl mx-auto py-4 space-y-8">
      <Breadcrumbs items={[{ label: "Licensing & Rights", href: "/licensing" }]} />

      <header className="border-b border-subtleBorder pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primaryText tracking-tight mb-2">
          Licensing, Redistribution & Attribution Policy
        </h1>
        <p className="text-xs sm:text-sm text-mutedText">
          Last revised: 31 October 2026 • Legal & IP Standards
        </p>
      </header>

      <div className="prose prose-sm text-primaryText leading-relaxed space-y-6 text-xs sm:text-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">1. Distinguishing Access from Rights</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            A central principle of Axes Lab is that <strong>access is not the same as redistribution rights</strong>.
            Just because a GitHub repository is publicly visible or a model weight file can be downloaded
            free of charge does not grant our directory the right to mirror its files or claim ownership.
          </p>
          <p className="text-mutedText-secondary leading-relaxed">
            Every resource maintains two separate classifications:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-mutedText-secondary">
            <li><strong>Access Status:</strong> Whether the end-user can run it for free, with limits, or requires a paid API key.</li>
            <li><strong>Distribution Status:</strong> Whether Axes Lab is legally permitted to host the file/content directly or must provide an external link only.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">2. Controlled Distribution Classifications</h2>
          <div className="border border-subtleBorder rounded-panel overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-surface border-b border-subtleBorder font-semibold text-primaryText">
                <tr>
                  <th className="p-3">Status</th>
                  <th className="p-3">Public Label</th>
                  <th className="p-3">Policy Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtleBorder/60 text-mutedText-secondary">
                <tr>
                  <td className="p-3 font-mono font-semibold text-primaryText">host_allowed</td>
                  <td className="p-3 font-semibold text-state-success">Hosted Here / Download</td>
                  <td className="p-3">Permissive open source license (MIT, Apache-2.0, BSD) verified. Mirroring permitted with notices.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-primaryText">public_domain_or_cc0</td>
                  <td className="p-3 font-semibold text-primaryText">Public Domain / CC0</td>
                  <td className="p-3">Verified dedication to the public domain. Free for all reproduction.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-primaryText">link_only</td>
                  <td className="p-3 font-semibold text-mutedText">Official Source Only</td>
                  <td className="p-3">Metadata and original editorial summary displayed; users navigate to the upstream author repository.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-semibold text-primaryText">review_required</td>
                  <td className="p-3 text-state-warning">Unpublished</td>
                  <td className="p-3">License terms unclear or ambiguous. Quarantined from public catalog.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">3. No License Means No Mirroring</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            If an upstream public GitHub repository has no explicit license file, default copyright applies.
            Axes Lab treats unlicensed public code strictly as <strong>link_only</strong>. We will never
            re-host or distribute files from unlicensed repositories.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-primaryText tracking-tight">4. DMCA & Takedown Protocol</h2>
          <p className="text-mutedText-secondary leading-relaxed">
            We respect author intellectual property. If you are a copyright holder and believe any entry
            infringes your rights, submit a report via our <a href="/contact" className="underline font-semibold">Contact & Corrections</a> portal.
            Credible requests are quarantined immediately while investigated.
          </p>
        </section>
      </div>
    </article>
  );
}
