import { expect, test } from "@playwright/test";
import { officialYoutubeVideos } from "../apps/web/src/lib/content/official-youtube";

const videosWithLocalThumbnails = new Set(["O6y-G0E_R-E", "_h51g_HsZHM"]);

test("the video library links every official catalog entry", async ({
  page,
}) => {
  await page.goto("/videos");

  for (const video of officialYoutubeVideos) {
    const thumbnails = page.getByAltText(`Thumbnail for ${video.title}`);
    expect(await thumbnails.count()).toBeGreaterThanOrEqual(1);
    for (const thumbnail of await thumbnails.all()) {
      await thumbnail.scrollIntoViewIfNeeded();
      await expect(thumbnail).toBeVisible();
      await expect
        .poll(async () => {
          const src = await thumbnail.getAttribute("src");
          return src ? decodeURIComponent(src) : "";
        })
        .toMatch(
          videosWithLocalThumbnails.has(video.id)
            ? new RegExp(`/video-thumbnails/${video.id}\\.jpg`)
            : new RegExp(`/vi/${video.id}/(?:maxresdefault|hqdefault)\\.jpg`),
        );
      await expect
        .poll(() => thumbnail.evaluate((image) => image.naturalWidth))
        .toBeGreaterThan(0);
    }
    await expect(
      page.getByRole("link", { name: video.title }).first(),
    ).toHaveAttribute("href", `/videos/${video.slug}`);
  }
});

for (const video of officialYoutubeVideos) {
  test(`${video.id} is wired to its official source and transcript evidence`, async ({
    page,
  }) => {
    await page.goto(`/videos/${video.slug}`);
    await expect(
      page.getByRole("heading", { level: 1, name: video.title }),
    ).toBeVisible();
    const player = page.getByTitle(`Play ${video.title}`);
    await expect(player).toBeVisible();
    await expect(player).toHaveAttribute(
      "src",
      new RegExp(`/embed/${video.id}\\?rel=0$`),
    );
    await expect(page.locator(".transcript > p")).toHaveCount(3);

    for (const evidence of video.transcriptEvidence ?? []) {
      await expect(
        page.locator(".transcript > p", {
          hasText: `${evidence.timestamp}${evidence.text}`,
        }),
      ).toBeVisible();
    }
  });
}

test("primary and footer navigation contain no dead internal links", async ({
  page,
  request,
}) => {
  await page.goto("/");
  const hrefs = await page
    .locator("header a[href], footer a[href]")
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href): href is string => Boolean(href?.startsWith("/"))),
    );

  for (const href of new Set(hrefs)) {
    const response = await request.get(href);
    expect(response.status(), href).toBeLessThan(400);
  }
});
