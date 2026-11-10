"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Resource } from "@/types";
import { AccessBadge, VerificationBadge, TypeBadge } from "@/components/StatusBadges";
import { Search, ExternalLink, ShieldAlert, Check, RefreshCw } from "lucide-react";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Video editor modal state
  const [editingVideoSlug, setEditingVideoSlug] = useState<string | null>(null);
  const [videoInput, setVideoInput] = useState("");
  const [savingVideo, setSavingVideo] = useState(false);
  const [videoSaveMsg, setVideoSaveMsg] = useState<string | null>(null);

  const fetchResources = () => {
    setLoading(true);
    fetch("/api/public/resources?limit=500")
      .then((res) => res.json())
      .then((data) => {
        setResources(data.resources || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const openVideoEditor = (res: Resource) => {
    setEditingVideoSlug(res.slug);
    const existing = res.parsed_metadata?.youtube_video_id || res.parsed_metadata?.custom_video_url || "";
    setVideoInput(existing);
    setVideoSaveMsg(null);
  };

  const handleSaveVideo = async () => {
    if (!editingVideoSlug) return;
    setSavingVideo(true);
    try {
      const res = await fetch("/api/admin/video-mapping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: editingVideoSlug, videoUrl: videoInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setVideoSaveMsg("Saved successfully!");
        setResources((prev) =>
          prev.map((r) => {
            if (r.slug === editingVideoSlug) {
              const meta = r.parsed_metadata || {};
              meta.youtube_video_id = videoInput.trim();
              meta.custom_video_url = videoInput.trim();
              return { ...r, parsed_metadata: meta };
            }
            return r;
          })
        );
        setTimeout(() => {
          setEditingVideoSlug(null);
        }, 1200);
      } else {
        setVideoSaveMsg(data.error || "Save failed");
      }
    } catch (err) {
      setVideoSaveMsg("Failed to connect to server");
    } finally {
      setSavingVideo(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/resources", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setResources((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus as any } : r))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = resources.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    const matchesType = typeFilter === "all" || r.resource_type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rule pb-4">
        <div>
          <h1 className="text-xl font-medium text-ink tracking-tight">Resource Manager</h1>
          <p className="text-xs text-muted">
            Inspect, quarantine, or update publication status of catalogue records.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchResources}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-paper-2 border border-rule hover:border-rule-2 text-xs font-medium text-ink transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3 top-2.5" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources by title or slug..."
            className="w-full text-xs h-9 pl-9 pr-3 rounded-pill bg-paper-2 border border-rule text-ink placeholder:text-muted focus:outline-none focus:border-accent"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-9 px-3 rounded-pill bg-paper-2 border border-rule text-xs text-ink focus:outline-none focus:border-accent cursor-pointer"
        >
          <option value="all">All Types</option>
          <option value="prompt">Prompts</option>
          <option value="skill">Agent Skills</option>
          <option value="mcp_server">MCP Servers</option>
          <option value="model">Models</option>
          <option value="dataset">Datasets</option>
          <option value="tool">Tools</option>
          <option value="workflow">Workflows</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-9 px-3 rounded-pill bg-paper-2 border border-rule text-xs text-ink focus:outline-none focus:border-accent cursor-pointer"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="review">Review</option>
          <option value="quarantined">Quarantined</option>
        </select>
      </div>

      <div className="rounded-card border border-rule bg-paper-2 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-paper-3 border-b border-rule text-muted font-mono uppercase text-[11px]">
              <tr>
                <th className="p-3">Resource</th>
                <th className="p-3">Type</th>
                <th className="p-3">Access & License</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">
                    Loading records...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted">
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filtered.map((res) => (
                  <tr key={res.id} className="hover:bg-paper-3/60 transition-colors">
                    <td className="p-3 max-w-[280px]">
                      <div className="font-medium text-ink truncate mb-0.5">{res.title}</div>
                      <div className="font-mono text-[11px] text-muted truncate">
                        slug: {res.slug}
                      </div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <TypeBadge type={res.resource_type} />
                    </td>
                    <td className="p-3 whitespace-nowrap space-y-1">
                      <AccessBadge status={res.access_status} />
                      <div className="text-[11px] font-mono text-muted">{res.license_name}</div>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <select
                        value={res.status}
                        disabled={updatingId === res.id}
                        onChange={(e) => handleStatusChange(res.id, e.target.value)}
                        className={`text-xs px-2.5 py-1 rounded-pill border font-mono cursor-pointer bg-paper-3 ${
                          res.status === "published"
                            ? "text-ok border-ok/40"
                            : res.status === "quarantined"
                            ? "text-bad border-bad/40"
                            : "text-accent border-accent/40"
                        }`}
                      >
                        <option value="published">published</option>
                        <option value="review">review</option>
                        <option value="draft">draft</option>
                        <option value="quarantined">quarantined</option>
                      </select>
                    </td>
                    <td className="p-3 whitespace-nowrap space-x-3">
                      <button
                        type="button"
                        onClick={() => openVideoEditor(res)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-cool hover:underline"
                        title="Edit YouTube / video URL"
                      >
                        Video
                      </button>
                      <Link
                        href={`/resource/${res.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-ink hover:underline"
                      >
                        Preview <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingVideoSlug && (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 bg-paper/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-card border border-rule-2 bg-paper-2 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-rule pb-3">
              <h3 className="text-sm font-medium text-ink">
                Configure Video: <span className="font-mono text-xs text-muted">{editingVideoSlug}</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingVideoSlug(null)}
                className="text-xs text-muted hover:text-ink px-2 py-1"
              >
                Close
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-ink block">
                YouTube URL, Video ID, or Direct MP4 Link
              </label>
              <input
                type="text"
                value={videoInput}
                onChange={(e) => setVideoInput(e.target.value)}
                placeholder="e.g. https://www.youtube.com/watch?v=... or dQw4w9WgXcQ"
                className="w-full text-xs h-9 px-3 rounded-pill bg-paper-3 border border-rule text-ink focus:outline-none focus:border-accent font-mono"
              />
              <p className="text-[11px] text-muted leading-relaxed">
                Paste any YouTube watch link, short link, or video ID. Leave empty to use the fallback media preview.
              </p>
            </div>

            {videoSaveMsg && (
              <div className="text-xs font-mono text-ok">
                {videoSaveMsg}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-rule">
              <button
                type="button"
                disabled={savingVideo}
                onClick={() => setEditingVideoSlug(null)}
                className="px-3.5 py-1.5 text-xs font-medium rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-muted hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingVideo}
                onClick={handleSaveVideo}
                className="px-4 py-1.5 text-xs font-medium rounded-pill bg-accent text-accent-ink hover:opacity-90 disabled:opacity-50"
              >
                {savingVideo ? "Saving..." : "Save Video"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
