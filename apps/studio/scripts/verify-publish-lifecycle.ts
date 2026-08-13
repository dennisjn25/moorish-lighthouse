import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";

const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId) throw new Error("SANITY_STUDIO_PROJECT_ID is required.");

const client = getCliClient({ apiVersion: "2026-08-01", dataset });
const anonymousClient = createClient({
  apiVersion: "2026-08-01",
  dataset,
  perspective: "published",
  projectId,
  useCdn: false,
});
const id = "verification-publish-lifecycle";
const draftId = `drafts.${id}`;
const document = {
  _type: "topic",
  introduction:
    "Temporary draft used to verify the production publish lifecycle.",
  order: 999,
  slug: { _type: "slug", current: "verification-publish-lifecycle" },
  summary: "Temporary draft used only for deployment verification.",
  title: "Verification publish lifecycle",
};

async function cleanup() {
  await client.transaction().delete(id).delete(draftId).commit();
}

async function publicCount() {
  return anonymousClient.fetch<number>(
    "count(*[_id == $id || _id == $draftId])",
    { draftId, id },
  );
}

async function main() {
  await cleanup();
  await client.create({ ...document, _id: draftId });

  const draftPublic = await publicCount();
  if (draftPublic !== 0) throw new Error("Draft was visible anonymously.");

  await client.createOrReplace({ ...document, _id: id });
  const publishedPublic = await publicCount();
  if (publishedPublic !== 1) {
    throw new Error("Published document was not visible anonymously.");
  }

  await cleanup();
  const removedPublic = await publicCount();
  if (removedPublic !== 0) {
    throw new Error("Verification document was not cleaned up.");
  }

  console.log(
    JSON.stringify(
      { dataset, draftPublic, publishedPublic, removedPublic },
      null,
      2,
    ),
  );
}

void main().catch(async (error: unknown) => {
  await cleanup().catch(() => undefined);
  console.error(error);
  process.exitCode = 1;
});
