import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">Informations légales</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-qit-purple">Mentions légales</h1>
            <p className="mt-3 text-muted-foreground text-sm">Dernière mise à jour : [à compléter]</p>
          </header>

          <div className="space-y-10 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">1. Éditeur du site</h2>
              <ul className="space-y-1 text-sm">
                <li><strong>Dénomination :</strong> Qit Concierge</li>
                <li><strong>Forme juridique :</strong> [à compléter]</li>
                <li><strong>Adresse du siège social :</strong> [à compléter]</li>
                <li><strong>SIRET :</strong> [à compléter]</li>
                <li><strong>TVA intracommunautaire :</strong> [à compléter]</li>
                <li><strong>Email :</strong> guest.qitconcierge@gmail.com</li>
                <li><strong>WhatsApp :</strong> +330601777633</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">2. Directeur de la publication</h2>
              <p className="text-sm">[à compléter]</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">3. Hébergeur du site</h2>
              <ul className="space-y-1 text-sm">
                <li><strong>Nom :</strong> [à compléter]</li>
                <li><strong>Adresse :</strong> [à compléter]</li>
                <li><strong>Téléphone :</strong> [à compléter]</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">4. Propriété intellectuelle</h2>
              <p className="text-sm">
                L'ensemble du contenu présent sur ce site (textes, images, logos, graphismes) est la propriété
                exclusive de Qit Concierge, sauf mention contraire. Toute reproduction, représentation ou diffusion,
                totale ou partielle, sans autorisation écrite préalable est interdite.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">5. Médiateur de la consommation</h2>
              <p className="text-sm">[à compléter]</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-qit-purple">6. Crédits</h2>
              <p className="text-sm">
                Site réalisé par <strong>Pixeloria</strong> — Création & refonte de sites pour artisans,
                indépendants et PME.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
