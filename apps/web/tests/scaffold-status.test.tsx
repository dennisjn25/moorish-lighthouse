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
    expect(
      screen.getByRole("navigation", { name: "Mobile primary" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Find clarity in what matters.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Learn the foundations" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Put knowledge to work" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Study the wider record" }),
    ).toBeInTheDocument();
  });

  it("provides honest preview feedback and descriptive next actions", () => {
    renderShell();

    expect(screen.getByRole("status")).toHaveTextContent(
      "Local preview content",
    );
    expect(
      screen.getAllByRole("link", { name: /start learning/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("link", { name: "Enter the learning library" }),
    ).toHaveAttribute("href", "/learn");
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
