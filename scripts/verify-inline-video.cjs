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
    const failedYoutubeResponses = [];
    page.on("response", (response) => {
      if (response.url().includes("youtube") && response.status() >= 400) {
        failedYoutubeResponses.push([response.status(), response.url()]);
      }
    });
    await page.goto(
      `${baseUrl}/videos/50-acres-of-land-claimed-using-adverse-possession`,
      { waitUntil: "networkidle" },
    );
    const playerBox = await page.locator(".video-player").boundingBox();
    const frame = page.frame({ url: /youtube-nocookie/ });
    const playVisible = frame
      ? await frame
          .getByRole("button", { name: /play video/i })
          .isVisible()
          .catch(() => false)
      : false;
    const horizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    console.log(
      JSON.stringify({
        name,
        playerBox,
        frameLoaded: Boolean(frame),
        playVisible,
        horizontalOverflow,
        failedYoutubeResponses,
      }),
    );
    await page.screenshot({
      path: `${artifactDirectory}/inline-video-${name}.png`,
      fullPage: false,
    });
    await browser.close();
  }
})();
