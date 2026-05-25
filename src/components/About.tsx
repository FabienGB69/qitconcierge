import { Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        eyebrow: "Notre approche",
        heading: "Une conciergerie locale, créée en 2023, avec un suivi vraiment personnalisé",
        body: "Qit Concierge accompagne un nombre maîtrisé de logements en Drôme-Ardèche pour garantir un suivi de qualité, réactif et personnalisé à chaque propriétaire.",
        outro: "Nous préférons accompagner moins de biens, mais mieux les piloter.",
        stats: [
          { value: "Depuis 2023", label: "Conciergerie locale en activité" },
          { value: "+30", label: "Biens gérés au total" },
          { value: "Airbnb · Booking · Abritel", label: "Plateformes pilotées" },
        ],
      }
    : {
        eyebrow: "Our approach",
        heading: "A local concierge service, founded in 2023, with truly personal follow-up",
        body: "Qit Concierge looks after a deliberately limited number of properties in Drôme-Ardèche, so every owner gets responsive, high-quality and tailored attention.",
        outro: "We'd rather manage fewer properties and run each one better.",
        stats: [
          { value: "Since 2023", label: "Local concierge in operation" },
          { value: "30+", label: "Properties managed in total" },
          { value: "Airbnb · Booking · Abritel", label: "Platforms managed" },
        ],
      };

  return (
    <section className="py-14 md:py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="rounded-2xl border border-border bg-qit-beige/40 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-qit-coral/10 text-qit-coral">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-xs uppercase tracking-widest text-qit-coral font-semibold">{t.eyebrow}</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple mb-5 leading-tight">{t.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 md:mb-10">{t.body}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
            {t.stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white border border-border p-5 text-center">
                <div className="text-xl md:text-2xl font-bold text-qit-purple leading-tight mb-1">{s.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <p className="text-base md:text-lg text-qit-purple font-medium leading-relaxed">{t.outro}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
