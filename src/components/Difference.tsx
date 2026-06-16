import { Search, Globe, Users, ShieldCheck, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Difference = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        label: "Méthode",
        heading: "Notre méthode en 5 étapes",
        descLong: "De l'analyse de votre logement à l'optimisation continue de vos revenus : une approche claire, locale et structurée pour louer mieux sans gérer les voyageurs, le ménage, le linge ou le calendrier.",
        descShort: "Cinq étapes claires pour louer mieux sans gérer le quotidien.",
        outro: "Objectif : moins d'imprévus, plus de clarté, une meilleure expérience voyageur et une rentabilité mieux pilotée.",
        steps: [
          { icon: Search, title: "Analyse du logement", description: "Audit complet et estimation des revenus." },
          { icon: Globe, title: "Mise en ligne optimisée", description: "Annonces multi-plateformes, photos et pricing." },
          { icon: Users, title: "Gestion voyageurs", description: "Communication, check-in, assistance 7j/7." },
          { icon: ShieldCheck, title: "Suivi qualité", description: "Ménage, linge, contrôles et maintenance." },
          { icon: TrendingUp, title: "Optimisation continue", description: "Pricing dynamique, upsells, reporting." },
        ],
      }
    : {
        label: "Method",
        heading: "Our 5-step method",
        descLong: "From assessing your property to continuously optimising your revenue: a clear, local and structured approach to renting better without handling guests, cleaning, linen or the calendar yourself.",
        descShort: "Five clear steps to rent better without handling the day-to-day.",
        outro: "Goal: fewer surprises, more clarity, a better guest experience and better-managed profitability.",
        steps: [
          { icon: Search, title: "Property assessment", description: "Full audit and revenue estimate." },
          { icon: Globe, title: "Optimised listing", description: "Multi-platform listings, photos and pricing." },
          { icon: Users, title: "Guest management", description: "Communication, check-in, 7-day support." },
          { icon: ShieldCheck, title: "Quality control", description: "Cleaning, linen, inspections and maintenance." },
          { icon: TrendingUp, title: "Continuous optimisation", description: "Dynamic pricing, upsells, reporting." },
        ],
      };

  return (
    <section id="methode" className="py-20 md:py-32 bg-qit-beige scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">{t.label}</span>
            <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-qit-purple mb-6 leading-[1.1] tracking-tight">
            {t.heading.split(" ").slice(0, -2).join(" ")}{" "}
            <span className="italic font-normal text-qit-coral">{t.heading.split(" ").slice(-2).join(" ")}</span>
          </h2>
          <p className="text-base md:text-lg text-qit-purple/70 leading-relaxed">
            <span className="hidden sm:inline">{t.descLong}</span>
            <span className="sm:hidden">{t.descShort}</span>
          </p>
        </div>

        <div className="hidden md:block relative mb-14">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-qit-purple/15" aria-hidden="true" />
          <div className="grid grid-cols-5 gap-4 relative">
            {t.steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center text-center px-2">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-qit-purple/20 shadow-sm flex items-center justify-center mb-5">
                    <Icon className="h-7 w-7 text-qit-coral" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-qit-purple text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-semibold text-qit-purple mb-2 text-sm lg:text-base">{step.title}</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-snug">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="md:hidden relative mb-12 max-w-md mx-auto">
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-qit-purple/15" aria-hidden="true" />
          <div className="space-y-7">
            {t.steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex items-start gap-5 relative">
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-qit-purple/20 shadow-sm flex items-center justify-center">
                    <Icon className="h-6 w-6 text-qit-coral" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-qit-purple text-white text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-semibold text-qit-purple mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg md:text-xl font-medium text-qit-purple leading-relaxed border-l-4 border-qit-coral pl-5 md:pl-0 md:border-l-0 md:border-t-2 md:border-qit-coral md:pt-6 text-left md:text-center">
            {t.outro}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Difference;
