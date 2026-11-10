"use client";

export const SAVED_PROMPTS_KEY = "axeslab_saved_prompts";
export const SAVED_RESOURCES_KEY = "axes_lab_saved_resources";

export interface SavedResourceEntry {
  id: string;
  slug: string;
  title?: string;
  resource_type?: string;
  summary?: string;
  saved_at?: string;
}

export function getSavedSlugOrIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  const result = new Set<string>();
  try {
    const rawPrompts = localStorage.getItem(SAVED_PROMPTS_KEY);
    if (rawPrompts) {
      const parsed = JSON.parse(rawPrompts);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (typeof item === "string") result.add(item);
        }
      }
    }
  } catch {}
  try {
    const rawResources = localStorage.getItem(SAVED_RESOURCES_KEY);
    if (rawResources) {
      const parsed = JSON.parse(rawResources);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item?.id) result.add(item.id);
          if (item?.slug) result.add(item.slug);
        }
      }
    }
  } catch {}
  return result;
}

export function isItemSaved(id: string, slug: string): boolean {
  const saved = getSavedSlugOrIds();
  return saved.has(id) || saved.has(slug);
}

export function toggleSavedItem(entry: SavedResourceEntry): boolean {
  if (typeof window === "undefined") return false;
  const currentlySaved = isItemSaved(entry.id, entry.slug);

  // Sync axeslab_saved_prompts (array of IDs/slugs)
  try {
    const raw = localStorage.getItem(SAVED_PROMPTS_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const nextList = currentlySaved
      ? list.filter((x) => x !== entry.id && x !== entry.slug)
      : Array.from(new Set([...list, entry.slug]));
    localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(nextList));
  } catch {}

  // Sync axes_lab_saved_resources (array of metadata objects)
  try {
    const raw = localStorage.getItem(SAVED_RESOURCES_KEY);
    const list: SavedResourceEntry[] = raw ? JSON.parse(raw) : [];
    const nextList = currentlySaved
      ? list.filter((x) => x.id !== entry.id && x.slug !== entry.slug)
      : [
          ...list.filter((x) => x.id !== entry.id && x.slug !== entry.slug),
          {
            id: entry.id,
            slug: entry.slug,
            title: entry.title,
            resource_type: entry.resource_type,
            summary: entry.summary,
            saved_at: new Date().toISOString(),
          },
        ];
    localStorage.setItem(SAVED_RESOURCES_KEY, JSON.stringify(nextList));
  } catch {}

  window.dispatchEvent(new Event("axeslab:saved-changed"));
  return !currentlySaved;
}
