import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");
const SCAN_DIRS = ["src", "public", "supabase/functions"].map((d) => path.join(ROOT, d));
const EXTRA_FILES = ["index.html"].map((f) => path.join(ROOT, f));
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".html", ".txt", ".xml", ".md", ".json"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);
const SELF = path.resolve(__filename);

function walk(dir: string, files: string[] = []): string[] {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (EXTENSIONS.has(path.extname(entry))) files.push(full);
  }
  return files;
}

// Any spelling of the surname that is NOT the canonical "GOMES-BANCEL"
// e.g. "GOMEZ BANCEL", "Gomez-Bancel", "Gomes Bancel", "gomez bancel"
const BAD_SPELLING = /gome[sz][\s\u00A0_-]*bancel/gi;
const CANONICAL = /^GOMES-BANCEL$/i;

describe("GOMES-BANCEL spelling", () => {
  const files = [...SCAN_DIRS.flatMap((d) => walk(d)), ...EXTRA_FILES.filter(existsSync)].filter(
    (f) => path.resolve(f) !== SELF,
  );

  const offenders: string[] = [];
  let occurrences = 0;

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    const lines = content.split("\n");
    lines.forEach((line, i) => {
      const matches = line.match(BAD_SPELLING) ?? [];
      for (const m of matches) {
        occurrences++;
        if (!CANONICAL.test(m.trim())) {
          offenders.push(`${path.relative(ROOT, file)}:${i + 1} → "${m}"`);
        }
      }
    });
  }

  it("finds the surname somewhere in the codebase", () => {
    expect(occurrences).toBeGreaterThan(0);
  });

  it("always spells it GOMES-BANCEL (never GOMEZ BANCEL or variants)", () => {
    expect(
      offenders,
      `Mauvaise orthographe détectée (attendu "GOMES-BANCEL") :\n${offenders.join("\n")}`,
    ).toEqual([]);
  });
});
