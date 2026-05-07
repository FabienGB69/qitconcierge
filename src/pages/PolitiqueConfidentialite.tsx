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
            <p className="mt-3 text-muted-foreground text-sm">Dernière mise à jour : [à compléter]</p>
          </header>

          <div className="space-y-10 text-foreground/90 leading-relaxed text-sm">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">1. Responsable du traitement</h2>
              <p>
                Qit Concierge — adresse : [à compléter]. Pour toute question relative à vos données :
                guest.qitconcierge@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">2. Données collectées</h2>
              <p>Lors de votre navigation ou de vos demandes de contact, nous pouvons collecter :</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Nom, prénom</li>
                <li>Adresse email et numéro de téléphone</li>
                <li>Informations relatives à votre logement</li>
                <li>Données techniques de navigation (cookies)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">3. Finalités</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Répondre à vos demandes d'information ou de devis</li>
                <li>Assurer la gestion de la relation contractuelle</li>
                <li>Améliorer la qualité du site et de nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">4. Durée de conservation</h2>
              <p>[à compléter]</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">5. Destinataires des données</h2>
              <p>
                Vos données sont destinées à Qit Concierge et, le cas échéant, à ses sous-traitants techniques
                (hébergement, outils de communication). Elles ne sont jamais revendues.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">6. Vos droits</h2>
              <p>
                Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, de
                limitation, d'opposition et de portabilité. Pour exercer ces droits :
                guest.qitconcierge@gmail.com.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">7. Cookies</h2>
              <p>
                Le site utilise des cookies destinés à assurer son bon fonctionnement et à mesurer son audience.
                Détail des cookies utilisés : [à compléter].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">8. Réclamation</h2>
              <p>
                Vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr) si vous estimez que vos
                droits ne sont pas respectés.
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
