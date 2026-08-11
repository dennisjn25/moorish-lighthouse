import Image from "next/image";
import Link from "next/link";
import { ButtonLink, Container } from "@/components/ui";
import { PreviewNotice } from "@/components/content-ui";
import { previewCatalog } from "@/lib/content/fixtures";
import type { ContentCatalog } from "@/lib/content/types";

const paths = [
  {
    href: "/learn",
    id: "start-learning",
    index: "01",
    title: "Learn the foundations",
    text: "Follow structured introductions to key ideas, terms, and connected lessons.",
  },
  {
    href: "/shop",
    id: "take-action",
    index: "02",
    title: "Put knowledge to work",
    text: "Use practical resources and informed guidance to shape a deliberate next step.",
  },
  {
    href: "/articles",
    id: "go-deeper",
    index: "03",
    title: "Study the wider record",
    text: "Explore articles, videos, references, and longer sequences built around consequential questions.",
  },
] as const;

export function HomePage({
  catalog = previewCatalog,
}: {
  catalog?: ContentCatalog;
}) {
  const featuredArticle = catalog.articles[0];

  return (
    <>
      <PreviewNotice />
      <section className="premium-hero">
        <div className="premium-hero__copy">
          <p className="premium-kicker">
            Knowledge. Context. Purposeful action.
          </p>
          <h1>Find clarity in what matters.</h1>
          <p className="premium-hero__lede">
            Lessons, conversations, and practical resources presented with
            context, discipline, and respect for the source.
          </p>
          <div className="premium-hero__actions">
            <ButtonLink href="#start-learning">Start learning</ButtonLink>
            <Link href="/articles">Explore the library</Link>
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
          <p className="premium-section-label">Our standard</p>
          <h2>
            Understanding begins with context, careful sourcing, and a clear
            next step.
          </h2>
        </Container>
      </section>

      <section aria-labelledby="path-heading" className="premium-paths">
        <Container size="wide">
          <div className="premium-paths__heading">
            <h2 id="path-heading">Choose where to begin.</h2>
            <p>
              Move through the library according to your purpose. Start with a
              foundation, apply what you know, or examine the deeper record.
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
            <p className="premium-section-label">Featured inquiry</p>
            <h2>{featuredArticle?.title ?? "How to build a source trail"}</h2>
            <p>
              {featuredArticle?.dek ??
                "A disciplined framework for separating evidence, interpretation, and the next question worth asking."}
            </p>
            <Link
              href={
                featuredArticle
                  ? `/articles/${featuredArticle.slug}`
                  : "/articles"
              }
            >
              Read the feature
            </Link>
          </div>
        </Container>
      </section>

      <section className="premium-invitation" id="join">
        <Container size="content">
          <p className="premium-section-label">Continue with purpose</p>
          <h2>Keep a thoughtful next step within reach.</h2>
          <p>
            Explore sourced lessons, practical resources, and conversations
            designed to deepen understanding without adding noise.
          </p>
          <ButtonLink href="/learn">Enter the learning library</ButtonLink>
        </Container>
      </section>
    </>
  );
}
