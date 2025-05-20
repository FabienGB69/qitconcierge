
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const MentionsLegales = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mentions Légales</h1>
          
          <div className="prose prose-sm md:prose-base lg:prose-lg">
            {/* Contenu à remplacer avec les mentions légales réelles */}
            <p>Cette page contient les mentions légales de QIT Concierge.</p>
            
            <h2>Édition du site</h2>
            <p>
              [Insérer ici les informations sur l'éditeur du site: nom/raison sociale, 
              adresse, numéro de téléphone, email, etc.]
            </p>
            
            <h2>Direction de publication</h2>
            <p>
              [Insérer les informations sur le directeur de publication]
            </p>
            
            <h2>Hébergement</h2>
            <p>
              [Insérer les informations sur l'hébergeur: nom, raison sociale, 
              adresse, numéro de téléphone]
            </p>
            
            <h2>Numéro d'immatriculation</h2>
            <p>
              [Insérer le numéro d'immatriculation (SIRET, RCS, etc.)]
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;
