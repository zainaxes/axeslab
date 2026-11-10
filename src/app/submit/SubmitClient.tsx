"use client";

import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function SubmitClient() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    resource_type: "prompt",
    suggested_category: "Website Prompts",
    author: "",
    canonical_url: "",
    explanation: "",
    submitter_contact: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.explanation.trim()) {
      toast.error("Title and prompt or description are required");
      return;
    }

    setSubmitting(true);
    try {
      const targetUrl =
        formData.canonical_url.trim() || "https://axeslab.zainaxes.com/submit";
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          canonical_url: targetUrl,
          resource_type: formData.resource_type,
          suggested_category: formData.suggested_category,
          explanation: `Title: ${formData.title.trim()}\nAuthor: ${formData.author.trim() || "Unspecified"}\n\n${formData.explanation.trim()}`,
          submitter_contact: formData.submitter_contact.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not submit resource");
        return;
      }
      setSubmitted(true);
      toast.success("Resource submitted for review");
    } catch {
      toast.error("Network error while submitting");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      {submitted ? (
        <div className="p-8 rounded-card bg-paper-2 border border-rule text-center space-y-4">
          <CheckCircle2 className="w-8 h-8 text-cool mx-auto" />
          <h2 className="text-lg font-display font-medium text-ink">
            Submission received
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-md mx-auto leading-relaxed">
            Our review queue will verify attribution, licensing, and safety before publishing to the library.
          </p>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setFormData({
                title: "",
                resource_type: "prompt",
                suggested_category: "Website Prompts",
                author: "",
                canonical_url: "",
                explanation: "",
                submitter_contact: "",
              });
            }}
            className="h-9 px-4 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors"
          >
            Submit another resource
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-card bg-paper-2 border border-rule space-y-5"
        >
          <div className="space-y-1.5">
            <label htmlFor="sub-title" className="block text-xs font-medium text-ink">
              Resource title
            </label>
            <input
              id="sub-title"
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g. Minimalist Bento Dashboard"
              className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="sub-type" className="block text-xs font-medium text-ink">
                Resource type
              </label>
              <select
                id="sub-type"
                value={formData.resource_type}
                onChange={(e) =>
                  setFormData({ ...formData, resource_type: e.target.value })
                }
                className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule text-xs text-ink outline-none"
              >
                <option value="prompt" className="bg-paper-2">Prompt</option>
                <option value="skill" className="bg-paper-2">Agent Skill</option>
                <option value="mcp_server" className="bg-paper-2">MCP Server</option>
                <option value="template" className="bg-paper-2">Template</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="sub-cat" className="block text-xs font-medium text-ink">
                Category
              </label>
              <select
                id="sub-cat"
                value={formData.suggested_category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    suggested_category: e.target.value,
                  })
                }
                className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule text-xs text-ink outline-none"
              >
                <option value="Website Prompts" className="bg-paper-2">Website Prompts</option>
                <option value="Motion Ads" className="bg-paper-2">Motion Graphics</option>
                <option value="Hero Section" className="bg-paper-2">UI Section</option>
                <option value="3D Website" className="bg-paper-2">3D WebGL</option>
                <option value="Background" className="bg-paper-2">Background &amp; Shader</option>
                <option value="Skills" className="bg-paper-2">Agent Skill</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="sub-author" className="block text-xs font-medium text-ink">
                Creator name or handle
              </label>
              <input
                id="sub-author"
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                placeholder="@handle or creator name"
                className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="sub-contact" className="block text-xs font-medium text-ink">
                Contact email (optional)
              </label>
              <input
                id="sub-contact"
                type="email"
                value={formData.submitter_contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    submitter_contact: e.target.value,
                  })
                }
                placeholder="you@example.com"
                className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="sub-url" className="block text-xs font-medium text-ink">
              Original source URL or repository
            </label>
            <input
              id="sub-url"
              type="url"
              value={formData.canonical_url}
              onChange={(e) =>
                setFormData({ ...formData, canonical_url: e.target.value })
              }
              placeholder="https://github.com/... or https://x.com/..."
              className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="sub-prompt" className="block text-xs font-medium text-ink">
              Prompt text, description, or license notes
            </label>
            <textarea
              id="sub-prompt"
              required
              rows={6}
              value={formData.explanation}
              onChange={(e) =>
                setFormData({ ...formData, explanation: e.target.value })
              }
              placeholder="Paste the full original prompt or notes about the resource…"
              className="w-full p-3 rounded-card bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink font-mono placeholder:text-muted outline-none resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full h-10 rounded-pill bg-accent text-accent-ink font-medium text-xs hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-2 focus-visible:outline-accent"
          >
            {submitting ? "Submitting…" : "Submit for review"}
          </button>
        </form>
      )}
    </div>
  );
}
