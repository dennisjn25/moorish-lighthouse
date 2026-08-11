import type { Metadata } from "next";
import { ShopCatalog } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse clearly described Moorish Lighthouse educational resources.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  return <ShopCatalog type={params.type ?? ""} />;
}
