# Roadmap — Qit Concierge

Tâches issues de la session du 27/08/2026. Approche par phases.
Voir `.lovable/plan.md` pour le détail d'exécution.

## Phase 1 — Blog & SEO on-page (article d'août) ✅
- [x] Vérifier/enrichir le JSON-LD Schema.org Article (BlogPosting) : dateModified, mainEntityOfPage, publisher.logo
- [x] Vérifier aperçus OpenGraph / Twitter Card (titre, description, image absolue https)
- [x] Ajouter/compléter les liens internes SEO dans l'article d'août (lien /tarifs ajouté)
- [x] Optimiser la hiérarchie H1/H2/H3 de l'article d'août (support ### + 1 sous-titre)
- [x] Ajouter rel=canonical, rel=next/prev sur le blog
- [x] Bouton « Copier le lien » dans l'article : toast feedback + event share_click(copy_link)
- [x] Personnaliser le texte du partage WhatsApp (titre + accroche + signature, lien tracké UTM)
- [x] Ajouter un bouton de partage LinkedIn (texte prérempli)
- [x] Étendre le tracking share_click : network + slug + position
- [x] Vérifier que l'article d'août est dans le sitemap/flux et reste indexable (robots)

## Phase 2 — Mentions légales ✅
- [x] Boutons « Copier » pour l'adresse, le téléphone et l'e-mail (toast + event legal_copy)
- [x] Test Playwright (360 & 390) : SIREN/RCS/TVA/adresse non coupés/tronqués + boutons copier présents
- [x] Accessibilité : sections aria-labelledby, aria-label boutons copier, focus visible, sémantique dl/dt/dd renforcée

## Phase 3 — Analytics, WhatsApp & performance Hero
- [ ] Tracking des clics sur tous les boutons du hero (incl. CTA estimation)
- [ ] Optimisation du chargement Hero pour le LCP (cache, tailles d'images, lazy WhatsApp preview)
- [ ] Génération auto du texte WhatsApp depuis le contexte (langue/hero) + analytics à l'envoi
- [ ] Paramètres UTM dans le lien WhatsApp du hero
- [ ] Vérifier que les clics WhatsApp enregistrés incluent les UTM dans l'analytics

## Phase 4 — Sitemap, robots, Schema site-wide & Google Search Console
- [ ] robots.txt complet (accès sitemap + pages importantes vérifiés)
- [ ] Automatiser la génération du sitemap (script predev/prebuild : toutes routes + blog + landings) + resoumettre
- [ ] Schema.org enrichi : LocalBusiness et FAQ (si applicable) sur les pages principales
- [ ] Configurer Google Search Console (connexion + vérification) + inspection des URL clés

## Récurrent
- [ ] Article de blog automatique chaque début de mois (edge function + cron), prochain le 1er septembre
