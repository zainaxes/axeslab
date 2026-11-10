"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ContactClient() {
  const searchParams = useSearchParams();
  const reportTarget = searchParams.get("report") || "";

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    report_type: reportTarget ? "takedown_or_attribution" : "general_inquiry",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      toast.error("Email address and message are required");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resource_id: reportTarget || undefined,
          report_type: formData.report_type,
          explanation: `${formData.name ? `From: ${formData.name.trim()}\n\n` : ""}${formData.message.trim()}`,
          reporter_contact: formData.email.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Could not send message");
        return;
      }
      setSent(true);
      toast.success("Message recorded");
    } catch {
      toast.error("Network error while sending message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
      {sent ? (
        <div className="p-8 rounded-card bg-paper-2 border border-rule text-center space-y-4">
          <CheckCircle2 className="w-8 h-8 text-cool mx-auto" />
          <h2 className="text-lg font-display font-medium text-ink">
            Message received
          </h2>
          <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto leading-relaxed">
            Thank you for contacting Axes Lab and ZainAxes. Attribution, licensing, and technical notices are reviewed promptly.
          </p>
          <button
            type="button"
            onClick={() => {
              setSent(false);
              setFormData({
                name: "",
                email: "",
                report_type: "general_inquiry",
                message: "",
              });
            }}
            className="h-9 px-4 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-card bg-paper-2 border border-rule space-y-4"
        >
          {reportTarget && (
            <div className="p-3 rounded-pill bg-paper-3 border border-rule text-xs text-muted">
              Referencing resource:{" "}
              <span className="font-mono text-ink">{reportTarget}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="contact-type" className="block text-xs font-medium text-ink">
              Topic
            </label>
            <select
              id="contact-type"
              value={formData.report_type}
              onChange={(e) =>
                setFormData({ ...formData, report_type: e.target.value })
              }
              className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule text-xs text-ink outline-none"
            >
              <option value="general_inquiry" className="bg-paper-2">
                General inquiry or support
              </option>
              <option value="takedown_or_attribution" className="bg-paper-2">
                Attribution correction or removal request
              </option>
              <option value="broken_link" className="bg-paper-2">
                Broken link or technical issue
              </option>
              <option value="security_disclosure" className="bg-paper-2">
                Security or safety report
              </option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-name" className="block text-xs font-medium text-ink">
              Name (optional)
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Your name"
              className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-email" className="block text-xs font-medium text-ink">
              Email address
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="you@example.com"
              className="w-full h-9 px-3 rounded-pill bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="contact-msg" className="block text-xs font-medium text-ink">
              Message
            </label>
            <textarea
              id="contact-msg"
              required
              rows={5}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Describe your attribution notice, removal request, contribution, or question…"
              className="w-full p-3 rounded-card bg-paper-3 border border-rule focus:border-rule-2 text-xs text-ink placeholder:text-muted outline-none resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full h-10 rounded-pill bg-accent text-accent-ink font-medium text-xs hover:opacity-90 disabled:opacity-50 transition-opacity focus-visible:outline-2 focus-visible:outline-accent"
          >
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
