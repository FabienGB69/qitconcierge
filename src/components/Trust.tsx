import { Award, TrendingUp, ClipboardCheck, MessageSquare, Globe, Eye } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Trust = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        label: "Réassurance",
        heading: "Pourquoi les propriétaires nous font confiance",
        items: [
          { icon: Award, title: "Expérience terrain", text: "Conciergerie créée en 2023 en Drôme-Ardèche, avec une approche terrain concrète, locale et axée sur la rentabilité propriétaire." },
          { icon: TrendingUp, title: "Revenue management & PriceLabs", text: "Tarification dynamique avec PriceLabs : prix ajustés chaque jour selon la saison, les événements locaux, la demande et la concurrence pour maximiser vos revenus." },
          { icon: ClipboardCheck, title: "Suivi qualité après chaque séjour", text: "Contrôle du ménage, du linge, des équipements et remontée rapide des anomalies." },
          { icon: MessageSquare, title: "Communication voyageurs", text: "Messages clairs avant, pendant et après le séjour pour limiter les questions et améliorer l'expérience." },
          { icon: Globe, title: "Diffusion Airbnb, Booking & Abritel", text: "Annonces synchronisées sur les trois principales plateformes, calendrier unifié et stratégie de diffusion adaptée à chaque bien pour maximiser la visibilité." },
          { icon: Eye, title: "Transparence propriétaire", text: "Suivi clair des performances, des interventions et des actions menées sur le logement." },
        ],
      }
    : {
        label: "Why us",
        heading: "Why owners trust us",
        items: [
          { icon: Award, title: "On-the-ground experience", text: "Concierge founded in 2023 in Drôme-Ardèche, with a hands-on, local approach focused on owner profitability." },
          { icon: TrendingUp, title: "Revenue management & PriceLabs", text: "Dynamic pricing with PriceLabs: prices adjusted daily based on season, local events, demand and competition to maximise revenue." },
          { icon: ClipboardCheck, title: "Quality control after every stay", text: "Checks on cleaning, linen and equipment, with quick reporting of any issues." },
          { icon: MessageSquare, title: "Guest communication", text: "Clear messages before, during and after the stay to reduce questions and improve experience." },
          { icon: Globe, title: "Airbnb, Booking & Abritel distribution", text: "Listings synced across the three main platforms with a unified calendar and a tailored distribution strategy." },
          { icon: Eye, title: "Owner transparency", text: "Clear tracking of performance, interventions and actions taken on your property." },
        ],
      };

  return (
    <section className="py-14 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3 md:mb-4">{t.label}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple leading-tight">{t.heading}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {t.items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="group rounded-2xl border border-border bg-qit-beige/40 hover:bg-white hover:border-qit-purple/20 hover:shadow-md transition-all p-6 md:p-7">
                <div className="w-12 h-12 rounded-xl bg-white border border-qit-purple/10 flex items-center justify-center mb-5 group-hover:bg-qit-coral/10 transition-colors">
                  <Icon className="h-5 w-5 text-qit-coral" />
                </div>
                <h3 className="text-lg font-semibold text-qit-purple mb-2 leading-snug">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trust;
