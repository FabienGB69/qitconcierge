import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CalendarRange, Sparkles, TrendingUp } from "lucide-react";

const cases = [
  {
    icon: Clock,
    title: "Check-in tardif",
    text: "Voyageur arrivé tardivement, instructions envoyées automatiquement, accès simplifié et assistance disponible.",
  },
  {
    icon: CalendarRange,
    title: "Optimisation du calendrier",
    text: "Réduction des trous entre réservations grâce à un meilleur paramétrage des durées minimum de séjour.",
  },
  {
    icon: Sparkles,
    title: "Problème ménage",
    text: "Anomalie détectée après un départ, intervention rapide avant l'arrivée suivante.",
  },
  {
    icon: TrendingUp,
    title: "Upsell voyageur",
    text: "Proposition d'early check-in, late checkout ou linge supplémentaire pour améliorer le confort et générer du revenu additionnel.",
  },
];

const Cases = () => {
  return (
    <section id="cases" className="py-14 md:py-20 bg-qit-beige/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">
            Sur le terrain
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-qit-purple mb-3 md:mb-4 leading-tight">
            Exemples de situations gérées
          </h2>
          <p className="text-muted-foreground">
            Des cas concrets et anonymisés du quotidien d'une location courte durée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {cases.map(({ icon: Icon, title, text }) => (
            <Card
              key={title}
              className="border border-border/60 bg-white hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-md bg-qit-purple/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-qit-purple" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-qit-purple mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            asChild
            className="bg-qit-coral hover:bg-qit-coral/90 text-white"
          >
            <a href="#contact">
              Voir comment Qit Concierge peut optimiser mon logement
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Cases;
