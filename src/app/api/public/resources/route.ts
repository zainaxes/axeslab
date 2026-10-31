import { NextRequest, NextResponse } from "next/server";
import { getResources } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("query") || searchParams.get("q") || undefined;
    const categorySlug = searchParams.get("category") || undefined;
    const subcategorySlug = searchParams.get("subcategory") || undefined;
    const resourceType = searchParams.get("type") || undefined;
    const accessStatus = searchParams.get("access") || undefined;
    const distributionStatus = searchParams.get("distribution") || undefined;
    const verificationStatus = searchParams.get("verification") || undefined;
    const tag = searchParams.get("tag") || undefined;
    const sort = (searchParams.get("sort") as "recent" | "verified" | "title" | "featured") || "featured";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = Math.min(parseInt(searchParams.get("limit") || "24", 10), 100);

    const data = getResources({
      query,
      categorySlug,
      subcategorySlug,
      resourceType,
      accessStatus,
      distributionStatus,
      verificationStatus,
      tag,
      sort,
      page,
      limit,
    });

    return NextResponse.json(data);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
