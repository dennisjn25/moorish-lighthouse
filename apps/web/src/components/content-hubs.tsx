import Link from "next/link";
import { ButtonLink, Container, Field } from "@/components/ui";
import {
  BeaconArtwork,
  ContentTile,
  EmptyState,
  FilterBar,
  PageIntro,
  PreviewNotice,
  ProductArtwork,
  SelectField,
} from "@/components/content-ui";
import { getCatalog, searchCatalog } from "@/lib/content/repository";

export async function LearnHub({
  level = "",
  topic = "",
}: {
  level?: string;
  topic?: string;
}) {
  const catalog = await getCatalog();
  const lessons = catalog.lessons.filter(
    (item) =>
      (!level || item.level === level) && (!topic || item.topicSlug === topic),
  );

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Learn" }]}
        eyebrow="Education hub"
        title="Build understanding in a clear sequence."
      >
        <p>
          Begin with a channel subject, then use the attributed guides and
          original presentations to follow the creator’s framework in context.
        </p>
      </PageIntro>

      <section className="topic-ribbon">
        <Container size="wide">
          <p className="eyebrow">Browse by topic</p>
          <div className="topic-ribbon__grid">
            {catalog.topics.map((item, index) => (
              <Link href={`/learn/${item.slug}`} key={item.id}>
                <span>0{index + 1}</span>
                <strong>{item.title}</strong>
                <small>{item.summary}</small>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="archive-section">
        <Container size="wide">
          <div className="archive-heading">
            <div>
              <p className="eyebrow">Lesson library</p>
              <h2>Choose the next useful step.</h2>
            </div>
            <FilterBar label="Filter lessons">
              <SelectField defaultValue={topic} label="Topic" name="topic">
                <option value="">All topics</option>
                {catalog.topics.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </SelectField>
              <SelectField defaultValue={level} label="Level" name="level">
                <option value="">All levels</option>
                <option>Foundations</option>
                <option>Developing</option>
                <option>Advanced</option>
              </SelectField>
            </FilterBar>
          </div>
          {lessons.length ? (
            <div className="archive-list">
              {lessons.map((item) => (
                <ContentTile
                  badge={`${item.level} · ${item.format}`}
                  href={`/learn/${item.topicSlug}/${item.slug}`}
                  key={item.id}
                  meta={`${item.minutes} min read`}
                  summary={item.summary}
                  title={item.title}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              actionHref="/learn"
              actionLabel="View every lesson"
              message="Try another topic or level. The current preview catalog may not include that combination yet."
              title="No lessons match these filters."
            />
          )}
        </Container>
      </section>
    </>
  );
}

export async function ArticlesIndex({
  query = "",
  topic = "",
}: {
  query?: string;
  topic?: string;
}) {
  const catalog = await getCatalog();
  const needle = query.toLocaleLowerCase();
  const articles = catalog.articles.filter(
    (item) =>
      (!topic || item.topicSlug === topic) &&
      (!needle ||
        `${item.title} ${item.dek}`.toLocaleLowerCase().includes(needle)),
  );
  const featured = catalog.articles[0];

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Articles" }]}
        eyebrow="Editorial archive"
        title="Read the channel’s core ideas with attribution intact."
      >
        <p>
          Transcript-grounded editorial guides that summarize the creator’s
          recurring themes and link back to the official presentation.
        </p>
      </PageIntro>

      {featured ? (
        <section className="lead-feature">
          <Container className="lead-feature__grid" size="wide">
            <BeaconArtwork
              label="Archival records, map, compass, and notebook arranged for careful research"
              variant="research"
            />
            <div>
              <p className="eyebrow">Featured reading</p>
              <h2>{featured.title}</h2>
              <p>{featured.dek}</p>
              <ButtonLink href={`/articles/${featured.slug}`}>
                Read the article
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="archive-section archive-section--paper">
        <Container size="wide">
          <div className="archive-heading archive-heading--top">
            <div>
              <p className="eyebrow">All articles</p>
              <h2>Find a line of inquiry.</h2>
            </div>
            <FilterBar label="Search and filter articles">
              <Field
                defaultValue={query}
                id="article-query"
                label="Search articles"
                name="q"
                placeholder="Search by title or subject"
                type="search"
              />
              <SelectField defaultValue={topic} label="Topic" name="topic">
                <option value="">All topics</option>
                {catalog.topics.map((item) => (
                  <option key={item.id} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </SelectField>
            </FilterBar>
          </div>
          {articles.length ? (
            <div className="editorial-list">
              {articles.map((item, index) => (
                <article key={item.id}>
                  <span className="editorial-list__number">0{index + 1}</span>
                  <div>
                    <p className="eyebrow">
                      {item.minutes} min read ·{" "}
                      {item.topicSlug.replaceAll("-", " ")}
                    </p>
                    <h2>
                      <Link href={`/articles/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <p>{item.dek}</p>
                  </div>
                  <Link className="text-link" href={`/articles/${item.slug}`}>
                    Read <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              actionHref="/articles"
              actionLabel="Return to all articles"
              message="Clear the current search or choose another topic."
              title="No articles found."
            />
          )}
        </Container>
      </section>
    </>
  );
}

export async function VideosLibrary({
  level = "",
  query = "",
  topic = "",
}: {
  level?: string;
  query?: string;
  topic?: string;
}) {
  const catalog = await getCatalog();
  const needle = query.toLocaleLowerCase();
  const videos = catalog.videos.filter(
    (item) =>
      (!topic || item.topicSlug === topic) &&
      (!level || item.level === level) &&
      (!needle ||
        `${item.title} ${item.summary}`.toLocaleLowerCase().includes(needle)),
  );
  const featured = catalog.videos[0];

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Videos" }]}
        eyebrow="Video library"
        title="Watch with the context still attached."
      >
        <p>
          Search the official catalog by subject and level. Every video page
          includes an attributed summary, key takeaways, reviewed transcript
          excerpts, and the original YouTube source.
        </p>
      </PageIntro>

      {featured ? (
        <section className="video-feature">
          <Container className="video-feature__grid" size="wide">
            <div className="video-facade video-facade--feature">
              <BeaconArtwork
                className="video-facade__image"
                label="Warm projector beam crossing a dark archival screening room"
                variant="media"
              />
              <span className="video-facade__play" aria-hidden="true" />
              <p>
                Official embed loads only after selection on a published page.
              </p>
            </div>
            <div>
              <p className="eyebrow">Featured lesson · {featured.series}</p>
              <h2>{featured.title}</h2>
              <p>{featured.summary}</p>
              <ButtonLink href={`/videos/${featured.slug}`}>
                View lesson
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="archive-section">
        <Container size="wide">
          <FilterBar label="Search and filter videos">
            <Field
              defaultValue={query}
              id="video-query"
              label="Search videos"
              name="q"
              placeholder="Search lessons"
              type="search"
            />
            <SelectField defaultValue={topic} label="Topic" name="topic">
              <option value="">All topics</option>
              {catalog.topics.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </SelectField>
            <SelectField defaultValue={level} label="Level" name="level">
              <option value="">All levels</option>
              <option>Foundations</option>
              <option>Developing</option>
              <option>Advanced</option>
            </SelectField>
          </FilterBar>
          {videos.length ? (
            <div className="video-grid">
              {videos.map((item) => (
                <article key={item.id}>
                  <div className="video-facade">
                    <BeaconArtwork
                      className="video-facade__image"
                      label="Warm projector beam crossing a dark archival screening room"
                      variant="media"
                    />
                    <span className="video-facade__play" aria-hidden="true" />
                    <small>{item.duration}</small>
                  </div>
                  <p className="eyebrow">{item.series ?? "Video lesson"}</p>
                  <h2>
                    <Link href={`/videos/${item.slug}`}>{item.title}</Link>
                  </h2>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              actionHref="/videos"
              actionLabel="View all videos"
              message="Adjust the search, topic, or level to see another set."
              title="No videos match."
            />
          )}
        </Container>
      </section>
    </>
  );
}

export async function ShopCatalog({ type = "" }: { type?: string }) {
  const catalog = await getCatalog();
  const products = catalog.products.filter(
    (item) => !type || item.type === type,
  );

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Shop" }]}
        eyebrow="Resource catalog"
        title="Useful resources, presented without pressure."
      >
        <p>
          Product types, delivery, availability, and terms stay visible. Preview
          entries are not offers and cannot be purchased.
        </p>
      </PageIntro>
      <section className="shop-intro">
        <Container className="shop-intro__grid" size="wide">
          <div>
            <p className="eyebrow">Before you choose</p>
            <h2>Learn first. Select only what fits the work.</h2>
          </div>
          <p>
            Every production resource will link back to relevant free education
            and state exactly what is delivered. Live checkout is outside this
            preview build.
          </p>
        </Container>
      </section>
      <section className="archive-section archive-section--paper">
        <Container size="wide">
          <FilterBar label="Filter product catalog">
            <SelectField defaultValue={type} label="Resource type" name="type">
              <option value="">All types</option>
              <option>Digital guide</option>
              <option>Physical</option>
              <option>Course</option>
              <option>Workshop</option>
              <option>Consultation</option>
            </SelectField>
          </FilterBar>
          {products.length ? (
            <div className="product-list">
              {products.map((item, index) => (
                <article key={item.id}>
                  <ProductArtwork
                    className="product-list__art"
                    label={
                      index === 0
                        ? "Blank premium workbook concept on a research desk"
                        : "Empty workshop table prepared with blank learning materials"
                    }
                    variant={index === 0 ? "workbook" : "workshop"}
                  />
                  <div>
                    <p className="eyebrow">{item.type}</p>
                    <h2>{item.title}</h2>
                    <p>{item.summary}</p>
                    <div className="product-list__meta">
                      <span>{item.availability.replaceAll("-", " ")}</span>
                      <span>No price in preview</span>
                    </div>
                    <ButtonLink href={`/shop/${item.slug}`} variant="secondary">
                      View details
                    </ButtonLink>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <EmptyState
              actionHref="/shop"
              actionLabel="View all resource types"
              message="No approved preview entry exists for that resource type."
              title="No resources in this category."
            />
          )}
        </Container>
      </section>
    </>
  );
}

export async function AboutPage() {
  const catalog = await getCatalog();
  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        eyebrow="About Moorish Lighthouse"
        title="An author and educator focused on ownership and civic knowledge."
      >
        <p>
          The verified official profile identifies Moorish Lighthouse as an
          author and educator helping everyday people explore home ownership
          through adverse possession.
        </p>
      </PageIntro>
      <section className="about-story">
        <Container className="about-story__grid" size="wide">
          <BeaconArtwork
            label="Historic lighthouse lantern room overlooking the sea at blue hour"
            variant="interior"
          />
          <div>
            <p className="eyebrow">The public work</p>
            <h2>
              Property education, civic analysis, and Moorish American identity.
            </h2>
            <p>
              The official YouTube catalog examines adverse possession, property
              taxation, constitutional interpretation, public records,
              nationality, identity, and related political questions.
            </p>
            <p>
              This site presents those views as the creator’s educational
              commentary. Rights-affecting decisions require qualified local
              professional guidance.
            </p>
          </div>
        </Container>
      </section>
      <section className="principles-section">
        <Container size="wide">
          <p className="eyebrow">Editorial commitments</p>
          <div className="principles-list">
            <article>
              <span>01</span>
              <h2>Context before conclusion</h2>
              <p>Show where an idea comes from and what remains uncertain.</p>
            </article>
            <article>
              <span>02</span>
              <h2>Education before pressure</h2>
              <p>
                Let useful free content lead naturally to any future resource.
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>No invented authority</h2>
              <p>
                Publish biographies, claims, and outcomes only after
                verification.
              </p>
            </article>
          </div>
        </Container>
      </section>
      <section className="source-band">
        <Container size="wide">
          <div>
            <p className="eyebrow">Official channels</p>
            <h2>Continue at the source.</h2>
          </div>
          <div className="button-group">
            <ButtonLink
              href="https://www.youtube.com/@moorishlighthouse"
              variant="secondary"
            >
              Official YouTube
            </ButtonLink>
            <ButtonLink
              href="https://www.instagram.com/moorishlighthouse_official/"
              variant="secondary"
            >
              Official Instagram
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}

export async function SearchPage({ query = "" }: { query?: string }) {
  const catalog = await getCatalog();
  const results = await searchCatalog(query);
  const groups = ["Topic", "Lesson", "Article", "Video", "Product"] as const;
  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Search" }]}
        eyebrow="Search the lighthouse"
        title="Find a lesson, article, video, or resource."
      >
        <form className="search-form" method="get" role="search">
          <Field
            defaultValue={query}
            id="site-search"
            label="Search all content"
            name="q"
            placeholder="Try source, property, or context"
            type="search"
          />
          <button className="button button--primary" type="submit">
            Search
          </button>
        </form>
      </PageIntro>
      <section className="search-results">
        <Container size="wide">
          {!query ? (
            <EmptyState
              actionHref="/learn"
              actionLabel="Browse the learning hub"
              message="Enter a word or phrase above, or begin with the organized learning paths."
              title="What would you like to understand?"
            />
          ) : results.length ? (
            <>
              <p className="results-count">
                {results.length} preview result{results.length === 1 ? "" : "s"}{" "}
                for “{query}”
              </p>
              {groups.map((group) => {
                const items = results.filter((item) => item.kind === group);
                return items.length ? (
                  <section className="result-group" key={group}>
                    <h2>{group}s</h2>
                    <div>
                      {items.map((item) => (
                        <ContentTile
                          badge={item.kind}
                          href={item.href}
                          key={item.href}
                          summary={item.summary}
                          title={item.title}
                        />
                      ))}
                    </div>
                  </section>
                ) : null;
              })}
            </>
          ) : (
            <EmptyState
              actionHref="/search"
              actionLabel="Start a new search"
              message="Check the spelling or use a broader term. Preview content is intentionally small."
              title="Nothing matched that search."
            />
          )}
        </Container>
      </section>
    </>
  );
}

export function ConsultingPage() {
  return (
    <>
      <PreviewNotice />
      <PageIntro
        breadcrumbs={[{ href: "/", label: "Home" }, { label: "Consulting" }]}
        eyebrow="Educational consulting"
        title="Know the scope before starting a conversation."
      >
        <p>
          Consulting details, availability, pricing, and intake questions remain
          pending owner and qualified legal review.
        </p>
      </PageIntro>
      <section className="consulting-scope">
        <Container className="consulting-scope__grid" size="wide">
          <div>
            <p className="eyebrow">Potential fit</p>
            <h2>Education, research organization, and next-step clarity.</h2>
            <p>
              A future approved service may help visitors organize questions and
              educational materials. No service is currently offered through
              this preview.
            </p>
          </div>
          <aside>
            <strong>Important boundary</strong>
            <p>
              Moorish Lighthouse does not provide legal representation through
              this website preview. Do not submit confidential facts or rely on
              this page for legal advice.
            </p>
            <button className="button button--primary" disabled type="button">
              Intake unavailable
            </button>
          </aside>
        </Container>
      </section>
    </>
  );
}

export function UtilityPage({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <PageIntro
      breadcrumbs={[{ href: "/", label: "Home" }, { label: title }]}
      eyebrow="Site information"
      title={title}
    >
      <p>{description}</p>
      <ButtonLink href="/" variant="secondary">
        Return home
      </ButtonLink>
    </PageIntro>
  );
}
