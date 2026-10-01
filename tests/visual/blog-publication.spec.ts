import { test, expect } from "@playwright/test";

/**
 * Vérifie la publication automatique des articles programmés :
 * - un article daté dans le futur n'est pas accessible (redirection vers /blog)
 * - un article dont la date est passée (octobre 2026, publié le 1er octobre) est accessible
 */
test.describe("Publication programmée des articles", () => {
  test("un article futur (novembre 2026) redirige vers /blog", async ({ page }) => {
    await page.goto("/blog/novembre-2026-basse-saison-drome-ardeche");
    await page.waitForURL("**/blog", { timeout: 10_000 });
    expect(new URL(page.url()).pathname).toBe("/blog");
    // L'article ne doit pas être listé sur la page blog
    await expect(
      page.locator('a[href="/blog/novembre-2026-basse-saison-drome-ardeche"]')
    ).toHaveCount(0);
  });

  test("un slug inexistant redirige aussi vers /blog", async ({ page }) => {
    await page.goto("/blog/article-qui-nexiste-pas");
    await page.waitForURL("**/blog", { timeout: 10_000 });
    expect(new URL(page.url()).pathname).toBe("/blog");
  });

  test("l'article d'octobre 2026 est accessible depuis le 1er octobre", async ({ page }) => {
    await page.goto("/blog/octobre-2026-toussaint-drome-ardeche");
    await expect(page).toHaveURL(/\/blog\/octobre-2026-toussaint-drome-ardeche$/);
    await expect(page.locator("h1")).toBeVisible();
  });
});
