import { expect, test } from "@playwright/test";

const unavailableThumbnailTitles = [
  'Black Lives Matter: The truth about the word "black"',
  "Moorish American: How to Nationalize, operate as a National, and Fundamental Principles of Law.",
];

test("header does not repeat the Videos navigation as a Watch videos button", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: /watch videos/i })).toHaveCount(
    0,
  );
  await expect(
    page
      .getByRole("navigation", { name: "Primary", exact: true })
      .getByRole("link", { name: "Videos", exact: true }),
  ).toBeVisible();
});

test("video search and filters update the visible static catalog", async ({
  page,
}) => {
  await page.goto("/videos");

  const cards = page.locator(".video-grid article");
  await expect(cards).toHaveCount(20);

  await page.getByLabel("Search videos").fill("adverse possession");
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(cards).not.toHaveCount(20);
  await expect(cards).not.toHaveCount(0);
  for (const card of await cards.all()) {
    await expect(card).toContainText(/adverse possession/i);
  }

  await page.getByRole("link", { name: "Clear" }).click();
  await expect(cards).toHaveCount(20);

  await page.getByLabel("Topic").selectOption("civic-context");
  await page.getByLabel("Level").selectOption({ label: "Developing" });
  await page.getByRole("button", { name: "Apply filters" }).click();
  await expect(cards).not.toHaveCount(20);
  await expect(cards).not.toHaveCount(0);
  for (const card of await cards.all()) {
    await expect(card).toHaveAttribute("data-topic", "civic-context");
    await expect(card).toHaveAttribute("data-level", "Developing");
  }
});

test("affected videos use real local thumbnail artwork instead of YouTube unavailable placeholders", async ({
  page,
}) => {
  await page.goto("/videos");

  for (const title of unavailableThumbnailTitles) {
    const thumbnail = page.getByAltText(`Thumbnail for ${title}`);
    await thumbnail.scrollIntoViewIfNeeded();
    await expect(thumbnail).toBeVisible();
    await expect
      .poll(async () =>
        decodeURIComponent((await thumbnail.getAttribute("src")) ?? ""),
      )
      .toContain("/video-thumbnails/");
    await expect
      .poll(() => thumbnail.evaluate((image) => image.naturalWidth))
      .toBeGreaterThan(0);
  }
});
