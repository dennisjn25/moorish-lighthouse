const { chromium, devices } = require("@playwright/test");
const { mkdirSync } = require("node:fs");

const artifactDirectory = "artifacts/verification";
const baseUrl = process.env.MOORISH_PREVIEW_URL ?? "http://127.0.0.1:3011";
mkdirSync(artifactDirectory, { recursive: true });

(async () => {
  for (const [name, contextOptions] of [
    ["desktop", { viewport: { width: 1440, height: 1000 } }],
    ["phone", devices["iPhone 14"]],
  ]) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    await page.goto(`${baseUrl}/videos`, {
      waitUntil: "networkidle",
    });
    const thumbnails = page.locator(".video-facade__image");
    for (const thumbnail of await thumbnails.all()) {
      await thumbnail.scrollIntoViewIfNeeded();
      await page.waitForFunction(
        (image) => image.naturalWidth > 0,
        await thumbnail.elementHandle(),
      );
    }
    const result = await thumbnails.evaluateAll((images) => ({
      rendered: images.length,
      loaded: images.filter((image) => image.naturalWidth > 0).length,
      uniqueVideoIds: new Set(
        images.map(
          (image) =>
            decodeURIComponent(image.currentSrc).match(/\/vi\/([^/]+)/)?.[1],
        ),
      ).size,
      fallbackCount: images.filter((image) =>
        decodeURIComponent(image.currentSrc).includes("hqdefault.jpg"),
      ).length,
      genericProjectorCount: images.filter((image) =>
        image.alt.toLowerCase().includes("projector"),
      ).length,
    }));
    await page.locator(".archive-section").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: `${artifactDirectory}/video-thumbnails-${name}.png`,
      fullPage: false,
    });
    console.log(JSON.stringify({ name, ...result }));
    await browser.close();
  }
})();
