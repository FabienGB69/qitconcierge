import { describe, it, expect } from "vitest";
import {
  WHATSAPP_URL,
  buildWhatsAppUrl,
  validateWhatsAppUrl,
} from "@/lib/whatsapp";

describe("WhatsApp link verification", () => {
  it("produces a wa.me URL with digits only", () => {
    expect(WHATSAPP_URL).toMatch(/^https:\/\/wa\.me\/\d+$/);
  });

  it("does not contain a leading zero after the French country code", () => {
    const number = WHATSAPP_URL.replace("https://wa.me/", "");
    // France is 33; the national trunk prefix (0) must be removed.
    expect(number.startsWith("330")).toBe(false);
  });

  it("has a valid French-length number when configured with a French number", () => {
    const number = WHATSAPP_URL.replace("https://wa.me/", "");
    if (number.startsWith("33")) {
      expect(number.length).toBe(11);
    }
  });

  it("builds a pre-filled message URL with encoded text", () => {
    const url = buildWhatsAppUrl("Bonjour, j'ai une question.");
    expect(url).toMatch(/^https:\/\/wa\.me\/\d+\?text=/);
    expect(decodeURIComponent(url.split("?text=")[1])).toBe(
      "Bonjour, j'ai une question."
    );
  });

  it("appends UTM context to the pre-filled message when provided", () => {
    const url = buildWhatsAppUrl("Bonjour", {
      source: "hero",
      medium: "wa_link",
      campaign: "hero_cta",
    });
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toBe("Bonjour\n\n(utm_source=hero|utm_medium=wa_link|utm_campaign=hero_cta)");
  });

  it("omits empty UTM fields from the appended note", () => {
    const url = buildWhatsAppUrl("Bonjour", { source: "hero", medium: "", campaign: undefined });
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toBe("Bonjour\n\n(utm_source=hero)");
  });

  it("builds a URL without a message note when no text is given but utm is", () => {
    const url = buildWhatsAppUrl(undefined, { source: "hero" });
    const decoded = decodeURIComponent(url.split("?text=")[1]);
    expect(decoded).toBe("(utm_source=hero)");
  });

  it("validates the default WhatsApp URL", () => {
    const result = validateWhatsAppUrl(WHATSAPP_URL);
    expect(result.valid).toBe(true);
    expect(result.issues).toEqual([]);
  });

  it("detects an invalid number in a WhatsApp URL", () => {
    const result = validateWhatsAppUrl("https://wa.me/12345");
    expect(result.valid).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it("flags a French number with a leading zero", () => {
    const result = validateWhatsAppUrl("https://wa.me/330601777633");
    expect(result.valid).toBe(false);
    expect(result.issues.some((i) => i.includes("0 national"))).toBe(true);
  });
});
