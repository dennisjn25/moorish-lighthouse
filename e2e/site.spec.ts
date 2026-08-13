import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routeFamilies = [
  ["Home", "/", "Education for ownership, civics, and nationality."],
  ["Learn", "/learn", "Build understanding in a clear sequence."],
  ["Topic", "/learn/foundations", "Nationality and identity"],
  [
    "Lesson",
    "/learn/foundations/begin-with-a-better-question",
    "How the channel frames nationality and identity",
  ],
  [
    "Articles",
    "/articles",
    "Read the channel’s core ideas with attribution intact.",
  ],
  [
    "Article",
    "/articles/build-a-source-trail",
    "Nationality, identity, and application in the official catalog",
  ],
  ["Videos", "/videos", "Watch with the context still attached."],
  [
    "Video",
    "/videos/the-truth-about-the-republican-party",
    "The Truth About The Republican Party",
  ],

  [
    "About",
    "/about",
    "An author and educator focused on ownership and civic knowledge.",
  ],
  ["Search", "/search?q=source", "Find a lesson, article, video, or resource."],
] as const;

for (const [family, route, heading] of routeFamilies) {
  test(`${family} page family renders with one clear page heading`, async ({
    page,
  }) => {
    await page.goto(route);
    await expect(
      page.getByRole("heading", { level: 1, name: heading }),
    ).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.getByText("Official-channel preview", { exact: true }),
    ).toBeVisible();
  });
}

test("filters expose shareable URLs and a useful empty state", async ({
  page,
}) => {
  await page.goto("/learn?level=Advanced&topic=foundations");
  await expect(
    page.getByRole("heading", { name: "No lessons match these filters." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /View every lesson/ }),
  ).toHaveAttribute("href", "/learn");
});

for (const route of [
  "/learn",
  "/articles/build-a-source-trail",
  "/videos/the-truth-about-the-republican-party",

  "/about",
]) {
  test(`${route} has no detectable axe violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, route).toEqual([]);
  });
}

const screenshotPages = [
  ["home", "/"],
  ["learn", "/learn"],
  ["articles", "/articles"],
  ["videos", "/videos"],

  ["about", "/about"],
] as const;

for (const [name, route] of screenshotPages) {
  for (const viewport of [
    { label: "mobile", width: 375, height: 812 },
    { label: "desktop", width: 1440, height: 1000 },
  ]) {
    test(`${name} visual evidence at ${viewport.label}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(async () => {
        await Promise.all([...document.images].map((image) => image.decode()));
      });
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
      await page.screenshot({
        caret: "initial",
        fullPage: true,
        path: `artifacts/task-3-site-screenshots/${name}-${viewport.label}.png`,
        style: "nextjs-portal { display: none !important; }",
      });
    });
  }
}
