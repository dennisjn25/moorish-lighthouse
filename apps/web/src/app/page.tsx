import { HomePage } from "@/components/home-page";
import { getCatalog } from "@/lib/content/repository";

export default async function Home() {
  const catalog = await getCatalog();
  return <HomePage catalog={catalog} />;
}
