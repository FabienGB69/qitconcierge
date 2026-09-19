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

/**
 * Visible message sent to the prospect. This is the ONLY content allowed in
 * the wa.me `text` parameter. It is a branded type so analytics payloads
 * (tracking objects, UTM strings) cannot be passed by mistake: only values
 * produced by `whatsAppMessage()` are accepted.
 */
export type WhatsAppMessage = string & { readonly __brand: "WhatsAppMessage" };

/**
 * Longueur maximale (en caractères) du message prérempli.
 * Sur certains appareils mobiles, un paramètre `text` trop long dans le lien
 * wa.me est tronqué silencieusement ou fait échouer l'ouverture de
 * l'application. On reste très en dessous des limites constatées (~1000-2000
 * caractères selon l'OS) tout en gardant une marge pour l'encodage URL.
 */
export const WHATSAPP_MESSAGE_MAX_LENGTH = 400;

/**
 * Defensive cleanup: strips any tracking-looking fragment (utm_*, source=,
 * medium=, campaign=, parenthesised tag lists) that could have leaked into
 * the visible text, then trims.
 */
function sanitizeVisibleMessage(raw: string): string {
  return raw
    .replace(/\(?(utm_[a-z]+|source|medium|campaign)\s*=[^)\s|]+[)|]?/gi, "")
    .replace(/[|]/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,!?])/g, "$1")
    .trim();
}

/**
 * Marks a plain string as a visible WhatsApp message. Applies the defensive
 * sanitizer so even a misused call site cannot leak tracking tags into the
 * text the prospect reads and sends.
 */
export function whatsAppMessage(raw: string): WhatsAppMessage {
  return sanitizeVisibleMessage(raw) as WhatsAppMessage;
}

/**
 * Tronque proprement un message à la longueur maximale autorisée, en coupant
 * sur une frontière de mot pour ne jamais laisser un mot coupé, et en ajoutant
 * une ellipse. Si le message est déjà sous la limite, il est retourné tel quel.
 */
function truncateMessage(message: string, maxLength: number): string {
  if (message.length <= maxLength) return message;

  const budget = maxLength - 1; // réserve 1 caractère pour "…"
  let cut = message.slice(0, budget);

  // Reculer jusqu'à la dernière frontière de mot (espace ou ponctuation de fin).
  const lastSpace = cut.search(/[\s,;:!?][^\s,;:!?]*$/);
  if (lastSpace > budget * 0.5) {
    cut = cut.slice(0, lastSpace);
  }

  return cut.replace(/[\s,;:!?]+$/, "") + "…";
}

export interface WhatsAppMessageCheck {
  ok: boolean;
  length: number;
  maxLength: number;
  /** Taille du message une fois encodé en URL (indicateur du poids du lien). */
  encodedLength: number;
  /** Message final garanti compatible (tronqué si besoin). */
  safeMessage: WhatsAppMessage;
  issues: string[];
}

/**
 * Vérifie qu'un message WhatsApp reste correctement encodable et sous la
 * limite de longueur mobile. Retourne toujours un `safeMessage` utilisable :
 * jamais de mot coupé, jamais au-delà de la limite, et encodage validé par un
 * aller-retour encodeURIComponent/decodeURIComponent.
 */
export function checkWhatsAppMessage(raw: string): WhatsAppMessageCheck {
  const issues: string[] = [];
  const cleaned = sanitizeVisibleMessage(raw);

  // Vérifie l'aller-retour d'encodage : le texte doit survivre intact.
  try {
    const roundTrip = decodeURIComponent(encodeURIComponent(cleaned));
    if (roundTrip !== cleaned) {
      issues.push("L'encodage URL altère le message");
    }
  } catch {
    issues.push("Le message contient des caractères non encodables");
  }

  let safe = cleaned;
  if (cleaned.length > WHATSAPP_MESSAGE_MAX_LENGTH) {
    issues.push(
      `Le message dépasse ${WHATSAPP_MESSAGE_MAX_LENGTH} caractères (risque de troncature sur mobile) : tronqué proprement`
    );
    safe = truncateMessage(cleaned, WHATSAPP_MESSAGE_MAX_LENGTH);
  }

  return {
    ok: issues.length === 0,
    length: cleaned.length,
    maxLength: WHATSAPP_MESSAGE_MAX_LENGTH,
    encodedLength: encodeURIComponent(cleaned).length,
    safeMessage: safe as WhatsAppMessage,
    issues,
  };
}

/**
 * Builds a wa.me deep link from a VISIBLE message only.
 *
 * Strict separation of concerns: this function knows nothing about analytics.
 * Attribution (source/medium/campaign) is recorded client-side via
 * `trackWhatsAppClick` (see `@/lib/analytics`) on the click handler, never in
 * the URL the prospect sees.
 */
export const buildWhatsAppUrl = (message?: WhatsAppMessage) => {
  const encoded = message ? `?text=${encodeURIComponent(message)}` : "";
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
        // French number sanity check: 33 + 9 digits = 11 total.
        if (pathNumber.startsWith("33")) {
          if (pathNumber[2] === "0") {
            issues.push("Le numéro français ne doit pas contenir de 0 national après l'indicatif 33");
          } else if (pathNumber.length !== 11) {
            issues.push("Un numéro français internationalisé doit contenir 11 chiffres (33 + 9)");
          }
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
