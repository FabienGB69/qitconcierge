import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const included = [
  "Gestion opérationnelle du logement",
  "Communication voyageurs",
  "Suivi des réservations",
  "Coordination du ménage",
  "Suivi du linge",
  "Optimisation des prix avec PriceLabs",
  "Diffusion et pilotage sur Airbnb, Booking et Abritel",
];

const excluded = [
  "Pas d'abonnement mensuel",
  "Pas de frais fixes de gestion",
  "Une rémunération liée à la performance réelle de votre logement",
];

const Pricing = () => {
  return (
    <section className="py-14 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3 md:mb-4">
            Tarif
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple mb-5 md:mb-6 leading-tight">
            Un tarif clair : 25% TTC sur les revenus générés
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Chez Qit Concierge, notre rémunération est simple : nous prenons une commission de 25% TTC sur les revenus locatifs générés. Ce modèle aligne nos intérêts avec les vôtres : plus votre logement est performant, plus la gestion est rentable pour vous comme pour nous.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-qit-beige/40 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Commission unique</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-bold text-qit-purple">25%</span>
                <span className="text-base text-muted-foreground">TTC sur les revenus locatifs</span>
              </div>
            </div>
            <Button
              asChild
              size="lg"
              className="bg-qit-coral hover:bg-qit-coral/90 text-white"
            >
              <a href="#contact">Demander une estimation</a>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-base font-semibold text-qit-purple mb-4">
                Ce qui est inclus
              </h3>
              <ul className="space-y-2.5">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <Check className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold text-qit-purple mb-4">
                Ce que vous ne payez pas
              </h3>
              <ul className="space-y-2.5">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                    <X className="h-4 w-4 text-qit-purple/60 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
