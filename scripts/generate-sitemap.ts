// Generates public/sitemap.xml from the app's static routes + blog posts.
// Runs before `vite dev` and `vite build` (predev/prebuild npm scripts).
//
// Blog posts are read from src/data/blogPosts.ts by regex parsing rather than
// importing the module, because that module imports image assets that only
// Vite can resolve.

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const BASE_URL = "https://qitconcierge.fr";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

type Changefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: Changefreq;
  priority?: string;
}

/** Public landing pages (Drôme-Ardèche SEO). Keep in sync with src/App.tsx. */
const LANDINGS: Array<{ path: string; priority: string }> = [
  { path: "/conciergerie-airbnb-drome", priority: "0.9" },
  { path: "/conciergerie-airbnb-ardeche", priority: "0.9" },
  { path: "/conciergerie-location-courte-duree-drome", priority: "0.9" },
  { path: "/conciergerie-location-courte-duree-ardeche", priority: "0.9" },
  { path: "/gestion-location-courte-duree-drome-ardeche", priority: "0.9" },
  { path: "/conciergerie-airbnb-tain-hermitage", priority: "0.85" },
  { path: "/conciergerie-airbnb-tournon", priority: "0.85" },
  { path: "/conciergerie-airbnb-valence", priority: "0.85" },
  { path: "/conciergerie-airbnb-romans-sur-isere", priority: "0.85" },
  { path: "/conciergerie-airbnb-saint-vallier", priority: "0.8" },
  { path: "/gestion-gite-drome", priority: "0.85" },
  { path: "/gestion-gite-ardeche", priority: "0.85" },
  { path: "/conciergerie-residence-secondaire-drome-ardeche", priority: "0.85" },
  { path: "/revenue-management-airbnb-drome-ardeche", priority: "0.8" },
  { path: "/gestion-booking-abritel-drome-ardeche", priority: "0.8" },
  { path: "/conciergerie-airbnb-nyons", priority: "0.85" },
  { path: "/conciergerie-airbnb-die", priority: "0.8" },
  { path: "/conciergerie-airbnb-montelimar", priority: "0.85" },
];

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  ...LANDINGS.map((l) => ({ ...l, changefreq: "monthly" as Changefreq })),
  { path: "/blog", changefreq: "weekly", priority: "0.9" },
  { path: "/reglementation", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/tarifs", changefreq: "monthly", priority: "0.9" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/methode", changefreq: "monthly", priority: "0.9" },
  { path: "/a-propos", changefreq: "monthly", priority: "0.7" },
  { path: "/mentions-legales", priority: "0.3" },
  { path: "/politique-confidentialite", priority: "0.3" },
  { path: "/cgv", priority: "0.3" },
];

interface BlogMeta {
  slug: string;
  date: string;
}

/** Extract { slug, date } pairs from src/data/blogPosts.ts without importing it. */
function readBlogPosts(): BlogMeta[] {
  const file = resolve(ROOT, "src/data/blogPosts.ts");
  if (!existsSync(file)) return [];
  const src = readFileSync(file, "utf8");
  const posts: BlogMeta[] = [];
  // Match each object literal that starts with `slug:` inside the posts array.
  const objectRe = /\{\s*slug:\s*"([^"]+)"[\s\S]*?\}/g;
  let m: RegExpExecArray | null;
  while ((m = objectRe.exec(src)) !== null) {
    const block = m[0];
    const slug = m[1];
    const dateMatch = block.match(/date:\s*"([^"]+)"/);
    if (slug) posts.push({ slug, date: dateMatch?.[1] ?? "" });
  }
  return posts;
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [...STATIC_ENTRIES];
  const now = Date.now();
  for (const post of readBlogPosts()) {
    // Only include posts whose publication date has passed, so a
    // future-dated article (monthly article prepared in advance) is not
    // referenced in the sitemap before it goes live.
    if (post.date && +new Date(post.date) > now) continue;
    entries.push({
      path: `/blog/${post.slug}`,
      lastmod: post.date || undefined,
      changefreq: "monthly",
      priority: "0.7",
    });
  }
  return entries;
}

const XML_ENTITIES: Record<string, string> = {
  "&": "&" + "amp;",
  "<": "&" + "lt;",
  ">": "&" + "gt;",
  '"': "&" + "quot;",
  "'": "&" + "apos;",
};

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => XML_ENTITIES[ch] ?? ch);
}

function generateSitemap(entries: SitemapEntry[]): string {
  const urls = entries.map((e) =>
    [
      "  <url>",
      `    <loc>${BASE_URL}${escapeXml(e.path)}</loc>`,
      e.lastmod ? `    <lastmod>${escapeXml(e.lastmod)}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

const entries = buildEntries();
const xml = generateSitemap(entries);
writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml + "\n", "utf8");
console.log(`sitemap.xml written (${entries.length} entries)`);
