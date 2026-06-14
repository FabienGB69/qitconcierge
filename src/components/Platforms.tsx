import { useLanguage } from "@/contexts/LanguageContext";

const Platforms = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        label: "Plateformes",
        heading: "Vos annonces pilotées sur les bonnes plateformes",
        body: "Qit Concierge accompagne les propriétaires dans la mise en ligne, l'optimisation et le suivi de leurs annonces sur Airbnb, Booking et Abritel. Selon le type de bien, la localisation et la clientèle cible, nous adaptons la stratégie de diffusion pour améliorer la visibilité et limiter les périodes creuses.",
        eyebrow: "Plateforme",
        outro: "Objectif : ne pas dépendre d'une seule plateforme et adapter la stratégie à votre bien.",
        platforms: [
          { name: "Airbnb", text: "Idéal pour les courts séjours, les week-ends, les couples, familles et voyageurs en recherche d'expériences locales." },
          { name: "Booking", text: "Intéressant pour capter une clientèle plus large, mobile, internationale ou en déplacement." },
          { name: "Abritel", text: "Pertinent pour les maisons, séjours familiaux, résidences secondaires et locations de vacances." },
        ],
      }
    : {
        label: "Platforms",
        heading: "Your listings managed across the right platforms",
        body: "Qit Concierge helps owners list, optimise and monitor their properties on Airbnb, Booking and Abritel. Depending on the property type, location and target audience, we tailor the distribution strategy to improve visibility and reduce empty periods.",
        eyebrow: "Platform",
        outro: "Goal: don't rely on a single platform — adapt the strategy to your property.",
        platforms: [
          { name: "Airbnb", text: "Great for short stays, weekends, couples, families and travellers looking for local experiences." },
          { name: "Booking", text: "Useful to reach a broader, mobile, international or business audience." },
          { name: "Abritel", text: "Well suited to houses, family stays, second homes and holiday rentals." },
        ],
      };

  return (
    <section className="py-20 md:py-28 bg-qit-beige/40 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="max-w-3xl mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">{t.label}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple mb-5 leading-tight">{t.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t.body}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
          {t.platforms.map((p) => (
            <div key={p.name} className="rounded-2xl border border-border bg-white p-6 hover:border-qit-coral/40 transition-colors">
              <div className="text-xs uppercase tracking-widest text-qit-coral font-semibold mb-2">{t.eyebrow}</div>
              <h3 className="text-xl font-bold text-qit-purple mb-3">{p.name}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <p className="text-base md:text-lg text-qit-purple font-medium leading-relaxed">{t.outro}</p>
      </div>
    </section>
  );
};

export default Platforms;
