import { expect, test } from "@playwright/test";
import { officialYoutubeVideos } from "../apps/web/src/lib/content/official-youtube";

test("the video library links every official catalog entry", async ({
  page,
}) => {
  await page.goto("/videos");

  for (const video of officialYoutubeVideos) {
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
    await expect(
      page.getByRole("link", { name: "Open the attributed official channel" }),
    ).toHaveAttribute("href", video.youtubeUrl);
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
