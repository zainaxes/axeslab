import React from "react";
import { getAdminReports } from "@/lib/queries";
import { Flag, ShieldAlert, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminReportsPage() {
  const reports = getAdminReports();

  return (
    <div className="space-y-6">
      <div className="border-b border-subtleBorder pb-4">
        <h1 className="text-xl font-bold text-primaryText tracking-tight">Issue Reports & Takedowns</h1>
        <p className="text-xs text-mutedText-secondary">
          Incoming takedown notices, broken source reports, and technical corrections.
        </p>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="p-8 text-center rounded-panel border border-subtleBorder bg-surface text-xs text-mutedText">
            No active reports in queue.
          </div>
        ) : (
          reports.map((rep) => (
            <div
              key={rep.id}
              className="p-5 rounded-panel border border-subtleBorder bg-surface-strong space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface border border-subtleBorder font-bold text-state-danger uppercase">
                  {rep.report_type.replace("_", " ")}
                </span>
                <span className="text-[11px] font-mono text-mutedText">
                  {new Date(rep.created_at).toLocaleString("en-GB")}
                </span>
              </div>

              {rep.resource_title && (
                <div className="text-xs text-primaryText font-semibold">
                  Target Resource: {rep.resource_title} ({rep.resource_id})
                </div>
              )}

              <p className="text-xs text-mutedText-secondary leading-relaxed bg-surface p-3 rounded border border-subtleBorder">
                {rep.explanation}
              </p>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-mutedText">
                  Reporter: {rep.reporter_contact || "Anonymous"}
                </span>
                <span className="px-2 py-0.5 rounded bg-surface text-state-danger font-semibold border border-state-danger/30 text-[11px]">
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
