# Douze mois d’articles programmés

## Objectif
Préparer douze articles mensuels, du 1er novembre 2026 au 1er octobre 2027, puis les rendre visibles automatiquement à leur date, sans relecture préalable.

## Contenu
- Rédiger chaque article dans le format éditorial existant : titre, extrait, date, temps de lecture, image, texte alternatif, SEO title et meta description.
- Traiter un sujet saisonnier utile aux propriétaires chaque mois : basse saison, fêtes, obligations, vacances d’hiver, préparation de saison, Pâques, ponts de mai, été, haute saison, fin de saison, vendanges et Toussaint.
- Ajouter une structure H1/H2 cohérente, des liens internes vers les services et articles pertinents, ainsi que des sources externes institutionnelles.
- Utiliser une vignette originale et optimisée pour chaque article.

## Publication automatique
- Conserver tous les futurs articles invisibles sur le blog, l’accueil, leur URL directe et le sitemap avant leur date.
- Les publier automatiquement le premier jour du mois selon l’heure française.
- Générer automatiquement le sitemap au démarrage et au build en n’incluant que les articles déjà publiés.

## Fiabilité
- Ajouter des tests sur les douze dates, l’ordre des publications et l’absence d’exposition anticipée.
- Vérifier les liens, les métadonnées SEO, le typecheck et les tests existants.
- Vérifier le rendu du blog et d’un article programmé aux formats mobile et ordinateur.

## Détails techniques
- Étendre `src/data/blogPosts.ts` avec les douze articles et leurs imports d’images.
- Centraliser la comparaison de date avec le fuseau `Europe/Paris` afin d’éviter un décalage à minuit.
- Faire utiliser cette même règle au site et au script `scripts/generate-sitemap.ts`.
- Ne pas ajouter de service externe ni de nouvelle collecte de données.
