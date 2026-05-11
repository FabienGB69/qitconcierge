import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">Vos données personnelles</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-qit-purple">Politique de confidentialité</h1>
            <p className="mt-3 text-muted-foreground text-sm">Dernière mise à jour : mai 2026</p>
          </header>

          <div className="space-y-10 text-foreground/90 leading-relaxed text-sm">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">1. Objet</h2>
              <p>
                La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site Qit Concierge sur la manière dont leurs données personnelles peuvent être collectées, utilisées et protégées.
              </p>
              <p className="mt-2">
                Qit Concierge accorde une importance particulière à la protection des données personnelles et s'engage à traiter les informations collectées de manière loyale, transparente et conforme à la réglementation applicable.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">2. Responsable du traitement</h2>
              <p className="mb-2">Le responsable du traitement des données est :</p>
              <div className="bg-qit-beige/40 rounded-lg p-4 border border-border">
                <p className="font-medium">Qit Concierge</p>
                <p>Responsable : Fabien GOMEZ BANCEL</p>
                <p>Email : guest.qitconcierge@gmail.com</p>
                <p>Téléphone / WhatsApp : +33 6 01 77 76 33</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">3. Données collectées</h2>
              <p className="mb-2">
                Dans le cadre de l'utilisation du site, Qit Concierge peut collecter les données suivantes :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>nom et prénom ;</li>
                <li>adresse email ;</li>
                <li>numéro de téléphone ;</li>
                <li>ville ou localisation du bien ;</li>
                <li>type de logement ;</li>
                <li>informations relatives au logement ;</li>
                <li>lien éventuel vers une annonce Airbnb, Booking ou Abritel ;</li>
                <li>message transmis via le formulaire de contact ou d'estimation ;</li>
                <li>données techniques de navigation si des outils de mesure d'audience sont utilisés.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">4. Finalités du traitement</h2>
              <p className="mb-2">Les données collectées sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>répondre aux demandes transmises via le formulaire ;</li>
                <li>réaliser une première analyse du logement ;</li>
                <li>proposer une estimation ou un échange commercial ;</li>
                <li>assurer le suivi de la relation avec les propriétaires ;</li>
                <li>améliorer le site et son contenu ;</li>
                <li>mesurer l'audience du site si un outil de statistiques est installé ;</li>
                <li>respecter les obligations légales et administratives applicables.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">5. Base légale du traitement</h2>
              <p className="mb-2">Les traitements peuvent être fondés sur :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>le consentement de l'utilisateur lorsqu'il remplit un formulaire ;</li>
                <li>l'exécution de mesures précontractuelles lorsque l'utilisateur demande une estimation ou une proposition ;</li>
                <li>l'intérêt légitime de Qit Concierge pour assurer le suivi commercial et l'amélioration de ses services ;</li>
                <li>les obligations légales lorsque cela est nécessaire.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">6. Durée de conservation</h2>
              <p className="mb-2">
                Les données personnelles sont conservées pendant une durée limitée et proportionnée aux finalités poursuivies.
              </p>
              <p className="mb-2 font-medium">À titre indicatif :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>données issues d'un formulaire de contact : jusqu'à 3 ans après le dernier échange ;</li>
                <li>données liées à un client : pendant la durée de la relation contractuelle, puis selon les durées légales applicables ;</li>
                <li>données de facturation : durée légale de conservation applicable ;</li>
                <li>cookies de mesure d'audience : durée conforme à la réglementation applicable.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">7. Destinataires des données</h2>
              <p>
                Les données collectées sont destinées à Qit Concierge.
              </p>
              <p className="mt-2">
                Elles peuvent également être transmises à des prestataires techniques strictement nécessaires au fonctionnement du site ou à la gestion des demandes : hébergeur, outil de formulaire, outil d'emailing, outil de mesure d'audience, solution CRM ou prestataire informatique.
              </p>
              <p className="mt-2 font-medium text-qit-purple">
                Les données ne sont pas vendues à des tiers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">8. Transfert hors Union européenne</h2>
              <p>
                Certains outils utilisés pour le fonctionnement du site ou le suivi des demandes peuvent être hébergés en dehors de l'Union européenne.
              </p>
              <p className="mt-2">
                Lorsque cela est nécessaire, Qit Concierge veille à utiliser des prestataires offrant des garanties conformes à la réglementation applicable en matière de protection des données.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">9. Droits des utilisateurs</h2>
              <p className="mb-2">
                Conformément à la réglementation applicable, chaque utilisateur dispose des droits suivants :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>droit d'accès ;</li>
                <li>droit de rectification ;</li>
                <li>droit d'effacement ;</li>
                <li>droit d'opposition ;</li>
                <li>droit à la limitation du traitement ;</li>
                <li>droit à la portabilité des données lorsque cela est applicable ;</li>
                <li>droit de retirer son consentement à tout moment.</li>
              </ul>
              <p className="mt-3">
                Pour exercer ces droits, l'utilisateur peut contacter Qit Concierge à l'adresse suivante : guest.qitconcierge@gmail.com
              </p>
              <p className="mt-2">
                Une réponse sera apportée dans les meilleurs délais conformément aux obligations légales applicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">10. Réclamation auprès de la CNIL</h2>
              <p>
                Si l'utilisateur estime que ses droits ne sont pas respectés, il peut introduire une réclamation auprès de la CNIL.
              </p>
              <p className="mt-2">
                Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-qit-coral hover:underline">https://www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">11. Cookies</h2>
              <p>
                Le site peut utiliser des cookies ou traceurs nécessaires à son bon fonctionnement, ainsi que des cookies de mesure d'audience ou de suivi si ces outils sont activés.
              </p>
              <p className="mt-2">
                Les cookies non strictement nécessaires sont soumis au consentement préalable de l'utilisateur.
              </p>
              <p className="mt-2">
                L'utilisateur peut accepter, refuser ou paramétrer les cookies via le bandeau prévu à cet effet lorsque celui-ci est mis en place.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">12. Sécurité</h2>
              <p>
                Qit Concierge met en œuvre des mesures raisonnables afin de protéger les données personnelles contre l'accès non autorisé, la perte, l'altération ou la divulgation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">13. Modification de la politique de confidentialité</h2>
              <p>
                La présente politique peut être modifiée à tout moment afin de tenir compte des évolutions légales, techniques ou organisationnelles.
              </p>
              <p className="mt-2 font-medium">
                Dernière mise à jour : mai 2026.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
