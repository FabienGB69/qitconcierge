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

  test("un article non publié n'est jamais indexable (redirection + pas de contenu indexé)", async ({
    page,
  }) => {
    // L'article futur est connu du site mais pas encore publié :
    // il doit rediriger vers /blog, donc jamais servir de contenu indexable.
    await page.goto("/blog/novembre-2026-basse-saison-drome-ardeche");
    await page.waitForURL("**/blog", { timeout: 10_000 });
    expect(new URL(page.url()).pathname).toBe("/blog");

    // La page servie ne doit pas porter de meta robots noindex trompeuse
    // ni le titre de l'article futur.
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robots ?? "index, follow").not.toContain("noindex");
    await expect(page.locator("h1")).not.toContainText("novembre 2026", {
      ignoreCase: true,
    });
  });

  test("un article publié reste indexable (pas de noindex)", async ({ page }) => {
    await page.goto("/blog/octobre-2026-toussaint-drome-ardeche");
    await expect(page.locator("h1")).toBeVisible();
    const robots = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    // Pas de balise robots ou balise explicitement indexable.
    expect(robots ?? "index, follow").not.toContain("noindex");
  });
});
