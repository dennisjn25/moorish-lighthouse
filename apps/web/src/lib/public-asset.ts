export function publicAsset(
  path: `/${string}`,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "",
) {
  const normalizedBasePath =
    basePath === "/" ? "" : basePath.replace(/\/$/, "");
  return `${normalizedBasePath}${path}`;
}
