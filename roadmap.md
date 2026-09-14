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

## Phase 3 — Analytics, WhatsApp & performance Hero ✅
- [x] Tracking des clics sur tous les boutons du hero (estimate_hero_click + whatsapp_hero_click + whatsapp_message_sent)
- [x] Optimisation du chargement Hero pour le LCP (fetchPriority high + decoding async)
- [x] Génération auto du texte WhatsApp depuis le contexte (langue/hero) + analytics à l'envoi
- [x] Paramètres UTM dans le lien WhatsApp du hero (injectés dans le message, wa.me ne supporte pas les query UTM)
- [x] Vérifié : les events WhatsApp incluent source/medium/campaign et l'URL embarque les UTM

## Phase 4 — Sitemap, robots, Schema site-wide & Google Search Console ✅
- [x] robots.txt complet (accès sitemap + pages importantes, Disallow /admin et /auth)
- [x] Automatiser la génération du sitemap : `scripts/generate-sitemap.ts` (predev/prebuild) — 43 entrées (home, 17 landings, pages statiques, 15 articles avec lastmod date). XML bien formé. Correction du bug escapeXml (entités reconstruites pour ne pas être décodées).
- [x] Schema.org enrichi : LocalBusiness consolidé dans index.html (ajout `sameAs` Facebook/Instagram) ; FAQPage sur /faq avec 15 Q&A réelles (mainEntity) ; BlogPosting déjà en place sur articles
- [x] Google Search Console : propriété `sc-domain:qitconcierge.fr` vérifiée, sitemap soumis, homepage « Submitted and indexed » (canonical correct, crawl 2026-09-13) — 5 clics / 300 impressions sur 28 jours ; article d'août et page Nyons génèrent déjà des clics

## Récurrent
- [x] Filtrage par date de publication des articles (`isPostPublished` / `publishedPosts` / `getPublishedPostBySlug`) appliqué au blog, à l'article, au teaser et au sitemap — un article daté dans le futur reste masqué jusqu'à sa date.
- [x] Article d'octobre 2026 prêt (slug `octobre-2026-toussaint-drome-ardeche`, date 2026-10-01) — masqué jusqu'au 1er octobre, sitemap exclu jusqu'à cette date.
- [ ] Article de blog automatique chaque début de mois (edge function + cron) — prochain attendu : 1er novembre.
- [ ] (Optionnel SEO) Page locale Montélimar — opportunité Semrush (conciergerie montelimar ~50 rech./mois) en attente de confirmation
