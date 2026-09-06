// Generate dist/sitemap.xml from the shared public-route list, after `vite
// build`. Keeps the sitemap in lockstep with the routes we prerender — add a
// route in public-routes.mjs and it appears here automatically.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { PUBLIC_ROUTES, SITE_ORIGIN } from "./public-routes.mjs";

const urls = PUBLIC_ROUTES.map(
  ({ path: p, priority }) =>
    `  <url>\n    <loc>${SITE_ORIGIN}${p}</loc>\n    <priority>${priority.toFixed(1)}</priority>\n  </url>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const outPath = path.resolve("dist", "sitemap.xml");
await writeFile(outPath, xml, "utf8");
console.log(`generated ${path.relative(process.cwd(), outPath)} (${PUBLIC_ROUTES.length} urls)`);
