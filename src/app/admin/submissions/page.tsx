import React from "react";
import { getAdminSubmissions } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function AdminSubmissionsPage() {
  const submissions = getAdminSubmissions();

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="text-xl font-medium text-ink tracking-tight">Community Submissions Queue</h1>
        <p className="text-xs text-muted">
          Review external candidate links submitted by the community for inclusion.
        </p>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="p-8 text-center rounded-card border border-rule bg-paper-2 text-xs text-muted">
            No submissions in queue.
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-card border border-rule bg-paper-2 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-pill bg-paper-3 border border-rule text-ink uppercase">
                    {sub.resource_type}
                  </span>
                  {sub.suggested_category && (
                    <span className="text-xs text-muted">in {sub.suggested_category}</span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-muted">
                  {new Date(sub.created_at).toLocaleString("en-GB")}
                </span>
              </div>

              <div>
                <a
                  href={sub.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-cool hover:underline break-all"
                >
                  {sub.canonical_url}
                </a>
              </div>

              <p className="text-xs text-ink-2 leading-relaxed bg-paper-3 p-3 rounded-card border border-rule">
                {sub.explanation}
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-muted">
                  Submitter: {sub.submitter_contact || "Anonymous"}
                </span>
                <span className="px-2.5 py-0.5 rounded-pill bg-paper-3 text-accent font-mono border border-accent/30 text-[11px]">
                  {sub.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
