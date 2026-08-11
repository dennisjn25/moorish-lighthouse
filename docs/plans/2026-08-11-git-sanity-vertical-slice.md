# Git Baseline and Sanity Vertical Slice Implementation Plan

> **For Hermes:** Execute task-by-task with TDD for code changes and verify every external write by reading it back.

**Goal:** Establish a clean local Git baseline, connect a private Sanity development dataset, and prove one complete learning-topic content path from draft to temporary local rendering and safely back to draft.

**Architecture:** Keep the current fixture repository as the fail-safe. Sanity remains the source-backed path only when explicit local environment variables are present. The first topic and lessons use deterministic development IDs and `publicationStatus: "draft"`; verification temporarily changes only those custom status fields to `published`, confirms the local website renders the Sanity data, and then restores them to `draft` before handoff.

**Tech stack:** Git, npm workspaces, Next.js 16 App Router, Sanity Studio 6, GROQ, Vitest, Playwright.

---

## Task 1: Create a clean source-control baseline

**Objective:** Commit the current verified application without secrets, caches, screenshots, or compiler residue.

**Files:**

- Modify: `.gitignore`
- Create: `docs/plans/2026-08-11-git-sanity-vertical-slice.md`
- Verify: complete repository index

**Steps:**

1. Ignore `*.tsbuildinfo` and generated visual-evidence files while retaining markdown reports.
2. Scan candidate files for `.env` variants, private keys, tokens, and unexpectedly large generated files.
3. Run `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run e2e`.
4. Stage the complete source baseline with `git add -A`.
5. Inspect `git status --short`, `git diff --cached --stat`, and staged filenames.
6. Commit as `chore: establish verified Moorish Lighthouse baseline`.
7. Verify `git status --short` is empty and `git show --stat --oneline HEAD` resolves.

## Task 2: Discover Sanity account state without mutation

**Objective:** Determine whether the CLI is authenticated and whether an appropriate project already exists.

**Files:** None.

**Steps:**

1. Run the Sanity CLI project-list command from `apps/studio`.
2. Record only project IDs, display names, and dataset names; never print tokens.
3. If authentication is missing, stop at the real login boundary and report the exact command Joshua must authorize interactively.
4. If a matching project exists, select it instead of creating a duplicate.
5. If no matching project exists, create one only under the approval already granted for this milestone, using the name `Moorish Lighthouse`.

## Task 3: Create or select a private development dataset

**Objective:** Configure a non-production dataset for the vertical slice.

**Files:**

- Create locally and keep ignored: `apps/web/.env.local`
- Create locally and keep ignored: `apps/studio/.env.local`
- Modify if required: `.env.example`

**Steps:**

1. List datasets in the selected project.
2. Reuse `development` if present; otherwise create it with private visibility where the plan permits.
3. Set Studio variables `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET=development` locally.
4. Set Web variables `SANITY_PROJECT_ID` and `SANITY_DATASET=development` locally.
5. Do not save read/write tokens in tracked files.
6. Build Studio and Web to verify configuration is accepted.

## Task 4: Add a deterministic draft seed artifact

**Objective:** Create one topic and two linked lessons as clearly labeled development content.

**Files:**

- Create: `scripts/sanity/vertical-slice.ndjson`
- Create: `scripts/sanity/README.md`
- Test: `apps/web/tests/content-repository.test.ts`

**Content IDs:**

- `ml-dev-topic-source-trails`
- `ml-dev-lesson-authority`
- `ml-dev-lesson-inference`

**Steps:**

1. Write a failing repository test proving Sanity results remain unavailable when all documents are draft.
2. Run the focused test and confirm the expected failure.
3. Add the minimum repository seam needed to test the query/result mapping without network mocks if required.
4. Run the focused test until green.
5. Create NDJSON documents with `publicationStatus: "draft"`, explicit development-only titles, slugs, summaries, Portable Text body blocks, sequence order, and topic references.
6. Document import, verification, temporary publication, and rollback commands.
7. Validate NDJSON parsing and schema-required fields locally.

## Task 5: Import and verify draft state

**Objective:** Prove remote creation without making the content website-visible.

**Steps:**

1. Import the deterministic NDJSON into the private `development` dataset.
2. Query the three IDs back through the Sanity CLI/API.
3. Verify all custom publication statuses are `draft`.
4. Run the website against the development dataset and confirm it still excludes those documents.
5. Verify the local fallback remains available if the Sanity query fails.

## Task 6: Exercise publish-to-site and rollback

**Objective:** Prove the full content path without leaving unapproved content published.

**Steps:**

1. Patch only the three development documents to `publicationStatus: "published"`.
2. Read them back and verify the status transition.
3. Start the local website against the development dataset.
4. Verify `/learn`, `/learn/source-trails-development`, and both lesson routes return HTTP 200 and display Sanity-backed content.
5. Verify the search route finds the development topic.
6. Capture one desktop and one mobile screenshot for review evidence.
7. Restore all three documents to `publicationStatus: "draft"`.
8. Read them back again and verify no development document remains website-visible.

## Task 7: Final verification and handoff

**Objective:** Close with reproducible evidence and no hidden remote state.

**Steps:**

1. Run the full quality-gate stack.
2. Verify the Git tree and list any intentional local-only environment files without printing values.
3. Record project ID, dataset name, document IDs, final draft status, commands, and screenshots in an implementation report.
4. Commit code, seed artifacts, tests, and documentation separately from the initial baseline.
5. Report any remaining owner-input boundary: approved lesson copy, biography, credentials, final logo, legal text, and release destination.

## Acceptance criteria

- A verified initial Git commit exists and the tree is clean before Sanity work begins.
- No secret or generated screenshot is committed.
- The Sanity development dataset is private or otherwise explicitly non-production.
- One topic and two lessons can move draft → local website → draft.
- Final remote state is draft-only.
- Fixture fallback still works.
- All quality gates pass against the final files.
