import { Search, Globe, Users, ShieldCheck, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, title: "Analyse du logement", description: "Audit complet et estimation des revenus." },
  { icon: Globe, title: "Mise en ligne optimisée", description: "Annonces multi-plateformes, photos et pricing." },
  { icon: Users, title: "Gestion voyageurs", description: "Communication, check-in, assistance 7j/7." },
  { icon: ShieldCheck, title: "Suivi qualité", description: "Ménage, linge, contrôles et maintenance." },
  { icon: TrendingUp, title: "Optimisation continue", description: "Pricing dynamique, upsells, reporting." },
];

const Difference = () => {
  return (
    <section className="py-20 md:py-28 bg-qit-beige">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-4">
            Notre différence
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple mb-6 leading-tight">
            Une conciergerie pilotée comme un vrai système
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Qit Concierge ne se limite pas à remettre des clés et organiser le ménage. Nous pilotons chaque logement avec une logique de performance : prix, calendrier, qualité voyageur, check-in, suivi ménage, automatisations, upsells et reporting.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden md:block relative mb-14">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-qit-purple/15" aria-hidden="true" />
          <div className="grid grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => {
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

        {/* Mobile vertical timeline */}
        <div className="md:hidden relative mb-12 max-w-md mx-auto">
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-qit-purple/15" aria-hidden="true" />
          <div className="space-y-7">
            {steps.map((step, idx) => {
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
            Objectif : moins d'imprévus, plus de clarté, une meilleure expérience voyageur et une rentabilité mieux pilotée.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Difference;
