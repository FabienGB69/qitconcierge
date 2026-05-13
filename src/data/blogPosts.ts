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
    slug: "conciergerie-airbnb-drome-choisir-prestataire",
    title: "Conciergerie Airbnb en Drôme : comment bien choisir son prestataire ?",
    excerpt:
      "Les critères concrets pour évaluer une conciergerie locale : ancrage, transparence, plateformes, revenue management et suivi qualité.",
    category: "Conseils propriétaires",
    date: "2025-05-08",
    readTime: "6 min",
    content: `## Pourquoi le choix du prestataire compte

Une conciergerie ne se résume pas à du ménage et des remises de clés. Elle pilote vos revenus, votre image et votre relation avec les voyageurs.

## Les critères à examiner

- Ancrage local réel en Drôme-Ardèche, pas une marque nationale en sous-traitance.
- Transparence sur les frais, le périmètre et les conditions de sortie.
- Maîtrise des plateformes Airbnb, Booking et Abritel.
- Pratique du revenue management (PriceLabs ou équivalent).
- Suivi qualité documenté après chaque séjour.
- Réactivité en cas d'imprévu.

## Les signaux à fuir

Promesses de revenus garanties, opacité sur la commission, absence de référence locale, communication uniquement automatisée.

## Notre approche

Qit Concierge accompagne un nombre volontairement limité de biens en Drôme-Ardèche pour garder un suivi précis et un contact direct avec chaque propriétaire.`,
  },
  {
    slug: "louer-maison-campagne-ardeche-points-a-verifier",
    title: "Louer sa maison de campagne en courte durée en Ardèche : les points à vérifier",
    excerpt:
      "Réglementation, équipements, accès, photos, saisonnalité : la liste des vérifications avant de mettre une maison en location.",
    category: "Conseils propriétaires",
    date: "2025-04-22",
    readTime: "6 min",
    content: `## Avant de publier l'annonce

- Déclaration en mairie et numéro d'enregistrement si applicable.
- Assurance adaptée à la location saisonnière.
- DPE et conformité du logement.
- Inventaire complet et état des lieux photographié.

## Sur le bien lui-même

- Équipements clés : wifi performant, literie de qualité, cuisine fonctionnelle, chauffage ou climatisation.
- Accès clair, parking, instructions précises pour les voyageurs.
- Extérieur entretenu, photos prises à la bonne saison.

## Sur la stratégie locative

- Saisonnalité de l'Ardèche : forte demande estivale, ailes de saison à travailler.
- Prix minimum / maximum cohérents avec le marché local.
- Plateformes adaptées au type de clientèle visée.

## Notre rôle

Nous réalisons cet audit pour chaque bien que nous prenons en gestion en Ardèche.`,
  },
  {
    slug: "pourquoi-utiliser-pricelabs-drome-ardeche",
    title: "Pourquoi utiliser PriceLabs pour une location courte durée en Drôme-Ardèche ?",
    excerpt:
      "Saisonnalité marquée, événements locaux, vignobles, ViaRhôna : pourquoi la tarification dynamique a un vrai impact dans la région.",
    category: "Revenue management",
    date: "2025-05-01",
    readTime: "6 min",
    content: `## Une demande très inégale dans le temps

La Drôme-Ardèche connaît une saisonnalité marquée et de nombreux événements locaux : vendanges, festivals, vacances scolaires, week-ends prolongés. Un prix figé passe à côté d'une partie significative du revenu potentiel.

## Ce que PriceLabs permet concrètement

- Ajustement automatique des prix selon la demande et la concurrence locale.
- Détection des événements locaux et hausse ciblée.
- Gestion des trous de calendrier avec remises last minute.
- Règles de durée minimum dynamiques.

## Ce que cela ne fait pas

PriceLabs ne remplace pas l'analyse humaine. C'est un outil que nous configurons et surveillons, pas un pilote automatique.

## Notre pratique

Chaque bien géré par Qit Concierge est paramétré dans PriceLabs avec des règles propres à sa zone, sa typologie et sa saisonnalité.`,
  },
  {
    slug: "airbnb-booking-abritel-quelle-plateforme-choisir",
    title: "Airbnb, Booking ou Abritel : quelle plateforme choisir ?",
    excerpt:
      "Forces et limites de chaque plateforme, et comment combiner les trois selon le type de bien et la clientèle visée.",
    category: "Conseils propriétaires",
    date: "2025-03-28",
    readTime: "6 min",
    content: `## Airbnb

Plateforme de référence pour les courts séjours, week-ends, couples et familles. Forte audience, paramètres fins, exigeante sur la qualité de l'annonce et la réactivité.

## Booking

Audience large, internationale et mobile. Intéressant pour capter des clientèles en déplacement ou de passage. Conditions d'annulation et politique tarifaire spécifiques.

## Abritel (Vrbo)

Bien positionnée sur les locations de vacances, maisons et gîtes pour familles. Souvent pertinente en complément en Drôme-Ardèche.

## La bonne stratégie

Ne pas dépendre d'une seule plateforme. La combinaison Airbnb + Booking + Abritel, synchronisée avec un calendrier unifié et un pricing cohérent, est souvent la plus robuste.

## Notre rôle

Nous choisissons les plateformes adaptées à chaque bien et synchronisons les annonces et les prix.`,
  },
  {
    slug: "conciergerie-tain-hermitage-logements-qui-louent-le-mieux",
    title: "Conciergerie autour de Tain-l'Hermitage : quels logements se louent le mieux ?",
    excerpt:
      "Typologies, capacités, équipements et localisation : ce qui fait la différence dans le bassin de Tain-l'Hermitage.",
    category: "Drôme-Ardèche",
    date: "2025-04-10",
    readTime: "6 min",
    content: `## Un bassin touristique cohérent

Vignobles de l'Hermitage et de Crozes-Hermitage, ViaRhôna, vallée du Rhône, gastronomie : la zone autour de Tain-l'Hermitage attire une clientèle régulière, étalée sur l'année.

## Les biens qui performent

- Maisons et gîtes pour 4 à 8 personnes, avec extérieur.
- Appartements bien situés à Tain-l'Hermitage, Tournon-sur-Rhône ou Valence.
- Résidences secondaires équipées pour le télétravail et les séjours mixtes.

## Les facteurs qui font la différence

- Photos professionnelles prises à la bonne saison.
- Équipements pensés pour les vacanciers ET les voyageurs d'affaires.
- Accueil clair, instructions précises, ménage irréprochable.
- Tarification ajustée aux événements et à la saisonnalité.

## Notre rôle

Nous accompagnons les propriétaires de ce bassin avec une stratégie adaptée à chaque typologie de bien.`,
  },
  {
    slug: "location-courte-duree-zone-rurale-erreurs",
    title: "Location courte durée en zone rurale : les erreurs qui font perdre des réservations",
    excerpt:
      "Photos peu valorisantes, annonce trop courte, prix figé, équipements oubliés : les erreurs récurrentes sur les biens en zone rurale.",
    category: "Drôme-Ardèche",
    date: "2025-05-05",
    readTime: "5 min",
    content: `## Les erreurs les plus fréquentes

- Photos prises au téléphone, mal éclairées ou hors saison.
- Annonce trop courte, sans description de l'environnement.
- Équipements clés non déclarés (wifi, lave-linge, parking, chauffage).
- Prix unique sur l'année, sans saisonnalité ni événements.
- Durée minimum trop élevée qui bloque les week-ends.
- Réponse lente aux demandes d'information.

## Pourquoi c'est plus pénalisant en zone rurale

Le voyageur ne connaît pas la zone et doit se projeter à partir de l'annonce. Une présentation imprécise déclenche un doute et fait perdre la réservation.

## Comment corriger

Audit photo, réécriture du titre et de la description, mise à jour des équipements, paramétrage du calendrier et bornes de prix cohérentes.

## Notre rôle

Nous réalisons ce travail systématiquement sur chaque bien que nous prenons en gestion.`,
  },
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
