import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const directory = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(directory, "vertical-slice.ndjson");
const expectedIds = new Set([
  "ml-dev-topic-source-trails",
  "ml-dev-lesson-authority",
  "ml-dev-lesson-inference",
]);

async function loadDocuments() {
  const source = await readFile(sourcePath, "utf8");
  return source
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function validate(documents) {
  if (documents.length !== expectedIds.size) {
    throw new Error(
      `Expected ${expectedIds.size} documents, found ${documents.length}`,
    );
  }

  const ids = new Set(documents.map((document) => document._id));
  for (const id of expectedIds) {
    if (!ids.has(id)) throw new Error(`Missing document ${id}`);
  }

  const topic = documents.find((document) => document._type === "topic");
  const lessons = documents.filter((document) => document._type === "lesson");
  if (!topic || lessons.length !== 2) {
    throw new Error("Seed must contain one topic and two lessons");
  }

  if (documents.some((document) => document.publicationStatus !== "draft")) {
    throw new Error("Tracked seed must remain draft-only");
  }

  for (const lesson of lessons) {
    if (lesson.topic?._ref !== topic._id) {
      throw new Error(`${lesson._id} does not reference ${topic._id}`);
    }
    if (!Array.isArray(lesson.body) || lesson.body.length === 0) {
      throw new Error(`${lesson._id} requires Portable Text body content`);
    }
  }

  return { lessons: lessons.length, topic: topic._id };
}

const [command = "validate", status, output] = process.argv.slice(2);
const documents = await loadDocuments();
const summary = validate(documents);

if (command === "validate") {
  console.log(
    `Validated ${summary.topic} with ${summary.lessons} linked lessons`,
  );
} else if (command === "materialize") {
  if (!new Set(["draft", "published"]).has(status) || !output) {
    throw new Error(
      "Usage: vertical-slice.mjs materialize <draft|published> <output>",
    );
  }
  const rendered = documents
    .map((document) =>
      JSON.stringify({ ...document, publicationStatus: status }),
    )
    .join("\n");
  await writeFile(output, `${rendered}\n`, "utf8");
  console.log(
    `Materialized ${documents.length} documents with status ${status}`,
  );
} else {
  throw new Error(`Unknown command: ${command}`);
}
