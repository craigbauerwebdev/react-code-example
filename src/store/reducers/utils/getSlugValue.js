export default function getSlugValue(slug) {
  return slug
    .split("/")
    .map((slug) => slug.toLowerCase())
    .join("_")
    .replace(/-|\s/g, "_");
}
