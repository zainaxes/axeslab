import { getDb } from "./db";
import fs from "node:fs";
import path from "node:path";
import {
  Category,
  Resource,
  Collection,
  Submission,
  Report,
  AuditLogEntry,
  Source,
} from "@/types";

const MAPPINGS_PATH = path.join(process.cwd(), "data", "video_mappings.json");

function getLiveVideoMapping(slug: string): string | null {
  try {
    if (fs.existsSync(MAPPINGS_PATH)) {
      const data = JSON.parse(fs.readFileSync(MAPPINGS_PATH, "utf8"));
      if (data && typeof data[slug] === "string" && data[slug].trim().length > 0) {
        return data[slug].trim();
      }
    }
  } catch {
    // ignore
  }
  return null;
}

function attachMetadataAndVideo(resource: Resource) {
  try {
    resource.parsed_metadata = resource.metadata_json ? JSON.parse(resource.metadata_json) : {};
  } catch {
    resource.parsed_metadata = {};
  }

  // Check if live video_mappings.json has an override for this slug
  const overrideVideo = getLiveVideoMapping(resource.slug);
  if (overrideVideo && resource.parsed_metadata) {
    resource.parsed_metadata.youtube_video_id = overrideVideo;
    resource.parsed_metadata.custom_video_url = overrideVideo;
  }
}

function toPlain<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export interface ResourceFilterOptions {
  query?: string;
  categorySlug?: string;
  subcategorySlug?: string;
  resourceType?: string;
  accessStatus?: string;
  distributionStatus?: string;
  verificationStatus?: string;
  tag?: string;
  sort?: "recent" | "verified" | "title" | "featured";
  page?: number;
  limit?: number;
}

export function getCategories(): Category[] {
  const db = getDb();
  const parents = db
    .prepare(
      `SELECT * FROM categories WHERE parent_id IS NULL AND is_active = 1 ORDER BY sort_order ASC, name ASC`
    )
    .all() as unknown as Category[];

  for (const parent of parents) {
    const subcats = db
      .prepare(
        `SELECT * FROM categories WHERE parent_id = ? AND is_active = 1 ORDER BY sort_order ASC, name ASC`
      )
      .all(parent.id) as unknown as Category[];

    // Compute resource counts for each subcategory and parent
    for (const sub of subcats) {
      const countRes = db
        .prepare(
          `SELECT COUNT(*) as count FROM resources WHERE subcategory_id = ? AND status = 'published'`
        )
        .get(sub.id) as { count: number };
      sub.resource_count = countRes.count;
    }

    const parentCountRes = db
      .prepare(
        `SELECT COUNT(*) as count FROM resources WHERE primary_category_id = ? AND status = 'published'`
      )
      .get(parent.id) as { count: number };

    parent.resource_count = parentCountRes.count;
    parent.subcategories = subcats;
  }

  return toPlain(parents);
}

export function getCategoryBySlug(slug: string): Category | null {
  const db = getDb();
  const cat = db
    .prepare(`SELECT * FROM categories WHERE slug = ? AND is_active = 1`)
    .get(slug) as unknown as Category | undefined;

  if (!cat) return null;

  if (cat.parent_id === null) {
    const subcats = db
      .prepare(
        `SELECT * FROM categories WHERE parent_id = ? AND is_active = 1 ORDER BY sort_order ASC, name ASC`
      )
      .all(cat.id) as unknown as Category[];

    for (const sub of subcats) {
      const countRes = db
        .prepare(
          `SELECT COUNT(*) as count FROM resources WHERE subcategory_id = ? AND status = 'published'`
        )
        .get(sub.id) as { count: number };
      sub.resource_count = countRes.count;
    }
    cat.subcategories = subcats;
  }

  const countRes = db
    .prepare(
      cat.parent_id === null
        ? `SELECT COUNT(*) as count FROM resources WHERE primary_category_id = ? AND status = 'published'`
        : `SELECT COUNT(*) as count FROM resources WHERE subcategory_id = ? AND status = 'published'`
    )
    .get(cat.id) as { count: number };
  cat.resource_count = countRes.count;

  return toPlain(cat);
}

export function getResources(options: ResourceFilterOptions = {}) {
  const db = getDb();
  const {
    query,
    categorySlug,
    subcategorySlug,
    resourceType,
    accessStatus,
    distributionStatus,
    verificationStatus,
    tag,
    sort = "featured",
    page = 1,
    limit = 24,
  } = options;

  const conditions: string[] = ["r.status = 'published'"];
  const params: Array<string | number | null> = [];

  if (categorySlug) {
    conditions.push("c1.slug = ?");
    params.push(categorySlug);
  }

  if (subcategorySlug) {
    conditions.push("c2.slug = ?");
    params.push(subcategorySlug);
  }

  if (resourceType) {
    conditions.push("r.resource_type = ?");
    params.push(resourceType);
  }

  if (accessStatus) {
    conditions.push("r.access_status = ?");
    params.push(accessStatus);
  }

  if (distributionStatus) {
    conditions.push("r.distribution_status = ?");
    params.push(distributionStatus);
  }

  if (verificationStatus) {
    conditions.push("r.verification_status = ?");
    params.push(verificationStatus);
  }

  if (tag) {
    conditions.push(
      "r.id IN (SELECT rt.resource_id FROM resource_tags rt JOIN tags t ON rt.tag_id = t.id WHERE t.slug = ?)"
    );
    params.push(tag);
  }

  if (query && query.trim() !== "") {
    const term = `%${query.trim()}%`;
    conditions.push(
      "(r.title LIKE ? OR r.summary LIKE ? OR r.description LIKE ? OR r.author_or_publisher LIKE ? OR c1.name LIKE ? OR c2.name LIKE ?)"
    );
    params.push(term, term, term, term, term, term);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";

  // Count total matching
  const countSql = `
    SELECT COUNT(*) as total
    FROM resources r
    LEFT JOIN categories c1 ON r.primary_category_id = c1.id
    LEFT JOIN categories c2 ON r.subcategory_id = c2.id
    ${whereClause}
  `;
  const countRow = db.prepare(countSql).get(...params) as { total: number };
  const total = countRow.total;

  let orderBy = "r.is_featured DESC, r.created_at DESC";
  if (sort === "recent") {
    orderBy = "r.created_at DESC";
  } else if (sort === "verified") {
    orderBy = "r.last_checked_at DESC, r.created_at DESC";
  } else if (sort === "title") {
    orderBy = "r.title ASC";
  }

  const offset = (page - 1) * limit;
  const selectSql = `
    SELECT 
      r.*,
      c1.name as category_name,
      c1.slug as category_slug,
      c2.name as subcategory_name,
      c2.slug as subcategory_slug,
      s.name as source_name
    FROM resources r
    LEFT JOIN categories c1 ON r.primary_category_id = c1.id
    LEFT JOIN categories c2 ON r.subcategory_id = c2.id
    LEFT JOIN sources s ON r.canonical_source_id = s.id
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  const rows = db.prepare(selectSql).all(...params, limit, offset) as unknown as Resource[];

  // Attach tags and parse metadata
  for (const row of rows) {
    const tags = db
      .prepare(
        `SELECT t.name FROM tags t JOIN resource_tags rt ON t.id = rt.tag_id WHERE rt.resource_id = ?`
      )
      .all(row.id) as Array<{ name: string }>;
    row.tags = tags.map((t) => t.name);
    attachMetadataAndVideo(row);
  }

  return toPlain({
    resources: rows,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  });
}

export function getResourceBySlug(slug: string): Resource | null {
  const db = getDb();
  const selectSql = `
    SELECT 
      r.*,
      c1.name as category_name,
      c1.slug as category_slug,
      c2.name as subcategory_name,
      c2.slug as subcategory_slug,
      s.name as source_name
    FROM resources r
    LEFT JOIN categories c1 ON r.primary_category_id = c1.id
    LEFT JOIN categories c2 ON r.subcategory_id = c2.id
    LEFT JOIN sources s ON r.canonical_source_id = s.id
    WHERE r.slug = ?
  `;

  const row = db.prepare(selectSql).get(slug) as unknown as Resource | undefined;
  if (!row) return null;

  const tags = db
    .prepare(
      `SELECT t.name FROM tags t JOIN resource_tags rt ON t.id = rt.tag_id WHERE rt.resource_id = ?`
    )
    .all(row.id) as Array<{ name: string }>;
  row.tags = tags.map((t) => t.name);

  attachMetadataAndVideo(row);

  return toPlain(row);
}

export function getRelatedResources(resourceId: string, categoryId: string, subcategoryId?: string | null, limit = 4): Resource[] {
  const db = getDb();
  const params: Array<string | number | null> = [resourceId, categoryId];
  let subSql = "";
  if (subcategoryId) {
    subSql = "OR r.subcategory_id = ?";
    params.push(subcategoryId);
  }

  const sql = `
    SELECT 
      r.*,
      c1.name as category_name,
      c1.slug as category_slug,
      c2.name as subcategory_name,
      c2.slug as subcategory_slug
    FROM resources r
    LEFT JOIN categories c1 ON r.primary_category_id = c1.id
    LEFT JOIN categories c2 ON r.subcategory_id = c2.id
    WHERE r.id != ? AND r.status = 'published' AND (r.primary_category_id = ? ${subSql})
    ORDER BY r.is_featured DESC, r.created_at DESC
    LIMIT ?
  `;

  const rows = db.prepare(sql).all(...params, limit) as unknown as Resource[];
  for (const row of rows) {
    const tags = db
      .prepare(
        `SELECT t.name FROM tags t JOIN resource_tags rt ON t.id = rt.tag_id WHERE rt.resource_id = ?`
      )
      .all(row.id) as Array<{ name: string }>;
    row.tags = tags.map((t) => t.name);
    attachMetadataAndVideo(row);
  }
  return toPlain(rows);
}

export function getCollections(): Collection[] {
  const db = getDb();
  const collections = db
    .prepare(
      `SELECT * FROM collections ORDER BY sort_order ASC, created_at DESC`
    )
    .all() as unknown as Collection[];

  for (const col of collections) {
    const countRes = db
      .prepare(
        `SELECT COUNT(*) as count FROM collection_resources cr JOIN resources r ON cr.resource_id = r.id WHERE cr.collection_id = ? AND r.status = 'published'`
      )
      .get(col.id) as { count: number };
    col.resource_count = countRes.count;
  }

  return toPlain(collections);
}

export function getCollectionBySlug(slug: string): Collection | null {
  const db = getDb();
  const col = db
    .prepare(`SELECT * FROM collections WHERE slug = ?`)
    .get(slug) as unknown as Collection | undefined;

  if (!col) return null;

  const resources = db
    .prepare(
      `SELECT 
        r.*,
        c1.name as category_name,
        c1.slug as category_slug,
        c2.name as subcategory_name,
        c2.slug as subcategory_slug,
        cr.sort_order as col_sort_order,
        cr.editorial_note
      FROM collection_resources cr
      JOIN resources r ON cr.resource_id = r.id
      LEFT JOIN categories c1 ON r.primary_category_id = c1.id
      LEFT JOIN categories c2 ON r.subcategory_id = c2.id
      WHERE cr.collection_id = ? AND r.status = 'published'
      ORDER BY cr.sort_order ASC, r.created_at DESC`
    )
    .all(col.id) as unknown as Resource[];

  for (const row of resources) {
    const tags = db
      .prepare(
        `SELECT t.name FROM tags t JOIN resource_tags rt ON t.id = rt.tag_id WHERE rt.resource_id = ?`
      )
      .all(row.id) as Array<{ name: string }>;
    row.tags = tags.map((t) => t.name);
    try {
      row.parsed_metadata = row.metadata_json ? JSON.parse(row.metadata_json) : {};
    } catch {
      row.parsed_metadata = {};
    }
  }

  col.resources = resources;
  col.resource_count = resources.length;
  return toPlain(col);
}

export function getStats() {
  const db = getDb();
  const totalPublished = (
    db.prepare(`SELECT COUNT(*) as count FROM resources WHERE status = 'published'`).get() as { count: number }
  ).count;

  const totalVerified = (
    db.prepare(`SELECT COUNT(*) as count FROM resources WHERE status = 'published' AND verification_status = 'verified'`).get() as { count: number }
  ).count;

  const totalHosted = (
    db.prepare(`SELECT COUNT(*) as count FROM resources WHERE status = 'published' AND distribution_status = 'host_allowed'`).get() as { count: number }
  ).count;

  const typeCounts = db
    .prepare(
      `SELECT resource_type, COUNT(*) as count FROM resources WHERE status = 'published' GROUP BY resource_type ORDER BY count DESC`
    )
    .all() as Array<{ resource_type: string; count: number }>;

  return toPlain({
    totalPublished,
    totalVerified,
    totalHosted,
    typeCounts,
  });
}

export function createSubmission(data: {
  canonical_url: string;
  resource_type: string;
  suggested_category?: string;
  explanation: string;
  submitter_contact?: string;
}) {
  const db = getDb();
  const id = "sub_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO submissions (id, canonical_url, resource_type, suggested_category, explanation, submitter_contact, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, 'pending_review', ?)
  `).run(
    id,
    data.canonical_url,
    data.resource_type,
    data.suggested_category || null,
    data.explanation,
    data.submitter_contact || null,
    now
  );

  return { id, success: true };
}

export function createReport(data: {
  resource_id?: string;
  report_type: string;
  explanation: string;
  reporter_contact?: string;
}) {
  const db = getDb();
  const id = "rep_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
  const now = new Date().toISOString();

  db.prepare(`
    INSERT INTO reports (id, resource_id, report_type, explanation, reporter_contact, status, created_at)
    VALUES (?, ?, ?, ?, ?, 'pending', ?)
  `).run(
    id,
    data.resource_id || null,
    data.report_type,
    data.explanation,
    data.reporter_contact || null,
    now
  );

  return { id, success: true };
}

// Admin queries
export function getAdminResources() {
  const db = getDb();
  return db
    .prepare(
      `SELECT 
        r.*,
        c1.name as category_name,
        c2.name as subcategory_name
      FROM resources r
      LEFT JOIN categories c1 ON r.primary_category_id = c1.id
      LEFT JOIN categories c2 ON r.subcategory_id = c2.id
      ORDER BY r.updated_at DESC`
    )
    .all() as unknown as Resource[];
}

export function getAdminSubmissions() {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM submissions ORDER BY created_at DESC`)
    .all() as unknown as Submission[];
}

export function getAdminReports() {
  const db = getDb();
  return db
    .prepare(
      `SELECT rep.*, r.title as resource_title 
       FROM reports rep 
       LEFT JOIN resources r ON rep.resource_id = r.id 
       ORDER BY rep.created_at DESC`
    )
    .all() as unknown as Report[];
}

export function getAdminSources(): Source[] {
  const db = getDb();
  return db.prepare(`SELECT * FROM sources ORDER BY name ASC`).all() as unknown as Source[];
}

export function getAdminAuditLogs(): AuditLogEntry[] {
  const db = getDb();
  return db
    .prepare(`SELECT * FROM admin_audit_log ORDER BY created_at DESC LIMIT 100`)
    .all() as unknown as AuditLogEntry[];
}
