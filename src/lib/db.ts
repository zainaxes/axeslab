// Cloudflare & Node Universal Database Adapter
// Uses bundled JSON snapshot to eliminate binary/native 'node:sqlite' dependency during Cloudflare builds.

import snapshot from "../../data/db_snapshot.json";

interface QueryStatement {
  all(...params: any[]): any[];
  get(...params: any[]): any;
  run(...params: any[]): { changes: number; lastInsertRowid: number };
}

interface UniversalDb {
  prepare(sql: string): QueryStatement;
  exec(sql: string): void;
}

// In-memory data store initialized from snapshot
const dbData = {
  categories: [...snapshot.categories],
  sources: [...snapshot.sources],
  resources: [...snapshot.resources],
  tags: [...snapshot.tags],
  resource_tags: [...snapshot.resource_tags],
  collections: [...snapshot.collections],
  collection_resources: [...snapshot.collection_resources],
  submissions: [...snapshot.submissions],
  reports: [...snapshot.reports],
  admin_audit_log: [...snapshot.admin_audit_log],
};

function normalizeSql(sql: string): string {
  return sql.replace(/\s+/g, " ").trim().toLowerCase();
}

export function getDb(): UniversalDb {
  return {
    exec(_sql: string) {
      // Schema migrations are pre-baked in snapshot
    },
    prepare(sql: string): QueryStatement {
      const normalized = normalizeSql(sql);

      return {
        all(...params: any[]): any[] {
          // SELECT * FROM categories WHERE is_active = 1 ...
          if (normalized.includes("from categories")) {
            if (normalized.includes("parent_id is null")) {
              return dbData.categories.filter((c: any) => c.is_active && !c.parent_id);
            }
            if (normalized.includes("where parent_id = ?")) {
              const parentId = params[0];
              return dbData.categories.filter((c: any) => c.is_active && c.parent_id === parentId);
            }
            if (normalized.includes("where slug = ?")) {
              const slug = params[0];
              return dbData.categories.filter((c: any) => c.slug === slug);
            }
            return dbData.categories.filter((c: any) => c.is_active);
          }

          // SELECT * FROM sources
          if (normalized.includes("from sources")) {
            return dbData.sources;
          }

          // SELECT * FROM collections
          if (normalized.includes("from collections")) {
            return dbData.collections;
          }

          // SELECT * FROM resources
          if (normalized.includes("from resources")) {
            let res = dbData.resources.filter((r: any) => r.status === "published");
            return res;
          }

          // SELECT * FROM admin_audit_log
          if (normalized.includes("from admin_audit_log")) {
            return dbData.admin_audit_log.slice(0, params[0] || 50);
          }

          // SELECT * FROM submissions
          if (normalized.includes("from submissions")) {
            return dbData.submissions;
          }

          // SELECT * FROM reports
          if (normalized.includes("from reports")) {
            return dbData.reports;
          }

          // SELECT t.name FROM tags ...
          if (normalized.includes("from tags")) {
            return dbData.tags;
          }

          return [];
        },

        get(...params: any[]): any {
          // COUNT queries
          if (normalized.includes("select count(*)")) {
            if (normalized.includes("from resources")) {
              let count = dbData.resources.filter((r: any) => r.status === "published").length;
              if (normalized.includes("verification_status = 'verified'")) {
                count = dbData.resources.filter((r: any) => r.status === "published" && r.verification_status === "verified").length;
              } else if (normalized.includes("distribution_status = 'host_allowed'")) {
                count = dbData.resources.filter((r: any) => r.status === "published" && r.distribution_status === "host_allowed").length;
              }
              return { count, total: count };
            }
            return { count: 0, total: 0 };
          }

          // SELECT * FROM categories WHERE slug = ?
          if (normalized.includes("from categories") && normalized.includes("slug = ?")) {
            const slug = params[0];
            return dbData.categories.find((c: any) => c.slug === slug);
          }

          // SELECT * FROM resources WHERE slug = ?
          if (normalized.includes("from resources") && normalized.includes("slug = ?")) {
            const slug = params[0];
            return dbData.resources.find((r: any) => r.slug === slug);
          }

          // SELECT * FROM collections WHERE slug = ?
          if (normalized.includes("from collections") && normalized.includes("slug = ?")) {
            const slug = params[0];
            return dbData.collections.find((c: any) => c.slug === slug);
          }

          return undefined;
        },

        run(..._params: any[]): { changes: number; lastInsertRowid: number } {
          return { changes: 1, lastInsertRowid: Date.now() };
        },
      };
    },
  };
}
