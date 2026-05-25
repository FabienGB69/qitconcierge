import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { isFR } = useLanguage();
  const c = isFR
    ? {
        badge: "Conciergerie locale en Drôme-Ardèche",
        h1a: "Conciergerie courte durée en Drôme-Ardèche pour ",
        h1b: "maisons, gîtes et résidences secondaires",
        sub: "Qit Concierge accompagne les propriétaires en Drôme-Ardèche dans la gestion complète de leur location courte durée : Airbnb, Booking, Abritel, ménage, linge, voyageurs, calendrier et optimisation des revenus avec PriceLabs.",
        check: "Depuis 2023 — +30 biens en gestion — Airbnb, Booking, Abritel — expertise PriceLabs.",
        cta: "Demander une estimation gratuite",
        whatsapp: "Échanger sur WhatsApp",
        b1: "Sans engagement",
        b2: "Réponse sous 24h",
        b3: "Suivi transparent",
      }
    : {
        badge: "Local short-term rental concierge in Drôme-Ardèche",
        h1a: "Short-term rental concierge in Drôme-Ardèche for ",
        h1b: "country homes, gîtes and second homes",
        sub: "Qit Concierge helps property owners in Drôme-Ardèche fully manage their short-term rental: Airbnb, Booking, Abritel, cleaning, linen, guests, calendar and revenue optimisation with PriceLabs.",
        check: "Since 2023 — 30+ properties under management — Airbnb, Booking, Abritel — PriceLabs expertise.",
        cta: "Request a free estimate",
        whatsapp: "Chat on WhatsApp",
        b1: "No commitment",
        b2: "Reply within 24h",
        b3: "Transparent reporting",
      };

  return (
    <div
      className="relative min-h-[100svh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-qit-purple/75 via-qit-purple/55 to-black/65" />

      <div className="relative container mx-auto h-full flex flex-col justify-center px-4 sm:px-6 pt-24 pb-16 md:py-32">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full mb-5 sm:mb-6">
            <span className="w-2 h-2 rounded-full bg-qit-coral" />
            {c.badge}
          </span>

          <h1 className="text-[1.85rem] leading-[1.15] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-white sm:leading-tight mb-4 sm:mb-5">
            {c.h1a}
            <span className="text-qit-coral">{c.h1b}</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
            {c.sub}
          </p>

          <div className="flex items-start gap-2 text-white/90 text-sm sm:text-base mb-7 sm:mb-8 max-w-2xl">
            <CheckCircle2 className="w-5 h-5 text-qit-coral mt-0.5 flex-shrink-0" />
            <p>{c.check}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-qit-coral hover:bg-qit-coral/90 text-white shadow-xl shadow-qit-coral/40 h-14 sm:h-14 text-base font-semibold w-full sm:w-auto"
            >
              <a href="#contact">
                {c.cta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white hover:text-qit-purple h-14 sm:h-14 text-base w-full sm:w-auto"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                {c.whatsapp}
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/80 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-qit-coral" /> {c.b1}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-qit-coral" /> {c.b2}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-qit-coral" /> {c.b3}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
