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
