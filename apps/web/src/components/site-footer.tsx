import Link from "next/link";
import { Container } from "@/components/ui";
import { BrandLogo } from "@/components/site-header";

const footerGroups = [
  {
    label: "Explore",
    links: [
      ["Start here", "/videos"],
      ["Learn", "/learn"],
      ["Articles", "/articles"],
      ["Videos", "/videos"],
    ],
  },
  {
    label: "Connect",
    links: [
      ["About", "/about"],
      ["Join the Lighthouse", "/#join"],
      ["Contact", "/contact"],
    ],
  },
  {
    label: "Resources",
    links: [
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
            Official-channel education on adverse possession, civics,
            nationality, identity, and public records.
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
                <li key={`${label}-${href}`}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container className="site-footer__base" size="wide">
        <p>© Moorish Lighthouse</p>
        <p>Continue at the official source.</p>
      </Container>
    </footer>
  );
}
