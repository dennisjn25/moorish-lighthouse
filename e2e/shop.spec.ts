import { expect, test } from "@playwright/test";
import { previewCatalog } from "../apps/web/src/lib/content/fixtures";

const products = previewCatalog.products;

test("the primary, mobile, and footer navigation expose Shop", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Shop" }),
  ).toHaveAttribute("href", "/shop");
  await expect(
    page.locator(
      '.mobile-navigation nav[aria-label="Mobile primary"] a[href="/shop"]',
    ),
  ).toHaveAttribute("href", "/shop");
  await expect(
    page
      .getByRole("navigation", { name: "Explore links" })
      .getByRole("link", { name: "Shop" }),
  ).toHaveAttribute("href", "/shop");
});

test("the shop lists the four approved products and services", async ({
  page,
}) => {
  await page.goto("/shop");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Products and services for the next step.",
    }),
  ).toBeVisible();

  for (const product of products) {
    await expect(
      page.getByRole("heading", { name: product.title }),
    ).toBeVisible();
    await expect(
      page.locator(`a[href="/shop/${product.slug}"]`, {
        hasText: "View details",
      }),
    ).toBeVisible();
  }
  await expect(page.getByText("Price pending")).toHaveCount(4);
});

for (const product of products) {
  test(`${product.title} has a truthful detail page`, async ({ page }) => {
    await page.goto(`/shop/${product.slug}`);
    await expect(
      page.getByRole("heading", { level: 1, name: product.title }),
    ).toBeVisible();
    await expect(page.getByText("Not supplied in preview")).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ask about availability" }),
    ).toHaveAttribute("href", "/contact");
    await expect(
      page.getByText(/checkout is not connected yet/i),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: /buy|purchase|checkout/i }),
    ).toHaveCount(0);
  });
}
