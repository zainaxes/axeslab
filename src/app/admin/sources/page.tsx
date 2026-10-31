import React from "react";
import { getAdminSources } from "@/lib/queries";
import { Globe, ShieldCheck, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default function AdminSourcesPage() {
  const sources = getAdminSources();

  return (
    <div className="space-y-6">
      <div className="border-b border-subtleBorder pb-4">
        <h1 className="text-xl font-bold text-primaryText tracking-tight">Source Registry</h1>
        <p className="text-xs text-mutedText-secondary">
          Approved upstream roots, official registries, and automated verification check cadences.
        </p>
      </div>

      <div className="rounded-panel border border-subtleBorder bg-surface-strong overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-surface border-b border-subtleBorder text-mutedText font-semibold uppercase text-[11px]">
            <tr>
              <th className="p-3">Source Name</th>
              <th className="p-3">Host</th>
              <th className="p-3">Type</th>
              <th className="p-3">Cadence</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtleBorder/60">
            {sources.map((s) => (
              <tr key={s.id} className="hover:bg-surface/50 transition-colors">
                <td className="p-3 font-bold text-primaryText flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-mutedText" />
                  {s.name}
                </td>
                <td className="p-3 font-mono text-mutedText-secondary">{s.canonical_host}</td>
                <td className="p-3 uppercase text-[10px] font-semibold text-mutedText">
                  {s.source_type}
                </td>
                <td className="p-3 text-mutedText">Every {s.check_cadence_days} days</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-surface border border-state-success/40 text-state-success">
                    ACTIVE
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
