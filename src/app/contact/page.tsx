"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Flag, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const initialResourceId = searchParams.get("report") || "";

  const [resourceId, setResourceId] = useState(initialResourceId);
  const [reportType, setReportType] = useState("broken_link");
  const [explanation, setExplanation] = useState("");
  const [reporterContact, setReporterContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource_id: resourceId || undefined,
          report_type: reportType,
          explanation: explanation,
          reporter_contact: reporterContact,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit report.");
      }

      setStatus("success");
      setExplanation("");
      setReporterContact("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 text-center rounded-panel border border-state-success/40 bg-surface space-y-3">
        <CheckCircle2 className="w-8 h-8 text-state-success mx-auto" />
        <h2 className="text-base font-bold text-primaryText">Report Received</h2>
        <p className="text-xs text-mutedText-secondary max-w-sm mx-auto">
          Your report has been logged and queued for administrative review. If you provided contact details,
          our curation team will respond once reviewed.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="p-3.5 rounded-btn bg-surface border border-state-danger/40 text-xs text-state-danger flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div>
        <label htmlFor="reportType" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
          Issue Category <span className="text-state-danger">*</span>
        </label>
        <select
          id="reportType"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="w-full text-xs sm:text-sm h-10 px-3 rounded-input bg-surface-strong border border-subtleBorder text-primaryText focus:outline-none focus:ring-1 focus:ring-primaryText cursor-pointer"
        >
          <option value="broken_link">Broken / Moved Source Repository Link</option>
          <option value="licensing_dispute">Licensing or Copyright Takedown Request</option>
          <option value="security_issue">Security Vulnerability / Malicious Content</option>
          <option value="incorrect_metadata">Inaccurate Technical Metadata or Claims</option>
          <option value="other">General Inquiry or Feedback</option>
        </select>
      </div>

      <div>
        <label htmlFor="resourceId" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
          Target Resource Identifier (Optional)
        </label>
        <input
          id="resourceId"
          type="text"
          value={resourceId}
          onChange={(e) => setResourceId(e.target.value)}
          placeholder="e.g. res_mcp_fs or resource slug"
          className="w-full text-xs sm:text-sm h-10 px-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText"
        />
      </div>

      <div>
        <label htmlFor="explanation" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
          Detailed Explanation <span className="text-state-danger">*</span>
        </label>
        <textarea
          id="explanation"
          required
          rows={4}
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Describe the issue, evidence, or suggested correction..."
          className="w-full text-xs sm:text-sm p-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText leading-relaxed"
        />
      </div>

      <div>
        <label htmlFor="reporterContact" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
          Contact Email / Handle
        </label>
        <input
          id="reporterContact"
          type="text"
          value={reporterContact}
          onChange={(e) => setReporterContact(e.target.value)}
          placeholder="you@example.com"
          className="w-full text-xs sm:text-sm h-10 px-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto px-6 py-2.5 rounded-btn bg-state-inverse text-state-inverseText font-semibold text-xs sm:text-sm hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Flag className="w-4 h-4" />
            Submit Report
          </>
        )}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <Breadcrumbs items={[{ label: "Contact & Corrections", href: "/contact" }]} />

      <div className="border-b border-subtleBorder pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText tracking-tight mb-2">
          Contact & Takedown Requests
        </h1>
        <p className="text-xs sm:text-sm text-mutedText-secondary leading-relaxed">
          Report broken repository links, incorrect license attributions, security concerns, or submit a
          formal copyright takedown request.
        </p>
      </div>

      <Suspense fallback={<div className="py-6 text-xs text-mutedText">Loading contact form...</div>}>
        <ContactForm />
      </Suspense>
    </div>
  );
}
