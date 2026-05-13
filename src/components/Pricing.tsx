import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const included = [
  "Gestion Airbnb, Booking et Abritel",
  "Communication voyageurs",
  "Coordination ménage et linge",
  "Suivi qualité",
  "Optimisation des prix avec PriceLabs",
  "Pilotage du calendrier",
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
            Une commission simple, transparente et orientée performance
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Pas d'abonnement, pas de frais fixes : notre rémunération dépend directement de la performance de votre logement.
          </p>
        </div>

        <div className="max-w-md mx-auto rounded-3xl border border-border bg-qit-beige/40 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-qit-purple mb-4">
            Gestion complète
          </h3>

          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl md:text-6xl font-bold text-qit-purple">25%</span>
            <span className="text-base text-muted-foreground">TTC</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
            Sur les revenus locatifs générés
          </p>

          <p className="text-sm font-semibold text-qit-purple mb-3">Inclus :</p>
          <ul className="space-y-2.5 mb-6">
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

          <div className="text-sm text-muted-foreground space-y-1 mb-6 pb-6 border-b border-border">
            <p>Sans abonnement mensuel.</p>
            <p>Sans frais fixes de gestion.</p>
          </div>

          <Button
            asChild
            size="lg"
            className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white"
          >
            <a href="#contact">Demander une estimation de revenus</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
