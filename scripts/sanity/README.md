# Sanity development vertical slice

These artifacts verify the private `development` dataset pipeline. The text is deliberately labeled as development-only and is not approved Moorish Lighthouse instruction.

## Validate the tracked draft seed

```bash
node scripts/sanity/vertical-slice.mjs validate
```

## Import or restore draft state

From `apps/studio`:

```bash
npx sanity datasets import ../../scripts/sanity/vertical-slice.ndjson \
  --project-id lbxxn6ae \
  --dataset development \
  --replace
```

## Verify remote state

```bash
npx sanity documents query \
  '*[_id in ["ml-dev-topic-source-trails","ml-dev-lesson-authority","ml-dev-lesson-inference"]]{_id,_type,publicationStatus,"slug":slug.current,"topicId":topic._ref}' \
  --project-id lbxxn6ae \
  --dataset development
```

## Temporary local publication-path check

Create a temporary published payload outside the repository:

```bash
node ../../scripts/sanity/vertical-slice.mjs materialize published "$TEMP/moorish-lighthouse-published.ndjson"
npx sanity datasets import "$TEMP/moorish-lighthouse-published.ndjson" \
  --project-id lbxxn6ae \
  --dataset development \
  --replace
```

After local route/search verification, restore the tracked draft seed using the draft import command above and query the three IDs again. Never leave these documents with `publicationStatus: "published"`.
