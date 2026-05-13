// Central WhatsApp configuration.
// The destination number can be overridden at build time via the
// VITE_WHATSAPP_NUMBER environment variable (international format, digits only).
// Example: VITE_WHATSAPP_NUMBER=330601777633

const FALLBACK_NUMBER = "330601777633";

const raw = (import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined) ?? "";
const sanitized = raw.replace(/\D/g, "");

export const WHATSAPP_NUMBER = sanitized || FALLBACK_NUMBER;
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const buildWhatsAppUrl = (text?: string) =>
  text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
