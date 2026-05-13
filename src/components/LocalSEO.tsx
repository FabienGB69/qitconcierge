import { MapPin } from "lucide-react";

const zones = [
  "Tain-l'Hermitage",
  "Tournon-sur-Rhône",
  "Valence",
  "Romans-sur-Isère",
  "Saint-Vallier",
  "Annonay",
  "Saint-Péray",
  "Crozes-Hermitage",
  "Drôme des Collines",
  "Ardèche verte",
  "Vallée du Rhône",
  "ViaRhôna",
];

const internalLinks: { href: string; label: string }[] = [
  { href: "/conciergerie-airbnb-drome", label: "Conciergerie Airbnb Drôme" },
  { href: "/conciergerie-airbnb-ardeche", label: "Conciergerie Airbnb Ardèche" },
  { href: "/conciergerie-airbnb-tain-hermitage", label: "Conciergerie Tain-l'Hermitage" },
  { href: "/conciergerie-airbnb-tournon", label: "Conciergerie Tournon-sur-Rhône" },
  { href: "/conciergerie-airbnb-valence", label: "Conciergerie Valence" },
  { href: "/conciergerie-airbnb-romans-sur-isere", label: "Conciergerie Romans-sur-Isère" },
  { href: "/conciergerie-airbnb-saint-vallier", label: "Conciergerie Saint-Vallier" },
  { href: "/gestion-gite-drome", label: "Gestion de gîte Drôme" },
  { href: "/gestion-gite-ardeche", label: "Gestion de gîte Ardèche" },
  { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Résidence secondaire Drôme-Ardèche" },
  { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management PriceLabs" },
  { href: "/gestion-booking-abritel-drome-ardeche", label: "Gestion Booking & Abritel" },
];

const LocalSEO = () => {
  return (
    <section className="py-14 md:py-20 bg-qit-beige/50 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-qit-purple mb-6 leading-tight">
          Conciergerie Airbnb et location courte durée en Drôme-Ardèche
        </h2>
        <p className="text-base text-muted-foreground leading-relaxed mb-6">
          Qit Concierge accompagne les propriétaires de maisons de campagne, gîtes,
          appartements et résidences secondaires en Drôme-Ardèche, à moins d'1h de
          Tain-l'Hermitage. Une conciergerie locale pensée pour les villages
          touristiques, les zones rurales, les bords de la ViaRhôna, les vignobles
          de l'Hermitage et de Crozes-Hermitage, l'Ardèche verte, la Drôme des
          Collines et la vallée du Rhône.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed mb-8">
          Optimisation Airbnb, Booking et Abritel, revenue management avec
          PriceLabs, ménage, linge, check-in et accompagnement humain et terrain —
          pensé pour les propriétaires non disponibles sur place.
        </p>

        <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-4">
          Zones desservies
        </h3>
        <ul className="flex flex-wrap gap-2 mb-10">
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

        <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-4">
          Nos services par zone et par typologie
        </h3>
        <ul className="flex flex-wrap gap-2">
          {internalLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex items-center rounded-full border border-qit-purple/20 bg-white px-4 py-2 text-sm text-qit-purple hover:bg-qit-purple hover:text-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LocalSEO;
