import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.canonical_url || !body.resource_type || !body.explanation) {
      return NextResponse.json(
        { error: "Missing required fields: canonical_url, resource_type, explanation" },
        { status: 400 }
      );
    }

    // Basic URL check
    try {
      new URL(body.canonical_url);
    } catch {
      return NextResponse.json(
        { error: "Invalid canonical source URL format." },
        { status: 400 }
      );
    }

    const res = createSubmission({
      canonical_url: body.canonical_url.trim(),
      resource_type: body.resource_type.trim(),
      suggested_category: body.suggested_category ? body.suggested_category.trim() : undefined,
      explanation: body.explanation.trim(),
      submitter_contact: body.submitter_contact ? body.submitter_contact.trim() : undefined,
    });

    return NextResponse.json(res);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
