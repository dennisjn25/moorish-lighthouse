import type { Metadata } from "next";
import { ArticleDetail } from "@/components/content-details";
import { getArticle, getCatalog } from "@/lib/content/repository";

export async function generateStaticParams() {
  return (await getCatalog()).articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getArticle(slug);
  return { title: item?.title ?? "Article", description: item?.dek };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ArticleDetail slug={slug} />;
}
