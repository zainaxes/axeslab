"use client";

import React, { useState } from "react";
import { Check, Copy, Wand2 } from "lucide-react";
import { toast } from "sonner";

const VISUAL_DIRECTIONS = [
  {
    id: "liquid-glass",
    name: "Liquid Glass & Specular",
    desc: "Translucent elevated surfaces, 1px hairline borders, subtle refraction.",
  },
  {
    id: "console-graphite",
    name: "Console Graphite System",
    desc: "Dark graphite paper surfaces, Host Grotesk typography, restrained chromatic accent.",
  },
  {
    id: "editorial-brutalist",
    name: "Editorial Contrast",
    desc: "Structured typographic hierarchy, crisp 1px dividers, clean monochrome restraint.",
  },
  {
    id: "3d-particle-shader",
    name: "3D Particle & Canvas",
    desc: "WebGL point-cloud lattice and hardware-accelerated canvas motion.",
  },
  {
    id: "linear-saas",
    name: "High-Density Workbench",
    desc: "Compact typography, keyboard navigation, and scannable status indicators.",
  },
];

export function RestyleClient() {
  const [existingCode, setExistingCode] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("console-graphite");
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = VISUAL_DIRECTIONS.find((s) => s.id === selectedStyle);

    const prompt = `// Axes Lab Refactoring Prompt
// Target Visual Direction: ${chosen?.name}
// Summary: ${chosen?.desc}

Role: You are a senior frontend engineer and UI designer.
Refactor the component below to follow "${chosen?.name}" strictly:

1. Layout & Tokens:
   - Maintain a consistent spacing grid (4px/8px increments) and clear visual hierarchy.
   - Use semantic CSS custom properties for background, surface, border, primary ink, and muted text.
   - Ensure full responsiveness across desktop, tablet, and mobile screens.

2. Typography & Accessibility:
   - Keep a single primary UI sans font paired with a monospace font for code and numbers.
   - Include visible keyboard focus states (:focus-visible) and semantic HTML elements.

3. Motion Restraint:
   - Animate transform and opacity only; respect prefers-reduced-motion: reduce.

Existing Component or Description:
\`\`\`tsx
${existingCode.trim() || "// [No code provided — generate a standalone component]"}
\`\`\`

Output a complete, production-ready React + TypeScript + Tailwind CSS component.`;

    setGeneratedPrompt(prompt);
    toast.success("Refactoring prompt generated");
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      toast.success("Refactoring prompt copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.info("Select the generated prompt below to copy");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <form
        onSubmit={handleGenerate}
        className="rounded-card bg-paper-2 border border-rule p-5 sm:p-6 space-y-6"
      >
        <div className="space-y-3">
          <label className="text-xs font-medium text-ink block">
            1. Choose Visual Direction
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VISUAL_DIRECTIONS.map((dir) => {
              const selected = selectedStyle === dir.id;
              return (
                <button
                  key={dir.id}
                  type="button"
                  onClick={() => setSelectedStyle(dir.id)}
                  className={`p-3.5 rounded-card border text-left transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent ${
                    selected
                      ? "bg-paper-3 border-accent text-ink"
                      : "bg-paper-3 border-rule text-muted hover:text-ink hover:border-rule-2"
                  }`}
                >
                  <span className="text-xs font-medium text-ink block">
                    {dir.name}
                  </span>
                  <span className="text-[11px] text-muted mt-1 block leading-relaxed">
                    {dir.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="restyle-source"
            className="text-xs font-medium text-ink block"
          >
            2. Paste Component Code or Description
          </label>
          <textarea
            id="restyle-source"
            rows={7}
            value={existingCode}
            onChange={(e) => setExistingCode(e.target.value)}
            placeholder="export default function Hero() { return <section>...</section>; }"
            className="w-full rounded-card bg-paper-3 border border-rule focus:border-rule-2 p-4 text-xs font-mono text-ink placeholder:text-muted outline-none resize-y"
          />
        </div>

        <button
          type="submit"
          className="w-full h-10 rounded-pill bg-accent text-accent-ink text-xs font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
        >
          <Wand2 className="w-3.5 h-3.5" />
          <span>Generate Refactoring Prompt</span>
        </button>
      </form>

      {generatedPrompt && (
        <section className="rounded-card bg-paper-2 border border-rule p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-sm font-medium text-ink">
              Generated Refactoring Prompt
            </h2>
            <button
              type="button"
              onClick={handleCopy}
              className="h-8 px-3 rounded-pill bg-paper-3 border border-rule hover:border-rule-2 text-xs text-ink inline-flex items-center gap-1.5"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-cool" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted" />
              )}
              <span>{copied ? "Copied" : "Copy prompt"}</span>
            </button>
          </div>
          <pre className="max-h-80 overflow-y-auto rounded-card bg-paper-3 border border-rule p-4 font-mono text-xs text-ink whitespace-pre-wrap select-all">
            {generatedPrompt}
          </pre>
        </section>
      )}
    </div>
  );
}
