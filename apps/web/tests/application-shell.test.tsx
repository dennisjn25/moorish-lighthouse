import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { HomePage } from "@/components/home-page";
import { BeaconArtwork, ProductArtwork } from "@/components/content-ui";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Breadcrumbs, ButtonLink, Field } from "@/components/ui";

function ApplicationShell() {
  return (
    <>
      <a href="#main-content">Skip to main content</a>
      <SiteHeader />
      <main id="main-content">
        <HomePage />
      </main>
      <SiteFooter />
    </>
  );
}

describe("Daylight Beacon application shell", () => {
  it("provides skip navigation and named desktop and mobile navigation", () => {
    render(<ApplicationShell />);

    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeVisible();
    expect(
      screen.getByRole("navigation", { name: "Mobile primary" }),
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Moorish Lighthouse home" }),
    ).toHaveLength(2);
    const brandMarks = screen.getAllByRole("img", {
      name: "Moorish Lighthouse",
    });
    expect(brandMarks).toHaveLength(2);
    for (const brandMark of brandMarks) {
      expect(brandMark).toHaveAttribute(
        "src",
        expect.stringContaining("moorish-lighthouse-logo-transparent.png"),
      );
    }
    expect(screen.getAllByRole("link", { name: "Shop" })).toHaveLength(3);
    expect(
      screen
        .getByRole("navigation", { name: "Primary" })
        .querySelector('a[href="/shop"]'),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Consulting" }),
    ).not.toBeInTheDocument();
  });

  it("closes the mobile menu when a navigation link is selected", () => {
    const { container } = render(<SiteHeader />);
    const menu = container.querySelector<HTMLDetailsElement>(
      "details.mobile-navigation",
    );

    expect(menu).not.toBeNull();
    menu!.open = true;

    fireEvent.click(
      screen
        .getByRole("navigation", { name: "Mobile primary" })
        .querySelector('a[href="/articles"]')!,
    );

    expect(menu).not.toHaveAttribute("open");
  });

  it("renders the approved premium editorial hero and three purposeful paths", () => {
    render(<HomePage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Education for ownership, civics, and nationality.",
      }),
    ).toBeVisible();
    expect(
      screen.getByText(/author and educator focused on home ownership/i),
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /watch the official channel/i }),
    ).toHaveAttribute("href", "https://www.youtube.com/@moorishlighthouse");
    expect(
      screen.getByRole("img", {
        name: "Lighthouse casting a warm beam over a calm coast at blue hour",
      }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Study adverse possession" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Examine civics and politics" }),
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "Explore nationality and identity" }),
    ).toBeVisible();
  });

  it("renders editorial artwork as a real accessible image", () => {
    render(
      <BeaconArtwork
        label="Archival documents arranged for careful study"
        variant="research"
      />,
    );

    const image = screen.getByRole("img", {
      name: "Archival documents arranged for careful study",
    });
    expect(image.tagName).toBe("IMG");
  });

  it("renders product concepts as accessible images with an honest disclosure", () => {
    render(
      <ProductArtwork
        label="Blank premium workbook concept on a research desk"
        variant="workbook"
      />,
    );

    expect(
      screen.getByRole("img", {
        name: "Blank premium workbook concept on a research desk",
      }),
    ).toBeVisible();
    expect(screen.getByText("Concept preview")).toBeVisible();
  });

  it("associates fields and breadcrumbs with accessible names", () => {
    render(
      <>
        <Field hint="Helpful context" id="email" label="Email address" />
        <Breadcrumbs
          items={[{ href: "/", label: "Home" }, { label: "Current page" }]}
        />
        <ButtonLink href="/learn">Learn now</ButtonLink>
      </>,
    );

    expect(screen.getByLabelText("Email address")).toHaveAccessibleDescription(
      "Helpful context",
    );
    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeVisible();
    expect(screen.getByRole("link", { name: "Learn now" })).toHaveAttribute(
      "href",
      "/learn",
    );
  });

  it("has no detectable axe violations", async () => {
    const { container } = render(<ApplicationShell />);
    const results = await axe(container);

    expect(results.violations).toEqual([]);
  });
});
