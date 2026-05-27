// Per-page enriched SEO content for each local landing.
// Keyed by route slug. Used by LocalLanding to build Hn structure,
// local FAQ, internal linking, and JSON-LD (LocalBusiness + FAQPage).

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceItem {
  h3: string;
  body: string;
}

export interface LocalPageData {
  /** City or area name shown in copy (e.g. "Tain-l'Hermitage"). */
  area: string;
  /** Wider region used in JSON-LD areaServed (e.g. "Drôme-Ardèche"). */
  region: string;
  /** Short keyword line displayed under the H1 area context. */
  keywordsLine: string;
  /** "Pourquoi Qit Concierge à X" paragraph. */
  whyParagraph: string;
  /** Bulleted local context (3-5 short items). */
  whyBullets: string[];
  /** 6 services with H3 + body. */
  services: ServiceItem[];
  /** "Spécificités locales" paragraph (saisonnalité, demande, voyageurs). */
  localContext: string;
  /** Local FAQ — 4 to 6 items. */
  faq: FaqItem[];
  /** Slugs of neighbor / related local pages (without leading slash). */
  relatedSlugs: string[];
  /** Slugs of related blog posts (without leading slash). */
  relatedBlogSlugs: string[];
}

const SHARED_SERVICES: ServiceItem[] = [
  {
    h3: "Création et optimisation d'annonces Airbnb, Booking et Abritel",
    body: "Photos, titres, descriptions, équipements, règlement intérieur : nous publions et synchronisons votre annonce sur les principales plateformes pour maximiser visibilité et taux de conversion.",
  },
  {
    h3: "Revenue management avec PriceLabs",
    body: "Tarification dynamique ajustée chaque jour selon la saison, la demande locale, les événements et la concurrence. Objectif : meilleur prix moyen par nuit sans dégrader le taux d'occupation.",
  },
  {
    h3: "Accueil voyageurs et check-in / check-out",
    body: "Communication 7j/7, sélection des profils, remise des clés, état des lieux et assistance pendant le séjour. Une présence locale pour rassurer voyageurs et propriétaires.",
  },
  {
    h3: "Ménage hôtelier et gestion du linge",
    body: "Ménage entre chaque séjour avec checklist hôtelière, fourniture du linge de lit et de toilette, réassort des consommables. Qualité contrôlée à chaque rotation.",
  },
  {
    h3: "Suivi qualité et petite maintenance",
    body: "Inspection régulière du logement, signalement et coordination des petits travaux, suivi des avis voyageurs pour maintenir un score élevé sur Airbnb, Booking et Abritel.",
  },
  {
    h3: "Pilotage du calendrier et reporting",
    body: "Gestion des durées minimales de séjour, des trous de calendrier, des promotions ciblées. Reporting clair des revenus, du taux d'occupation et du prix moyen par nuit.",
  },
];

const PRICING_FAQ: FaqItem = {
  q: "Quel est le tarif de Qit Concierge ?",
  a: "Qit Concierge fonctionne avec une commission de 25% TTC sur les revenus locatifs générés. Aucun abonnement, aucun frais fixe : si votre logement ne génère pas de réservation, vous ne payez pas de commission de gestion.",
};

export const localPages: Record<string, LocalPageData> = {
  "conciergerie-airbnb-tain-hermitage": {
    area: "Tain-l'Hermitage",
    region: "Drôme-Ardèche",
    keywordsLine:
      "Conciergerie Airbnb Tain-l'Hermitage, gestion location courte durée Tain-l'Hermitage, ménage Airbnb Hermitage, revenue management PriceLabs.",
    whyParagraph:
      "Tain-l'Hermitage est une destination courte durée recherchée toute l'année grâce à ses vignobles AOC Hermitage et Crozes-Hermitage, sa proximité avec la gare TGV de Valence et la ViaRhôna. Qit Concierge est implantée localement et gère votre maison, appartement ou résidence secondaire à Tain-l'Hermitage avec une vraie présence terrain.",
    whyBullets: [
      "Conciergerie locale basée à moins d'1h de Tain-l'Hermitage",
      "Gestion complète multi-plateformes Airbnb, Booking, Abritel",
      "Tarification dynamique avec PriceLabs pour suivre la saisonnalité viticole",
      "Accueil voyageurs en français et en anglais",
      "Ménage hôtelier et linge entre chaque séjour",
    ],
    services: SHARED_SERVICES,
    localContext:
      "La demande à Tain-l'Hermitage est marquée par les vendanges (août-octobre), les week-ends œnotouristiques toute l'année et les voyageurs d'affaires liés à la vallée du Rhône. Une bonne tarification dynamique et une gestion fine des durées minimales de séjour permettent de capter ces différents segments sans dégrader le taux d'occupation.",
    faq: [
      {
        q: "Qit Concierge intervient-elle vraiment à Tain-l'Hermitage ?",
        a: "Oui. Tain-l'Hermitage est au cœur de notre zone d'intervention. Nous gérons des logements situés à Tain-l'Hermitage et dans les communes voisines (Tournon-sur-Rhône, Mercurol, Larnage, Crozes-Hermitage, Erôme).",
      },
      {
        q: "Quels types de logements gérez-vous à Tain-l'Hermitage ?",
        a: "Maisons de village, appartements et résidences secondaires. Nous accompagnons en priorité les propriétaires non disponibles sur place qui veulent louer en courte durée sans gérer le quotidien.",
      },
      {
        q: "Comment se passent les vendanges côté location courte durée ?",
        a: "La période des vendanges (août à mi-octobre) génère une forte demande œnotouristique. Nous ajustons les prix avec PriceLabs et les durées minimales de séjour pour capter à la fois les week-ends et les séjours plus longs.",
      },
      PRICING_FAQ,
      {
        q: "Gérez-vous aussi Booking et Abritel, ou seulement Airbnb ?",
        a: "Nous synchronisons votre annonce sur Airbnb, Booking et Abritel via un calendrier unifié, pour maximiser la visibilité sans risque de double réservation.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-tournon",
      "conciergerie-airbnb-saint-vallier",
      "conciergerie-airbnb-drome",
      "revenue-management-airbnb-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "conciergerie-tain-hermitage-logements-qui-louent-le-mieux",
      "pourquoi-utiliser-pricelabs-drome-ardeche",
      "louer-en-courte-duree-drome-ardeche",
    ],
  },

  "conciergerie-airbnb-tournon": {
    area: "Tournon-sur-Rhône",
    region: "Ardèche",
    keywordsLine:
      "Conciergerie Airbnb Tournon-sur-Rhône, gestion location courte durée Tournon, ménage Airbnb Ardèche, revenue management PriceLabs.",
    whyParagraph:
      "Tournon-sur-Rhône bénéficie d'une demande courte durée régulière grâce à la ViaRhôna, au train de l'Ardèche et à la proximité immédiate des vignobles de l'Hermitage. Qit Concierge est une conciergerie locale et humaine, présente sur la rive ardéchoise et la rive drômoise.",
    whyBullets: [
      "Conciergerie locale Drôme-Ardèche, à 5 minutes de Tournon",
      "Gestion Airbnb, Booking et Abritel synchronisés",
      "Revenue management PriceLabs adapté à la saisonnalité ardéchoise",
      "Présence terrain pour ménage, check-in et maintenance",
    ],
    services: SHARED_SERVICES,
    localContext:
      "La demande à Tournon est tirée par le tourisme à vélo (ViaRhôna), les visites œnologiques et les week-ends nature. Les séjours sont souvent courts (2 à 4 nuits) : une politique de prix et de durées minimales bien calibrée fait toute la différence sur le taux d'occupation.",
    faq: [
      {
        q: "Quels secteurs autour de Tournon couvrez-vous ?",
        a: "Tournon-sur-Rhône, Saint-Jean-de-Muzols, Mauves, Glun, Sarras, ainsi que Tain-l'Hermitage et la rive drômoise. Toute notre zone se situe à moins d'une heure de Tain-l'Hermitage.",
      },
      {
        q: "Mon logement est petit, est-ce rentable en courte durée ?",
        a: "Oui, à condition d'avoir une annonce optimisée et une bonne tarification. Les studios et T2 bien placés à Tournon se louent très bien aux cyclistes ViaRhôna et aux voyageurs œnologiques.",
      },
      {
        q: "Comment gérez-vous les arrivées tardives ?",
        a: "Nous proposons un check-in en personne lorsque c'est possible, et une remise des clés en boîte sécurisée pour les arrivées tardives, avec consignes envoyées à l'avance au voyageur.",
      },
      PRICING_FAQ,
      {
        q: "Faut-il déclarer mon logement en mairie à Tournon ?",
        a: "Oui, comme partout en France, la location courte durée est soumise à des obligations déclaratives. Nous vous orientons vers les bonnes démarches mais ne nous substituons pas à un conseil juridique.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-tain-hermitage",
      "conciergerie-airbnb-ardeche",
      "conciergerie-location-courte-duree-ardeche",
      "gestion-gite-ardeche",
    ],
    relatedBlogSlugs: [
      "louer-maison-campagne-ardeche-points-a-verifier",
      "louer-en-courte-duree-drome-ardeche",
      "annonce-airbnb-optimisation-checklist",
    ],
  },

  "conciergerie-airbnb-valence": {
    area: "Valence",
    region: "Drôme",
    keywordsLine:
      "Conciergerie Airbnb Valence, gestion location courte durée Valence, ménage Airbnb appartement, revenue management PriceLabs.",
    whyParagraph:
      "Valence est un marché courte durée porté par le TGV, l'activité d'affaires, les hôpitaux et les évènements locaux. Qit Concierge gère vos appartements et résidences secondaires à Valence avec une approche professionnelle, locale et transparente.",
    whyBullets: [
      "Spécialistes des appartements en centre-ville et proche gare TGV",
      "Annonces Airbnb / Booking / Abritel optimisées pour la clientèle d'affaires et de week-end",
      "Tarification dynamique PriceLabs",
      "Ménage hôtelier et linge fournis",
    ],
    services: SHARED_SERVICES,
    localContext:
      "À Valence, la demande mêle voyageurs d'affaires en semaine et touristes en week-end. Une bonne segmentation des prix (semaine vs week-end) et une gestion attentive des avis voyageurs sont déterminantes pour rester en haut des résultats Airbnb et Booking.",
    faq: [
      {
        q: "Gérez-vous des appartements en centre-ville de Valence ?",
        a: "Oui, c'est l'une de nos typologies privilégiées : appartements en centre-ville, quartier de la gare TGV, hauts de Valence. Nous gérons aussi des maisons en périphérie.",
      },
      {
        q: "Quel taux d'occupation viser à Valence ?",
        a: "Cela dépend du logement, de l'emplacement et du prix. Nous donnons une fourchette prudente lors de l'estimation, basée sur des données réelles du marché valentinois.",
      },
      {
        q: "Acceptez-vous les courts séjours d'une nuit ?",
        a: "Oui pour les profils adaptés (voyageurs d'affaires, escales TGV). Pour d'autres logements, nous recommandons un minimum de 2 nuits afin de protéger la rentabilité et limiter le turn-over.",
      },
      PRICING_FAQ,
      {
        q: "Y a-t-il une limite de 120 jours par an à Valence ?",
        a: "Cette règle s'applique aux résidences principales en zone tendue. Valence n'est pas concernée par la limite des 120 jours, mais d'autres obligations locales peuvent s'appliquer ; nous vous orientons vers les bonnes démarches.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-romans-sur-isere",
      "conciergerie-airbnb-drome",
      "conciergerie-location-courte-duree-drome",
      "revenue-management-airbnb-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "annonce-airbnb-optimisation-checklist",
      "trous-de-calendrier-comment-les-combler",
      "obligations-location-courte-duree-drome-ardeche",
    ],
  },

  "gestion-location-courte-duree-drome-ardeche": {
    area: "Drôme-Ardèche",
    region: "Drôme-Ardèche",
    keywordsLine:
      "Gestion location courte durée Drôme-Ardèche, conciergerie Airbnb Drôme, conciergerie Airbnb Ardèche, revenue management PriceLabs.",
    whyParagraph:
      "Qit Concierge est une conciergerie locale dédiée à la gestion de location courte durée en Drôme-Ardèche. Nous accompagnons les propriétaires de maisons de campagne, appartements et résidences secondaires qui veulent rentabiliser leur bien sans avoir à le gérer au quotidien.",
    whyBullets: [
      "Présence terrain Drôme-Ardèche, à moins d'1h de Tain-l'Hermitage",
      "Gestion complète Airbnb, Booking et Abritel",
      "Revenue management PriceLabs",
      "Ménage hôtelier, linge, accueil voyageurs",
      "Reporting clair et commission alignée sur la performance (25% TTC)",
    ],
    services: SHARED_SERVICES,
    localContext:
      "La Drôme et l'Ardèche présentent une forte saisonnalité (printemps-été, vendanges, fêtes de fin d'année). Le pilotage fin du calendrier, des durées minimales et des prix avec PriceLabs est essentiel pour lisser les revenus tout au long de l'année.",
    faq: [
      {
        q: "Quelle zone géographique couvrez-vous exactement ?",
        a: "Notre périmètre couvre la Drôme et l'Ardèche, dans un rayon d'environ 1h autour de Tain-l'Hermitage : Tain, Tournon, Valence, Romans-sur-Isère, Saint-Vallier, Drôme des Collines, Ardèche verte, vallée du Rhône.",
      },
      {
        q: "Quels types de biens gérez-vous ?",
        a: "Maisons de campagne, gîtes, appartements et résidences secondaires. Nous travaillons surtout avec des propriétaires non disponibles sur place.",
      },
      PRICING_FAQ,
      {
        q: "Combien de temps avant la mise en location ?",
        a: "Comptez généralement 2 à 4 semaines entre le premier échange et la mise en ligne effective : visite, photos, rédaction de l'annonce, paramétrage PriceLabs et synchronisation des plateformes.",
      },
      {
        q: "Êtes-vous une plateforme nationale ou un acteur local ?",
        a: "Qit Concierge est une conciergerie locale, indépendante, basée en Drôme-Ardèche. Pas de gestion à distance par un centre d'appels : un interlocuteur dédié et une présence terrain réelle.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-drome",
      "conciergerie-airbnb-ardeche",
      "revenue-management-airbnb-drome-ardeche",
      "gestion-booking-abritel-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "conciergerie-airbnb-drome-choisir-prestataire",
      "louer-en-courte-duree-drome-ardeche",
      "pourquoi-utiliser-pricelabs-drome-ardeche",
    ],
  },

  "conciergerie-airbnb-drome": {
    area: "Drôme",
    region: "Drôme",
    keywordsLine:
      "Conciergerie Airbnb Drôme, gestion location courte durée Drôme, ménage Airbnb Drôme, revenue management PriceLabs.",
    whyParagraph:
      "Qit Concierge est une conciergerie Airbnb dans la Drôme, dédiée aux propriétaires de maisons de campagne, appartements et résidences secondaires sur Tain-l'Hermitage, Romans-sur-Isère, Valence, Saint-Vallier, Drôme des Collines et vallée du Rhône.",
    whyBullets: [
      "Conciergerie indépendante implantée en Drôme",
      "Gestion Airbnb, Booking, Abritel synchronisés",
      "Revenue management PriceLabs",
      "Ménage hôtelier et accueil voyageurs",
    ],
    services: SHARED_SERVICES,
    localContext:
      "La Drôme combine plusieurs marchés courte durée : œnotourisme dans la vallée du Rhône, séjours nature dans la Drôme provençale et la Drôme des Collines, escales TGV à Valence. Une stratégie tarifaire adaptée à chaque sous-zone est indispensable.",
    faq: [
      {
        q: "Couvrez-vous toute la Drôme ?",
        a: "Nous intervenons en Drôme dans un rayon d'environ 1h autour de Tain-l'Hermitage. La Drôme provençale (Nyons, Grignan) sort de notre zone d'intervention principale.",
      },
      {
        q: "Quels logements sont les plus adaptés à la courte durée en Drôme ?",
        a: "Les maisons de caractère, résidences secondaires bien situées et appartements en centre-ville (Valence, Romans, Tain) fonctionnent très bien si l'annonce est optimisée et la tarification dynamique en place.",
      },
      PRICING_FAQ,
      {
        q: "Avez-vous une équipe de ménage interne ?",
        a: "Nous travaillons avec une équipe de ménage locale, formée à la checklist hôtelière courte durée. Le ménage est inclus dans le service et facturé séparément aux voyageurs (frais de ménage Airbnb).",
      },
      {
        q: "Pouvez-vous reprendre une annonce existante ?",
        a: "Oui. Nous auditons votre annonce existante (photos, prix, calendrier, avis), reprenons la main sur les plateformes et appliquons nos optimisations sans recréer le compte.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-tain-hermitage",
      "conciergerie-airbnb-valence",
      "conciergerie-airbnb-romans-sur-isere",
      "gestion-gite-drome",
    ],
    relatedBlogSlugs: [
      "conciergerie-airbnb-drome-choisir-prestataire",
      "louer-en-courte-duree-drome-ardeche",
      "annonce-airbnb-optimisation-checklist",
    ],
  },

  "conciergerie-airbnb-ardeche": {
    area: "Ardèche",
    region: "Ardèche",
    keywordsLine:
      "Conciergerie Airbnb Ardèche, gestion gîte Ardèche, ménage Airbnb Ardèche verte, revenue management PriceLabs.",
    whyParagraph:
      "Qit Concierge est une conciergerie Airbnb en Ardèche, spécialisée dans la gestion de maisons de campagne et résidences secondaires en Ardèche verte, vallée du Rhône et autour de Tournon-sur-Rhône.",
    whyBullets: [
      "Conciergerie locale implantée Drôme-Ardèche",
      "Spécialistes des maisons de campagne et maisons rurales",
      "Annonces Airbnb, Booking, Abritel optimisées",
      "Revenue management PriceLabs adapté à la saisonnalité",
    ],
    services: SHARED_SERVICES,
    localContext:
      "L'Ardèche présente une saisonnalité marquée : très forte demande d'avril à octobre (ViaRhôna, gorges, vignobles, randonnée), creux en hiver. La capacité à capter les ailes de saison et à proposer des séjours week-end attractifs hors saison fait la différence.",
    faq: [
      {
        q: "Couvrez-vous toute l'Ardèche ?",
        a: "Notre zone d'intervention couvre la rive ardéchoise du Rhône (Tournon, Saint-Péray, Guilherand-Granges, Annonay) et l'Ardèche verte. Le sud Ardèche (gorges, Vallon-Pont-d'Arc) sort de notre zone principale.",
      },
      {
        q: "Ma maison de campagne est isolé, est-ce un problème ?",
        a: "Non, à condition que l'accès et les équipements soient bien décrits. Les maisons de campagne isolées en Ardèche verte fonctionnent très bien en courte durée s'ils sont valorisés correctement.",
      },
      PRICING_FAQ,
      {
        q: "Comment gérez-vous les arrivées en zone rurale ?",
        a: "Nous coordonnons les arrivées (boîte à clés sécurisée, consignes claires, contact local d'urgence). Nous nous déplaçons pour les check-in en personne lorsque c'est utile.",
      },
      {
        q: "Quelle saisonnalité attendre en Ardèche verte ?",
        a: "L'essentiel des revenus se concentre d'avril à octobre. Avec PriceLabs, nous lissons les revenus en activant des prix attractifs en basse saison sur des week-ends thématiques (gastronomie, randonnée, vélo).",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-tournon",
      "conciergerie-location-courte-duree-ardeche",
      "gestion-gite-ardeche",
      "revenue-management-airbnb-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "louer-maison-campagne-ardeche-points-a-verifier",
      "location-courte-duree-zone-rurale-erreurs",
      "trous-de-calendrier-comment-les-combler",
    ],
  },

  "conciergerie-location-courte-duree-drome": {
    area: "Drôme",
    region: "Drôme",
    keywordsLine:
      "Conciergerie location courte durée Drôme, gestion Airbnb Booking Abritel Drôme, revenue management PriceLabs.",
    whyParagraph:
      "Conciergerie spécialisée location courte durée dans la Drôme : Qit Concierge prend en charge l'intégralité de la gestion locative de votre maison, gîte, appartement ou résidence secondaire — annonces, voyageurs, ménage, tarification, reporting.",
    whyBullets: [
      "Conciergerie indépendante en Drôme",
      "Gestion multi-plateformes Airbnb, Booking, Abritel",
      "Revenue management PriceLabs",
      "Présence terrain pour ménage et check-in",
    ],
    services: SHARED_SERVICES,
    localContext:
      "La Drôme attire à la fois une clientèle œnotouristique, des familles en séjour nature et une clientèle d'affaires à Valence. Cette diversité demande une gestion fine des durées de séjour et de la stratégie de prix par sous-zone.",
    faq: [
      {
        q: "Quelle différence entre conciergerie et gestion locative classique ?",
        a: "La gestion locative classique concerne la longue durée. La conciergerie courte durée comme Qit Concierge gère des séjours de quelques nuits à quelques semaines, avec rotation, ménage et tarification dynamique.",
      },
      {
        q: "Êtes-vous compatibles avec les SCI ou LMNP ?",
        a: "Oui, nous travaillons aussi bien avec des particuliers en LMNP qu'avec des structures SCI. Notre rôle est opérationnel ; nous restons en lien avec votre comptable pour la facturation.",
      },
      PRICING_FAQ,
      {
        q: "Êtes-vous une franchise ?",
        a: "Non, Qit Concierge est une conciergerie indépendante locale en Drôme-Ardèche, pas une franchise nationale.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-drome",
      "gestion-location-courte-duree-drome-ardeche",
      "gestion-gite-drome",
      "revenue-management-airbnb-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "conciergerie-airbnb-drome-choisir-prestataire",
      "pourquoi-utiliser-pricelabs-drome-ardeche",
      "louer-en-courte-duree-drome-ardeche",
    ],
  },

  "conciergerie-location-courte-duree-ardeche": {
    area: "Ardèche",
    region: "Ardèche",
    keywordsLine:
      "Conciergerie location courte durée Ardèche, gestion Airbnb Booking Abritel Ardèche, revenue management PriceLabs.",
    whyParagraph:
      "Qit Concierge est une conciergerie locale spécialisée dans la location courte durée en Ardèche. Nous gérons votre maison de campagne, maison de campagne ou résidence secondaire à proximité de la ViaRhôna, des vignobles et de l'Ardèche verte.",
    whyBullets: [
      "Implantation locale Drôme-Ardèche",
      "Spécialistes des maisons de campagne et maisons rurales",
      "Gestion Airbnb, Booking, Abritel",
      "Revenue management PriceLabs",
    ],
    services: SHARED_SERVICES,
    localContext:
      "La courte durée en Ardèche fonctionne sur une saison étendue d'avril à octobre, avec des pointes fortes en juillet-août. Le travail sur les ailes de saison (avril-juin, septembre-octobre) est l'un des leviers principaux de rentabilité.",
    faq: [
      {
        q: "Quels sont les pics de demande en Ardèche ?",
        a: "Juillet-août en haute saison, puis week-ends prolongés (mai, juin, septembre). Les vacances scolaires et les ponts de printemps sont aussi très porteurs.",
      },
      {
        q: "Faut-il proposer des extras (vélos, paniers locaux) ?",
        a: "Pas obligatoire, mais les petits plus locaux améliorent les avis et justifient un prix légèrement supérieur. Nous conseillons les options les plus rentables selon votre logement.",
      },
      PRICING_FAQ,
      {
        q: "Comment limitez-vous les annulations ?",
        a: "Politique de prix cohérente, conditions d'annulation adaptées au profil de logement, sélection des voyageurs, communication en amont du séjour : c'est un travail combiné qui réduit le taux d'annulation.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-ardeche",
      "gestion-gite-ardeche",
      "gestion-location-courte-duree-drome-ardeche",
      "gestion-booking-abritel-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "louer-maison-campagne-ardeche-points-a-verifier",
      "location-courte-duree-zone-rurale-erreurs",
      "louer-en-courte-duree-drome-ardeche",
    ],
  },

  "conciergerie-airbnb-saint-vallier": {
    area: "Saint-Vallier",
    region: "Drôme",
    keywordsLine:
      "Conciergerie Airbnb Saint-Vallier, gestion location courte durée Saint-Vallier Drôme, ménage Airbnb, PriceLabs.",
    whyParagraph:
      "Saint-Vallier, dans la vallée du Rhône, profite d'une demande courte durée tirée par la ViaRhôna, le tourisme fluvial et les voyageurs en transit nord-sud. Qit Concierge gère votre logement à Saint-Vallier avec une présence locale réelle.",
    whyBullets: [
      "Conciergerie locale Drôme-Ardèche",
      "Gestion Airbnb, Booking, Abritel",
      "Revenue management PriceLabs",
      "Ménage hôtelier et accueil voyageurs",
    ],
    services: SHARED_SERVICES,
    localContext:
      "Saint-Vallier attire principalement des séjours courts (1 à 3 nuits) liés au passage en vallée du Rhône et au cyclotourisme. Les durées minimales doivent rester souples pour ne pas couper le flux de demande.",
    faq: [
      {
        q: "Couvrez-vous Saint-Vallier et les communes voisines ?",
        a: "Oui : Saint-Vallier, Sarras, Serves-sur-Rhône, Andancette, Saint-Rambert-d'Albon. Toute la vallée du Rhône entre Tain-l'Hermitage et Vienne fait partie de notre périmètre nord.",
      },
      {
        q: "Mon logement est en bord de Rhône, est-ce un atout ?",
        a: "Oui, c'est un argument fort à mettre en avant dans l'annonce (vue, ViaRhôna, calme). Nous valorisons cet aspect dans les photos et la rédaction.",
      },
      PRICING_FAQ,
      {
        q: "Quelle commission pour un petit logement ?",
        a: "La commission est la même quelle que soit la taille du logement : 25% TTC sur les revenus générés, sans abonnement.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-tain-hermitage",
      "conciergerie-airbnb-tournon",
      "conciergerie-airbnb-drome",
      "conciergerie-location-courte-duree-drome",
    ],
    relatedBlogSlugs: [
      "louer-en-courte-duree-drome-ardeche",
      "annonce-airbnb-optimisation-checklist",
      "trous-de-calendrier-comment-les-combler",
    ],
  },

  "conciergerie-airbnb-romans-sur-isere": {
    area: "Romans-sur-Isère",
    region: "Drôme",
    keywordsLine:
      "Conciergerie Airbnb Romans-sur-Isère, gestion location courte durée Romans, ménage Airbnb appartement, PriceLabs.",
    whyParagraph:
      "Romans-sur-Isère bénéficie d'une demande mêlant tourisme (Cité de la Chaussure, Royans-Vercors), voyageurs d'affaires et clientèle médicale. Qit Concierge gère vos appartements, maisons et résidences secondaires à Romans avec une approche locale et professionnelle.",
    whyBullets: [
      "Conciergerie locale Drôme-Ardèche",
      "Spécialistes appartements et maisons en centre-ville",
      "Annonces Airbnb / Booking / Abritel optimisées",
      "Revenue management PriceLabs",
    ],
    services: SHARED_SERVICES,
    localContext:
      "À Romans-sur-Isère, la demande mêle court séjour de loisir et voyageurs d'affaires/médicaux. Une politique de prix différenciée semaine/week-end et des durées minimales adaptées améliorent significativement le revenu mensuel.",
    faq: [
      {
        q: "Quels secteurs de Romans couvrez-vous ?",
        a: "Romans-sur-Isère et toute la Drôme des Collines : Bourg-de-Péage, Saint-Donat-sur-l'Herbasse, Génissieux, Mours-Saint-Eusèbe.",
      },
      {
        q: "Le marché est-il saturé à Romans ?",
        a: "Non, mais l'offre y est plus dense qu'en zone rurale. La qualité de l'annonce, les avis et la tarification dynamique font la différence avec un logement moyen.",
      },
      PRICING_FAQ,
      {
        q: "Acceptez-vous les colocations ou seulement les logements entiers ?",
        a: "Nous gérons en priorité des logements entiers. Les colocations courte durée demandent un suivi beaucoup plus lourd et ne correspondent pas à notre modèle.",
      },
    ],
    relatedSlugs: [
      "conciergerie-airbnb-valence",
      "conciergerie-airbnb-drome",
      "gestion-location-courte-duree-drome-ardeche",
      "revenue-management-airbnb-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "annonce-airbnb-optimisation-checklist",
      "pricelabs-comment-ca-marche",
      "obligations-location-courte-duree-drome-ardeche",
    ],
  },

  "gestion-gite-drome": {
    area: "Drôme",
    region: "Drôme",
    keywordsLine:
      "Gestion maison Drôme, conciergerie maison Airbnb Drôme, ménage maison rural, revenue management PriceLabs.",
    whyParagraph:
      "Vous possédez une maison de campagne dans la Drôme et vous n'êtes pas disponible sur place ? Qit Concierge prend en charge la gestion complète de votre maison de campagne : annonces multi-plateformes, voyageurs, ménage, linge, check-in et tarification dynamique avec PriceLabs.",
    whyBullets: [
      "Spécialistes des maisons de campagne ruraux Drôme-Ardèche",
      "Annonces optimisées Airbnb, Booking et Abritel",
      "Revenue management PriceLabs",
      "Ménage hôtelier et linge fournis",
    ],
    services: SHARED_SERVICES,
    localContext:
      "Les maisons de campagne en Drôme tournent surtout sur les saisons douces et l'été. Une bonne gestion des durées minimales (semaines en haute saison, courts séjours en basse saison) maximise à la fois le taux d'occupation et le prix moyen.",
    faq: [
      {
        q: "Ma maison de campagne est déjà sur d'autres plateformes ?",
        a: "Oui. Nous pouvons gérer en complément vos annonces Airbnb, Booking et Abritel, en synchronisant le calendrier pour éviter tout double booking.",
      },
      {
        q: "Quel taux d'occupation viser pour une maison de campagne ?",
        a: "Cela varie fortement selon la zone, l'équipement et la stratégie tarifaire. Nous donnons une fourchette prudente lors de l'estimation, basée sur des biens comparables.",
      },
      PRICING_FAQ,
      {
        q: "Ma maison de campagne est loin, comment gérez-vous les imprévus ?",
        a: "Nous travaillons avec des prestataires locaux (ménage, maintenance) et nous nous déplaçons pour les situations qui le justifient. Un interlocuteur unique côté propriétaire.",
      },
    ],
    relatedSlugs: [
      "gestion-gite-ardeche",
      "conciergerie-airbnb-drome",
      "conciergerie-residence-secondaire-drome-ardeche",
      "gestion-location-courte-duree-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "louer-residence-secondaire-courte-duree",
      "location-courte-duree-zone-rurale-erreurs",
      "obligations-location-courte-duree-drome-ardeche",
    ],
  },

  "gestion-gite-ardeche": {
    area: "Ardèche",
    region: "Ardèche",
    keywordsLine:
      "Gestion maison Ardèche, conciergerie maison Airbnb Ardèche verte, ménage maison rural, PriceLabs.",
    whyParagraph:
      "Confiez la gestion de votre maison de campagne en Ardèche — Ardèche verte, vallée du Rhône, vignobles — à une conciergerie locale. Qit Concierge prend en charge annonces, voyageurs, ménage, linge, check-in et revenue management PriceLabs.",
    whyBullets: [
      "Spécialistes des maisons de campagne en Ardèche verte et vallée du Rhône",
      "Annonces multi-plateformes Airbnb, Booking, Abritel",
      "Revenue management PriceLabs adapté à la saisonnalité ardéchoise",
      "Présence terrain pour ménage et check-in",
    ],
    services: SHARED_SERVICES,
    localContext:
      "Les maisons de campagne ardéchoises bénéficient d'une demande forte d'avril à octobre. Le bon réglage de PriceLabs et un travail soigné sur les avis voyageurs sont essentiels pour rester en haut des résultats sur les plateformes.",
    faq: [
      {
        q: "Quels secteurs ardéchois couvrez-vous pour une maison de campagne ?",
        a: "Ardèche verte (Annonay, Lamastre, Saint-Félicien), vallée du Rhône (Tournon, Saint-Péray, Guilherand-Granges) et alentours, dans un rayon d'environ 1h de Tain-l'Hermitage.",
      },
      {
        q: "Ma maison de campagne est en hameau isolé, ça marche ?",
        a: "Oui, à condition de bien décrire l'accès et les équipements. Les maisons de campagne isolées en Ardèche verte fonctionnent très bien si l'annonce est honnête et les photos soignées.",
      },
      PRICING_FAQ,
      {
        q: "Gérez-vous le linge ?",
        a: "Oui : fourniture du linge de lit et de toilette, entretien via blanchisserie partenaire, réassort des consommables.",
      },
    ],
    relatedSlugs: [
      "gestion-gite-drome",
      "conciergerie-airbnb-ardeche",
      "conciergerie-location-courte-duree-ardeche",
      "conciergerie-residence-secondaire-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "louer-maison-campagne-ardeche-points-a-verifier",
      "location-courte-duree-zone-rurale-erreurs",
      "louer-residence-secondaire-courte-duree",
    ],
  },

  "conciergerie-residence-secondaire-drome-ardeche": {
    area: "Drôme-Ardèche",
    region: "Drôme-Ardèche",
    keywordsLine:
      "Conciergerie résidence secondaire Drôme-Ardèche, location courte durée résidence secondaire, gestion Airbnb propriétaire absent.",
    whyParagraph:
      "Vous possédez une résidence secondaire en Drôme-Ardèche que vous n'occupez qu'une partie de l'année ? Qit Concierge la rentabilise via la location courte durée, sans gestion quotidienne. Vous gardez la main sur vos périodes d'occupation personnelle.",
    whyBullets: [
      "Conciergerie locale dédiée aux résidences secondaires",
      "Vous bloquez vos périodes ; nous gérons le reste",
      "Annonces Airbnb / Booking / Abritel optimisées",
      "Revenue management PriceLabs et ménage hôtelier",
    ],
    services: SHARED_SERVICES,
    localContext:
      "Les résidences secondaires sont souvent sous-utilisées : 4 à 8 semaines d'occupation personnelle par an. Le reste du temps, une bonne stratégie courte durée peut couvrir la taxe foncière, les charges et générer un revenu net.",
    faq: [
      {
        q: "Comment gérer mes propres séjours ?",
        a: "Vous bloquez vos périodes personnelles dans le calendrier, nous gérons toutes les autres. Aucune réservation voyageur n'est possible sur vos dates.",
      },
      {
        q: "Faut-il vider la maison pour la louer en courte durée ?",
        a: "Non. Nous mettons simplement à part vos affaires personnelles dans une pièce ou un placard fermé. Le reste reste accessible aux voyageurs.",
      },
      PRICING_FAQ,
      {
        q: "Quel impact fiscal pour une résidence secondaire louée en courte durée ?",
        a: "Cela dépend de votre situation. La plupart des propriétaires basculent en LMNP (Loueur Meublé Non Professionnel). Nous vous orientons vers un comptable spécialisé si besoin.",
      },
      {
        q: "Mes meubles sont-ils protégés ?",
        a: "Les plateformes Airbnb, Booking et Abritel proposent des garanties. Nous recommandons aussi une assurance multirisque habitation incluant la location saisonnière.",
      },
    ],
    relatedSlugs: [
      "gestion-location-courte-duree-drome-ardeche",
      "gestion-gite-drome",
      "gestion-gite-ardeche",
      "revenue-management-airbnb-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "louer-residence-secondaire-courte-duree",
      "obligations-location-courte-duree-drome-ardeche",
      "louer-en-courte-duree-drome-ardeche",
    ],
  },

  "revenue-management-airbnb-drome-ardeche": {
    area: "Drôme-Ardèche",
    region: "Drôme-Ardèche",
    keywordsLine:
      "Revenue management Airbnb Drôme-Ardèche, tarification dynamique PriceLabs, optimisation prix Airbnb Booking Abritel.",
    whyParagraph:
      "Le revenue management consiste à ajuster en continu le prix de votre logement pour maximiser le revenu total. Qit Concierge utilise PriceLabs pour piloter chaque jour le prix selon la saison, les évènements locaux, la demande et la concurrence en Drôme-Ardèche.",
    whyBullets: [
      "Tarification dynamique pilotée chaque jour",
      "Prise en compte des évènements locaux Drôme-Ardèche",
      "Réglages adaptés à la typologie du logement",
      "Reporting clair des performances",
    ],
    services: SHARED_SERVICES,
    localContext:
      "En Drôme-Ardèche, les écarts de demande entre saisons peuvent atteindre 3 à 5x. Sans pilotage tarifaire, on laisse beaucoup de revenus sur la table en haute saison, et on subit des trous de calendrier en basse saison.",
    faq: [
      {
        q: "Qu'est-ce que PriceLabs exactement ?",
        a: "PriceLabs est un outil professionnel de tarification dynamique pour la location courte durée. Il analyse la demande, la concurrence et la saisonnalité pour suggérer un prix optimal chaque jour.",
      },
      {
        q: "Faites-vous du revenue management seul, sans gestion complète ?",
        a: "Non, le revenue management fait partie intégrante de notre offre de conciergerie complète. Nous ne proposons pas de prestation pricing isolée.",
      },
      PRICING_FAQ,
      {
        q: "Combien peut-on gagner en plus avec PriceLabs ?",
        a: "L'ordre de grandeur observé est +10 à +25% de revenus annuels par rapport à un prix fixe, selon la zone et la maturité du logement. Aucun engagement chiffré n'est garanti.",
      },
    ],
    relatedSlugs: [
      "gestion-location-courte-duree-drome-ardeche",
      "conciergerie-airbnb-drome",
      "conciergerie-airbnb-ardeche",
      "gestion-booking-abritel-drome-ardeche",
    ],
    relatedBlogSlugs: [
      "pricelabs-comment-ca-marche",
      "pourquoi-utiliser-pricelabs-drome-ardeche",
      "trous-de-calendrier-comment-les-combler",
    ],
  },

  "gestion-booking-abritel-drome-ardeche": {
    area: "Drôme-Ardèche",
    region: "Drôme-Ardèche",
    keywordsLine:
      "Gestion Booking Drôme-Ardèche, gestion Abritel Drôme-Ardèche, multi-plateformes Airbnb Booking Abritel, PriceLabs.",
    whyParagraph:
      "Qit Concierge synchronise vos annonces Airbnb, Booking et Abritel pour maximiser votre visibilité et vos revenus en Drôme-Ardèche. Calendrier unifié, voyageurs centralisés, ménage et revenue management PriceLabs.",
    whyBullets: [
      "Annonces synchronisées Airbnb + Booking + Abritel",
      "Calendrier unifié, pas de double booking",
      "Communication voyageurs centralisée",
      "Revenue management PriceLabs",
    ],
    services: SHARED_SERVICES,
    localContext:
      "En Drôme-Ardèche, certaines clientèles (européennes, voyageurs d'affaires) passent davantage par Booking, d'autres (familles, séjours longs) par Airbnb ou Abritel. Une présence multi-plateformes bien synchronisée capte ces flux complémentaires.",
    faq: [
      {
        q: "Pourquoi pas seulement Airbnb ?",
        a: "Airbnb capte une large clientèle, mais Booking et Abritel ramènent des profils différents (européens, séjours plus longs, familles). En multi-plateformes, on augmente sensiblement le volume de réservations.",
      },
      {
        q: "Comment évitez-vous les double bookings ?",
        a: "Via un channel manager qui synchronise les calendriers en temps réel entre Airbnb, Booking et Abritel. C'est un standard chez les conciergeries professionnelles.",
      },
      PRICING_FAQ,
      {
        q: "Les commissions des plateformes sont-elles incluses dans les 25% ?",
        a: "Non. Les commissions Airbnb, Booking et Abritel sont prélevées par les plateformes et distinctes de notre commission de 25% TTC sur les revenus locatifs.",
      },
    ],
    relatedSlugs: [
      "gestion-location-courte-duree-drome-ardeche",
      "revenue-management-airbnb-drome-ardeche",
      "conciergerie-airbnb-drome",
      "conciergerie-airbnb-ardeche",
    ],
    relatedBlogSlugs: [
      "airbnb-booking-abritel-quelle-plateforme-choisir",
      "annonce-airbnb-optimisation-checklist",
      "pourquoi-utiliser-pricelabs-drome-ardeche",
    ],
  },
};

export const getLocalPage = (slug: string): LocalPageData | undefined =>
  localPages[slug];
