import type { Metadata } from "next";
import { SearchPage } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Search",
  description:
    "Search Moorish Lighthouse lessons, articles, videos, and resources.",
};

export default function SiteSearchPage() {
  return <SearchPage />;
}
