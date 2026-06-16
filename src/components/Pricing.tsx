import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        label: "Tarif",
        heading: "Un tarif simple : 25% TTC sur les revenus générés",
        lead: "Une commission transparente, alignée sur la performance réelle de votre logement.",
        body: "Qit Concierge fonctionne avec une commission de 25% TTC sur les revenus locatifs générés. Vous ne payez pas d'abonnement mensuel ni de frais fixes de gestion : notre rémunération dépend directement des réservations générées.",
        card: "Gestion complète",
        ttc: "TTC",
        on: "sur les revenus locatifs générés",
        includedTitle: "Inclus :",
        cta: "Demander une estimation de revenus",
        outro: "Notre objectif : vous libérer de la gestion quotidienne tout en optimisant le potentiel de votre logement.",
        included: [
          "Gestion Airbnb, Booking et Abritel",
          "Communication voyageurs",
          "Coordination ménage et linge",
          "Suivi qualité entre les séjours",
          "Optimisation tarifaire avec PriceLabs",
          "Pilotage du calendrier et des durées de séjour",
          "Accompagnement propriétaire",
        ],
      }
    : {
        label: "Pricing",
        heading: "Simple pricing: 25% incl. tax on revenue generated",
        lead: "A transparent commission, aligned with how your property actually performs.",
        body: "Qit Concierge works on a 25% incl. tax commission on the rental revenue generated. There's no monthly subscription and no fixed management fee — our earnings depend directly on the bookings we generate.",
        card: "Full management",
        ttc: "incl. tax",
        on: "on rental revenue generated",
        includedTitle: "Included:",
        cta: "Request a revenue estimate",
        outro: "Our goal: free you from the day-to-day while making the most of your property's potential.",
        included: [
          "Airbnb, Booking and Abritel management",
          "Guest communication",
          "Cleaning and linen coordination",
          "Quality control between stays",
          "Price optimisation with PriceLabs",
          "Calendar and length-of-stay management",
          "Owner support",
        ],
      };

  return (
    <section id="tarifs" className="py-20 md:py-32 bg-white scroll-mt-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
            <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">{t.label}</span>
            <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-qit-purple mb-5 leading-[1.1] tracking-tight">
            {isFR ? (
              <>Un tarif simple : <span className="italic font-normal text-qit-coral">25% TTC</span> sur les revenus générés</>
            ) : (
              <>Simple pricing: <span className="italic font-normal text-qit-coral">25% incl. tax</span> on revenue generated</>
            )}
          </h2>
          <p className="text-lg md:text-xl text-qit-purple/80 font-medium mb-5">{t.lead}</p>
          <p className="text-base md:text-lg text-qit-purple/70 leading-relaxed">{t.body}</p>
        </div>

        <div className="max-w-md mx-auto rounded-3xl border border-border bg-qit-beige/40 p-6 md:p-8 shadow-sm">
          <h3 className="text-lg font-semibold text-qit-purple mb-4">{t.card}</h3>

          <div className="flex items-baseline gap-2 mb-1 text-center" style={{ textAlign: null }}>
            <span className="text-5xl md:text-6xl font-bold text-qit-purple">25%</span>
            <span className="text-base text-muted-foreground">{t.ttc}</span>
          </div>
          <p className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">{t.on}</p>

          <p className="text-sm font-semibold text-qit-purple mb-3">{t.includedTitle}</p>
          <ul className="space-y-2.5 mb-6">
            {t.included.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                <Check className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white">
            <a href="/#contact">{t.cta}</a>
          </Button>
        </div>

        <p className="max-w-2xl mx-auto text-center text-sm md:text-base text-muted-foreground leading-relaxed mt-8">{t.outro}</p>
      </div>
    </section>
  );
};

export default Pricing;
