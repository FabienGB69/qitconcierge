import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FAQ from "@/components/FAQ";
import SectionCTA from "@/components/SectionCTA";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

const FAQPage = () => {
  const { isFR } = useLanguage();
  const L = isFR
    ? {
        title: "FAQ conciergerie Airbnb Drôme-Ardèche | Qit Concierge",
        desc: "Réponses aux questions fréquentes : gestion Airbnb, Booking et Abritel, tarification, ménage, zones couvertes et démarrage avec Qit Concierge en Drôme-Ardèche.",
        crumbHome: "Accueil",
        crumbHere: "FAQ",
        ctaTitle: "Vous ne trouvez pas votre réponse ?",
        ctaSub: "Écrivez-nous sur WhatsApp ou demandez une estimation — on vous répond sous 24h.",
      }
    : {
        title: "FAQ — Airbnb concierge Drôme-Ardèche | Qit Concierge",
        desc: "Answers to common questions: Airbnb, Booking and Abritel management, pricing, cleaning, areas covered and getting started with Qit Concierge.",
        crumbHome: "Home",
        crumbHere: "FAQ",
        ctaTitle: "Can't find your answer?",
        ctaSub: "Message us on WhatsApp or request an estimate — we reply within 24 hours.",
      };

  useSEO({
    title: L.title,
    description: L.desc,
    path: "/faq",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.crumbHome, item: "https://qitconcierge.fr/" },
          { "@type": "ListItem", position: 2, name: L.crumbHere, item: "https://qitconcierge.fr/faq" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [], // FAQ component renders the actual content client-side
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
            <h1 className="font-serif text-5xl md:text-6xl text-qit-purple mb-6 leading-[1.05] tracking-tight max-w-3xl">
              {isFR ? "Questions fréquentes" : "Frequently asked questions"}
            </h1>
            <p className="text-base md:text-lg text-qit-purple/70 max-w-2xl leading-relaxed">
              {isFR
                ? "Les réponses concrètes que se posent la plupart des propriétaires en Drôme-Ardèche."
                : "Concrete answers to the questions most owners ask in Drôme-Ardèche."}
            </p>
          </div>
        </section>

        <FAQ />

        <div className="container mx-auto px-4 md:px-6 mb-16 mt-4">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default FAQPage;
