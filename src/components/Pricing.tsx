import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const included = [
  "Gestion Airbnb, Booking et Abritel",
  "Communication avec les voyageurs",
  "Suivi des arrivées et départs",
  "Coordination du ménage",
  "Gestion du linge",
  "Suivi qualité entre les séjours",
  "Optimisation tarifaire avec PriceLabs",
  "Ajustement du calendrier et des durées de séjour",
  "Accompagnement propriétaire",
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
            25% TTC : une commission simple, transparente et orientée performance
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Qit Concierge fonctionne avec une commission de 25% TTC sur les revenus locatifs générés. Vous ne payez pas d'abonnement fixe : notre rémunération dépend directement de la performance de votre logement.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl border border-border bg-qit-beige/40 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Commission unique</p>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-5xl md:text-6xl font-bold text-qit-purple">25%</span>
                <span className="text-base text-muted-foreground">TTC sur les revenus locatifs générés</span>
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

          <h3 className="text-base font-semibold text-qit-purple mb-4">
            Cette commission comprend l'accompagnement complet de votre location courte durée
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {included.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
              >
                <Check className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 pt-6 border-t border-border text-sm md:text-base text-muted-foreground leading-relaxed">
            Notre objectif est simple : vous libérer de la gestion quotidienne tout en pilotant votre logement avec une vraie logique de rentabilité.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
