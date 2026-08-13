import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage shell renders without detectable accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Education for ownership, civics, and nationality.",
    }),
  ).toBeVisible();

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test("skip link and mobile navigation work from the keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to main content" });
  await expect(skipLink).toBeFocused();
  await skipLink.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();

  const menu = page.getByText("Menu", { exact: true });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile primary" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Mobile primary" }).getByRole("link", {
      name: "Articles",
    }),
  ).toBeVisible();
});

test("reduced motion removes meaningful transition duration", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const duration = await page
    .getByRole("link", { name: "Watch videos", exact: true })
    .first()
    .evaluate((element) => getComputedStyle(element).transitionDuration);

  expect(Number.parseFloat(duration)).toBeLessThanOrEqual(0.00001);
});

const viewports = [
  { height: 812, name: "375", width: 375 },
  { height: 1024, name: "768", width: 768 },
  { height: 900, name: "1024", width: 1024 },
  { height: 1000, name: "1440", width: 1440 },
] as const;

for (const viewport of viewports) {
  test(`homepage has no horizontal overflow at ${viewport.name}px`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Education for ownership, civics, and nationality.",
      }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    await page.screenshot({
      caret: "initial",
      fullPage: true,
      path: `artifacts/task-2-screenshots/home-${viewport.name}.png`,
      style: "nextjs-portal { display: none !important; }",
    });
  });
}
