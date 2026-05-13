import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";

const MentionsLegales = () => {
  useSEO({
    title: "Mentions légales — Qit Concierge",
    description: "Mentions légales du site Qit Concierge : éditeur, hébergement, propriété intellectuelle et contact.",
    path: "/mentions-legales",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">Informations légales</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-qit-purple">Mentions légales</h1>
            <p className="mt-3 text-muted-foreground text-sm">Dernière mise à jour : mai 2026</p>
          </header>

          <div className="space-y-10 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Éditeur du site</h2>
              <p className="mb-2">Le présent site est édité par :</p>
              <div className="bg-qit-beige/40 rounded-lg p-4 border border-border text-sm">
                <p className="font-medium text-qit-purple">Qit Concierge</p>
                <p className="mt-1">Activité : conciergerie, gestion de locations courte durée, accompagnement propriétaire, gestion opérationnelle et optimisation des revenus locatifs.</p>
                <p className="mt-2">Responsable de publication : Fabien GOMEZ BANCEL</p>
                <p>Email : guest.qitconcierge@gmail.com</p>
                <p>Téléphone / WhatsApp : +33 6 01 77 76 33</p>
                <p className="mt-2">Adresse du siège social : [à compléter]</p>
                <p>SIRET : [à compléter]</p>
                <p>Numéro de TVA intracommunautaire : [à compléter si applicable]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Site réalisé par</h2>
              <div className="bg-qit-beige/40 rounded-lg p-4 border border-border text-sm">
                <p>
                  <a
                    href="https://pixeloria.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("pixeloria_click", { location: "mentions_legales_name" })}
                    className="font-medium text-qit-purple hover:underline"
                  >
                    Pixeloria
                  </a>
                </p>
                <p>Création & refonte de sites pour artisans, indépendants et PME</p>
                <p>Site web : <a
                  href="https://pixeloria.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("pixeloria_click", { location: "mentions_legales_url" })}
                  className="text-qit-coral hover:underline"
                >https://pixeloria.fr</a></p>
                <p>Email : <a href="mailto:contact@pixeloria.fr" className="text-qit-coral hover:underline">contact@pixeloria.fr</a></p>
                <p>Téléphone : 07 86 12 53 13</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Hébergement</h2>
              <p className="mb-2">Le site est hébergé par :</p>
              <div className="bg-qit-beige/40 rounded-lg p-4 border border-border text-sm">
                <p>Nom de l'hébergeur : [à compléter : Lovable / Vercel / autre selon hébergement final]</p>
                <p>Adresse : [à compléter]</p>
                <p>Site web : [à compléter]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Propriété intellectuelle</h2>
              <p className="text-sm">
                L'ensemble des contenus présents sur le site Qit Concierge, incluant notamment les textes, images, illustrations, éléments graphiques, logos, icônes, structure, mise en page et contenus éditoriaux, est protégé par le droit de la propriété intellectuelle.
              </p>
              <p className="text-sm mt-2">
                Toute reproduction, représentation, modification, diffusion ou exploitation totale ou partielle du site, sans autorisation écrite préalable, est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Responsabilité</h2>
              <p className="text-sm">
                Qit Concierge met tout en œuvre pour assurer l'exactitude et la mise à jour des informations diffusées sur le site. Toutefois, les informations présentées sont fournies à titre indicatif et peuvent évoluer.
              </p>
              <p className="text-sm mt-2">
                Qit Concierge ne peut être tenue responsable d'une erreur, omission, indisponibilité temporaire du site ou mauvaise interprétation des informations publiées.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Liens externes</h2>
              <p className="text-sm">
                Le site peut contenir des liens vers des sites tiers, notamment Airbnb, Booking, Abritel, PriceLabs ou d'autres services partenaires. Qit Concierge n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu, leur fonctionnement ou leur politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Données personnelles</h2>
              <p className="text-sm">
                Les informations relatives à la collecte et au traitement des données personnelles sont détaillées dans la{' '}
                <a href="/politique-confidentialite" className="text-qit-coral hover:underline">Politique de confidentialité</a>{' '}
                accessible sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Médiation de la consommation</h2>
              <p className="text-sm">
                Conformément aux dispositions applicables, le client consommateur peut recourir gratuitement à un médiateur de la consommation en cas de litige non résolu avec Qit Concierge.
              </p>
              <div className="bg-qit-beige/40 rounded-lg p-4 border border-border text-sm mt-3">
                <p>Médiateur de la consommation : [à compléter]</p>
                <p>Site web du médiateur : [à compléter]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Contact</h2>
              <p className="text-sm">
                Pour toute question concernant le site ou son contenu, vous pouvez contacter Qit Concierge à l'adresse suivante :
              </p>
              <p className="text-sm mt-2 font-medium">guest.qitconcierge@gmail.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
