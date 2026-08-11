import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import path from "path";

const ROOT = path.resolve(__dirname, "../..");
const FILE = path.join(ROOT, "src/pages/MentionsLegales.tsx");

/**
 * Vérifie que les informations légales obligatoires de l'éditeur
 * (SIREN, RCS, TVA intracommunautaire et adresse) sont bien présentes
 * dans la page Mentions légales à chaque build.
 */
describe("Mentions légales — informations éditeur", () => {
  it("le fichier MentionsLegales.tsx existe", () => {
    expect(existsSync(FILE)).toBe(true);
  });

  const content = existsSync(FILE) ? readFileSync(FILE, "utf8") : "";

  const requiredFields: Array<{ label: string; pattern: RegExp }> = [
    {
      label: "SIREN",
      pattern: /SIREN[\s\S]{0,80}798\s*262\s*416/i,
    },
    {
      label: "RCS (Greffe de Lyon)",
      pattern: /R\.C\.S\.?\s*Lyon|RCS\s*Lyon/i,
    },
    {
      label: "TVA intracommunautaire",
      pattern: /TVA\s*intracommunautaire/i,
    },
    {
      label: "Numéro de TVA (FR44798262416)",
      pattern: /FR44798262416/i,
    },
    {
      label: "Adresse (Tain-l'Hermitage)",
      pattern: /Tain-?l[''']Hermitage/i,
    },
  ];

  for (const field of requiredFields) {
    it(`affiche « ${field.label} »`, () => {
      expect(
        content,
        `« ${field.label} » est introuvable dans src/pages/MentionsLegales.tsx — ` +
          `information légale obligatoire manquante.`,
      ).toMatch(field.pattern);
    });
  }
});
