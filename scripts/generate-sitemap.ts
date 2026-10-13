// Generates public/sitemap.xml from the app's static routes + blog posts.
// Runs before `vite dev` and `vite build` (predev/prebuild npm scripts).
//
// Blog posts are read from src/data/blogPosts.ts by regex parsing rather than
// importing the module, because that module imports image assets that only
// Vite can resolve. The logic lives in scripts/sitemap-lib.ts (unit-tested).

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { buildEntries, generateSitemap, todayInParis } from "./sitemap-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const entries = buildEntries(todayInParis());
const xml = generateSitemap(entries);
writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml + "\n", "utf8");
console.log(`sitemap.xml written (${entries.length} entries)`);
