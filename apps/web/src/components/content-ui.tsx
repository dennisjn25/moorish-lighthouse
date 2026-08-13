import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Badge, Breadcrumbs, ButtonLink, Container } from "@/components/ui";
import type { ContentSource } from "@/lib/content/types";

export function PreviewNotice() {
  return (
    <div className="preview-notice" role="status">
      <Container size="wide">
        <strong>Official-channel preview</strong>
        <span>
          Educational summaries are grounded in official Moorish Lighthouse
          videos and remain attributed to the creator. They are not legal
          advice.
        </span>
      </Container>
    </div>
  );
}

export function PageIntro({
  breadcrumbs,
  children,
  eyebrow,
  title,
}: {
  breadcrumbs: ReadonlyArray<{ href?: string; label: string }>;
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <header className="page-intro">
      <Container size="wide">
        <Breadcrumbs items={breadcrumbs} />
        <div className="page-intro__grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className="page-intro__copy">{children}</div>
        </div>
      </Container>
    </header>
  );
}

const editorialArtwork = {
  interior: "/editorial-lantern-room.png",
  media: "/editorial-media.png",
  research: "/editorial-research.png",
} as const;

export function BeaconArtwork({
  className = "",
  label,
  variant = "research",
}: {
  className?: string;
  label: string;
  variant?: keyof typeof editorialArtwork;
}) {
  const classes = ["content-art", `content-art--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Image
        alt={label}
        fill
        loading="eager"
        sizes="(max-width: 800px) 100vw, 58vw"
        src={editorialArtwork[variant]}
      />
    </div>
  );
}

const productArtwork = {
  workbook: "/product-concept-workbook.png",
  workshop: "/product-concept-workshop.png",
} as const;

export function ProductArtwork({
  className = "",
  label,
  variant,
}: {
  className?: string;
  label: string;
  variant: keyof typeof productArtwork;
}) {
  const classes = ["product-artwork", `product-artwork--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <Image
        alt={label}
        fill
        loading="eager"
        sizes="(max-width: 800px) 100vw, 42vw"
        src={productArtwork[variant]}
      />
      <span>Concept preview</span>
    </div>
  );
}

export function ContentTile({
  badge,
  href,
  meta,
  summary,
  title,
}: {
  badge: string;
  href: string;
  meta?: string;
  summary: string;
  title: string;
}) {
  return (
    <article className="content-tile">
      <div>
        <Badge>{badge}</Badge>
        <h2>
          <Link href={href}>{title}</Link>
        </h2>
        <p>{summary}</p>
      </div>
      <footer>
        {meta ? <span>{meta}</span> : <span>Official-channel guide</span>}
        <Link className="text-link" href={href}>
          Open <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </article>
  );
}

export function SourceNote({ source }: { source: ContentSource }) {
  return (
    <aside className="source-note">
      <strong>Source and status</strong>
      <p>{source.label}</p>
      {source.url ? (
        <a href={source.url} rel="noreferrer" target="_blank">
          Visit attributed source
        </a>
      ) : null}
      {source.checkedAt ? <small>Checked {source.checkedAt}</small> : null}
    </aside>
  );
}

export function FilterBar({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <form aria-label={label} className="filter-bar" method="get">
      {children}
      <button className="button button--primary" type="submit">
        Apply filters
      </button>
      <Link className="button button--quiet" href="?">
        Clear
      </Link>
    </form>
  );
}

export function SelectField({
  children,
  defaultValue,
  label,
  name,
}: {
  children: ReactNode;
  defaultValue?: string;
  label: string;
  name: string;
}) {
  return (
    <label className="select-field">
      <span>{label}</span>
      <select defaultValue={defaultValue ?? ""} name={name}>
        {children}
      </select>
    </label>
  );
}

export function EmptyState({
  actionHref,
  actionLabel,
  message,
  title,
}: {
  actionHref: string;
  actionLabel: string;
  message: string;
  title: string;
}) {
  return (
    <div className="empty-state">
      <span aria-hidden="true" className="empty-state__line" />
      <h2>{title}</h2>
      <p>{message}</p>
      <ButtonLink href={actionHref} variant="secondary">
        {actionLabel}
      </ButtonLink>
    </div>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replaceAll("<", "\\u003c"),
      }}
      type="application/ld+json"
    />
  );
}
