import type { Metadata } from "next";
import { ArticlesIndex } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Articles",
  description: "Read sourced Moorish Lighthouse articles and explainers.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; topic?: string }>;
}) {
  const params = await searchParams;
  return <ArticlesIndex query={params.q ?? ""} topic={params.topic ?? ""} />;
}
