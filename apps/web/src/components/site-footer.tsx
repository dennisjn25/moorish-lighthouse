import Link from "next/link";
import { Container } from "@/components/ui";
import { BrandLogo } from "@/components/site-header";

const footerGroups = [
  {
    label: "Explore",
    links: [
      ["Start here", "/#start-learning"],
      ["Learn", "/learn"],
      ["Articles", "/articles"],
      ["Videos", "/videos"],
    ],
  },
  {
    label: "Connect",
    links: [
      ["About", "/about"],
      ["Consulting", "/consulting"],
      ["Join the Lighthouse", "/#join"],
      ["Contact", "/contact"],
    ],
  },
  {
    label: "Resources",
    links: [
      ["Shop", "/shop"],
      ["Search", "/search"],
      ["Accessibility", "/accessibility"],
      ["Policies", "/policies"],
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container className="site-footer__grid" size="wide">
        <div className="site-footer__brand">
          <BrandLogo />
          <p>
            An education, media, consulting, and commerce platform designed to
            help people find their next informed step.
          </p>
          <p className="site-footer__note">
            Educational information only. Consulting is not legal
            representation.
          </p>
        </div>

        {footerGroups.map((group) => (
          <nav aria-label={`${group.label} links`} key={group.label}>
            <h2>{group.label}</h2>
            <ul>
              {group.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="site-footer__base" size="wide">
        <p>© Moorish Lighthouse</p>
        <p>Guidance for the path ahead.</p>
      </Container>
    </footer>
  );
}
