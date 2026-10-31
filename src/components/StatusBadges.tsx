import React from "react";
import { AccessStatus, DistributionStatus, VerificationStatus, ResourceType } from "@/types";
import { CheckCircle2, ShieldCheck, ExternalLink, Download, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  accessStatus?: AccessStatus;
  distributionStatus?: DistributionStatus;
  verificationStatus?: VerificationStatus;
  resourceType?: ResourceType;
  lastChecked?: string | null;
}

export function AccessBadge({ status }: { status: AccessStatus }) {
  const config: Record<AccessStatus, { label: string; class: string }> = {
    free_open_source: {
      label: "Open Source",
      class: "bg-surface text-state-success border-state-success/30",
    },
    free_hosted: {
      label: "Free Hosted",
      class: "bg-surface text-primaryText border-subtleBorder",
    },
    free_with_limits: {
      label: "Free Tier",
      class: "bg-surface text-state-warning border-state-warning/30",
    },
    open_source_paid_dependency: {
      label: "Paid API Dependent",
      class: "bg-surface text-state-warning border-state-warning/40",
    },
    trial: {
      label: "Trial",
      class: "bg-surface text-mutedText-secondary border-subtleBorder",
    },
    paid: {
      label: "Paid Account Required",
      class: "bg-surface text-state-danger border-state-danger/30",
    },
  };

  const item = config[status] || {
    label: status,
    class: "bg-surface text-mutedText-secondary border-subtleBorder",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${item.class}`}
    >
      {item.label}
    </span>
  );
}

export function DistributionBadge({ status }: { status: DistributionStatus }) {
  if (status === "host_allowed") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-surface text-primaryText border border-subtleBorder">
        <Download className="w-3 h-3 text-state-success" />
        Hosted Here
      </span>
    );
  }

  if (status === "public_domain_or_cc0") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-surface text-primaryText border border-subtleBorder">
        CC0 / Public Domain
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-surface text-mutedText-secondary border border-subtleBorder">
      <ExternalLink className="w-3 h-3 text-mutedText" />
      Official Source Only
    </span>
  );
}

export function VerificationBadge({
  status,
  lastChecked,
}: {
  status: VerificationStatus;
  lastChecked?: string | null;
}) {
  const formattedDate = lastChecked
    ? new Date(lastChecked).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  if (status === "verified") {
    return (
      <span
        title={formattedDate ? `Checked ${formattedDate}` : "Verified by Editorial Team"}
        className="inline-flex items-center gap-1 text-xs font-medium text-state-success"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        {formattedDate ? `Verified ${formattedDate}` : "Verified"}
      </span>
    );
  }

  if (status === "needs_review" || status === "stale") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-state-warning">
        <AlertCircle className="w-3.5 h-3.5" />
        Review Required
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-mutedText">
      Unchecked
    </span>
  );
}

export function TypeBadge({ type }: { type: ResourceType }) {
  const labels: Record<ResourceType, string> = {
    prompt: "Prompt",
    skill: "Agent Skill",
    mcp_server: "MCP Server",
    agent: "Agent",
    workflow: "Workflow",
    rule: "Config / Rule",
    template: "Template",
    model: "Model",
    dataset: "Dataset",
    tool: "Developer Tool",
    reference: "Technical Reference",
  };

  return (
    <span className="inline-block text-xs font-semibold tracking-wider uppercase text-mutedText-secondary">
      {labels[type] || type}
    </span>
  );
}
