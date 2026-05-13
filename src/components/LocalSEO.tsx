import { MapPin } from "lucide-react";

const zones = [
  "Tain-l'Hermitage",
  "Tournon-sur-Rhône",
  "Valence",
  "Romans-sur-Isère",
  "Annonay",
  "Saint-Péray",
  "Crozes-Hermitage",
  "Drôme des Collines",
  "Ardèche verte",
];

const LocalSEO = () => {
  return (
    <section className="py-14 md:py-20 bg-qit-beige/50 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-qit-purple mb-6 leading-tight">
          Conciergerie Airbnb et location courte durée en Drôme-Ardèche
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          Qit Concierge accompagne les propriétaires de maisons de campagne, gîtes,
          appartements et résidences secondaires en Drôme-Ardèche, à moins d'1h de
          Tain-l'Hermitage. Optimisation Airbnb, Booking et Abritel, revenue management
          avec PriceLabs, ménage, check-in et accompagnement humain et terrain — pour
          une meilleure rentabilité, sans gestion quotidienne.
        </p>
        <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-4">
          Zones desservies
        </h3>
        <ul className="flex flex-wrap gap-2">
          {zones.map((zone) => (
            <li
              key={zone}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-border px-4 py-2 text-sm text-qit-purple"
            >
              <MapPin className="h-3.5 w-3.5 text-qit-coral" />
              {zone}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LocalSEO;
