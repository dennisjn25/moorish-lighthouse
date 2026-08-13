import { render, screen, within } from "@testing-library/react";
import { axe } from "jest-axe";
import { HomePage } from "@/components/home-page";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

function renderShell() {
  return render(
    <>
      <SiteHeader />
      <main id="main-content">
        <HomePage />
      </main>
      <SiteFooter />
    </>,
  );
}

describe("Premium editorial application shell", () => {
  it("exposes primary, mobile, footer, and visitor-path navigation", () => {
    renderShell();

    const primary = screen.getByRole("navigation", { name: "Primary" });
    expect(
      within(primary).getByRole("link", { name: "Learn" }),
    ).toHaveAttribute("href", "/learn");
    expect(within(primary).getByRole("link", { name: "Shop" })).toHaveAttribute(
      "href",
      "/shop",
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Education for ownership, civics, and nationality.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Study adverse possession" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Examine civics and politics" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Explore nationality and identity" }),
    ).toBeInTheDocument();
  });

  it("provides honest preview feedback and descriptive next actions", () => {
    renderShell();

    expect(screen.getByRole("status")).toHaveTextContent(
      "Official-channel preview",
    );
    expect(
      screen.getAllByRole("link", { name: /watch videos/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: "Enter the video library" }),
    ).toHaveAttribute("href", "/videos");
    expect(
      screen.queryByRole("button", { name: "Join when available" }),
    ).not.toBeInTheDocument();
  });

  it("has no detectable axe violations", async () => {
    const { container } = renderShell();
    const results = await axe(container);

    expect(results.violations).toEqual([]);
  });
});
