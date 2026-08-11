import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, ButtonLink, Container } from "@/components/ui";
import {
  BeaconArtwork,
  ContentTile,
  JsonLd,
  PreviewNotice,
  ProductArtwork,
  SourceNote,
} from "@/components/content-ui";
import {
  getArticle,
  getCatalog,
  getLesson,
  getProduct,
  getTopic,
  getVideo,
} from "@/lib/content/repository";

function DetailBreadcrumbs({
  items,
}: {
  items: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <nav aria-label="Breadcrumb" className="detail-breadcrumbs">
      <ol>
        {items.map((item, index) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
            {index < items.length - 1 ? (
              <span aria-hidden="true">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export async function TopicLanding({ slug }: { slug: string }) {
  const [catalog, topic] = await Promise.all([getCatalog(), getTopic(slug)]);
  if (!topic) notFound();
  const lessons = catalog.lessons.filter(
    (item) => item.topicSlug === topic.slug,
  );
  const articles = catalog.articles.filter(
    (item) => item.topicSlug === topic.slug,
  );
  const videos = catalog.videos.filter((item) => item.topicSlug === topic.slug);

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <header className="topic-hero">
        <Container size="wide">
          <DetailBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/learn", label: "Learn" },
              { href: `/learn/${topic.slug}`, label: topic.title },
            ]}
          />
          <div className="topic-hero__grid">
            <div>
              <Badge>Learning topic</Badge>
              <h1>{topic.title}</h1>
              <p>{topic.introduction}</p>
            </div>
            <div
              className="topic-map"
              aria-label={`${topic.title} learning sequence`}
            >
              <span>Start</span>
              <strong>Orient</strong>
              <strong>Study</strong>
              <strong>Connect</strong>
              <span>Continue</span>
            </div>
          </div>
        </Container>
      </header>
      <section className="topic-sequence">
        <Container size="wide">
          <div className="archive-heading">
            <div>
              <p className="eyebrow">Guided sequence</p>
              <h2>Move from orientation to application.</h2>
            </div>
            <p>
              Read in order or enter at the lesson that answers today’s
              question.
            </p>
          </div>
          <div className="sequence-list">
            {lessons.map((item, index) => (
              <article key={item.id}>
                <span>0{index + 1}</span>
                <div>
                  <p className="eyebrow">
                    {item.level} · {item.minutes} min
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </div>
                <ButtonLink
                  href={`/learn/${topic.slug}/${item.slug}`}
                  variant="quiet"
                >
                  Open lesson
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <section className="related-shelf">
        <Container size="wide">
          <div>
            <p className="eyebrow">Continue across formats</p>
            <h2>Read, watch, then return to the question.</h2>
          </div>
          <div className="related-shelf__grid">
            {articles.slice(0, 2).map((item) => (
              <ContentTile
                badge="Article"
                href={`/articles/${item.slug}`}
                key={item.id}
                summary={item.dek}
                title={item.title}
              />
            ))}
            {videos.slice(0, 1).map((item) => (
              <ContentTile
                badge="Video"
                href={`/videos/${item.slug}`}
                key={item.id}
                summary={item.summary}
                title={item.title}
              />
            ))}
            {!articles.length && !videos.length ? (
              <p>No related preview media has been added yet.</p>
            ) : null}
          </div>
        </Container>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Learn",
              item: "https://moorishlighthouse.com/learn",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: topic.title,
              item: `https://moorishlighthouse.com/learn/${topic.slug}`,
            },
          ],
        }}
      />
    </>
  );
}

export async function LessonDetail({ slug }: { slug: string }) {
  const [catalog, lesson] = await Promise.all([getCatalog(), getLesson(slug)]);
  if (!lesson) notFound();
  const topic = catalog.topics.find((item) => item.slug === lesson.topicSlug);
  const related = catalog.lessons.filter(
    (item) => item.topicSlug === lesson.topicSlug && item.id !== lesson.id,
  );

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <article className="reading-page">
        <Container size="wide">
          <DetailBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/learn", label: "Learn" },
              {
                href: `/learn/${lesson.topicSlug}`,
                label: topic?.title ?? "Topic",
              },
              {
                href: `/learn/${lesson.topicSlug}/${lesson.slug}`,
                label: lesson.title,
              },
            ]}
          />
        </Container>
        <header className="reading-header">
          <Container size="content">
            <Badge>
              {lesson.level} · {lesson.format}
            </Badge>
            <h1>{lesson.title}</h1>
            <p>{lesson.summary}</p>
            <div className="reading-meta">
              <span>{lesson.minutes} minute read</span>
              <span>{topic?.title}</span>
              <span>Preview lesson</span>
            </div>
          </Container>
        </header>
        <Container className="reading-layout" size="wide">
          <aside className="reading-rail">
            <strong>On this page</strong>
            <ol>
              {lesson.body.map((_, index) => (
                <li key={index}>
                  <a href={`#section-${index + 1}`}>Section {index + 1}</a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="prose">
            {lesson.body.map((paragraph, index) => (
              <section id={`section-${index + 1}`} key={paragraph}>
                <h2>
                  {index === 0
                    ? "Set the question"
                    : index === lesson.body.length - 1
                      ? "Know the boundary"
                      : "Build the record"}
                </h2>
                <p>{paragraph}</p>
              </section>
            ))}
            <aside className="disclaimer">
              <strong>Educational preview</strong>
              <p>
                This local fixture demonstrates presentation only. It is not
                legal advice and has not been approved as Moorish Lighthouse
                instruction.
              </p>
            </aside>
            <SourceNote source={lesson.source} />
          </div>
        </Container>
      </article>
      <section className="related-shelf">
        <Container size="wide">
          <div>
            <p className="eyebrow">Continue learning</p>
            <h2>Stay with the sequence.</h2>
          </div>
          <div className="related-shelf__grid">
            {related.map((item) => (
              <ContentTile
                badge={item.level}
                href={`/learn/${item.topicSlug}/${item.slug}`}
                key={item.id}
                summary={item.summary}
                title={item.title}
              />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export async function ArticleDetail({ slug }: { slug: string }) {
  const [catalog, article] = await Promise.all([
    getCatalog(),
    getArticle(slug),
  ]);
  if (!article) notFound();
  const topic = catalog.topics.find((item) => item.slug === article.topicSlug);
  const relatedVideo = catalog.videos.find(
    (item) => item.topicSlug === article.topicSlug,
  );
  const relatedLesson = catalog.lessons.find(
    (item) => item.topicSlug === article.topicSlug,
  );

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <article className="article-page">
        <Container size="wide">
          <DetailBreadcrumbs
            items={[
              { href: "/", label: "Home" },
              { href: "/articles", label: "Articles" },
              { href: `/articles/${article.slug}`, label: article.title },
            ]}
          />
        </Container>
        <header className="article-header">
          <Container size="content">
            <p className="eyebrow">{topic?.title ?? "Editorial"}</p>
            <h1>{article.title}</h1>
            <p className="article-header__dek">{article.dek}</p>
            <div className="reading-meta">
              <span>{article.author}</span>
              <span>{article.minutes} min read</span>
              <span>Local preview</span>
            </div>
          </Container>
        </header>
        <Container size="wide">
          <BeaconArtwork
            label="Archival records, map, compass, and notebook arranged for careful research"
            variant="research"
          />
        </Container>
        <Container className="article-layout" size="wide">
          <aside className="article-aside">
            <strong>Article note</strong>
            <p>
              References and dates are required for published work. This fixture
              is intentionally marked as preview.
            </p>
          </aside>
          <div className="prose prose--article">
            {article.body.map((paragraph, index) => (
              <section key={paragraph}>
                <h2>
                  {[
                    "Start with the authority",
                    "Separate statement from inference",
                    "Keep the status visible",
                  ][index] ?? `Section ${index + 1}`}
                </h2>
                <p>{paragraph}</p>
              </section>
            ))}
            <div className="references">
              <h2>References</h2>
              {article.references.map((source) => (
                <SourceNote key={source.label} source={source} />
              ))}
            </div>
          </div>
        </Container>
      </article>
      <section className="related-shelf">
        <Container size="wide">
          <div>
            <p className="eyebrow">Continue from here</p>
            <h2>Carry the question into another format.</h2>
          </div>
          <div className="related-shelf__grid">
            {relatedLesson ? (
              <ContentTile
                badge="Lesson"
                href={`/learn/${relatedLesson.topicSlug}/${relatedLesson.slug}`}
                summary={relatedLesson.summary}
                title={relatedLesson.title}
              />
            ) : null}
            {relatedVideo ? (
              <ContentTile
                badge="Video"
                href={`/videos/${relatedVideo.slug}`}
                summary={relatedVideo.summary}
                title={relatedVideo.title}
              />
            ) : null}
          </div>
        </Container>
      </section>
      {article.status === "published" ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            author: { "@type": "Person", name: article.author },
            datePublished: article.publishedAt,
          }}
        />
      ) : null}
    </>
  );
}

export async function VideoDetail({ slug }: { slug: string }) {
  const [catalog, video] = await Promise.all([getCatalog(), getVideo(slug)]);
  if (!video) notFound();
  const related = catalog.videos.filter(
    (item) => item.topicSlug === video.topicSlug && item.id !== video.id,
  );
  const lesson = catalog.lessons.find(
    (item) => item.topicSlug === video.topicSlug,
  );

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <Container size="wide">
        <DetailBreadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/videos", label: "Videos" },
            { href: `/videos/${video.slug}`, label: video.title },
          ]}
        />
      </Container>
      <section className="watch-page">
        <Container size="wide">
          <header>
            <p className="eyebrow">
              {video.series ?? "Video lesson"} · {video.level}
            </p>
            <h1>{video.title}</h1>
            <p>{video.summary}</p>
          </header>
          <div className="watch-grid">
            <div>
              <div className="video-player-placeholder">
                <BeaconArtwork
                  className="video-player-placeholder__image"
                  label="Warm projector beam crossing a dark archival screening room"
                  variant="media"
                />
                <div className="video-player-placeholder__message">
                  <span className="video-facade__play" aria-hidden="true" />
                  <strong>Privacy-conscious player area</strong>
                  <p>
                    The official YouTube player is not loaded in local preview
                    mode.
                  </p>
                  {video.youtubeUrl ? (
                    <a href={video.youtubeUrl} rel="noreferrer" target="_blank">
                      Open the attributed official channel
                    </a>
                  ) : null}
                </div>
              </div>
              <SourceNote source={video.source} />
            </div>
            <aside>
              <p className="eyebrow">Key takeaways</p>
              <ol>
                {video.takeaways.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
              {lesson ? (
                <ButtonLink
                  href={`/learn/${lesson.topicSlug}/${lesson.slug}`}
                  variant="secondary"
                >
                  Continue with the lesson
                </ButtonLink>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
      <section className="transcript-section">
        <Container size="content">
          <div className="archive-heading">
            <div>
              <p className="eyebrow">Transcript</p>
              <h2>Read or return to a specific point.</h2>
            </div>
            <p>
              Production transcripts must be authorized, accurate, and reviewed
              before publication.
            </p>
          </div>
          {video.transcript?.length ? (
            <div className="transcript">
              {video.transcript.map((paragraph, index) => (
                <p key={paragraph}>
                  <span>{String(index).padStart(2, "0")}:00</span>
                  {paragraph}
                </p>
              ))}
            </div>
          ) : (
            <p>No transcript is available for this entry.</p>
          )}
        </Container>
      </section>
      <section className="related-shelf">
        <Container size="wide">
          <div>
            <p className="eyebrow">Related viewing</p>
            <h2>Keep following the subject.</h2>
          </div>
          <div className="related-shelf__grid">
            {related.map((item) => (
              <ContentTile
                badge="Video"
                href={`/videos/${item.slug}`}
                key={item.id}
                summary={item.summary}
                title={item.title}
              />
            ))}
          </div>
        </Container>
      </section>
      {video.status === "published" ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "VideoObject",
            name: video.title,
            description: video.summary,
            contentUrl: video.youtubeUrl,
          }}
        />
      ) : null}
    </>
  );
}

export async function ProductDetail({ slug }: { slug: string }) {
  const [catalog, product] = await Promise.all([
    getCatalog(),
    getProduct(slug),
  ]);
  if (!product) notFound();
  const relatedLesson = catalog.lessons[0];
  const artworkVariant = product.type === "Workshop" ? "workshop" : "workbook";

  return (
    <>
      {catalog.mode === "fixtures" ? <PreviewNotice /> : null}
      <Container size="wide">
        <DetailBreadcrumbs
          items={[
            { href: "/", label: "Home" },
            { href: "/shop", label: "Shop" },
            { href: `/shop/${product.slug}`, label: product.title },
          ]}
        />
      </Container>
      <section className="product-detail">
        <Container className="product-detail__grid" size="wide">
          <ProductArtwork
            className="product-gallery"
            label={
              artworkVariant === "workshop"
                ? "Empty workshop table prepared with blank learning materials"
                : "Blank premium workbook concept on a research desk"
            }
            variant={artworkVariant}
          />
          <div className="product-summary">
            <Badge>{product.type}</Badge>
            <h1>{product.title}</h1>
            <p>{product.summary}</p>
            <dl>
              <div>
                <dt>Availability</dt>
                <dd>{product.availability.replaceAll("-", " ")}</dd>
              </div>
              <div>
                <dt>Fulfillment</dt>
                <dd>{product.fulfillment}</dd>
              </div>
              <div>
                <dt>Price</dt>
                <dd>Not supplied in preview</dd>
              </div>
            </dl>
            <button className="button button--primary" disabled type="button">
              Purchase unavailable
            </button>
            <p className="product-summary__note">
              No checkout, reservation, inventory, or price is implied by this
              local fixture.
            </p>
          </div>
        </Container>
      </section>
      <section className="product-body">
        <Container className="product-body__grid" size="wide">
          <div>
            <p className="eyebrow">Intended outcome</p>
            <h2>What an approved listing must make clear.</h2>
            <ul>
              {product.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <aside>
            <p className="eyebrow">Who it may be for</p>
            <p>{product.audience}</p>
            <SourceNote source={product.source} />
          </aside>
        </Container>
      </section>
      {relatedLesson ? (
        <section className="related-shelf">
          <Container size="wide">
            <div>
              <p className="eyebrow">Learn before choosing</p>
              <h2>Start with a free lesson.</h2>
            </div>
            <ContentTile
              badge="Lesson"
              href={`/learn/${relatedLesson.topicSlug}/${relatedLesson.slug}`}
              summary={relatedLesson.summary}
              title={relatedLesson.title}
            />
          </Container>
        </section>
      ) : null}
    </>
  );
}
