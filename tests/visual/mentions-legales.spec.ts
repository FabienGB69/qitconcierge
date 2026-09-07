import { test, expect, type Page } from "@playwright/test";

const FIELDS = [
  { label: "SIREN", text: "798 262 416" },
  { label: "Numéro RCS", text: "798 262 416 R.C.S. Lyon" },
  { label: "TVA intracommunautaire", text: "FR44798262416" },
  { label: "Adresse", text: "61 C Avenue Gabriel Péri, 26600 Tain-l'Hermitage, France" },
];

async function gotoLegal(page: Page) {
  await page.goto("/mentions-legales", { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}`,
  });
  await page.locator("h1").first().waitFor({ state: "visible" });
}

// Finds the <dd> that follows a <dt> whose text includes the label.
async function ddFor(page: Page, label: string) {
  const dd = await page.evaluate((lbl) => {
    const dts = Array.from(document.querySelectorAll("dt"));
    const dt = dts.find((d) => (d.textContent ?? "").trim().includes(lbl));
    if (!dt) return null;
    let dd = dt.nextElementSibling as HTMLElement | null;
    while (dd && dd.tagName !== "DD") dd = dd.nextElementSibling as HTMLElement | null;
    if (!dd) return null;
    return {
      text: (dd.textContent ?? "").trim(),
      scrollWidth: dd.scrollWidth,
      clientWidth: dd.clientWidth,
      rect: dd.getBoundingClientRect().toJSON(),
    };
  }, label);
  return dd;
}

test.describe("Mentions légales — lisibilité mobile", () => {
  // Mobile only: the risk is truncation on small widths.
  test.skip(({ viewport }) => !viewport || viewport.width > 420, "mobile-only");

  for (const field of FIELDS) {
    test(`${field.label} n'est ni coupé ni tronqué`, async ({ page }) => {
      await gotoLegal(page);
      const dd = await ddFor(page, field.label);
      expect(dd, `${field.label} dd introuvable`).not.toBeNull();
      expect(dd!.text.replace(/\s+/g, " ").trim()).toContain(field.text.replace(/\s+/g, " ").trim());
      // No internal horizontal overflow: content fits its box.
      expect(dd!.scrollWidth, `${field.label} déborde horizontalement`).toBeLessThanOrEqual(dd!.clientWidth + 1);
      // Stays within the viewport horizontally.
      expect(dd!.rect.right, `${field.label} sort du viewport`).toBeLessThanOrEqual(viewportWidth(page));
    });
  }

  test("aucun débordement horizontal de page", async ({ page }) => {
    await gotoLegal(page);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, "la page déborde horizontalement").toBeLessThanOrEqual(1);
  });

  test("boutons copier présents pour adresse, téléphone et e-mail", async ({ page }) => {
    await gotoLegal(page);
    const count = await page.getByRole("button", { name: /Copier/ }).count();
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

function viewportWidth(page: Page) {
  return page.viewportSize()?.width ?? 0;
}
