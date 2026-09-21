# Optimiser le chargement du Hero

## Résultat attendu
- Charger une image adaptée à la largeur réelle de l’écran, sans télécharger inutilement la version maximale.
- Servir des formats modernes plus légers tout en gardant une image de secours compatible.
- Conserver la priorité maximale de l’image principale et des dimensions stables pour éviter tout déplacement de la page.
- Garder l’aperçu WhatsApp immédiatement stable visuellement ; ne le différer que si le gain est réel et sans saut de mise en page.

## Mise en œuvre
1. Ajouter la transformation d’images au moment de la construction du site.
2. Générer plusieurs largeurs du visuel principal en AVIF, WebP et JPEG, puis laisser le navigateur choisir la meilleure.
3. Déclarer précisément la place occupée par l’image selon mobile ou ordinateur, avec priorité haute et dimensions fixes.
4. Vérifier que les fichiers générés portent une adresse versionnée, permettant leur mise en cache longue durée.
5. Mesurer le rendu du Hero sur mobile et ordinateur, puis exécuter les tests existants et contrôler les erreurs.

## Détail technique
- Utiliser `vite-imagetools` dans la configuration Vite.
- Remplacer l’image simple par un élément `picture` et des `srcset` responsifs.
- Ne pas charger paresseusement l’image LCP. L’aperçu WhatsApp étant très léger, éviter un découpage JavaScript qui risquerait un déplacement visuel sans gain significatif.
