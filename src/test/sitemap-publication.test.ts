import { describe, expect, it } from "vitest";
import { buildEntries, generateSitemap, todayInParis } from "../../scripts/sitemap-lib";

const OCTOBER_URL = "/blog/octobre-2026-toussaint-drome-ardeche";
const NOVEMBER_URL = "/blog/novembre-2026-basse-saison-drome-ardeche";

describe("sitemap — publication programmée des articles", () => {
  it("exclut l'article d'octobre avant le 1er octobre", () => {
    const entries = buildEntries("2026-09-30");
    expect(entries.some((e) => e.path === OCTOBER_URL)).toBe(false);
  });

  it("inclut l'article d'octobre dès le 1er octobre", () => {
    const entries = buildEntries("2026-10-01");
    const entry = entries.find((e) => e.path === OCTOBER_URL);
    expect(entry).toBeDefined();
    expect(entry?.lastmod).toBe("2026-10-01");
  });

  it("garde les articles des mois suivants hors du sitemap", () => {
    const entries = buildEntries("2026-10-01");
    expect(entries.some((e) => e.path === NOVEMBER_URL)).toBe(false);
  });

  it("le XML généré reflète la même règle (absent avant, présent après)", () => {
    const before = generateSitemap(buildEntries("2026-09-30"));
    const after = generateSitemap(buildEntries("2026-10-01"));
    expect(before).not.toContain(OCTOBER_URL);
    expect(after).toContain(`<loc>https://qitconcierge.fr${OCTOBER_URL}</loc>`);
  });

  it("todayInParis bascule à minuit heure française", () => {
    // 30 septembre 23:00 UTC = 1er octobre 01:00 à Paris (UTC+2)
    expect(todayInParis(new Date("2026-09-30T23:00:00Z"))).toBe("2026-10-01");
    expect(todayInParis(new Date("2026-09-30T21:59:59Z"))).toBe("2026-09-30");
  });
});
