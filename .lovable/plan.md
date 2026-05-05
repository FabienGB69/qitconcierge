## Objectif
Ajouter une traduction automatique FR/EN des annonces de propriétés (titre + description) via l'IA Lovable, avec un sélecteur de langue dans la navbar.

## Approche
Traduction à la demande, mise en cache en base de données pour éviter de re-traduire à chaque visite. Le français reste la langue source (saisie admin).

## Étapes

### 1. Base de données
Nouvelle table `property_translations` :
- `id`, `property_id` (FK → properties), `language` (text, ex: 'en'), `title`, `description`, `created_at`
- Contrainte unique `(property_id, language)`
- RLS : lecture publique, écriture via edge function (service role)

### 2. Edge function `translate-property`
- Input : `{ propertyId, targetLanguage }`
- Vérifie si la traduction existe déjà → la renvoie
- Sinon : appelle Lovable AI (`google/gemini-3-flash-preview`) pour traduire titre + description
- Stocke le résultat dans `property_translations` et le renvoie
- Gère erreurs 429/402

### 3. Contexte de langue côté client
- Nouveau `LanguageContext` (`fr` | `en`), persisté dans `localStorage`
- Hook `useLanguage()` exposant `language` et `setLanguage`

### 4. Sélecteur de langue
- Bouton FR/EN dans la `Navbar` (toggle simple, à côté des liens)

### 5. Affichage traduit dans `Properties.tsx`
- Quand `language === 'en'`, pour chaque propriété affichée, appeler la edge function (via React Query, clé `['translation', propertyId, 'en']`)
- Afficher titre/description traduits ; fallback sur le FR pendant le chargement
- Les autres textes statiques de la section (titres, badges « pers. », « ch. ») seront aussi traduits via un petit dictionnaire local FR/EN

### 6. Textes statiques principaux
Traduction locale (objet `translations`) pour : Navbar, Hero, Services, Properties (libellés), ContactCTA, Footer. Pas d'IA pour ces textes (statiques, qualité maîtrisée).

## Détails techniques
- Migration SQL : table + RLS + index sur `(property_id, language)`
- Edge function publique (`verify_jwt = false` par défaut), utilise `SUPABASE_SERVICE_ROLE_KEY` pour insérer
- Modèle IA : `google/gemini-3-flash-preview` (rapide, économique, suffisant pour de la traduction)
- Prompt système : « Traducteur professionnel français↔anglais pour des annonces de location courte durée. Garde un ton sobre. Réponds en JSON `{title, description}`. »

## Hors scope
- Traduction d'autres langues (ES, IT…) — facile à ajouter ensuite
- Édition manuelle des traductions dans l'admin (pourra être ajouté si besoin)
