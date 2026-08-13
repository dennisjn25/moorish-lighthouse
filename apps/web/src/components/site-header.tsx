import Image from "next/image";
import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink, Container } from "@/components/ui";
import { publicAsset } from "@/lib/public-asset";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/articles", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <Container className="site-header__inner" size="wide">
        <BrandLogo />

        <nav aria-label="Primary" className="desktop-navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="desktop-actions">
          <Link className="search-link" href="/search">
            <MagnifyingGlass aria-hidden="true" size={17} weight="regular" />
            Search
          </Link>
          <ButtonLink href="/videos" variant="primary">
            Watch videos
          </ButtonLink>
        </div>

        <details className="mobile-navigation">
          <summary>Menu</summary>
          <nav aria-label="Mobile primary">
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
            <div className="mobile-navigation__actions">
              <Link href="/search">Search</Link>
              <ButtonLink href="/videos">Watch videos</ButtonLink>
            </div>
          </nav>
        </details>
      </Container>
    </header>
  );
}

export function BrandLogo() {
  return (
    <Link aria-label="Moorish Lighthouse home" className="brand-logo" href="/">
      <span className="brand-logo__mark">
        <Image
          alt="Moorish Lighthouse"
          height={56}
          priority
          src={publicAsset("/moorish-lighthouse-logo.jpg")}
          width={56}
        />
      </span>
      <span className="brand-logo__wordmark">
        <strong>Moorish Lighthouse</strong>
        <small>Author and educator</small>
      </span>
    </Link>
  );
}
