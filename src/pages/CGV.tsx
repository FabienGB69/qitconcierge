
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CGV = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Conditions Générales de Vente</h1>
          
          <div className="prose prose-sm md:prose-base lg:prose-lg">
            {/* Contenu à remplacer avec les CGV réelles */}
            <p>Cette page contient les conditions générales de vente de QIT Concierge.</p>
            
            <h2>Article 1 - Objet</h2>
            <p>
              [Insérer ici l'objet des CGV]
            </p>
            
            <h2>Article 2 - Prix et paiement</h2>
            <p>
              [Insérer les informations sur les prix et modalités de paiement]
            </p>
            
            <h2>Article 3 - Services</h2>
            <p>
              [Insérer la description des services]
            </p>
            
            <h2>Article 4 - Responsabilités</h2>
            <p>
              [Insérer les informations sur les responsabilités]
            </p>
            
            <h2>Article 5 - Résiliation</h2>
            <p>
              [Insérer les conditions de résiliation]
            </p>
            
            <h2>Article 6 - Droit applicable</h2>
            <p>
              [Insérer les informations sur le droit applicable]
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGV;
