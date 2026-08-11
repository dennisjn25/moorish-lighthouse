# Scaffold decisions

- Verified live npm metadata on 2026-08-10 before scaffolding: `create-next-app`/Next.js 16.3.0 and Sanity 6.9.1.
- Generated `apps/web` with the official `create-next-app` TypeScript, App Router, Tailwind, ESLint, and `src/` options.
- Kept Sanity Studio as a separate workspace under `apps/studio`, matching the approved repository layout.
- Did not run Sanity's remote project-creation flow because this task forbids creating external resources or using live credentials. The Studio uses the current Sanity packages and a local test-only fallback identifier; real project and dataset identifiers remain environment-only.
- Package workspaces currently include deployable apps only. Reserved `packages/`, `supabase/`, and policy/operations directories are present for later tasks without publishing empty npm packages.
