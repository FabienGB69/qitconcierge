import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Quel est le tarif de Qit Concierge ?",
    a: "Qit Concierge fonctionne avec une commission de 25% TTC sur les revenus locatifs générés. Cette rémunération est liée à la performance du logement : si votre bien ne génère pas de réservation, vous ne payez pas de commission de gestion.",
  },
  {
    q: "Que comprend la commission de 25% TTC ?",
    a: "La commission comprend la gestion complète de votre location courte durée : gestion des annonces Airbnb, Booking et Abritel, communication voyageurs, suivi des réservations, coordination ménage et linge, suivi qualité, pilotage du calendrier et optimisation tarifaire avec PriceLabs.",
  },
  {
    q: "Y a-t-il un abonnement mensuel ?",
    a: "Non. Qit Concierge ne facture pas d'abonnement mensuel de gestion. Le modèle repose sur une commission de 25% TTC sur les revenus locatifs générés.",
  },
  {
    q: "Le ménage est-il inclus dans les 25% TTC ?",
    a: "La commission de 25% TTC correspond à la gestion du logement. Les frais de ménage peuvent être facturés séparément au voyageur ou intégrés dans la stratégie tarifaire selon le bien, la plateforme et le positionnement choisi.",
  },
  {
    q: "Pourquoi choisir une commission plutôt qu'un forfait fixe ?",
    a: "La commission permet d'aligner les intérêts du propriétaire et de la conciergerie. Qit Concierge est rémunérée en fonction des revenus générés, ce qui encourage une gestion active du calendrier, des prix et de la visibilité du logement.",
  },
  {
    q: "Pourquoi 25% TTC ?",
    a: "Le tarif de 25% TTC correspond à une gestion complète incluant l'opérationnel, les voyageurs, les plateformes Airbnb / Booking / Abritel et l'optimisation tarifaire avec PriceLabs. L'objectif n'est pas seulement de gérer les séjours, mais de piloter la performance du logement.",
  },
];

const PricingFAQ = () => {
  return (
    <section className="py-14 md:py-20 bg-qit-beige/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
            Tarif
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-qit-purple mb-3 md:mb-4 leading-tight">
            Questions fréquentes sur notre tarif
          </h2>
          <p className="text-muted-foreground">
            Tout ce que vous devez savoir sur notre commission de 25% TTC.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`pricing-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-qit-purple hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
