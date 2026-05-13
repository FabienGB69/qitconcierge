const platforms = [
  {
    name: "Airbnb",
    text: "Idéal pour les courts séjours, les week-ends, les couples, familles et voyageurs en recherche d'expériences locales.",
  },
  {
    name: "Booking",
    text: "Intéressant pour capter une clientèle plus large, mobile, internationale ou en déplacement.",
  },
  {
    name: "Abritel",
    text: "Pertinent pour les maisons, gîtes, séjours familiaux, résidences secondaires et locations de vacances.",
  },
];

const Platforms = () => {
  return (
    <section className="py-14 md:py-20 bg-qit-beige/40 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="max-w-3xl mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
            Plateformes
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple mb-5 leading-tight">
            Vos annonces pilotées sur les bonnes plateformes
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Qit Concierge accompagne les propriétaires dans la mise en ligne,
            l'optimisation et le suivi de leurs annonces sur Airbnb, Booking et
            Abritel. Selon le type de bien, la localisation et la clientèle
            cible, nous adaptons la stratégie de diffusion pour améliorer la
            visibilité et limiter les périodes creuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
          {platforms.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-border bg-white p-6 hover:border-qit-coral/40 transition-colors"
            >
              <div className="text-xs uppercase tracking-widest text-qit-coral font-semibold mb-2">
                Plateforme
              </div>
              <h3 className="text-xl font-bold text-qit-purple mb-3">{p.name}</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <p className="text-base md:text-lg text-qit-purple font-medium leading-relaxed">
          Objectif : ne pas dépendre d'une seule plateforme et adapter la
          stratégie à votre bien.
        </p>
      </div>
    </section>
  );
};

export default Platforms;
