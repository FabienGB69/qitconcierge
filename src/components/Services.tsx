import { Button } from "@/components/ui/button";
import { Rocket, Settings, TrendingUp, Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { isFR } = useLanguage();
  const data = isFR
    ? {
        label: "Nos services",
        heading: "Gestion complète de votre location courte durée — maisons, appartements et résidences secondaires",
        cta: "Recevoir une proposition de gestion",
        columns: [
          {
            icon: Rocket,
            title: "Mise en location",
            items: ["Analyse du logement", "Création ou optimisation de l'annonce", "Conseils photos et description", "Mise en avant des points forts", "Paramétrage Airbnb / Booking"],
          },
          {
            icon: Settings,
            title: "Gestion opérationnelle",
            items: ["Communication voyageurs", "Check-in et instructions d'arrivée", "Ménage professionnel", "Gestion du linge", "Suivi des consommables", "Remontée des anomalies"],
          },
          {
            icon: TrendingUp,
            title: "Optimisation des revenus",
            items: ["Ajustement des prix", "Suivi du calendrier", "Optimisation des durées de séjour", "Réduction des nuits perdues", "Reporting propriétaire"],
          },
        ],
      }
    : {
        label: "Our services",
        heading: "Full management of your short-term rental",
        cta: "Request a management proposal",
        columns: [
          {
            icon: Rocket,
            title: "Listing & launch",
            items: ["Property assessment", "Listing creation or optimisation", "Photo and description guidance", "Highlighting key strengths", "Airbnb / Booking setup"],
          },
          {
            icon: Settings,
            title: "Day-to-day operations",
            items: ["Guest communication", "Check-in and arrival instructions", "Professional cleaning", "Linen management", "Consumables tracking", "Issue reporting"],
          },
          {
            icon: TrendingUp,
            title: "Revenue optimisation",
            items: ["Price adjustments", "Calendar monitoring", "Length-of-stay optimisation", "Reducing empty nights", "Owner reporting"],
          },
        ],
      };

  return (
    <section id="services" className="py-14 md:py-28 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3 md:mb-4">
            {data.label}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple leading-tight">
            {data.heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.columns.map((col, idx) => {
            const Icon = col.icon;
            return (
              <div key={idx} className="rounded-2xl bg-white border border-border p-7 md:p-8 hover:shadow-md transition-shadow flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-qit-purple/5 flex items-center justify-center mb-5">
                  <Icon className="h-5 w-5 text-qit-coral" />
                </div>
                <h3 className="text-xl font-bold text-qit-purple mb-5 leading-snug">{col.title}</h3>
                <ul className="space-y-3">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <Check className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="bg-qit-coral hover:bg-qit-coral/90 text-white">
            <a href="/#contact">
              {data.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
