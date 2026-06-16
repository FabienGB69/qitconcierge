import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Difference from "@/components/Difference";
import RevenueManagement from "@/components/RevenueManagement";
import Platforms from "@/components/Platforms";
import SectionCTA from "@/components/SectionCTA";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

const Methode = () => {
  const { isFR } = useLanguage();
  const L = isFR
    ? {
        title: "Méthode : revenue management Airbnb Drôme-Ardèche | Qit Concierge",
        desc: "Notre méthode : revenue management avec PriceLabs, multi-plateformes Airbnb / Booking / Abritel et accompagnement humain et terrain en Drôme-Ardèche.",
        crumbHome: "Accueil",
        crumbHere: "Méthode",
        h1: "Notre méthode",
        intro: "Une approche concrète qui combine pricing dynamique, distribution multi-plateformes et présence locale.",
        ctaTitle: "Envie d'estimer vos revenus ?",
        ctaSub: "On vous fournit une estimation personnalisée sous 24h.",
      }
    : {
        title: "Method — Airbnb revenue management Drôme-Ardèche | Qit Concierge",
        desc: "Our method: revenue management with PriceLabs, multi-platform Airbnb / Booking / Abritel and hands-on local support in Drôme-Ardèche.",
        crumbHome: "Home",
        crumbHere: "Method",
        h1: "Our method",
        intro: "A concrete approach combining dynamic pricing, multi-platform distribution and local presence.",
        ctaTitle: "Want to estimate your revenue?",
        ctaSub: "We'll send you a tailored estimate within 24 hours.",
      };

  useSEO({
    title: L.title,
    description: L.desc,
    path: "/methode",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.crumbHome, item: "https://qitconcierge.fr/" },
          { "@type": "ListItem", position: 2, name: L.crumbHere, item: "https://qitconcierge.fr/methode" },
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

        <Difference />
        <RevenueManagement />
        <Platforms />

        <div className="container mx-auto px-4 md:px-6 mb-16 mt-4">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Methode;
