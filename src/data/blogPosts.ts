export type BlogCategory = "Conseils propriétaires" | "Revenue management" | "Drôme-Ardèche";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  date: string; // ISO
  readTime: string;
  content: string; // markdown-lite (paragraphs separated by \n\n, ## headings supported)
}

export const categories: BlogCategory[] = [
  "Conseils propriétaires",
  "Revenue management",
  "Drôme-Ardèche",
];

export const posts: BlogPost[] = [
  {
    slug: "louer-residence-secondaire-courte-duree",
    title: "Louer sa résidence secondaire en courte durée : par où commencer ?",
    excerpt:
      "Les étapes concrètes pour transformer une résidence secondaire en bien locatif courte durée, sans y passer ses week-ends.",
    category: "Conseils propriétaires",
    date: "2025-04-12",
    readTime: "6 min",
    content: `## Pourquoi se poser la question

Une résidence secondaire occupée quelques semaines par an peut générer des revenus significatifs sur le reste de l'année, à condition d'être correctement positionnée et pilotée.

## Les étapes clés

1. Évaluer le potentiel : localisation, capacité, équipements, saisonnalité.
2. Vérifier les obligations locales : déclaration en mairie, numéro d'enregistrement, règlement de copropriété.
3. Préparer le logement : équipement complet, photos professionnelles, inventaire.
4. Choisir les plateformes : Airbnb, Booking, Abritel selon la cible.
5. Définir la stratégie de prix avec un outil comme PriceLabs.

## Ce qu'il faut éviter

Publier rapidement une annonce sans travail de positionnement, ne pas bloquer ses propres dates, sous-estimer le ménage et le linge.

## Notre rôle

Qit Concierge prend en charge l'ensemble de ces étapes pour les propriétaires de Drôme-Ardèche, dans un rayon d'environ 1h autour de Tain-l'Hermitage.`,
  },
  {
    slug: "annonce-airbnb-optimisation-checklist",
    title: "Optimiser une annonce Airbnb existante : la checklist",
    excerpt:
      "Titre, photos, description, équipements, paramètres : ce qu'il faut revoir pour améliorer la visibilité d'une annonce déjà en ligne.",
    category: "Conseils propriétaires",
    date: "2025-05-02",
    readTime: "5 min",
    content: `## Pourquoi optimiser plutôt que recréer

Une annonce existante a déjà un historique (avis, ancienneté, classement). Il est souvent plus efficace de la retravailler que de repartir de zéro.

## Les points à revoir

- Titre : clair, descriptif, avec les bons mots-clés locaux.
- Photos : ordre, lumière, pièces clés, photos extérieures.
- Description : structure, équipements, environnement.
- Équipements cochés : aucun oubli (wifi, lave-linge, parking…).
- Paramètres : durée minimum, délai de réservation, calendrier.
- Prix : bornes minimum / maximum, saisonnalité.

## Ce qu'on observe sur le terrain

La majorité des annonces ont des paramètres mal réglés ou des équipements non déclarés. Les corrections simples ont souvent un impact rapide sur la visibilité.`,
  },
  {
    slug: "pricelabs-comment-ca-marche",
    title: "PriceLabs : comment fonctionne la tarification dynamique ?",
    excerpt:
      "Explication concrète du fonctionnement de PriceLabs et de ce que cela change pour un propriétaire de location courte durée.",
    category: "Revenue management",
    date: "2025-03-20",
    readTime: "7 min",
    content: `## Le principe

PriceLabs ajuste automatiquement les prix de votre annonce en fonction de la demande, de la saison, des événements locaux, de la concurrence et de votre taux d'occupation.

## Ce que vous gardez sous contrôle

- Prix minimum et prix maximum.
- Durée minimum de séjour selon la période.
- Règles spécifiques (week-ends, vacances, last minute).
- Périodes bloquées pour usage personnel.

## Ce que cela change

Au lieu d'un prix figé toute l'année, le tarif suit la réalité du marché. Cela permet de mieux remplir les périodes creuses et de mieux valoriser les périodes fortes.

## Notre approche

Nous configurons et surveillons PriceLabs pour chaque bien que nous gérons. L'objectif n'est pas de maximiser un prix unitaire, mais d'optimiser le revenu global sur l'année.`,
  },
  {
    slug: "trous-de-calendrier-comment-les-combler",
    title: "Trous de calendrier : comment les combler intelligemment",
    excerpt:
      "Last minute, durée minimum dynamique, remises ciblées : les leviers concrets pour limiter les nuits non réservées.",
    category: "Revenue management",
    date: "2025-04-28",
    readTime: "5 min",
    content: `## Pourquoi les trous coûtent cher

Une nuit non réservée ne se rattrape jamais. Sur l'année, ces trous représentent souvent une part significative du revenu manqué.

## Les leviers à activer

- Remises last minute progressives à l'approche de la date.
- Réduction de la durée minimum sur les courtes fenêtres entre deux réservations.
- Règles de prix spécifiques pour les nuits isolées.
- Surveillance des fenêtres de 1 à 3 nuits.

## Limites à respecter

Garder un prix plancher cohérent avec la qualité du bien et éviter les nuits isolées qui dégradent l'expérience (rotation, ménage, voyageurs).`,
  },
  {
    slug: "louer-en-courte-duree-drome-ardeche",
    title: "Louer en courte durée en Drôme-Ardèche : les zones qui marchent",
    excerpt:
      "Tour d'horizon des secteurs porteurs autour de Tain-l'Hermitage : vignobles, vallée du Rhône, Ardèche verte, Drôme des Collines.",
    category: "Drôme-Ardèche",
    date: "2025-02-15",
    readTime: "6 min",
    content: `## Une demande touristique réelle et étalée

La Drôme-Ardèche bénéficie d'une demande étalée sur l'année : œnotourisme autour de l'Hermitage, ViaRhôna, Ardèche verte, festivals et événements locaux, week-ends depuis Lyon ou la vallée du Rhône.

## Les secteurs à fort potentiel

- Tain-l'Hermitage et Tournon-sur-Rhône : vignobles, ViaRhôna, gastronomie.
- Romans-sur-Isère et Drôme des Collines : campagne, calme, accès facile.
- Valence et alentours : déplacements professionnels, courts séjours.
- Saint-Vallier et vallée du Rhône : axes touristiques et fluviaux.
- Annonay, Saint-Péray, Guilherand-Granges : maisons et gîtes en Ardèche verte.

## Ce qui fait la différence

Un bien bien équipé, des photos soignées et une annonce travaillée localement performent mieux qu'un bien mieux situé mais mal présenté.`,
  },
  {
    slug: "obligations-location-courte-duree-drome-ardeche",
    title: "Location courte durée en Drôme-Ardèche : les obligations à connaître",
    excerpt:
      "Déclaration en mairie, numéro d'enregistrement, taxe de séjour, copropriété : les points à vérifier avant de mettre en location.",
    category: "Drôme-Ardèche",
    date: "2025-03-05",
    readTime: "5 min",
    content: `## Les principales obligations

- Déclaration en mairie de la résidence en meublé de tourisme.
- Numéro d'enregistrement à reporter sur les annonces dans les communes concernées.
- Taxe de séjour collectée par la plateforme ou par le loueur.
- Vérification du règlement de copropriété pour les appartements.
- Conformité du logement (DPE, sécurité, assurance).

## Spécificités locales

Les règles peuvent varier selon les communes. Il est utile de vérifier auprès de la mairie concernée et de se tenir informé des évolutions.

## Notre rôle

Nous orientons les propriétaires vers les bons interlocuteurs et identifions les points de vigilance. Cet accompagnement ne remplace pas un conseil juridique ou fiscal.`,
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);
export const getPostsByCategory = (category: BlogCategory) =>
  posts.filter((p) => p.category === category);
