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
        h1b: "Sans sacrifier votre temps.",
        h1c: "",
        sub: "Nous prenons en charge votre location courte durée — annonce, réservations, accueil voyageurs, ménage, linge, maintenance. Maisons de campagne, appartements et résidences secondaires en Drôme-Ardèche.",
        cta: "Demander mon estimation gratuite",
        whatsapp: "Échanger sur WhatsApp",
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
        whatsapp: "Chat on WhatsApp",
        scroll: "Scroll",
      };

  return (
    <section className="relative w-full bg-qit-beige">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[100svh]">
        {/* Left — editorial copy */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 xl:px-24 pt-20 sm:pt-28 lg:pt-20 pb-8 sm:pb-10 lg:pb-10 bg-qit-beige min-h-0">
          <div className="max-w-xl flex flex-col min-h-0">
            <div className="min-h-0 overflow-y-auto pr-1">
              <div className="flex items-center gap-3 mb-5 lg:mb-4">
                <span className="h-px w-8 bg-qit-coral shrink-0" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">
                  {c.eyebrow}
                </span>
              </div>

              <h1 className="font-serif text-qit-purple text-[2.25rem] sm:text-5xl lg:text-[2.5rem] xl:text-[2.9rem] 2xl:text-[3.3rem] leading-[1.05] tracking-tight mb-5 lg:mb-5">
                <span className="block">{c.h1a}</span>
                <span className="block italic font-normal text-qit-coral mt-1">{c.h1italic}</span>
                <span className="block mt-2 lg:mt-2">{c.h1b}</span>
                {c.h1c && <span className="block italic font-normal text-qit-purple/70 mt-1">{c.h1c}</span>}
              </h1>

              <p className="text-base md:text-lg lg:text-base xl:text-lg text-qit-purple/80 leading-relaxed mb-5 lg:mb-4 max-w-lg">
                {c.sub}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 shrink-0 pt-5 lg:pt-4">
              <Button
                asChild
                size="lg"
                className="bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full h-12 lg:h-12 xl:h-14 px-5 lg:px-6 xl:px-7 text-base font-medium shadow-lg shadow-qit-coral/25 w-full sm:w-auto"
              >
                <a href="/#contact">
                  {c.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-qit-purple/25 bg-white/80 backdrop-blur text-qit-purple hover:bg-white hover:text-qit-purple rounded-full h-12 lg:h-12 xl:h-14 px-5 lg:px-6 xl:px-7 text-base font-medium w-full sm:w-auto"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">{c.whatsapp}</span>
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
