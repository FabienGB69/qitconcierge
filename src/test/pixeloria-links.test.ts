import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";

const SRC_DIR = path.resolve(__dirname, "..");
const EXTENSIONS = new Set([".ts", ".tsx", ".jsx", ".js", ".html"]);
const SKIP_DIRS = new Set(["node_modules", "test", "__tests__", "integrations"]);

function walk(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(path.extname(entry))) files.push(full);
  }
  return files;
}

describe("Pixeloria links", () => {
  const files = walk(SRC_DIR);
  // Match either a real anchor href= or any quoted URL referencing pixeloria
  const urlRegex = /https?:\/\/[^\s"'`<>)]*pixeloria[^\s"'`<>)]*/gi;
  const offenders: string[] = [];
  let totalLinks = 0;

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const matches = content.match(urlRegex) ?? [];
    for (const url of matches) {
      totalLinks++;
      // Allowed: exact https://pixeloria.fr (optionally with trailing slash or path)
      const ok = /^https:\/\/pixeloria\.fr(\/.*)?$/.test(url);
      if (!ok) {
        offenders.push(`${path.relative(SRC_DIR, file)} → ${url}`);
      }
    }
  }

  it("finds at least one Pixeloria link in the codebase", () => {
    expect(totalLinks).toBeGreaterThan(0);
  });

  it("only points to https://pixeloria.fr", () => {
    expect(offenders, `Unexpected Pixeloria URLs:\n${offenders.join("\n")}`).toEqual([]);
  });
});
