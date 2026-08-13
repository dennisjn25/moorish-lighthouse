import { publicAsset } from "@/lib/public-asset";

describe("publicAsset", () => {
  it("prefixes root public assets with the GitHub Pages repository path", () => {
    expect(
      publicAsset("/premium-lighthouse-hero.png", "/moorish-lighthouse"),
    ).toBe("/moorish-lighthouse/premium-lighthouse-hero.png");
  });

  it("keeps local public assets rooted at the site origin", () => {
    expect(publicAsset("/moorish-lighthouse-logo.jpg", "")).toBe(
      "/moorish-lighthouse-logo.jpg",
    );
  });
});
