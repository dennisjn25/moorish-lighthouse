# Independent QA review — Task 1 scaffold

Reviewed: 2026-08-10T16:44:20-07:00
Task: `t_2a81b269`
Source task: `t_d086af77`
Workspace: `C:\Users\joshy\Projects\moorish-lighthouse`

## Verdict

**APPROVE Task 1's local/test-only scaffold. No blocking findings within the stated non-production scope.**

This approval is not authorization to deploy. The unresolved Sanity CLI dependency advisories must be re-evaluated before any production deployment or use with untrusted inputs.

## Independent verification

Environment: Node.js `v22.22.3`, npm `10.9.8`, branch `main`.

| Gate                              | Result                          | Evidence                                                                                                                                                                                 |
| --------------------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean lockfile install            | PASS                            | Fresh `npm ci`; 1,309 packages installed; exit 0                                                                                                                                         |
| Prettier                          | PASS                            | `npm run format:check`                                                                                                                                                                   |
| ESLint                            | PASS                            | Studio and web workspaces                                                                                                                                                                |
| Strict TypeScript                 | PASS                            | Studio and web `tsc --noEmit`; both configs enable `strict`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes`                                                                |
| Vitest / RTL / jest-axe           | PASS                            | 1 file, 2 tests; axe result had zero violations                                                                                                                                          |
| Production builds                 | PASS                            | Sanity Studio build and Next.js 16.3.0 Turbopack build; `/` and `/_not-found` statically generated                                                                                       |
| Playwright / @axe-core/playwright | PASS                            | 1 Chromium test; zero detected violations                                                                                                                                                |
| Sanity local runtime              | PASS                            | Local Studio returned HTTP 200 and 8,939-byte Sanity shell; temporary process tree stopped and port 3333 verified closed                                                                 |
| Environment template              | PASS                            | 13 variable names, all blank; `.env*` ignored with `.env.example` explicitly retained                                                                                                    |
| CI workflow                       | PASS by inspection/local parity | Node 22, npm cache, clean install, all README gates, Chromium install, and e2e are present. No remote CI run was possible or appropriate because the repository has no commit or remote. |

The fresh QA run independently reproduced the supplied implementation report. The supplied and QA logs are separate files with distinct hashes, supporting that the evidence was not merely copied.

## Scaffold/configuration findings

- Root npm workspaces target `apps/*`; both `@moorish-lighthouse/web` and `@moorish-lighthouse/studio` resolve after the clean install.
- Next.js is exactly `16.3.0`; Sanity and `@sanity/vision` are exactly `6.9.1`. Live npm metadata returned the same current versions during review.
- Vitest, React Testing Library, `jest-axe`, Playwright, and `@axe-core/playwright` are installed and actually exercised by tests.
- Prettier and ESLint are configured and pass.
- The package lock is reproducible under `npm ci`.

## Security and boundary review

### Secrets

PASS. A pattern-based scan covered 49 source/configuration text files (the binary favicon was skipped) and found no private-key headers, AWS access keys, GitHub tokens, Stripe live keys, or Slack tokens. `.env.example` has 13 names and no values. No credential-bearing environment file is present in the candidate file set.

### No-deploy / no-commit / no-live-resource boundary

PASS.

- `HEAD` does not exist (`git rev-parse --verify HEAD` exited 128): there are no commits.
- `git remote` returned no remotes: there is no configured push target.
- No deploy, remote project-creation, Supabase-link/push, or Stripe-listen command was found in executable/configuration source.
- Runtime URLs used by the scaffold are loopback URLs. Sanity uses the test-only fallback identifier `testproject` when environment identifiers are absent.
- No deployment or live resource was created during QA.

The generated `apps/web/README.md` contains generic upstream Vercel deployment documentation, but there is no deploy script or workflow and no deployment occurred; this is not a boundary violation.

## npm audit disposition

Fresh `npm audit` and `npm audit --omit=dev` both report **14 vulnerable package nodes: 12 moderate, 2 high, 0 critical**. The identical full and omit-dev reports mean the findings cannot be dismissed solely as root `devDependencies`; they enter through the Studio's production dependency on Sanity.

The materially high vulnerable nodes are nevertheless in Sanity CLI/build tooling chains:

- `js-yaml@3.13.1` via `sanity@6.9.1 -> @sanity/cli@7.18.0 -> @vercel/frameworks@3.29.0`; advisories concern prototype pollution and quadratic-complexity denial of service while parsing crafted YAML.
- `undici@7.28.0` via `sanity@6.9.1 -> @sanity/cli -> @sanity/workbench-cli -> @module-federation/vite -> @module-federation/dts-plugin`; advisories include response desynchronization, cross-user information disclosure/crash, and injection issues.
- Moderate findings also include `smol-toml` and `uuid@10.0.0` under the same Sanity CLI graph.

npm's only aggregate remediation proposes a semver-major change to `sanity@5.14.1` (and `@sanity/vision@5.31.1`), which is a downgrade from the required/current 6.9.1 line. A forced fix was correctly not applied.

**Risk decision:** acceptable for this local/test-only scaffold because no production service is deployed, no untrusted YAML/TOML is processed by the affected CLI path, and the vulnerable `undici` node is under CLI/workbench build tooling rather than the Next.js runtime. It remains a release watch item, not a finding that can be closed. Before production deployment, re-run audit, inspect Sanity's patched dependency graph, and require either a non-breaking patched graph or a documented risk acceptance with constrained trusted build inputs.

## Non-blocking hardening notes

1. Pin GitHub Actions to immutable commit SHAs and add explicit least-privilege workflow permissions (for example, `contents: read`) before higher-trust CI or release automation.
2. Treat `npm audit --high`/equivalent as a production release gate with an explicit allowlist/expiry for the current Sanity CLI paths rather than applying `npm audit fix --force`.

## Evidence and hashes

- `artifacts/task-1-clean-install.log` — `c56cecccccdcb41969b7341d25f4645b32799c8c5a71171d430448a1b7548a3c`
- `artifacts/task-1-verification.log` — `08659cae345ab6635825757a4b3b23bfa1714c72635ebbf8a9a931e261115140`
- `artifacts/task-1-qa-clean-install.log` — `8da650c121742ed6f00207175c163f3182186fb9aa3daab1cefc0e6037098825`
- `artifacts/task-1-qa-verification.log` — `877eda150fc89599271d9cf2e9ce236fa6c4a1f31af92608797678829e0fc6ad`
- `artifacts/task-1-qa-audit.json` — `b3c94255e5d1b012d39c430ffc6ffe66b4e02599086d2fccb93da4491030da16`
- `artifacts/task-1-qa-audit-prod.json` — `b3c94255e5d1b012d39c430ffc6ffe66b4e02599086d2fccb93da4491030da16`
- `artifacts/task-1-qa-studio-headers.txt` — `bfa5ae0962f39ef12de22582a263c871cebfb1618bd5f466e566410ddedf998c`
