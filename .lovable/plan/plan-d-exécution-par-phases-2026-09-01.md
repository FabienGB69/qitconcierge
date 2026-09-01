# Plan d'exécution (par phases)

Décisions prises : approche par phases · grille blog actuelle suffisante (pas de bandeau « À la une ») · article mensuel = edge function + cron (automatique complet) · Google Search Console traité en dernier.

## Phase 1 — Blog & SEO on-page (article d'août)
Fichiers : `src/pages/BlogPost.tsx`, `src/data/blogPosts.ts`, `src/hooks/useSEO.ts`.

- **Schema.org Article** : le JSON-LD `BlogPosting` existe déjà (headline, image, datePublished, author/publisher). Enrichir avec `dateModified`, `mainEntityOfPage`, `publisher.logo` (URL absolue) et `image` large (1200px).
- **OG / Twitter Card** : `useSEO` définit déjà og:* + twitter:card pour l'article. Vérifier que `og:image` est une URL absolue `https://` pour l'article d'août (déjà fait via `seoImage`) ; garder.
- **Liens internes SEO** : l'article d'août contient déjà des liens internes pertinents. Compléter vers 1-2 pages clés manquantes (ex. `/tarifs`, `/methode`) avec ancrage naturel.
- **Hiérarchie H1/H2/H3** : structure actuelle H1 + `## ` → H2. Ajouter des H3 (`###`) là où des listes détaillées existent pour aérer, sans casser le rendu `renderContent` (ajouter le support `### `).
- **Canonical / next-prev** : dans `useSEO`, ajouter `rel=canonical` (déjà fait), et `rel=prev`/`rel=next` sur `BlogPost` vers les articles précédent/suivant par date.
- **Bouton « Copier le lien »** : nouveau bouton dans le bloc partage, `navigator.clipboard.writeText`, toast via `sonner` (déjà installé), event `share_click` (network: `copy_link`).
- **Texte partage WhatsApp** : reformuler en `Titre — accroche courte — signature Qit Concierge` + URL trackée.
- **Bouton LinkedIn** : `https://www.linkedin.com/sharing/share-offsite/?url=`, style cohérent, event `share_click` (network: `linkedin`).
- **Tracking share_click** : passer `page` → `slug` et ajouter `position` (« article_footer »).
- **Sitemap / flux / robots** : article d'août déjà présent dans `sitemap.xml` et `robots.txt` autorise `/blog`. Conserver.

## Phase 2 — Mentions légales
Fichiers : `src/pages/MentionsLegales.tsx`, nouveau test Playwright `tests/visual/mentions-legales.spec.ts`.

- **Boutons Copier** : adresse, téléphone, e-mail → `navigator.clipboard` + toast + event `legal_copy` (field).
- **Test Playwright** : viewport 360 & 390, vérifie que SIREN/RCS/TVA/adresse ne débordent pas (scrollWidth ≤ clientWidth) et restent lisibles.
- **Accessibilité** : `dl/dt/dd` déjà sémantique ; ajouter `aria-label` aux boutons copier, `role`/`tabindex`, focus visible, ordre logique clavier. Sectionnement `section` + `aria-labelledby`.

## Phase 3 — Analytics, WhatsApp & performance Hero
Fichiers : `src/components/Hero.tsx`, `src/lib/whatsapp.ts`, `src/components/WhatsAppMessagePreview.tsx`, `src/lib/analytics.ts`.

- **Tracking tous boutons hero** : CTA estimation (`estimate_hero_click`), WhatsApp (`whatsapp_hero_click` déjà présent), vérifier le bouton preview.
- **LCP Hero** : image déjà `fetchPriority="high"` + dims. Ajouter `loading="eager"` confirmé, `decoding="async"`, `sizes`/`srcset` via asset, lazy-load du `WhatsAppMessagePreview` (garder hauteur réserve pour éviter CLS).
- **Texte WhatsApp auto** : générer depuis langue + contexte (déjà fait en partie). Ajouter event `whatsapp_message_sent` au clic.
- **UTM** : `buildWhatsAppUrl` accepte `utm` (source/medium/campaign) injectés dans le texte du message. Hero passe `source=hero`.
- **Vérification UTM** : documenter (commentaire/test) que le message WhatsApp contient bien `utm_source=hero` et que l'event `whatsapp_hero_click` embarque `source`.

## Phase 4 — Sitemap, robots, Schema site-wide & GSC
- **robots.txt** : déjà complet (Allow /, Disallow /admin /auth, Sitemap). Vérifier pages importantes non bloquées.
- **Sitemap auto** : créer `scripts/generate-sitemap.ts` listant toutes les routes statiques (`src/App.tsx`) + tous les slugs blog + landings locaux ; `predev`/`prebuild` dans `package.json`. Remplace le `public/sitemap.xml` statique à chaque build (confirmer remplacement de mécanisme avec l'utilisateur au moment voulu).
- **Schema enrichi** : `LocalBusiness` sur `Index` (nom, adresse, téléphone, URL, areaServed Drôme-Ardèche) ; `FAQPage` sur `/faq` si applicable.
- **Google Search Console** : connector déjà connecté/propriété vérifiée. Inspection URL pages clés via gateway, corriger tout problème signalé.

## Récurrent — Article mensuel auto
- Edge function `generate-monthly-post` : appelle Lovable AI Gateway, génère un article SEO (titre, excerpt, contenu markdown-lite, slug, catégorie, date du 1er) selon un prompt métier Drôme-Ardèche, l'insère en base (`blog_posts` ou fallback).
- Cron Supabase (schedule « 1 of month ») déclenche la fonction.
- Page `Blog`/`BlogPost` lit depuis les posts (actuellement `src/data/blogPosts.ts` statique). Déploiement complet nécessite de basculer les articles en base + `supabase` fetch — à valider en démarrage de la récurrente.

> Je commence par la **Phase 1** après validation du plan.
