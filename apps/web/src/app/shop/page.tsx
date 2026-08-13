import type { Metadata } from "next";
import { ShopCatalog } from "@/components/content-hubs";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse clearly described Moorish Lighthouse educational resources.",
};

export default function ShopPage() {
  return <ShopCatalog />;
}
