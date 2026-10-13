// Pure, testable logic for sitemap generation.
// The CLI wrapper lives in scripts/generate-sitemap.ts.

import { readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

export const BASE_URL = "https://qitconcierge.fr";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

export type Changefreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

export interface SitemapEntry {
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

export interface BlogMeta {
  slug: string;
  date: string;
}

/** Extract { slug, date } pairs from current and scheduled data files without importing assets. */
export function readBlogPosts(): BlogMeta[] {
  const posts: BlogMeta[] = [];
  for (const relativePath of ["src/data/blogPosts.ts", "src/data/scheduledBlogPosts.ts"]) {
    const file = resolve(ROOT, relativePath);
    if (!existsSync(file)) continue;
    const src = readFileSync(file, "utf8");
    // Match each object literal that starts with `slug:` inside the posts array.
    const objectRe = /\{\s*slug:\s*"([^"]+)"[\s\S]*?\}/g;
    let m: RegExpExecArray | null;
    while ((m = objectRe.exec(src)) !== null) {
      const block = m[0];
      const slug = m[1];
      const dateMatch = block.match(/date:\s*"([^"]+)"/);
      if (slug && !posts.some((post) => post.slug === slug)) {
        posts.push({ slug, date: dateMatch?.[1] ?? "" });
      }
    }
  }
  return posts;
}

/** YYYY-MM-DD for an instant in the publication timezone (Europe/Paris). */
export function todayInParis(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * Builds all sitemap entries for a given publication day (YYYY-MM-DD,
 * Europe/Paris). Future-dated blog posts are excluded so a monthly article
 * prepared in advance is not referenced before it goes live.
 */
export function buildEntries(today: string = todayInParis()): SitemapEntry[] {
  const entries: SitemapEntry[] = [...STATIC_ENTRIES];
  for (const post of readBlogPosts()) {
    if (post.date && post.date > today) continue;
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

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => XML_ENTITIES[ch] ?? ch);
}

export function generateSitemap(entries: SitemapEntry[]): string {
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
