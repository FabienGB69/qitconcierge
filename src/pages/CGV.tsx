import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CGV = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">Cadre contractuel</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-qit-purple">Conditions Générales de Vente</h1>
            <p className="mt-3 text-muted-foreground text-sm">Dernière mise à jour : [à compléter]</p>
          </header>

          <div className="space-y-10 text-foreground/90 leading-relaxed text-sm">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 1 — Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) encadrent les prestations de conciergerie et de
                gestion locative courte durée fournies par Qit Concierge à ses clients propriétaires.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 2 — Prestataire</h2>
              <ul className="space-y-1">
                <li><strong>Qit Concierge</strong></li>
                <li>Adresse : [à compléter]</li>
                <li>SIRET : [à compléter]</li>
                <li>TVA intracommunautaire : [à compléter]</li>
                <li>Email : guest.qitconcierge@gmail.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 3 — Services proposés</h2>
              <p>
                Mise en ligne de l'annonce, gestion opérationnelle (communication voyageurs, check-in, ménage,
                linge), optimisation des revenus et reporting. Le détail des prestations retenues figure dans le
                contrat de gestion signé entre les parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 4 — Tarifs et modalités de paiement</h2>
              <p>[à compléter — commission, frais de mise en service, modalités de facturation et de règlement.]</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 5 — Obligations du prestataire</h2>
              <p>
                Qit Concierge s'engage à fournir ses prestations avec diligence et professionnalisme, dans le
                respect des règles applicables à la location courte durée.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 6 — Obligations du client</h2>
              <p>
                Le client garantit être propriétaire ou disposer du droit de mettre en location le logement
                concerné, et s'engage à fournir toutes les informations nécessaires à la bonne exécution de la
                prestation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 7 — Durée et résiliation</h2>
              <p>[à compléter — durée du contrat, conditions de renouvellement et de résiliation.]</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 8 — Responsabilité</h2>
              <p>
                Qit Concierge est tenue à une obligation de moyens. Sa responsabilité ne saurait être engagée en
                cas de force majeure ou de manquement du client à ses obligations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 9 — Médiation de la consommation</h2>
              <p>
                Conformément aux articles L.611-1 et suivants du Code de la consommation, le client consommateur
                peut recourir gratuitement au médiateur suivant : [à compléter].
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">Article 10 — Droit applicable</h2>
              <p>
                Les présentes CGV sont soumises au droit français. Tout litige relèvera de la compétence des
                tribunaux français, sous réserve des dispositions impératives.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGV;
