const { chromium } = require("playwright");

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3012";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { height: 844, width: 390 },
  });

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const header = document.querySelector(".site-header");
    const main = document.querySelector("#main-content");
    const initialHeader = header.getBoundingClientRect();
    const initialMain = main.getBoundingClientRect();
    const styles = getComputedStyle(header);

    window.scrollTo(0, 500);
    const scrolledHeader = header.getBoundingClientRect();

    return {
      backgroundColor: styles.backgroundColor,
      backdropFilter: styles.backdropFilter,
      headerHeight: initialHeader.height,
      initialHeaderTop: initialHeader.top,
      initialMainTop: initialMain.top,
      position: styles.position,
      scrolledHeaderTop: scrolledHeader.top,
    };
  });

  console.log(JSON.stringify(result, null, 2));
  await browser.close();

  const opaque =
    !result.backgroundColor.includes("rgba") ||
    !result.backgroundColor.endsWith(", 0)");
  const reserved = result.initialMainTop >= result.headerHeight;

  if (
    result.position !== "fixed" ||
    result.initialHeaderTop !== 0 ||
    result.scrolledHeaderTop !== 0 ||
    !opaque ||
    !reserved
  ) {
    process.exitCode = 1;
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
