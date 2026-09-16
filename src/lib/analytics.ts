// Lightweight analytics helper. Forwards events to any provider that is
// loaded on the page (GA4 via gtag, GTM dataLayer, Plausible) and logs to
// the console as a fallback so you can verify firing during development.

type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    plausible?: (event: string, options?: { props?: EventParams }) => void;
  }
}

export const trackEvent = (name: string, params: EventParams = {}) => {
  try {
    if (typeof window === "undefined") return;

    // Google Analytics 4
    if (typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }

    // Google Tag Manager
    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: name, ...params });
    }

    // Plausible
    if (typeof window.plausible === "function") {
      window.plausible(name, { props: params });
    }

    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.info("[analytics]", name, params);
    }
  } catch (err) {
    // Never let analytics break the UX
    // eslint-disable-next-line no-console
    console.warn("analytics error", err);
  }
};

/**
 * Analytics context for a WhatsApp click. Kept strictly separate from the
 * visible message: these fields go to the analytics provider ONLY, never
 * into the wa.me URL the prospect sees.
 */
export interface WhatsAppClickContext {
  location: string;
  language: "fr" | "en";
  source: string;
  medium: string;
  campaign: string;
}

/**
 * Records both WhatsApp hero events (click + message intent) with the given
 * attribution context. This is the single entry point for WhatsApp tracking,
 * so no call site needs to build UTM strings near the visible message.
 */
export const trackWhatsAppClick = (ctx: WhatsAppClickContext) => {
  trackEvent("whatsapp_hero_click", { ...ctx });
  trackEvent("whatsapp_message_sent", {
    location: ctx.location,
    language: ctx.language,
    campaign: ctx.campaign,
  });
};
