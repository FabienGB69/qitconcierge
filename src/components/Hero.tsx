import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-drome-ardeche.jpg";

const Hero = () => {
  const { isFR } = useLanguage();
  const c = isFR
    ? {
        eyebrow: "Conciergerie locative — Drôme · Ardèche · Vallée du Rhône",
        h1a: "Faites de votre bien",
        h1italic: "une source de revenus sereine.",
        h1b: "Sans sacrifier votre temps",
        h1c: "ou votre charge mentale.",
        sub: "Nous prenons en charge votre location courte durée — annonce, réservations, accueil voyageurs, ménage, linge, maintenance. Maisons de campagne, appartements et résidences secondaires en Drôme-Ardèche.",
        cta: "Demander mon estimation gratuite",
        whatsapp: "Échanger sur WhatsApp",
        scroll: "Défiler",
      }
    : {
        eyebrow: "Short-term rental concierge — Drôme · Ardèche · Rhône Valley",
        h1a: "Turn your property",
        h1italic: "into a calm source of income.",
        h1b: "Without sacrificing your time",
        h1c: "or your mental load.",
        sub: "We take care of your short-term rental — listing, bookings, guest welcome, cleaning, linen, maintenance. Country houses, apartments and second homes in Drôme-Ardèche.",
        cta: "Request my free estimate",
        whatsapp: "Chat on WhatsApp",
        scroll: "Scroll",
      };

  return (
    <section className="relative w-full bg-qit-beige">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
        {/* Left — editorial copy */}
        <div className="relative flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-28 lg:pt-32 pb-16 lg:pb-24">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">
                {c.eyebrow}
              </span>
            </div>

            <h1 className="font-serif text-qit-purple text-[2.25rem] sm:text-5xl lg:text-[3.6rem] xl:text-[4rem] leading-[1.05] tracking-tight mb-10">
              <span className="block">{c.h1a}</span>
              <span className="block italic font-normal text-qit-coral mt-1">{c.h1italic}</span>
              <span className="block mt-4">{c.h1b}</span>
              <span className="block italic font-normal text-qit-purple/70 mt-1">{c.h1c}</span>
            </h1>

            <p className="text-base md:text-lg text-qit-purple/80 leading-relaxed mb-10 max-w-lg">
              {c.sub}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full h-14 px-7 text-base font-medium shadow-lg shadow-qit-coral/25"
              >
                <a href="/#contact">
                  {c.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-qit-purple hover:bg-qit-purple/5 rounded-full h-14 px-6 text-base"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {c.whatsapp}
                </a>
              </Button>
            </div>
          </div>

          {/* scroll cue */}
          <div className="hidden lg:flex absolute bottom-10 left-20 xl:left-24 items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-qit-purple/50">
            <span className="h-px w-10 bg-qit-purple/30" aria-hidden="true" />
            {c.scroll}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative min-h-[60vh] lg:min-h-full overflow-hidden">
          <img
            src={heroImage}
            alt={
              isFR
                ? "Intérieur chaleureux d'une maison de campagne en Drôme-Ardèche avec vue sur un champ de lavande"
                : "Warm interior of a country house in Drôme-Ardèche with a lavender field view"
            }
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
            width={1280}
            height={1600}
          />
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
