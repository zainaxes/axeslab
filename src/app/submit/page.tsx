"use client";

import React, { useState } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Send, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";

export default function SubmitResourcePage() {
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [resourceType, setResourceType] = useState("prompt");
  const [suggestedCategory, setSuggestedCategory] = useState("");
  const [explanation, setExplanation] = useState("");
  const [submitterContact, setSubmitterContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          canonical_url: canonicalUrl,
          resource_type: resourceType,
          suggested_category: suggestedCategory,
          explanation: explanation,
          submitter_contact: submitterContact,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit resource.");
      }

      setStatus("success");
      setCanonicalUrl("");
      setExplanation("");
      setSuggestedCategory("");
      setSubmitterContact("");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      <Breadcrumbs items={[{ label: "Submit a Resource", href: "/submit" }]} />

      <div className="border-b border-subtleBorder pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-primaryText tracking-tight mb-2">
          Submit an AI Resource
        </h1>
        <p className="text-xs sm:text-sm text-mutedText-secondary leading-relaxed">
          Recommend a high-quality prompt, open-source skill, MCP server, workflow, or technical reference.
          Every submission is verified by curators for rights, security boundaries, and authentic functionality.
        </p>
      </div>

      <div className="p-4 rounded-btn border border-subtleBorder bg-surface text-xs text-mutedText-secondary space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-primaryText">
          <ShieldCheck className="w-4 h-4 text-state-success" />
          Editorial Review Policy
        </div>
        <p>
          Submissions are not auto-published. We inspect the canonical source repository, determine
          permissive license terms, and verify client compatibility before adding any record.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-8 text-center rounded-panel border border-state-success/40 bg-surface space-y-3">
          <CheckCircle2 className="w-8 h-8 text-state-success mx-auto" />
          <h2 className="text-base font-bold text-primaryText">Submission Received</h2>
          <p className="text-xs text-mutedText-secondary max-w-sm mx-auto">
            Thank you for helping maintain the index. The editorial team will review the repository,
            validate license terms, and update the catalogue if it meets inclusion standards.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 px-4 py-2 rounded-btn bg-state-inverse text-state-inverseText text-xs font-semibold hover:opacity-90"
          >
            Submit Another Resource
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {status === "error" && (
            <div className="p-3.5 rounded-btn bg-surface border border-state-danger/40 text-xs text-state-danger flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label htmlFor="canonicalUrl" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
              Canonical Source URL <span className="text-state-danger">*</span>
            </label>
            <input
              id="canonicalUrl"
              type="url"
              required
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
              placeholder="https://github.com/organization/project"
              className="w-full text-xs sm:text-sm h-10 px-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText"
            />
            <span className="text-[11px] text-mutedText mt-1 block">
              Official GitHub repository, documentation URL, or package registry link.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="resourceType" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
                Resource Type <span className="text-state-danger">*</span>
              </label>
              <select
                id="resourceType"
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                className="w-full text-xs sm:text-sm h-10 px-3 rounded-input bg-surface-strong border border-subtleBorder text-primaryText focus:outline-none focus:ring-1 focus:ring-primaryText cursor-pointer"
              >
                <option value="prompt">Prompt</option>
                <option value="skill">Agent Skill</option>
                <option value="mcp_server">MCP Server</option>
                <option value="agent">Agent / Framework</option>
                <option value="workflow">Workflow / Pipeline</option>
                <option value="rule">Rule / Configuration</option>
                <option value="template">Starter Template</option>
                <option value="model">Model / Open Weights</option>
                <option value="dataset">Dataset / Evaluation</option>
                <option value="tool">Developer Tool</option>
                <option value="reference">Technical Reference</option>
              </select>
            </div>

            <div>
              <label htmlFor="suggestedCategory" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
                Suggested Subcategory
              </label>
              <input
                id="suggestedCategory"
                type="text"
                value={suggestedCategory}
                onChange={(e) => setSuggestedCategory(e.target.value)}
                placeholder="e.g. Postgres DB, Code Review"
                className="w-full text-xs sm:text-sm h-10 px-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText"
              />
            </div>
          </div>

          <div>
            <label htmlFor="explanation" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
              Why is this resource useful? <span className="text-state-danger">*</span>
            </label>
            <textarea
              id="explanation"
              required
              rows={4}
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="Explain the practical problem it solves, tested compatibility, or notable security considerations..."
              className="w-full text-xs sm:text-sm p-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText leading-relaxed"
            />
          </div>

          <div>
            <label htmlFor="submitterContact" className="block text-xs font-bold text-primaryText uppercase tracking-wider mb-1.5">
              Your Email / GitHub Handle (Optional)
            </label>
            <input
              id="submitterContact"
              type="text"
              value={submitterContact}
              onChange={(e) => setSubmitterContact(e.target.value)}
              placeholder="developer@example.com or @username"
              className="w-full text-xs sm:text-sm h-10 px-3.5 rounded-input bg-surface-strong border border-subtleBorder text-primaryText placeholder:text-mutedText focus:outline-none focus:ring-1 focus:ring-primaryText"
            />
            <span className="text-[11px] text-mutedText mt-1 block">
              Used only if curators have questions regarding licensing scope. Never shared publicly.
            </span>
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
                <Send className="w-4 h-4" />
                Submit for Editorial Review
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
