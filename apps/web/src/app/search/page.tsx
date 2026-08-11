import type { Metadata } from "next";
import { SearchPage } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Moorish Lighthouse lessons, articles, videos, and resources.",
};

export default async function SiteSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <SearchPage query={params.q ?? ""} />;
}
