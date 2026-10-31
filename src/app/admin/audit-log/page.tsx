import React from "react";
import { getAdminAuditLogs } from "@/lib/queries";
import { ScrollText, Shield } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminAuditLogPage() {
  const logs = getAdminAuditLogs();

  return (
    <div className="space-y-6">
      <div className="border-b border-subtleBorder pb-4">
        <h1 className="text-xl font-bold text-primaryText tracking-tight">Administrative Audit Log</h1>
        <p className="text-xs text-mutedText-secondary">
          Immutable audit trail of catalog publishing, quarantine decisions, and administrative actions.
        </p>
      </div>

      <div className="rounded-panel border border-subtleBorder bg-surface-strong overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-surface border-b border-subtleBorder text-mutedText font-semibold uppercase text-[11px]">
            <tr>
              <th className="p-3">Timestamp</th>
              <th className="p-3">Admin</th>
              <th className="p-3">Action</th>
              <th className="p-3">Target</th>
              <th className="p-3">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtleBorder/60 font-mono text-[11px]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-surface/50 transition-colors">
                <td className="p-3 text-mutedText whitespace-nowrap">
                  {new Date(log.created_at).toLocaleString("en-GB")}
                </td>
                <td className="p-3 text-primaryText whitespace-nowrap">{log.admin_user}</td>
                <td className="p-3 font-semibold text-primaryText whitespace-nowrap">{log.action}</td>
                <td className="p-3 text-mutedText-secondary whitespace-nowrap">
                  {log.target_type}:{log.target_id}
                </td>
                <td className="p-3 text-mutedText max-w-xs truncate">
                  {log.details_json || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
