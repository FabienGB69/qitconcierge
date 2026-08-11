import React from "react";
import { Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/contexts/LanguageContext";

const MentionsLegales = () => {
  const { isEN } = useLanguage();
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
          {isEN && (
            <div className="mb-6 rounded-md border border-qit-coral/30 bg-qit-coral/5 px-4 py-3 text-sm text-qit-purple">
              Legal notices required by French law are kept in French for compliance. Contact us at guest.qitconcierge@gmail.com for an English summary.
            </div>
          )}
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
              <dl className="space-y-2">
                <div>
                  <dt className="font-medium text-qit-purple">GOMES FABIEN</dt>
                  <dd>Exploitant sous l'enseigne commerciale Pixeloria</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Forme juridique</dt>
                  <dd>Entrepreneur individuel</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">SIREN</dt>
                  <dd>798 262 416</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Numéro RCS</dt>
                  <dd>798 262 416 R.C.S. Lyon</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Inscription au RCS</dt>
                  <dd>Greffe de Lyon, le 19/01/2015</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Inscription au RNE</dt>
                  <dd>15/01/2015</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">TVA intracommunautaire</dt>
                  <dd className="break-all">FR44798262416</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Adresse</dt>
                  <dd className="break-words">61 C Avenue Gabriel Péri, 26600 Tain-l'Hermitage, France</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Téléphone</dt>
                  <dd>
                    <a href="tel:+33786125313" className="text-qit-coral hover:underline break-all">07 86 12 53 13</a>
                  </dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3 sm:items-baseline">
                  <dt className="text-qit-purple/70 font-medium sm:w-48 sm:shrink-0">Email</dt>
                  <dd>
                    <a href="mailto:contact@pixeloria.fr" className="text-qit-coral hover:underline break-all">contact@pixeloria.fr</a>
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="tel:+33786125313"
                  onClick={() => trackEvent("editor_call_click", { location: "mentions_legales" })}
                  aria-label="Appeler l'éditeur au 07 86 12 53 13"
                  className="inline-flex items-center gap-2 rounded-md bg-qit-coral px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-qit-coral/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-qit-coral focus-visible:ring-offset-2"
                >
                  <Phone size={16} />
                  Appeler
                </a>
                <a
                  href="mailto:contact@pixeloria.fr"
                  onClick={() => trackEvent("editor_email_click", { location: "mentions_legales" })}
                  aria-label="Envoyer un e-mail à l'éditeur : contact@pixeloria.fr"
                  className="inline-flex items-center gap-2 rounded-md border border-qit-purple/30 bg-white px-4 py-2 text-sm font-medium text-qit-purple transition-colors hover:bg-qit-beige/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-qit-coral focus-visible:ring-offset-2"
                >
                  <Mail size={16} />
                  Envoyer un e-mail
                </a>
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
                    aria-label="Pixeloria — création de sites web (ouvre dans un nouvel onglet)"
                    className="inline-block font-medium text-qit-purple hover:underline rounded-sm px-1 py-1 -mx-1 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qit-coral focus-visible:ring-offset-2"
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
                  aria-label="Site web Pixeloria : https://pixeloria.fr (ouvre dans un nouvel onglet)"
                  className="inline-block text-qit-coral hover:underline rounded-sm px-1 py-1 -mx-1 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-qit-coral focus-visible:ring-offset-2 break-all"
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
        <div className="max-w-3xl mx-auto mt-10 pt-6 border-t border-border text-sm">
          <a href="/" className="text-qit-purple hover:text-qit-coral font-medium transition-colors">
            ← Retour à l'accueil
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
