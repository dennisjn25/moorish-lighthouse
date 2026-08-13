import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";
import { PreviewNotice } from "@/components/content-ui";
import { previewCatalog } from "@/lib/content/fixtures";
import type { ContentCatalog } from "@/lib/content/types";

const paths = [
  {
    href: "/videos?topic=property-research",
    id: "start-learning",
    index: "01",
    title: "Study adverse possession",
    text: "Explore the official presentations on property, home ownership, and adverse possession.",
  },
  {
    href: "/videos?topic=civic-context",
    id: "take-action",
    index: "02",
    title: "Examine civics and politics",
    text: "Watch the creator’s analysis of amendments, rights, records, taxation, and public institutions.",
  },
  {
    href: "/videos?topic=foundations",
    id: "go-deeper",
    index: "03",
    title: "Explore nationality and identity",
    text: "Follow the channel’s discussions of Moorish American nationality, identity, and foundational principles.",
  },
] as const;

export function HomePage({
  catalog = previewCatalog,
}: {
  catalog?: ContentCatalog;
}) {
  const featuredArticle = catalog.articles[0];
  const featuredVideo = catalog.videos.find(
    (video) => video.id === "_h51g_HsZHM",
  );

  return (
    <>
      <PreviewNotice />
      <section className="premium-hero">
        <div className="premium-hero__copy">
          <p className="premium-kicker">Moorish Lighthouse official library</p>
          <h1>Education for ownership, civics, and nationality.</h1>
          <p className="premium-hero__lede">
            An author and educator focused on home ownership through adverse
            possession, with commentary on civics, law, politics, and identity.
          </p>
          <div className="premium-hero__actions">
            <ButtonLink href="/videos">Explore the videos</ButtonLink>
            <a href="https://www.youtube.com/@moorishlighthouse">
              Watch the official channel
            </a>
          </div>
        </div>

        <figure className="premium-hero__media">
          <Image
            alt="Lighthouse casting a warm beam over a calm coast at blue hour"
            fill
            loading="eager"
            priority
            sizes="(max-width: 800px) 100vw, 46vw"
            src="/premium-lighthouse-hero.png"
          />
          <figcaption>Moorish Lighthouse editorial collection</figcaption>
        </figure>
      </section>

      <section className="premium-standard">
        <Container size="wide">
          <p className="premium-section-label">Official channel focus</p>
          <h2>
            Property education is the center. Civic, political, and nationality
            commentary complete the record.
          </h2>
        </Container>
      </section>

      <section aria-labelledby="path-heading" className="premium-paths">
        <Container size="wide">
          <div className="premium-paths__heading">
            <h2 id="path-heading">Explore the creator’s core subjects.</h2>
            <p>
              These pathways are organized from the public Moorish Lighthouse
              YouTube catalog and verified Instagram profile.
            </p>
          </div>

          <div className="premium-paths__list">
            {paths.map((path) => (
              <Link className="premium-path" href={path.href} key={path.id}>
                <span className="premium-path__index">{path.index}</span>
                <h3 id={path.id}>{path.title}</h3>
                <p>{path.text}</p>
                <span aria-hidden="true" className="premium-path__arrow">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="premium-feature">
        <Container className="premium-feature__grid" size="wide">
          <div className="premium-feature__media">
            <Image
              alt="Atmospheric lighthouse standing above a dark coast"
              fill
              loading="eager"
              sizes="(max-width: 800px) 100vw, 52vw"
              src="/premium-lighthouse-hero.png"
            />
          </div>
          <div className="premium-feature__copy">
            <p className="premium-section-label">From the official channel</p>
            <h2>{featuredVideo?.title ?? featuredArticle?.title}</h2>
            <p>{featuredVideo?.summary ?? featuredArticle?.dek}</p>
            <Link
              href={featuredVideo ? `/videos/${featuredVideo.slug}` : "/videos"}
            >
              View the presentation
            </Link>
          </div>
        </Container>
      </section>

      <section className="premium-invitation" id="join">
        <Container size="content">
          <p className="premium-section-label">Continue at the source</p>
          <h2>Watch the full Moorish Lighthouse catalog.</h2>
          <p>
            Browse presentations in their original context. Legal and political
            statements remain attributed to the creator and are not legal
            advice.
          </p>
          <ButtonLink href="/videos">Enter the video library</ButtonLink>
        </Container>
      </section>
    </>
  );
}
