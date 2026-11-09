// Universal Prompt Customization Engine for Axes Lab
// Strict source fidelity with Prompt Motion engine architecture

export interface DialStop {
  label: string;
  line: string;
}

export interface DialConfig {
  label: string;
  section: "direction" | "build";
  stops: DialStop[];
}

export type DialsState = {
  creativity: number;
  pace: number;
  polish: number;
};

export const DEFAULT_DIALS: DialsState = {
  creativity: 2,
  pace: 2,
  polish: 2,
};

export const DIAL_KEYS: Array<keyof DialsState> = ["creativity", "pace", "polish"];

export const DIALS: Record<keyof DialsState, DialConfig> = {
  creativity: {
    label: "Creativity",
    section: "direction",
    stops: [
      {
        label: "Safe",
        line: "Play it safe: choose the clearest, most conventional version of every idea, with familiar layouts and transitions and nothing that could read as a mistake.",
      },
      {
        label: "Restrained",
        line: "Keep it restrained: a simple concept with refined execution, one signature moment and no experiments.",
      },
      {
        label: "Balanced",
        line: "",
      },
      {
        label: "Bold",
        line: "Be bold: choose a concept I wouldn't expect, and use at least two techniques you don't usually see in AI-made motion. Still follow every rule above.",
      },
      {
        label: "Wild",
        line: "Go wild: treat the brief as a starting point, with an unexpected concept, an unconventional structure and risks that might not work. Keep it readable and keep the banned list.",
      },
    ],
  },
  pace: {
    label: "Pace",
    section: "direction",
    stops: [
      {
        label: "Calm",
        line: "Keep the pace calm: slow, eased moves, key moments held for up to a full beat, and cuts only on bar lines.",
      },
      {
        label: "Relaxed",
        line: "Keep the pace unhurried: give each moment a little room, with changes on the beat rather than between beats.",
      },
      {
        label: "Balanced",
        line: "",
      },
      {
        label: "Brisk",
        line: "Keep the pace brisk: something changes on every half beat, and nothing holds longer than a beat.",
      },
      {
        label: "Frantic",
        line: "Make the pace frantic: cut and move on every half beat or faster, overlap the moves, and never let the frame rest, while keeping every idea readable.",
      },
    ],
  },
  polish: {
    label: "Polish",
    section: "build",
    stops: [
      {
        label: "Quick",
        line: "Work quickly: one pass. Storyboard briefly, build, render once, and skip the frame-by-frame review.",
      },
      {
        label: "Light",
        line: "Keep the review light: check a handful of key frames before the render and fix only what's clearly broken.",
      },
      {
        label: "Standard",
        line: "",
      },
      {
        label: "Thorough",
        line: "Be thorough: after the first render, watch it through, list everything that feels off (timing, spacing, readability), fix all of it and render again.",
      },
      {
        label: "Obsessive",
        line: "Be obsessive: render every bar as a still and review it, then watch the full video at half speed; fix every flaw, render again, and repeat until a fresh review finds nothing.",
      },
    ],
  },
};

export const FORMATS: Record<string, string> = {
  landscape: "1920x1080 (landscape)",
  vertical: "1080x1920 (vertical)",
  square: "1080x1080 (square)",
  portrait: "1080x1350 (portrait)",
};

export const SIZES = [
  { value: "1920x1080", label: "1920×1080 · Landscape 16:9" },
  { value: "1080x1920", label: "1080×1920 · Vertical 9:16" },
  { value: "1080x1080", label: "1080×1080 · Square 1:1" },
  { value: "1080x1350", label: "1080×1350 · Portrait 4:5" },
];

export interface DetailFieldConfig {
  key: string;
  label: string;
  line: string;
  hint: string;
  placeholder: string;
}

export const DETAIL_FIELDS: DetailFieldConfig[] = [
  {
    key: "about",
    label: "What it's for",
    line: "What it's for",
    hint: "Your product, topic or message.",
    placeholder: "A launch video for ZainAxes",
  },
  {
    key: "format",
    label: "Format",
    line: "Format",
    hint: "",
    placeholder: "As in the prompt",
  },
  {
    key: "length",
    label: "Length (seconds)",
    line: "Length",
    hint: "",
    placeholder: "As in the prompt",
  },
  {
    key: "colours",
    label: "Colours",
    line: "Colours",
    hint: "Names or hex codes.",
    placeholder: "#FF4F1F, cobalt blue, cream",
  },
  {
    key: "typeface",
    label: "Typeface",
    line: "Typeface",
    hint: "A Google Font works best.",
    placeholder: "Inter",
  },
  {
    key: "notes",
    label: "Anything else",
    line: "Also",
    hint: "Things to show, words to use, what to leave out.",
    placeholder: "Show the onboarding screen and end on our logo",
  },
];

export const DETAILS_STORAGE_KEY = "axeslab:customizer:details";
export const PM_DETAILS_STORAGE_KEY = "prompt-motion:details";

export function formatDetailValue(key: string, rawVal?: string): string | undefined {
  const r = rawVal?.trim();
  if (!r) return undefined;
  if (key === "format") return FORMATS[r] ?? r;
  if (key === "length" && /^\d+(\.\d+)?$/.test(r)) return `${r} seconds`;
  return r;
}

// Method B: Additional Customization Block builder
export function detailsBlock(
  values: Record<string, string>,
  dials: DialsState = DEFAULT_DIALS
): string {
  const lines: string[] = [];

  for (const field of DETAIL_FIELDS) {
    const formatted = formatDetailValue(field.key, values[field.key]);
    if (formatted) {
      lines.push(`- ${field.line}: ${formatted}`);
    }
  }

  for (const k of DIAL_KEYS) {
    const stopIdx = dials[k];
    const dialLine = DIALS[k].stops[stopIdx]?.line;
    if (dialLine) {
      lines.push(`- ${DIALS[k].label}: ${dialLine}`);
    }
  }

  if (lines.length === 0) return "";
  return [
    "My details. Use them with the prompt above; where they differ from it, mine win:",
    ...lines,
  ].join("\n");
}

export function withDetails(
  originalPrompt: string,
  values: Record<string, string>,
  dials: DialsState = DEFAULT_DIALS
): string {
  const block = detailsBlock(values, dials);
  return block ? `${originalPrompt.trimEnd()}\n\n${block}` : originalPrompt;
}

// Method A: Template Token Replacement
export function fillTemplate(
  template: string,
  fields: Array<{ key: string; default?: string }>,
  values: Record<string, string> = {}
): string {
  const defaults = new Map(fields.map((f) => [f.key, f.default || ""]));
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const userVal = values[key]?.trim();
    if (userVal) return userVal;
    return defaults.get(key) || match;
  });
}

export function dialInserts(
  template: string,
  dials: DialsState
): Array<{ before: string; line: string }> {
  return DIAL_KEYS.flatMap((key) => {
    const stopIdx = dials[key];
    const line = DIALS[key].stops[stopIdx]?.line;
    if (!line) return [];

    const closingSection = `</${DIALS[key].section}>`;
    const before = template.includes(closingSection)
      ? closingSection
      : template.includes("</direction>")
      ? "</direction>"
      : "";

    return [{ before, line }];
  });
}

export function withDials(template: string, dials: DialsState): string {
  let result = template;
  for (const { before, line } of dialInserts(template, dials)) {
    result = before
      ? result.replace(before, `${line}\n${before}`)
      : `${result.trimEnd()}\n\n${line}`;
  }
  return result;
}

export function customizeTemplate(
  template: string,
  fields: Array<{ key: string; default?: string }>,
  values: Record<string, string> = {},
  dials: DialsState = DEFAULT_DIALS
): string {
  const filled = fillTemplate(template, fields, values);
  return withDials(filled, dials);
}
