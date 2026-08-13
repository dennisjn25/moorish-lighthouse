const { chromium } = require("playwright");
const path = require("node:path");

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3011";
const outputDir = path.resolve(__dirname, "../artifacts/verification");

async function capture(page, name, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.screenshot({
    fullPage: true,
    path: path.join(outputDir, `${name}.png`),
  });

  return page.evaluate(() => {
    const hero = document.querySelector(".premium-hero");
    const title = document.querySelector(".premium-hero h1");
    const media = document.querySelector(".premium-hero__media");
    const image = document.querySelector(".premium-hero__media img");
    const rect = (element) => {
      const bounds = element.getBoundingClientRect();
      return {
        bottom: Math.round(bounds.bottom),
        height: Math.round(bounds.height),
        left: Math.round(bounds.left),
        right: Math.round(bounds.right),
        top: Math.round(bounds.top),
        width: Math.round(bounds.width),
      };
    };

    return {
      hero: rect(hero),
      image: rect(image),
      media: rect(media),
      objectFit: getComputedStyle(image).objectFit,
      objectPosition: getComputedStyle(image).objectPosition,
      title: rect(title),
      titleFontSize: getComputedStyle(title).fontSize,
      viewport: { height: innerHeight, width: innerWidth },
    };
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const desktop = await capture(page, "home-scale-desktop", {
    height: 1000,
    width: 1440,
  });
  const phone = await capture(page, "home-scale-phone", {
    height: 844,
    width: 390,
  });
  console.log(JSON.stringify({ desktop, phone }, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
