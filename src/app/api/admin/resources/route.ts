import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, notes } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const db = getDb();
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE resources
      SET status = ?, updated_at = ?
      WHERE id = ?
    `).run(status, now, id);

    // Record audit log
    const auditId = "aud_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
    db.prepare(`
      INSERT INTO admin_audit_log (id, admin_user, action, target_type, target_id, details_json, created_at)
      VALUES (?, 'admin@axeslab.internal', 'RESOURCE_STATUS_UPDATE', 'resource', ?, ?, ?)
    `).run(auditId, id, JSON.stringify({ status, notes: notes || null }), now);

    return NextResponse.json({ success: true, id, status });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
