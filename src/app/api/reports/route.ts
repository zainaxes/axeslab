import { NextRequest, NextResponse } from "next/server";
import { createReport } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.report_type || !body.explanation) {
      return NextResponse.json(
        { error: "Missing required fields: report_type, explanation" },
        { status: 400 }
      );
    }

    const res = createReport({
      resource_id: body.resource_id ? body.resource_id.trim() : undefined,
      report_type: body.report_type.trim(),
      explanation: body.explanation.trim(),
      reporter_contact: body.reporter_contact ? body.reporter_contact.trim() : undefined,
    });

    return NextResponse.json(res);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
