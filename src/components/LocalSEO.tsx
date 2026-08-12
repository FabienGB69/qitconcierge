import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const zones = [
  "Tain-l'Hermitage",
  "Tournon-sur-Rhône",
  "Romans-sur-Isère",
  "Valence",
  "Saint-Vallier",
  "Saint-Donat-sur-l'Herbasse",
  "Annonay",
  "Saint-Péray",
  "Guilherand-Granges",
  "Drôme des Collines",
  "Ardèche Verte",
  "Vallée du Rhône",
];

const internalLinksFR: { href: string; label: string }[] = [
  { href: "/conciergerie-airbnb-drome", label: "Conciergerie Airbnb Drôme" },
  { href: "/conciergerie-airbnb-ardeche", label: "Conciergerie Airbnb Ardèche" },
  { href: "/conciergerie-airbnb-tain-hermitage", label: "Conciergerie Tain-l'Hermitage" },
  { href: "/conciergerie-airbnb-tournon", label: "Conciergerie Tournon-sur-Rhône" },
  { href: "/conciergerie-airbnb-valence", label: "Conciergerie Valence" },
  { href: "/conciergerie-airbnb-romans-sur-isere", label: "Conciergerie Romans-sur-Isère" },
  { href: "/conciergerie-airbnb-saint-vallier", label: "Conciergerie Saint-Vallier" },
  { href: "/gestion-gite-drome", label: "Gestion maison Drôme" },
  { href: "/gestion-gite-ardeche", label: "Gestion maison Ardèche" },
  { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Résidence secondaire Drôme-Ardèche" },
  { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management PriceLabs" },
  { href: "/gestion-booking-abritel-drome-ardeche", label: "Gestion Booking & Abritel" },
];

const internalLinksEN: { href: string; label: string }[] = [
  { href: "/conciergerie-airbnb-drome", label: "Airbnb concierge — Drôme" },
  { href: "/conciergerie-airbnb-ardeche", label: "Airbnb concierge — Ardèche" },
  { href: "/conciergerie-airbnb-tain-hermitage", label: "Concierge — Tain-l'Hermitage" },
  { href: "/conciergerie-airbnb-tournon", label: "Concierge — Tournon-sur-Rhône" },
  { href: "/conciergerie-airbnb-valence", label: "Concierge — Valence" },
  { href: "/conciergerie-airbnb-romans-sur-isere", label: "Concierge — Romans-sur-Isère" },
  { href: "/conciergerie-airbnb-saint-vallier", label: "Concierge — Saint-Vallier" },
  { href: "/gestion-gite-drome", label: "Country house management — Drôme" },
  { href: "/gestion-gite-ardeche", label: "Country house management — Ardèche" },
  { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Second home — Drôme-Ardèche" },
  { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management — PriceLabs" },
  { href: "/gestion-booking-abritel-drome-ardeche", label: "Booking & Abritel management" },
];

const LocalSEO = () => {
  const { isFR } = useLanguage();
  const t = isFR
    ? {
        heading: "Conciergerie courte durée autour de Tain-l'Hermitage, en Drôme-Ardèche",
        p1: "Qit Concierge accompagne les propriétaires de maisons de campagne, appartements et résidences secondaires situés en Drôme-Ardèche, dans un rayon d'environ 1h autour de Tain-l'Hermitage. Nous intervenons sur les secteurs de Tain-l'Hermitage, Tournon-sur-Rhône, Romans-sur-Isère, Valence, Saint-Vallier, Saint-Donat-sur-l'Herbasse, Annonay, Saint-Péray, Guilherand-Granges, Drôme des Collines, Ardèche Verte et Vallée du Rhône.",
        p2: "Conciergerie Airbnb Drôme et conciergerie Airbnb Ardèche : gestion location courte durée Drôme-Ardèche, gestion Booking Drôme, gestion Abritel Ardèche, gestion de maison de campagne en Drôme-Ardèche, ménage, linge, accueil voyageurs et revenue management location courte durée avec PriceLabs — un accompagnement humain et terrain pensé pour les propriétaires non disponibles sur place.",
        h3a: "Zones desservies",
        h3b: "Nos services par zone et par typologie",
        links: internalLinksFR,
      }
    : {
        heading: "Short-term rental concierge around Tain-l'Hermitage, in Drôme-Ardèche",
        p1: "Qit Concierge supports owners of country houses, apartments and second homes located in Drôme-Ardèche, within about a 1-hour radius of Tain-l'Hermitage. We cover Tain-l'Hermitage, Tournon-sur-Rhône, Romans-sur-Isère, Valence, Saint-Vallier, Saint-Donat-sur-l'Herbasse, Annonay, Saint-Péray, Guilherand-Granges, Drôme des Collines, Ardèche Verte and the Rhône Valley.",
        p2: "Airbnb concierge in Drôme and Ardèche: short-term rental management, Booking and Abritel management, country house management, cleaning, linen, guest welcome and short-term rental revenue management with PriceLabs — a hands-on, local service designed for owners who can't be on site.",
        h3a: "Areas covered",
        h3b: "Services by area and property type",
        links: internalLinksEN,
      };

  return (
    <section className="py-10 md:py-14 bg-qit-beige/30 border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-xl md:text-2xl font-bold text-qit-purple mb-4 leading-tight">{t.heading}</h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{t.p1}</p>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">{t.p2}</p>

        <details className="group rounded-xl border border-border bg-white overflow-hidden">
          <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium text-qit-purple hover:bg-qit-beige/40 transition-colors">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-qit-coral" />
              {t.h3a}
            </span>
            <span className="text-xs text-muted-foreground group-open:hidden">{isFR ? "Afficher" : "Show"}</span>
            <span className="text-xs text-muted-foreground hidden group-open:inline">{isFR ? "Masquer" : "Hide"}</span>
          </summary>
          <div className="px-4 pb-4 pt-1">
            <ul className="flex flex-wrap gap-2 mb-6">
              {zones.map((zone) => (
                <li key={zone} className="inline-flex items-center gap-1.5 rounded-full bg-qit-beige/50 border border-border px-3 py-1.5 text-xs text-qit-purple/80">
                  {zone}
                </li>
              ))}
            </ul>

            <h3 className="text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">{t.h3b}</h3>
            <ul className="flex flex-wrap gap-2">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex items-center rounded-full border border-border bg-qit-beige/50 px-3 py-1.5 text-xs text-qit-purple/80 hover:bg-qit-purple hover:text-white hover:border-qit-purple transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    </section>
  );
};

export default LocalSEO;
