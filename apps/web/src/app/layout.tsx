import type { Metadata } from "next";
import { Libre_Bodoni, Public_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";
import "./content.css";

const libreBodoni = Libre_Bodoni({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-libre-bodoni",
});

const publicSans = Public_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-public-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://moorishlighthouse.com"),
  title: {
    default: "Moorish Lighthouse",
    template: "%s | Moorish Lighthouse",
  },
  description:
    "Explore education, media, practical resources, and consulting from Moorish Lighthouse.",
  openGraph: {
    description:
      "Explore education, media, practical resources, and consulting from Moorish Lighthouse.",
    siteName: "Moorish Lighthouse",
    title: "Moorish Lighthouse",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${libreBodoni.variable} ${publicSans.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
