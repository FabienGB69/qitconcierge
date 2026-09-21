import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buildWhatsAppUrl, whatsAppMessage } from "@/lib/whatsapp";
import WhatsAppMessagePreview from "@/components/WhatsAppMessagePreview";
import { useLanguage } from "@/contexts/LanguageContext";
import { trackEvent, trackWhatsAppClick } from "@/lib/analytics";
import heroAvifSrcSet from "@/assets/hero-drome-ardeche.jpg?w=480;768;1080&format=avif&quality=72&as=srcset";
import heroWebpSrcSet from "@/assets/hero-drome-ardeche.jpg?w=480;768;1080&format=webp&quality=76&as=srcset";
import heroJpegSrcSet from "@/assets/hero-drome-ardeche.jpg?w=480;768;1080&format=jpg&quality=78&as=srcset";
import heroFallback from "@/assets/hero-drome-ardeche.jpg?w=768&format=jpg&quality=78";


const Hero = () => {
  const { isFR } = useLanguage();
  const c = isFR
    ? {
        eyebrow: "Conciergerie locative — Drôme · Ardèche · Vallée du Rhône",
        h1a: "Faites de votre bien",
        h1italic: "une source de revenus sereine.",
        h1b: "Sans sacrifier votre temps.",
        h1c: "",
        sub: "Nous prenons en charge votre location courte durée — annonce, réservations, accueil voyageurs, ménage, linge, maintenance. Maisons de campagne, appartements et résidences secondaires en Drôme-Ardèche.",
        cta: "Demander mon estimation gratuite",
        ctaAria: "Demander mon estimation gratuite — aller au formulaire de contact",
        whatsapp: "Échanger sur WhatsApp",
        whatsappAria: "Échanger sur WhatsApp (ouvre une nouvelle fenêtre)",
        scroll: "Défiler",
      }
    : {
        eyebrow: "Short-term rental concierge — Drôme · Ardèche · Rhône Valley",
        h1a: "Turn your property",
        h1italic: "into a calm source of income.",
        h1b: "Without sacrificing your time.",
        h1c: "",
        sub: "We take care of your short-term rental — listing, bookings, guest welcome, cleaning, linen, maintenance. Country houses, apartments and second homes in Drôme-Ardèche.",
        cta: "Request my free estimate",
        ctaAria: "Request my free estimate — go to the contact form",
        whatsapp: "Chat on WhatsApp",
        whatsappAria: "Chat on WhatsApp (opens in a new window)",
        scroll: "Scroll",
      };


  // Visible message only — marked via whatsAppMessage() so no tracking tag can
  // leak into it. Attribution is recorded separately via trackWhatsAppClick.
  const waMessage = whatsAppMessage(
    isFR
      ? "Bonjour Qit Concierge, je souhaite en savoir plus sur la gestion de mon bien en location courte durée en Drôme-Ardèche."
      : "Hello Qit Concierge, I'd like to know more about managing my short-term rental in Drôme-Ardèche."
  );
  const waUrl = buildWhatsAppUrl(waMessage);

  const lang = isFR ? "fr" : "en";



  return (
    <section className="relative w-full bg-qit-beige" aria-labelledby="hero-title">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
        {/* Left — editorial copy */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-20 sm:pt-28 lg:pt-20 pb-8 sm:pb-10 lg:pb-10 bg-qit-beige min-h-0">
          <div className="max-w-xl flex flex-col min-h-0">
            <div className="min-h-0 overflow-y-auto pr-1">
              <div className="flex items-center gap-3 mb-4 sm:mb-5 lg:mb-4">
                <span className="h-px w-8 bg-qit-coral-deep shrink-0" aria-hidden="true" />
                <p className="text-[11px] uppercase tracking-[0.22em] text-qit-purple font-medium">
                  {c.eyebrow}
                </p>
              </div>

              <h1
                id="hero-title"
                className="font-serif text-qit-purple text-[1.65rem] sm:text-5xl lg:text-[2.5rem] xl:text-[2.9rem] 2xl:text-[3.3rem] leading-[1.05] tracking-tight mb-4 sm:mb-5 lg:mb-5"
              >
                <span className="block">{c.h1a}</span>
                <span className="block italic font-normal text-qit-coral-deep mt-1">{c.h1italic}</span>
                <span className="block mt-2 lg:mt-2">{c.h1b}</span>
                {c.h1c && <span className="block italic font-normal text-qit-purple/90 mt-1">{c.h1c}</span>}
              </h1>

              <p className="text-sm sm:text-base md:text-lg lg:text-base xl:text-lg text-qit-purple/90 leading-relaxed mb-4 sm:mb-5 lg:mb-4 max-w-lg">
                {c.sub}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 shrink-0 pt-4 sm:pt-5 lg:pt-4">
              <Button
                asChild
                size="lg"
                className="bg-qit-coral-deep hover:bg-qit-coral-deep/95 text-white rounded-full h-12 lg:h-12 xl:h-14 px-5 lg:px-6 xl:px-7 text-base font-medium shadow-lg shadow-qit-coral-deep/25 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qit-purple focus-visible:ring-offset-2 focus-visible:ring-offset-qit-beige disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <a
                  href="/#contact"
                  aria-label={c.ctaAria}
                  onClick={() =>
                    trackEvent("estimate_hero_click", {
                      location: "hero",
                      target: "#contact",
                      language: lang,
                    })
                  }
                >
                  {c.cta}
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 lg:h-12 xl:h-14 px-5 lg:px-6 xl:px-7 text-base font-medium w-full sm:w-auto border-qit-purple/40 bg-white text-qit-purple hover:bg-qit-purple hover:text-white hover:border-qit-purple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qit-purple focus-visible:ring-offset-2 focus-visible:ring-offset-qit-beige disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.whatsappAria}
                  onClick={() =>
                    trackWhatsAppClick({
                      location: "hero",
                      language: lang,
                      source: "hero",
                      medium: "wa_link",
                      campaign: "hero_cta",
                    })
                  }
                >
                  <MessageCircle className="mr-2 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">{c.whatsapp}</span>
                </a>
              </Button>
              <WhatsAppMessagePreview message={waMessage} className="w-full sm:w-auto" />
            </div>

          </div>


          {/* scroll cue */}
          <p className="hidden lg:flex absolute bottom-10 left-20 xl:left-24 items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-qit-purple">
            <span className="h-px w-10 bg-qit-purple/60" aria-hidden="true" />
            {c.scroll}
          </p>
        </div>


        {/* Right — image */}
        <div className="relative min-h-[60vh] lg:min-h-full overflow-hidden">
          <picture>
            <source
              type="image/avif"
              srcSet={heroAvifSrcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <source
              type="image/webp"
              srcSet={heroWebpSrcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <img
              src={heroFallback}
              srcSet={heroJpegSrcSet}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={
                isFR
                  ? "Intérieur chaleureux d'une maison de campagne en Drôme-Ardèche avec vue sur un champ de lavande"
                  : "Warm interior of a country house in Drôme-Ardèche with a lavender field view"
              }
              className="absolute inset-0 w-full h-full object-cover"
              fetchPriority="high"
              decoding="async"
              width={1080}
              height={1920}
            />
          </picture>
          {/* soft beige fade on the left edge to blend with copy column */}
          <div
            className="hidden lg:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-qit-beige to-transparent pointer-events-none"
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
