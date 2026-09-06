// Single source of truth for public, crawlable routes. Consumed by the
// prerender step (scripts/prerender.mjs) and the sitemap generator
// (scripts/generate-sitemap.mjs). Add a public route here and both the
// prerendered HTML and sitemap.xml pick it up on the next build.
export const SITE_ORIGIN = "https://speedrun.watch";

export const PUBLIC_ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/guides", priority: 0.7 },
  { path: "/guides/runner-role", priority: 0.7 },
  { path: "/terms-of-service", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.3 },
];
