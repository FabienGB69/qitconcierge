
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PolitiqueConfidentialite = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>
          
          <div className="prose prose-sm md:prose-base lg:prose-lg">
            {/* Contenu à remplacer avec la politique de confidentialité réelle */}
            <p>Cette page contient la politique de confidentialité de QIT Concierge.</p>
            
            <h2>Collecte des données</h2>
            <p>
              [Insérer ici les informations sur les données collectées]
            </p>
            
            <h2>Utilisation des données</h2>
            <p>
              [Insérer les informations sur l'utilisation des données]
            </p>
            
            <h2>Conservation des données</h2>
            <p>
              [Insérer les informations sur la durée de conservation]
            </p>
            
            <h2>Droits des utilisateurs</h2>
            <p>
              [Insérer les informations sur les droits RGPD]
            </p>
            
            <h2>Cookies</h2>
            <p>
              [Insérer les informations sur les cookies utilisés]
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;
