import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Compliance from "@/components/Compliance";
import SectionCTA from "@/components/SectionCTA";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

const Reglementation = () => {
  const { isFR } = useLanguage();
  const L = isFR
    ? {
        title: "Réglementation location courte durée Drôme-Ardèche | Qit Concierge",
        desc: "Tout ce qu'il faut vérifier avant de louer en courte durée : déclaration en mairie, numéro d'enregistrement, copropriété, assurance, fiscalité et DPE.",
        eyebrow: "Réglementation",
        h1: "Location courte durée : ce qu'il faut vérifier avant de se lancer",
        intro:
          "Un récapitulatif clair des démarches et points de conformité à anticiper avant la mise en location de votre bien en Drôme-Ardèche.",
        crumbHome: "Accueil",
        crumbHere: "Réglementation",
        ctaTitle: "Un doute sur votre situation ?",
        ctaSub: "Parlons-en — on vous aide à identifier les points à régler avant la mise en location.",
      }
    : {
        title: "Short-term rental regulation in Drôme-Ardèche | Qit Concierge",
        desc: "What to check before renting short-term: city hall declaration, registration number, condo rules, insurance, taxation and energy rating.",
        eyebrow: "Regulation",
        h1: "Short-term rental: what to check before getting started",
        intro:
          "A clear overview of the steps and compliance points to anticipate before listing your property in Drôme-Ardèche.",
        crumbHome: "Home",
        crumbHere: "Regulation",
        ctaTitle: "Unsure about your situation?",
        ctaSub: "Let's talk — we help you identify the points to address before listing.",
      };

  useSEO({
    title: L.title,
    description: L.desc,
    path: "/reglementation",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.crumbHome, item: "https://qitconcierge.fr/" },
          { "@type": "ListItem", position: 2, name: L.crumbHere, item: "https://qitconcierge.fr/reglementation" },
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
              <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">{L.eyebrow}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-qit-purple mb-6 leading-[1.05] tracking-tight max-w-3xl">
              {L.h1}
            </h1>
            <p className="text-base md:text-lg text-qit-purple/70 max-w-2xl leading-relaxed">{L.intro}</p>
          </div>
        </section>

        <Compliance />

        <div className="container mx-auto px-4 md:px-6 mb-16 mt-4">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Reglementation;
