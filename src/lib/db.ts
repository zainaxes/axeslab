import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";
import { seedDatabase } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "axes_lab.db");

let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!_db) {
    _db = new DatabaseSync(DB_PATH);
    // Enable WAL mode & foreign keys for high performance and integrity
    _db.exec("PRAGMA journal_mode = WAL;");
    _db.exec("PRAGMA foreign_keys = ON;");
    initSchema(_db);
    seedDatabase();
  }
  return _db;
}

function initSchema(db: DatabaseSync) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      parent_id TEXT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      icon_key TEXT,
      sort_order INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS sources (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      canonical_host TEXT NOT NULL,
      source_type TEXT NOT NULL,
      is_official INTEGER DEFAULT 0,
      terms_url TEXT,
      check_cadence_days INTEGER DEFAULT 14,
      last_checked_at TEXT,
      status TEXT DEFAULT 'active'
    );

    CREATE TABLE IF NOT EXISTS resources (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      description TEXT,
      resource_type TEXT NOT NULL,
      primary_category_id TEXT NOT NULL,
      subcategory_id TEXT,
      status TEXT DEFAULT 'published',
      canonical_source_id TEXT,
      canonical_url TEXT NOT NULL,
      source_path TEXT,
      author_or_publisher TEXT,
      upstream_repository TEXT,
      upstream_identifier TEXT,
      version_label TEXT,
      upstream_commit_or_release TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      published_at TEXT,
      source_updated_at TEXT,
      last_checked_at TEXT,
      verification_status TEXT DEFAULT 'verified',
      access_status TEXT NOT NULL,
      distribution_status TEXT NOT NULL,
      license_spdx_id TEXT,
      license_name TEXT NOT NULL,
      license_url TEXT,
      license_scope TEXT DEFAULT 'repository',
      license_verified_at TEXT,
      attribution_text TEXT,
      rights_notes TEXT,
      content_body TEXT,
      metadata_json TEXT DEFAULT '{}',
      seo_title TEXT,
      seo_description TEXT,
      is_featured INTEGER DEFAULT 0,
      FOREIGN KEY (primary_category_id) REFERENCES categories(id),
      FOREIGN KEY (subcategory_id) REFERENCES categories(id),
      FOREIGN KEY (canonical_source_id) REFERENCES sources(id)
    );

    CREATE TABLE IF NOT EXISTS tags (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      slug TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS resource_tags (
      resource_id TEXT NOT NULL,
      tag_id TEXT NOT NULL,
      PRIMARY KEY (resource_id, tag_id),
      FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS collections (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      rationale TEXT,
      editor_name TEXT DEFAULT 'Axes Lab Editorial',
      is_featured INTEGER DEFAULT 1,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS collection_resources (
      collection_id TEXT NOT NULL,
      resource_id TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      editorial_note TEXT,
      PRIMARY KEY (collection_id, resource_id),
      FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE,
      FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS submissions (
      id TEXT PRIMARY KEY,
      canonical_url TEXT NOT NULL,
      resource_type TEXT NOT NULL,
      suggested_category TEXT,
      explanation TEXT NOT NULL,
      submitter_contact TEXT,
      status TEXT DEFAULT 'pending_review',
      review_notes TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reports (
      id TEXT PRIMARY KEY,
      resource_id TEXT,
      report_type TEXT NOT NULL,
      explanation TEXT NOT NULL,
      reporter_contact TEXT,
      status TEXT DEFAULT 'pending',
      resolution_notes TEXT,
      created_at TEXT NOT NULL,
      FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS admin_audit_log (
      id TEXT PRIMARY KEY,
      admin_user TEXT NOT NULL,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT NOT NULL,
      details_json TEXT,
      created_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS idx_resources_slug ON resources(slug);
    CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(resource_type);
    CREATE INDEX IF NOT EXISTS idx_resources_status ON resources(status);
    CREATE INDEX IF NOT EXISTS idx_resources_cat ON resources(primary_category_id, subcategory_id);
    CREATE INDEX IF NOT EXISTS idx_resources_access ON resources(access_status);
    CREATE INDEX IF NOT EXISTS idx_resources_distribution ON resources(distribution_status);
  `);
}
