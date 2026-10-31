import React from "react";
import { getAdminSubmissions } from "@/lib/queries";
import { Inbox, CheckCircle2, XCircle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminSubmissionsPage() {
  const submissions = getAdminSubmissions();

  return (
    <div className="space-y-6">
      <div className="border-b border-subtleBorder pb-4">
        <h1 className="text-xl font-bold text-primaryText tracking-tight">Community Submissions Queue</h1>
        <p className="text-xs text-mutedText-secondary">
          Review external candidate links submitted by the community for inclusion.
        </p>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="p-8 text-center rounded-panel border border-subtleBorder bg-surface text-xs text-mutedText">
            No submissions in queue.
          </div>
        ) : (
          submissions.map((sub) => (
            <div
              key={sub.id}
              className="p-5 rounded-panel border border-subtleBorder bg-surface-strong space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-subtleBorder font-bold uppercase">
                    {sub.resource_type}
                  </span>
                  {sub.suggested_category && (
                    <span className="text-xs text-mutedText">in {sub.suggested_category}</span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-mutedText">
                  {new Date(sub.created_at).toLocaleString("en-GB")}
                </span>
              </div>

              <div>
                <a
                  href={sub.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs font-bold text-primaryText hover:underline break-all"
                >
                  {sub.canonical_url}
                </a>
              </div>

              <p className="text-xs text-mutedText-secondary leading-relaxed bg-surface p-3 rounded border border-subtleBorder">
                {sub.explanation}
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-mutedText">
                  Submitter: {sub.submitter_contact || "Anonymous"}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface text-state-warning font-semibold border border-state-warning/30 text-[11px]">
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
