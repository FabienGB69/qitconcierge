// Central WhatsApp configuration.
// The destination number can be overridden at build time via the
// VITE_WHATSAPP_NUMBER environment variable.
// Expected formats: international E.164, e.g. +33 6 01 77 76 33 or 33601777633.
// The module normalizes the number and exposes validation helpers so every
// click opens the right WhatsApp conversation.

const FALLBACK_NUMBER = "+33 6 01 77 76 33";

function removeNonDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Normalize a phone number into the E.164-like format expected by wa.me.
 * Rules applied:
 *  - keep digits only
 *  - strip leading "00" international prefix
 *  - if the number starts with a French country code (33) followed by a leading
 *    national "0" (e.g. 330601777633), remove that "0" → 33601777633
 */
function normalizeWhatsAppNumber(input: string): string {
  let digits = removeNonDigits(input);

  if (!digits) {
    digits = removeNonDigits(FALLBACK_NUMBER);
  }

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith("330") && digits.length > 3) {
    digits = "33" + digits.slice(3);
  }

  return digits;
}

const raw = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "";
export const WHATSAPP_NUMBER = normalizeWhatsAppNumber(raw);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const buildWhatsAppUrl = (text?: string) => {
  const encoded = text ? `?text=${encodeURIComponent(text)}` : "";
  return `${WHATSAPP_URL}${encoded}`;
};

export interface WhatsAppValidationResult {
  valid: boolean;
  url: string;
  number: string;
  issues: string[];
  hasPrefilledMessage: boolean;
}

/**
 * Verify that a WhatsApp URL will open the correct conversation.
 * Checks the number length, the wa.me prefix and the encoded message.
 */
export function validateWhatsAppUrl(url: string): WhatsAppValidationResult {
  const issues: string[] = [];
  const result: WhatsAppValidationResult = {
    valid: false,
    url,
    number: "",
    issues,
    hasPrefilledMessage: false,
  };

  try {
    const parsed = new URL(url);
    if (!parsed.href.startsWith("https://wa.me/")) {
      issues.push("L'URL doit commencer par https://wa.me/");
      return result;
    }

    const pathNumber = parsed.pathname.replace(/^\//, "");
    if (!/^\d+$/.test(pathNumber)) {
      issues.push("Le numéro de téléphone ne doit contenir que des chiffres");
    } else {
      result.number = pathNumber;
      if (pathNumber.length < 10) {
        issues.push("Le numéro semble trop court");
      }
      if (pathNumber.length > 15) {
        issues.push("Le numéro semble trop long");
      }
      // French number sanity check
      if (pathNumber.startsWith("33") && pathNumber.length !== 12) {
        issues.push("Un numéro français internationalisé doit contenir 12 chiffres (33 + 9)");
      }
    }

    const text = parsed.searchParams.get("text");
    result.hasPrefilledMessage = text !== null && text.length > 0;

    result.valid = issues.length === 0;
  } catch {
    issues.push("L'URL WhatsApp n'est pas valide");
  }

  return result;
}

/**
 * Development-time sanity check: logs the configured WhatsApp URL and any
 * detected issue. This is harmless in production and helps catch a broken
 * number/message at build/runtime.
 */
export function verifyWhatsAppSetup(): WhatsAppValidationResult {
  const check = validateWhatsAppUrl(WHATSAPP_URL);
  if (!check.valid && import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.warn("[WhatsApp] Configuration suspecte:", check.issues);
  }
  return check;
}
