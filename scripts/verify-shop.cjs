const { chromium, devices } = require("@playwright/test");
const { mkdirSync } = require("node:fs");

const artifactDirectory = "artifacts/verification";
mkdirSync(artifactDirectory, { recursive: true });

(async () => {
  for (const [name, contextOptions] of [
    ["desktop", { viewport: { width: 1440, height: 1000 } }],
    ["phone", devices["iPhone 14"]],
  ]) {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3011/shop", { waitUntil: "networkidle" });
    if (name === "phone") {
      await page.getByText("Menu", { exact: true }).click();
      const shopLink = page
        .getByRole("navigation", { name: "Mobile primary" })
        .getByRole("link", { name: "Shop" });
      if (!(await shopLink.isVisible()))
        throw new Error("Mobile Shop link is not visible");
    }
    const titles = await page.locator(".product-list h2").allTextContents();
    const horizontalOverflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth,
    );
    if (titles.length !== 4)
      throw new Error(`Expected 4 offers, found ${titles.length}`);
    if (horizontalOverflow) throw new Error("Shop has horizontal overflow");
    await page.screenshot({
      path: `${artifactDirectory}/shop-${name}.png`,
      fullPage: true,
    });
    console.log(JSON.stringify({ name, titles, horizontalOverflow }));
    await browser.close();
  }
})();
