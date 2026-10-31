"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, CornerDownLeft, Sparkles, Terminal, Server, Boxes, Box } from "lucide-react";
import Link from "next/link";
import { Resource } from "@/types";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Handle keyboard shortcuts inside modal
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        if (results.length > 0 && results[selectedIndex]) {
          e.preventDefault();
          const target = results[selectedIndex];
          onClose();
          router.push(`/resource/${target.slug}`);
        } else if (query.trim()) {
          e.preventDefault();
          onClose();
          router.push(`/explore?q=${encodeURIComponent(query.trim())}`);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, query, onClose, router]);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/public/resources?query=${encodeURIComponent(query.trim())}&limit=8`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.resources || []);
          setSelectedIndex(0);
        })
        .catch(() => setResults([]))
        .finally(() => setIsLoading(false));
    }, 180);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-primaryText/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface-strong border border-subtleBorder-strong rounded-panel shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-subtleBorder px-4 py-3 bg-surface">
          <Search className="w-5 h-5 text-mutedText mr-3 flex-shrink-0" />
          <input
            ref={inputRef}
            id="global-search-title"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts, agent skills, MCP servers, workflows..."
            className="w-full bg-transparent text-base text-primaryText placeholder:text-mutedText focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 hover:bg-state-hover rounded text-mutedText hover:text-primaryText mr-2"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-xs bg-canvas text-mutedText-secondary border border-subtleBorder px-1.5 py-0.5 rounded font-mono">
            ESC
          </span>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-mutedText">Searching verified resources...</div>
          ) : results.length > 0 ? (
            <ul className="space-y-1" role="listbox">
              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li
                    key={item.id}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      onClose();
                      router.push(`/resource/${item.slug}`);
                    }}
                    className={`flex items-start justify-between p-3 rounded-btn cursor-pointer transition-colors ${
                      isSelected ? "bg-state-hover text-primaryText" : "hover:bg-surface text-primaryText"
                    }`}
                  >
                    <div className="pr-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-surface border border-subtleBorder text-mutedText-secondary">
                          {item.resource_type.replace("_", " ")}
                        </span>
                        <h4 className="text-sm font-semibold text-primaryText">{item.title}</h4>
                      </div>
                      <p className="text-xs text-mutedText-secondary line-clamp-1">{item.summary}</p>
                    </div>
                    <CornerDownLeft className="w-4 h-4 text-mutedText flex-shrink-0 mt-1 opacity-60" />
                  </li>
                );
              })}
            </ul>
          ) : query.trim() ? (
            <div className="p-8 text-center">
              <p className="text-sm text-primaryText font-medium mb-1">No exact matches found for "{query}"</p>
              <p className="text-xs text-mutedText mb-4">
                Try broader keywords or browse by resource type.
              </p>
              <Link
                href={`/explore?q=${encodeURIComponent(query.trim())}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-state-inverse text-state-inverseText rounded-btn hover:opacity-90 transition-opacity"
              >
                Browse Full Catalog <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-xs font-semibold text-mutedText uppercase tracking-wider px-2 mb-2">
                Suggested Resource Types
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: "Prompts", path: "/prompts", icon: Terminal },
                  { name: "Agent Skills", path: "/skills", icon: Boxes },
                  { name: "MCP Servers", path: "/mcp", icon: Server },
                  { name: "Models", path: "/models", icon: Box },
                ].map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <Link
                      key={cat.path}
                      href={cat.path}
                      onClick={onClose}
                      className="flex items-center gap-2 p-2.5 rounded-btn border border-subtleBorder bg-surface hover:bg-state-hover transition-colors text-xs font-medium text-primaryText"
                    >
                      <Icon className="w-4 h-4 text-mutedText flex-shrink-0" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-subtleBorder px-4 py-2 bg-surface text-[11px] text-mutedText">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-canvas border border-subtleBorder px-1 rounded">↑↓</kbd> navigate
            </span>
            <span>
              <kbd className="font-mono bg-canvas border border-subtleBorder px-1 rounded">↵</kbd> select
            </span>
          </div>
          <span>Axes Lab Catalogue</span>
        </div>
      </div>
    </div>
  );
}
