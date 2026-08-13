# Moorish Lighthouse

Task 1 foundation for the Moorish Lighthouse education, media, consulting, and commerce platform.

## Requirements

- Node.js 22 or newer
- npm 10 or newer

## Local setup

```bash
npm ci
npm run dev:web
npm run dev:studio
```

The web app defaults to `http://127.0.0.1:3000`. Sanity Studio prints its local URL when started. Copy `.env.example` to `.env.local` and provide development/test identifiers only; never commit credentials.

## Owner administration

Sanity Studio is the private content and catalog admin for Moorish Lighthouse. It
manages site settings, navigation, authors, topics, lessons, blog posts, videos,
and shop products/services. Sanity's native Draft and Publish controls determine
what the public site reads; no duplicate publication-status field is required.

The production Studio uses Sanity project `lbxxn6ae` and the `production`
dataset. The public dataset exposes published documents for static builds;
drafts and editing remain protected by Sanity authentication. GitHub Pages
rebuilds from published content on pushes, manual dispatches, and a 15-minute
schedule. Production builds fail instead of silently substituting preview
fixtures when Sanity is unavailable.

The initial production seed is create-only and safe to rerun:

```bash
SANITY_STUDIO_DATASET=production npm run seed:production --workspace @moorish-lighthouse/studio
```

It creates missing baseline records and never overwrites later Studio edits.

The non-destructive publish lifecycle verifier creates a temporary draft,
confirms drafts are private and published content is public, then removes it:

```bash
SANITY_STUDIO_DATASET=production npm run verify:publish --workspace @moorish-lighthouse/studio
```

Studio does not manage payment capture, orders, refunds, consultation bookings,
or class attendance. Those require an approved commerce/booking provider and a
separate owner workflow before the store is transactional.

## Quality gates

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run e2e
```

No deployment, paid resource creation, or live-provider configuration is part of this scaffold.
