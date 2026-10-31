import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getDb } from "@/lib/db";

const MAPPINGS_PATH = path.join(process.cwd(), "data", "video_mappings.json");

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!fs.existsSync(MAPPINGS_PATH)) {
      return NextResponse.json({ mappings: {} });
    }

    const data = JSON.parse(fs.readFileSync(MAPPINGS_PATH, "utf8"));

    if (slug) {
      return NextResponse.json({ slug, video: data[slug] || "" });
    }

    return NextResponse.json({ mappings: data, total: Object.keys(data).length });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read video mappings", details: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, videoUrl } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Valid 'slug' is required" },
        { status: 400 }
      );
    }

    let mappings: Record<string, string> = {};
    if (fs.existsSync(MAPPINGS_PATH)) {
      try {
        mappings = JSON.parse(fs.readFileSync(MAPPINGS_PATH, "utf8"));
      } catch {
        mappings = {};
      }
    }

    // Set or remove
    mappings[slug] = typeof videoUrl === "string" ? videoUrl.trim() : "";
    fs.writeFileSync(MAPPINGS_PATH, JSON.stringify(mappings, null, 2), "utf8");

    // Also update SQLite metadata_json if resource exists
    try {
      const db = getDb();
      const row = db.prepare("SELECT metadata_json FROM resources WHERE slug = ?").get(slug) as
        | { metadata_json: string }
        | undefined;
      if (row) {
        const meta = row.metadata_json ? JSON.parse(row.metadata_json) : {};
        meta.youtube_video_id = mappings[slug];
        meta.custom_video_url = mappings[slug];
        db.prepare(
          "UPDATE resources SET metadata_json = ?, updated_at = ? WHERE slug = ?"
        ).run(JSON.stringify(meta), new Date().toISOString(), slug);
      }
    } catch (dbErr) {
      console.warn("Could not sync to SQLite immediately:", dbErr);
    }

    return NextResponse.json({
      success: true,
      slug,
      video: mappings[slug],
      message: `Video mapping for ${slug} updated successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update video mapping", details: String(error) },
      { status: 500 }
    );
  }
}
