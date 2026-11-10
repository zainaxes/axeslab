import { MetadataRoute } from "next";
import { getCategories, getCollections, getResources } from "@/lib/queries";
import { ALL_UNIFIED_ITEMS } from "@/lib/unified-catalog";
import { TEMPLATES } from "@/lib/templates-data";

export const dynamic = "force-dynamic";

const BASE_URL = "https://axeslab.zainaxes.com";

function parseValidDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00.000Z` : value;
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  const pushEntry = (
    path: string,
    options: {
      lastModified?: Date;
      changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
      priority?: number;
    } = {}
  ) => {
    const url = `${BASE_URL}${path}`;
    if (seenUrls.has(url)) return;
    seenUrls.add(url);
    entries.push({
      url,
      ...(options.lastModified ? { lastModified: options.lastModified } : {}),
      ...(options.changeFrequency ? { changeFrequency: options.changeFrequency } : {}),
      ...(options.priority !== undefined ? { priority: options.priority } : {}),
    });
  };

  // Core landing & directory routes
  const highPriorityRoutes: Array<[string, number]> = [
    ["", 1.0],
    ["/categories", 0.9],
    ["/web-design", 0.9],
    ["/prompts", 0.9],
    ["/sections", 0.85],
    ["/3d-websites", 0.85],
    ["/apps", 0.85],
    ["/backgrounds", 0.85],
    ["/skills", 0.85],
    ["/templates", 0.85],
    ["/customize", 0.85],
    ["/restyle", 0.8],
    ["/explore", 0.8],
    ["/collections", 0.8],
    ["/top", 0.8],
    ["/mcp", 0.8],
  ];

  for (const [route, priority] of highPriorityRoutes) {
    pushEntry(route, { changeFrequency: "daily", priority });
  }

  // Editorial, governance, community, and legal pages
  const infoRoutes: Array<[string, number]> = [
    ["/about", 0.7],
    ["/methodology", 0.7],
    ["/licensing", 0.7],
    ["/safety-and-security", 0.7],
    ["/submit", 0.6],
    ["/contact", 0.6],
    ["/changelog", 0.6],
    ["/privacy", 0.5],
    ["/terms", 0.5],
  ];

  for (const [route, priority] of infoRoutes) {
    pushEntry(route, { changeFrequency: "weekly", priority });
  }

  // Templates & Template customizers
  for (const tpl of TEMPLATES) {
    pushEntry(`/templates/${tpl.slug}`, { changeFrequency: "weekly", priority: 0.75 });
    pushEntry(`/templates/${tpl.slug}/customize`, { changeFrequency: "weekly", priority: 0.7 });
  }

  // Curated Collections
  const collections = getCollections();
  for (const col of collections) {
    pushEntry(`/collections/${col.slug}`, {
      lastModified: parseValidDate(col.updated_at),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  // Non-empty DB Categories & Subcategories only (no empty index bloat)
  const categories = getCategories();
  const { resources } = getResources({ limit: 1000 });
  const catCounts = new Map<string, number>();
  const subCounts = new Map<string, number>();

  for (const res of resources) {
    if (res.primary_category_id) {
      catCounts.set(res.primary_category_id, (catCounts.get(res.primary_category_id) ?? 0) + 1);
    }
    if (res.subcategory_id) {
      subCounts.set(res.subcategory_id, (subCounts.get(res.subcategory_id) ?? 0) + 1);
    }
  }

  for (const cat of categories) {
    const hasDirectOrSub =
      (catCounts.get(cat.id) ?? 0) > 0 ||
      Boolean(cat.subcategories?.some((s) => (subCounts.get(s.id) ?? 0) > 0));

    if (!hasDirectOrSub) continue;

    pushEntry(`/${cat.slug}`, {
      changeFrequency: "daily",
      priority: 0.85,
    });

    if (cat.subcategories) {
      for (const sub of cat.subcategories) {
        if ((subCounts.get(sub.id) ?? 0) > 0) {
          pushEntry(`/${cat.slug}/${sub.slug}`, {
            changeFrequency: "weekly",
            priority: 0.75,
          });
        }
      }
    }
  }

  // All 375 unique resource detail pages + customizable workspace routes
  const resourceDateMap = new Map<string, Date | undefined>();
  for (const r of resources) {
    resourceDateMap.set(r.slug, parseValidDate(r.updated_at || r.created_at));
  }

  for (const item of ALL_UNIFIED_ITEMS) {
    const lastModified = resourceDateMap.get(item.slug) ?? parseValidDate(item.date);
    pushEntry(`/resource/${item.slug}`, {
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    if (item.hasCustomize && item.origin === "motion-registry") {
      pushEntry(`/customize/${item.slug}`, {
        lastModified,
        changeFrequency: "weekly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
