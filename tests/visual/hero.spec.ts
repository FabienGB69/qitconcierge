import { test, expect, type Locator, type Page } from "@playwright/test";

type Box = { x: number; y: number; width: number; height: number };

const TOLERANCE = 2; // px — anti-aliasing / sub-pixel rounding

async function boxOf(locator: Locator, label: string): Promise<Box & { label: string }> {
  const box = await locator.boundingBox();
  expect(box, `${label} should be visible and have a bounding box`).not.toBeNull();
  return { ...(box as Box), label };
}

function overlapArea(a: Box, b: Box) {
  const dx = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
  const dy = Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y);
  if (dx <= TOLERANCE || dy <= TOLERANCE) return 0;
  return dx * dy;
}

async function gotoHero(page: Page) {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}`,
  });
  const hero = page.locator("section").first();
  await expect(hero).toBeVisible();
  await page.locator("h1").first().waitFor({ state: "visible" });
  await page.locator("img").first().evaluate((img: HTMLImageElement) =>
    img.complete ? Promise.resolve() : new Promise((r) => img.addEventListener("load", () => r(null), { once: true })),
  );
  return hero;
}

test.describe("Hero — régression visuelle & chevauchements", () => {
  test("aucun chevauchement entre texte, image et boutons", async ({ page }) => {
    const hero = await gotoHero(page);

    const elements = [
      await boxOf(hero.locator("h1").first(), "h1"),
      await boxOf(hero.locator("p").first(), "paragraphe"),
      await boxOf(hero.getByRole("link").first(), "CTA principal"),
      await boxOf(hero.locator("img").first(), "image hero"),
    ];

    const collisions: string[] = [];
    for (let i = 0; i < elements.length; i++) {
      for (let j = i + 1; j < elements.length; j++) {
        const area = overlapArea(elements[i], elements[j]);
        if (area > 0) {
          collisions.push(`${elements[i].label} ↔ ${elements[j].label} (${Math.round(area)}px²)`);
        }
      }
    }
    expect(collisions, `Chevauchements détectés: ${collisions.join(", ")}`).toEqual([]);
  });

  test("tous les boutons/liens du hero sont visibles et non tronqués", async ({ page }) => {
    const hero = await gotoHero(page);
    const links = hero.getByRole("link");
    const count = await links.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const link = links.nth(i);
      const label = (await link.innerText()).trim() || `lien #${i}`;
      await expect(link, `${label} doit être visible`).toBeVisible();

      const box = await boxOf(link, label);
      expect(box.width, `${label} doit avoir une largeur > 0`).toBeGreaterThan(0);
      expect(box.height, `${label} doit avoir une hauteur >= 40px (cible tactile)`).toBeGreaterThanOrEqual(40);

      const clipped = await link.evaluate(
        (el) => el.scrollWidth - el.clientWidth > 2 || el.scrollHeight - el.clientHeight > 2,
      );
      expect(clipped, `${label} ne doit pas être tronqué (texte coupé)`).toBe(false);
    }
  });

  test("le hero ne déborde pas horizontalement", async ({ page }, testInfo) => {
    await gotoHero(page);
    const viewportWidth = testInfo.project.use.viewport!.width;
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth, "pas de scroll horizontal").toBeLessThanOrEqual(viewportWidth + 1);
  });

  test("capture de référence du hero", async ({ page }) => {
    const hero = await gotoHero(page);
    await expect(hero).toHaveScreenshot("hero.png");
  });
});
