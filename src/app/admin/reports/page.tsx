import React from "react";
import { getAdminReports } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default function AdminReportsPage() {
  const reports = getAdminReports();

  return (
    <div className="space-y-6">
      <div className="border-b border-rule pb-4">
        <h1 className="text-xl font-medium text-ink tracking-tight">Issue Reports & Takedowns</h1>
        <p className="text-xs text-muted">
          Incoming takedown notices, broken source reports, and technical corrections.
        </p>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="p-8 text-center rounded-card border border-rule bg-paper-2 text-xs text-muted">
            No active reports in queue.
          </div>
        ) : (
          reports.map((rep) => (
            <div
              key={rep.id}
              className="p-5 rounded-card border border-rule bg-paper-2 space-y-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-pill bg-paper-3 border border-bad/40 text-bad uppercase">
                  {rep.report_type.replace("_", " ")}
                </span>
                <span className="text-[11px] font-mono text-muted">
                  {new Date(rep.created_at).toLocaleString("en-GB")}
                </span>
              </div>

              {rep.resource_title && (
                <div className="text-xs text-ink font-medium">
                  Target Resource: {rep.resource_title} <span className="font-mono text-muted">({rep.resource_id})</span>
                </div>
              )}

              <p className="text-xs text-ink-2 leading-relaxed bg-paper-3 p-3 rounded-card border border-rule">
                {rep.explanation}
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-muted">
                  Reporter: {rep.reporter_contact || "Anonymous"}
                </span>
                <span className="px-2.5 py-0.5 rounded-pill bg-paper-3 text-bad font-mono border border-bad/40 text-[11px]">
                  {rep.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
