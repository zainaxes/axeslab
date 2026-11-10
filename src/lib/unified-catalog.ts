import generatedPromptsData from "./generated-prompts.json";
import { ALL_REAL_PROMPTS, PromptField, RealPromptItem, RightsStatus } from "./real-prompts";
import { getProxiedMediaUrl } from "./video-utils";

export type CatalogOrigin = "web-library" | "motion-registry";

export type ResourceKindGroup =
  | "all"
  | "website-ui"
  | "motion"
  | "sections"
  | "3d"
  | "apps"
  | "backgrounds"
  | "skills";

export interface UnifiedCatalogItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  origin: CatalogOrigin;
  routeCollection: string;
  resourceTypeLabel: string;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategories: string[];
  posterUrl: string;
  videoUrl: string;
  width?: number;
  height?: number;
  author: string;
  handle: string;
  source: string;
  sourceUrl?: string;
  skillRepo?: string;
  skillCommand?: string;
  skillDescription?: string;
  model?: string;
  llmTarget?: string;
  effort?: string;
  date?: string;
  createdAt?: string;
  rightsStatus: RightsStatus;
  license: string;
  rightsNote?: string;
  isSkill: boolean;
  hasCustomize: boolean;
  customizerType?: "field_replacement" | "additional_block";
  originalPrompt: string;
  improvedPrompt?: string;
  template?: string;
  fields?: PromptField[];
  chars: number;
  tokens: number;
  tags: string[];
  isSection: boolean;
  is3D: boolean;
  isApp: boolean;
  isBackground: boolean;
  detailHref: string;
}

interface RawGeneratedPrompt {
  id: string;
  slug: string;
  title: string;
  route_collection?: string;
  category: string;
  categorySlug: string;
  subcategories?: string[];
  type?: string;
  page_type?: string;
  likes_count?: number;
  is_free?: boolean;
  preview_video_url?: string;
  preview_poster_url?: string;
  summary?: string;
  chars?: number;
  tier?: string;
  raw_prompt_original: string;
  prompt_axes_lab?: string;
  source?: string;
  created_at?: string;
}

const SECTION_CATEGORIES = new Set([
  "Hero Section",
  "Pricing",
  "Features",
  "Marquee",
  "Footer Section",
  "Contact us",
  "Signup",
  "Sign in",
  "Waitlist",
  "404",
]);

function mapGeneratedItem(raw: RawGeneratedPrompt): UnifiedCatalogItem {
  const promptText = raw.raw_prompt_original || "";
  const routeCol = raw.route_collection || "web-design";
  const category = raw.category || "Web Design";
  const categorySlug = raw.categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const subcategories = raw.subcategories?.length ? raw.subcategories : [category];
  const lowerTitle = raw.title.toLowerCase();
  const lowerCat = category.toLowerCase();
  const lowerSummary = (raw.summary || "").toLowerCase();

  const isSection = routeCol === "sections" || SECTION_CATEGORIES.has(category);
  const is3D =
    routeCol === "3d-websites" ||
    lowerCat.includes("3d") ||
    lowerTitle.includes("3d") ||
    lowerTitle.includes("webgl") ||
    lowerTitle.includes("spline");
  const isApp =
    routeCol === "apps" ||
    lowerCat.includes("app") ||
    lowerCat.includes("dashboard") ||
    lowerTitle.includes("dashboard");
  const isBackground =
    lowerCat.includes("background") ||
    lowerTitle.includes("background") ||
    lowerTitle.includes("shader") ||
    lowerSummary.includes("background");

  let resourceTypeLabel = "Website Prompt";
  if (is3D) resourceTypeLabel = "3D Website";
  else if (isSection) resourceTypeLabel = "UI Section";
  else if (isApp) resourceTypeLabel = "App Interface";

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary || `${raw.title} — ${category}`,
    origin: "web-library",
    routeCollection: routeCol,
    resourceTypeLabel,
    category,
    categorySlug,
    subcategory: subcategories[0] || category,
    subcategories,
    posterUrl: getProxiedMediaUrl(raw.preview_poster_url || ""),
    videoUrl: getProxiedMediaUrl(raw.preview_video_url || ""),
    author: "Axes Lab",
    handle: "axeslab",
    source: raw.source || "Axes Lab Curated",
    rightsStatus: "host_allowed",
    license: "MIT",
    isSkill: false,
    // Non-customizable website prompts use the "Show and copy the prompt" action
    hasCustomize: false,
    originalPrompt: promptText,
    chars: raw.chars || promptText.length,
    tokens: Math.max(1, Math.round((raw.chars || promptText.length) / 4)),
    tags: Array.from(new Set([category, ...subcategories])),
    createdAt: raw.created_at,
    date: raw.created_at ? raw.created_at.slice(0, 10) : undefined,
    isSection,
    is3D,
    isApp,
    isBackground,
    detailHref: `/resource/${raw.slug}`,
  };
}

function mapRealPromptItem(raw: RealPromptItem): UnifiedCatalogItem {
  const promptText = raw.originalPrompt || raw.contentBody || "";
  const subs = raw.subcategories?.length ? raw.subcategories : [raw.subcategory];
  const lowerTitle = raw.title.toLowerCase();
  const lowerCat = raw.category.toLowerCase();
  const lowerSub = (raw.subcategory || "").toLowerCase();
  const lowerSummary = (raw.summary || "").toLowerCase();
  const lowerBody = promptText.toLowerCase();
  const lowerSubs = subs.map((s) => s.toLowerCase());

  const isSkill = Boolean(raw.isSkill || raw.category === "Skills");
  const isSection =
    !isSkill &&
    (lowerTitle.includes("hero") ||
      lowerTitle.includes("pricing") ||
      lowerTitle.includes("section") ||
      lowerSummary.includes("hero") ||
      lowerSummary.includes("pricing") ||
      lowerSummary.includes("section"));
  const is3D =
    !isSkill &&
    (lowerCat.includes("3d") ||
      lowerTitle.includes("3d") ||
      lowerTitle.includes("spline") ||
      lowerTitle.includes("webgl") ||
      lowerTitle.includes("canvas") ||
      lowerSummary.includes("3d") ||
      lowerSummary.includes("webgl") ||
      lowerSummary.includes("spline") ||
      lowerBody.includes("three.js") ||
      lowerBody.includes("webgl") ||
      lowerBody.includes("spline"));
  const isApp =
    raw.category !== "Motion Ads" &&
    (lowerSub === "product ui" ||
      lowerSubs.includes("product ui") ||
      lowerSubs.includes("phone") ||
      lowerSubs.includes("code") ||
      isSkill);
  const isBackground =
    lowerSub === "particles" ||
    lowerSub === "shapes" ||
    lowerSubs.includes("particles") ||
    lowerSubs.includes("shapes") ||
    lowerSubs.includes("background") ||
    lowerSubs.includes("shader") ||
    lowerTitle.includes("background") ||
    lowerTitle.includes("shader") ||
    lowerTitle.includes("canvas") ||
    lowerTitle.includes("particle") ||
    lowerTitle.includes("gradient") ||
    lowerSummary.includes("background") ||
    lowerSummary.includes("shader") ||
    lowerSummary.includes("particle");

  let resourceTypeLabel = "Motion Graphics";
  if (isSkill) resourceTypeLabel = "Agent Skill";
  else if (raw.category === "Website Prompts") resourceTypeLabel = "Interactive Site";

  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    origin: "motion-registry",
    routeCollection: raw.categorySlug,
    resourceTypeLabel,
    category: raw.category,
    categorySlug: raw.categorySlug,
    subcategory: raw.subcategory,
    subcategories: subs,
    posterUrl: getProxiedMediaUrl(raw.poster || ""),
    videoUrl: getProxiedMediaUrl(raw.preview || raw.video || ""),
    width: raw.width,
    height: raw.height,
    author: raw.author,
    handle: raw.handle,
    source: isSkill ? "Open Source Skill" : `@${raw.handle}`,
    sourceUrl: raw.sourceUrl,
    skillRepo: raw.skillRepo,
    skillCommand: raw.skillCommand,
    skillDescription: raw.skillDescription,
    model: raw.model,
    llmTarget: raw.llmTarget,
    effort: raw.effort,
    date: raw.date,
    createdAt: raw.date ? `${raw.date}T00:00:00.000Z` : undefined,
    rightsStatus: raw.rightsStatus,
    license: raw.license,
    rightsNote: raw.rightsNote,
    isSkill,
    hasCustomize: Boolean(raw.hasCustomize),
    customizerType: raw.customizerType,
    originalPrompt: promptText,
    improvedPrompt: raw.improvedPrompt,
    template: raw.template,
    fields: raw.fields,
    chars: promptText.length,
    tokens: raw.tokens || Math.max(1, Math.round(promptText.length / 4)),
    tags: raw.tags || subs,
    isSection,
    is3D,
    isApp,
    isBackground,
    detailHref: `/resource/${raw.slug}`,
  };
}

const WEB_LIBRARY_ITEMS: UnifiedCatalogItem[] = (
  generatedPromptsData as RawGeneratedPrompt[]
).map(mapGeneratedItem);

const MOTION_REGISTRY_ITEMS: UnifiedCatalogItem[] =
  ALL_REAL_PROMPTS.map(mapRealPromptItem);

// Interleave featured web UI and motion items naturally for a balanced initial discovery grid while keeping deterministic order
function buildUnifiedCatalogue(): UnifiedCatalogItem[] {
  const merged: UnifiedCatalogItem[] = [];
  const maxLen = Math.max(WEB_LIBRARY_ITEMS.length, MOTION_REGISTRY_ITEMS.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < WEB_LIBRARY_ITEMS.length) merged.push(WEB_LIBRARY_ITEMS[i]);
    if (i < MOTION_REGISTRY_ITEMS.length) merged.push(MOTION_REGISTRY_ITEMS[i]);
  }
  return merged;
}

export const ALL_UNIFIED_ITEMS: UnifiedCatalogItem[] = buildUnifiedCatalogue();
export const UNIFIED_WEB_LIBRARY_ITEMS = WEB_LIBRARY_ITEMS;
export const UNIFIED_MOTION_ITEMS = MOTION_REGISTRY_ITEMS;

export function findUnifiedItemBySlug(slug: string): UnifiedCatalogItem | undefined {
  return ALL_UNIFIED_ITEMS.find((item) => item.slug === slug || item.id === slug);
}

export function findRealPromptBySlug(slug: string): RealPromptItem | undefined {
  return ALL_REAL_PROMPTS.find((p) => p.slug === slug || p.id === slug);
}

export const CATALOG_COUNTS = {
  total: ALL_UNIFIED_ITEMS.length, // 375
  websiteUi: WEB_LIBRARY_ITEMS.length, // 137
  motionTotal: MOTION_REGISTRY_ITEMS.filter((i) => !i.isSkill).length, // 232
  websiteMotion: MOTION_REGISTRY_ITEMS.filter((i) => i.category === "Website Prompts").length, // 127
  motionAds: MOTION_REGISTRY_ITEMS.filter((i) => i.category === "Motion Ads").length, // 105
  skills: MOTION_REGISTRY_ITEMS.filter((i) => i.isSkill).length, // 6
  sections: ALL_UNIFIED_ITEMS.filter((i) => i.isSection).length,
  threeD: ALL_UNIFIED_ITEMS.filter((i) => i.is3D).length,
  apps: ALL_UNIFIED_ITEMS.filter((i) => i.isApp).length,
  backgrounds: ALL_UNIFIED_ITEMS.filter((i) => i.isBackground).length,
};
