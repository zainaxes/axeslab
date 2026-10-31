import ResourceDetailPage, { generateMetadata as baseGenerateMetadata } from "@/app/resource/[slug]/page";

export const dynamic = "force-dynamic";

interface NestedResourceProps {
  params: Promise<{
    category: string;
    subcategory: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: NestedResourceProps) {
  const { slug } = await params;
  return baseGenerateMetadata({ params: Promise.resolve({ slug }) });
}

export default async function NestedResourceDetailPage({ params }: NestedResourceProps) {
  const { slug } = await params;
  return ResourceDetailPage({ params: Promise.resolve({ slug }) });
}
