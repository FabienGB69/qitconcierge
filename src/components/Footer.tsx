import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        published: "Vos biens publiés sur",
        copyright: "© Qit Concierge — Conciergerie courte durée en Drôme-Ardèche.",
        legal: "Mentions légales",
        privacy: "Politique de confidentialité",
        terms: "Conditions générales de vente",
        cookies: "Gérer mes cookies",
        reglementation: "Réglementation",
        faq: "FAQ",
        made: "Site réalisé avec ❤️ par",
        contact: "Contact",
      }
    : {
        published: "Your properties listed on",
        copyright: "© Qit Concierge — Short-term rental concierge in Drôme-Ardèche.",
        legal: "Legal notice",
        privacy: "Privacy policy",
        terms: "Terms of sale",
        cookies: "Manage my cookies",
        reglementation: "Regulation",
        faq: "FAQ",
        made: "Site crafted with ❤️ by",
        contact: "Contact",
      };

  const email = "guest.qitconcierge@gmail.com";
  const phoneRaw = "+330601777633";
  const phoneDisplay = "+33 6 01 77 76 33";

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col items-center gap-3 pb-6 mb-6 border-b border-gray-800">
          <p className="text-xs uppercase tracking-wider text-gray-500">{t.published}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <img src="https://cdn.simpleicons.org/airbnb/ffffff" alt="Airbnb" loading="lazy" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            <img src="https://cdn.simpleicons.org/bookingdotcom/ffffff" alt="Booking.com" loading="lazy" className="h-6 w-auto opacity-80 hover:opacity-100 transition-opacity" />
            <span aria-label="Abritel" className="font-bold text-lg tracking-tight text-white opacity-80 hover:opacity-100 transition-opacity">abritel</span>
          </div>
          <a
            href="https://www.instagram.com/qitconcierge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 text-white opacity-80 hover:opacity-100 transition-opacity"
            onClick={() => trackEvent("instagram_click", { location: "footer" })}
          >
            <Instagram className="h-5 w-5" />
            <span className="text-sm font-medium">@qitconcierge</span>
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 pb-6 mb-6 border-b border-gray-800">
          <p className="text-xs uppercase tracking-[0.18em] text-gray-500">{t.contact}</p>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 text-sm">
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 text-gray-200 hover:text-qit-coral transition-colors"
              onClick={() => trackEvent("email_click", { location: "footer" })}
            >
              <Mail className="h-4 w-4" />
              {email}
            </a>
            <span className="hidden sm:block h-4 w-px bg-gray-700" aria-hidden="true" />
            <a
              href={`tel:${phoneRaw}`}
              className="inline-flex items-center gap-2 text-gray-200 hover:text-qit-coral transition-colors"
              onClick={() => trackEvent("phone_click", { location: "footer" })}
            >
              <Phone className="h-4 w-4" />
              {phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>{t.copyright}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link to="/reglementation" className="hover:text-white transition-colors">{t.reglementation}</Link>
            <Link to="/mentions-legales" className="hover:text-white transition-colors">{t.legal}</Link>
            <Link to="/politique-confidentialite" className="hover:text-white transition-colors">{t.privacy}</Link>
            <Link to="/cgv" className="hover:text-white transition-colors">{t.terms}</Link>
            <button type="button" onClick={() => window.dispatchEvent(new Event("open-cookie-settings"))} className="hover:text-white transition-colors">
              {t.cookies}
            </button>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-gray-500">
          {t.made}{" "}
          <a
            href="https://pixeloria.fr"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("pixeloria_click", { location: "footer" })}
            aria-label="Pixeloria"
            className="inline-block font-medium text-qit-coral hover:underline rounded-sm px-1 py-1 -mx-1 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qit-coral focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
          >
            Pixeloria
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
