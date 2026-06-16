import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Pricing from "@/components/Pricing";
import PricingFAQ from "@/components/PricingFAQ";
import SectionCTA from "@/components/SectionCTA";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

const Tarifs = () => {
  const { isFR } = useLanguage();
  const L = isFR
    ? {
        title: "Tarifs conciergerie Airbnb Drôme-Ardèche | Qit Concierge",
        desc: "Tarif transparent : 25% TTC sur les revenus locatifs générés, sans abonnement. Gestion Airbnb, Booking et Abritel complète en Drôme-Ardèche.",
        crumbHome: "Accueil",
        crumbHere: "Tarifs",
        h1: "Tarifs",
        intro: "Un modèle simple, aligné sur la performance réelle de votre logement.",
        ctaTitle: "Une question sur notre tarif ?",
        ctaSub: "Écrivez-nous : on vous répond clairement, sans engagement.",
      }
    : {
        title: "Pricing — Airbnb concierge Drôme-Ardèche | Qit Concierge",
        desc: "Transparent pricing: 25% incl. tax on rental revenue generated, no subscription. Full Airbnb, Booking and Abritel management in Drôme-Ardèche.",
        crumbHome: "Home",
        crumbHere: "Pricing",
        h1: "Pricing",
        intro: "A simple model, aligned with how your property actually performs.",
        ctaTitle: "Got a question about pricing?",
        ctaSub: "Reach out — we'll reply clearly, no commitment.",
      };

  useSEO({
    title: L.title,
    description: L.desc,
    path: "/tarifs",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.crumbHome, item: "https://qitconcierge.fr/" },
          { "@type": "ListItem", position: 2, name: L.crumbHere, item: "https://qitconcierge.fr/tarifs" },
        ],
      },
    ],
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-qit-beige pt-28 md:pt-32 pb-12 md:pb-16 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <nav className="flex items-center gap-1.5 text-xs text-qit-purple/60 mb-6" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-qit-coral transition-colors">{L.crumbHome}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-qit-purple/80">{L.crumbHere}</span>
            </nav>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">{L.crumbHere}</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-qit-purple mb-6 leading-[1.05] tracking-tight max-w-3xl">{L.h1}</h1>
            <p className="text-base md:text-lg text-qit-purple/70 max-w-2xl leading-relaxed">{L.intro}</p>
          </div>
        </section>

        <Pricing />
        <PricingFAQ />

        <div className="container mx-auto px-4 md:px-6 mb-16 mt-4">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Tarifs;
