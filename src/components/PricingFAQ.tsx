import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { renderInlineLinks } from "@/lib/inlineLinks";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const faqsFR = [
  { q: "Quel est le tarif de Qit Concierge ?", a: "Qit Concierge fonctionne avec une commission de 25% TTC sur les revenus locatifs générés. Cette rémunération est liée à la performance du logement : si votre bien ne génère pas de réservation, vous ne payez pas de commission de gestion." },
  { q: "Que comprend la commission de 25% TTC ?", a: "La commission comprend la gestion complète de votre location courte durée : gestion des annonces Airbnb, Booking et Abritel, communication voyageurs, suivi des réservations, coordination ménage et linge, suivi qualité, pilotage du calendrier et optimisation tarifaire avec PriceLabs." },
  { q: "Y a-t-il un abonnement mensuel ?", a: "Non. Qit Concierge ne facture pas d'abonnement mensuel de gestion. Le modèle repose sur une commission de 25% TTC sur les revenus locatifs générés." },
  { q: "Le ménage est-il inclus dans les 25% TTC ?", a: "La commission de 25% TTC correspond à la gestion du logement. Les frais de ménage peuvent être facturés séparément au voyageur ou intégrés dans la stratégie tarifaire selon le bien, la plateforme et le positionnement choisi." },
  { q: "Pourquoi choisir une commission plutôt qu'un forfait fixe ?", a: "La commission permet d'aligner les intérêts du propriétaire et de la conciergerie. Qit Concierge est rémunérée en fonction des revenus générés, ce qui encourage une gestion active du calendrier, des prix et de la visibilité du logement." },
  { q: "Pourquoi 25% TTC ?", a: "Le tarif de 25% TTC correspond à une gestion complète incluant l'opérationnel, les voyageurs, les plateformes Airbnb / Booking / Abritel et l'optimisation tarifaire avec PriceLabs." },
];

const faqsEN = [
  { q: "What is the Qit Concierge fee?", a: "Qit Concierge works on a 25% commission incl. tax on the rental revenue generated. Earnings are tied to performance: if your property doesn't generate any bookings, you don't pay a management commission." },
  { q: "What does the 25% incl. tax commission include?", a: "It covers full management of your short-term rental: Airbnb, Booking and Abritel listings, guest communication, booking follow-up, cleaning and linen coordination, quality control, calendar management and price optimisation with PriceLabs." },
  { q: "Is there a monthly subscription?", a: "No. Qit Concierge doesn't charge a monthly management subscription. The model is a 25% commission incl. tax on rental revenue generated." },
  { q: "Is cleaning included in the 25%?", a: "The 25% covers property management. Cleaning fees can be charged separately to the guest or integrated into the pricing strategy depending on the property, platform and positioning." },
  { q: "Why a commission rather than a flat fee?", a: "A commission aligns the interests of the owner and the concierge. Qit Concierge is paid based on the revenue generated, which encourages active management of calendar, pricing and visibility." },
  { q: "Why 25% incl. tax?", a: "The 25% incl. tax fee corresponds to full management including operations, guests, the Airbnb / Booking / Abritel platforms and price optimisation with PriceLabs. The goal isn't just to manage stays, but to drive the property's performance." },
];

const PricingFAQ = () => {
  const { isFR } = useLanguage();
  const faqs = isFR ? faqsFR : faqsEN;
  const t = isFR
    ? {
        label: "Tarif",
        heading: "Questions fréquentes sur notre tarif",
        body: "Tout ce que vous devez savoir sur notre commission de 25% TTC.",
        zones: "Découvrez aussi nos zones :",
      }
    : {
        label: "Pricing",
        heading: "Frequently asked questions about pricing",
        body: "Everything you need to know about our 25% incl. tax commission.",
        zones: "Discover our areas:",
      };

  return (
    <section className="py-14 md:py-20 bg-qit-beige/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">{t.label}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-qit-purple mb-3 md:mb-4 leading-tight">{t.heading}</h2>
          <p className="text-muted-foreground">{t.body}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`pricing-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-qit-purple hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {renderInlineLinks(item.a, `pfaq-${i}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-sm text-center text-muted-foreground mt-8">
            {t.zones}{" "}
            <Link to="/conciergerie-airbnb-drome" className="text-qit-coral underline underline-offset-2">Drôme</Link>
            {" · "}
            <Link to="/conciergerie-airbnb-ardeche" className="text-qit-coral underline underline-offset-2">Ardèche</Link>
            {" · "}
            <Link to="/conciergerie-airbnb-tain-hermitage" className="text-qit-coral underline underline-offset-2">Tain-l'Hermitage</Link>
            {" · "}
            <Link to="/conciergerie-airbnb-valence" className="text-qit-coral underline underline-offset-2">Valence</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
