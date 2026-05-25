import { Heart, ShieldCheck, LineChart, Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        label: "Notre approche",
        heading: "Une conciergerie humaine, fiable et performante",
        body: "Un service exigeant pour des logements bien placés — urbains ou touristiques — sans promesse excessive ni distance d'agence.",
        pillars: [
          { icon: Handshake, title: "Humain", text: "Un interlocuteur dédié, des échanges directs et un suivi personnalisé pour chaque logement." },
          { icon: ShieldCheck, title: "Fiable", text: "Process clairs, sélection des voyageurs, contrôles après séjour et réactivité en cas d'imprévu." },
          { icon: LineChart, title: "Performant", text: "Pricing ajusté, calendrier optimisé et reporting transparent pour faire progresser vos revenus." },
          { icon: Heart, title: "Rigoureux", text: "Une exigence de qualité adaptée à votre logement, qu'il soit T1 urbain, T3 familial ou gîte." },
        ],
      }
    : {
        label: "Our approach",
        heading: "A human, reliable and performance-driven concierge",
        body: "A demanding service for well-located properties — urban or holiday — without overpromising and without the distance of a large agency.",
        pillars: [
          { icon: Handshake, title: "Human", text: "A dedicated contact, direct conversations and tailored follow-up for every property." },
          { icon: ShieldCheck, title: "Reliable", text: "Clear processes, guest screening, post-stay inspections and quick reaction when things go sideways." },
          { icon: LineChart, title: "Performance-driven", text: "Tuned pricing, optimised calendar and transparent reporting to grow your revenue." },
          { icon: Heart, title: "Rigorous", text: "A level of quality matched to your property — whether it's a city studio, a family flat or a gîte." },
        ],
      };

  return (
    <section id="approche" className="py-14 md:py-20 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">{t.label}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-qit-purple mb-4 leading-tight">{t.heading}</h2>
          <p className="text-muted-foreground">{t.body}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {t.pillars.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-md bg-qit-purple/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-qit-purple" />
              </div>
              <h3 className="font-semibold text-qit-purple mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
