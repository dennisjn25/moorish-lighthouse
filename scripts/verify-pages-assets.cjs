const fs = require("node:fs");
const path = require("node:path");

const outDir = path.resolve(__dirname, "../apps/web/out");
const repoBase = "/moorish-lighthouse";
const htmlFiles = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else if (entry.name.endsWith(".html")) htmlFiles.push(absolute);
  }
}

walk(outDir);

const missing = [];
const unprefixed = [];
const assetPattern =
  /(?:src|href)=["']([^"']+\.(?:png|jpe?g|webp|gif|svg|ico)(?:\?[^"']*)?)["']/gi;

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(assetPattern)) {
    const url = match[1];
    if (/^(?:https?:|data:)/.test(url)) continue;
    if (!url.startsWith(`${repoBase}/`)) {
      unprefixed.push(`${path.relative(outDir, htmlFile)} -> ${url}`);
      continue;
    }

    const relativeAsset = url
      .slice(repoBase.length + 1)
      .split("?")[0]
      .split("#")[0];
    if (!fs.existsSync(path.join(outDir, relativeAsset))) {
      missing.push(`${path.relative(outDir, htmlFile)} -> ${url}`);
    }
  }
}

if (unprefixed.length || missing.length) {
  if (unprefixed.length) {
    console.error("Unprefixed GitHub Pages assets:\n" + unprefixed.join("\n"));
  }
  if (missing.length) {
    console.error("Missing exported assets:\n" + missing.join("\n"));
  }
  process.exit(1);
}

console.log(
  `Verified ${htmlFiles.length} exported HTML files: all local image assets are repository-prefixed and present.`,
);
