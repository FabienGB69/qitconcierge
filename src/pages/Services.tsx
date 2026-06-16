import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ServicesSection from "@/components/Services";
import Properties from "@/components/Properties";
import SectionCTA from "@/components/SectionCTA";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

const ServicesPage = () => {
  const { isFR } = useLanguage();
  const L = isFR
    ? {
        title: "Services conciergerie Airbnb Drôme-Ardèche | Qit Concierge",
        desc: "Services de conciergerie courte durée : gestion Airbnb / Booking / Abritel, ménage, linge, voyageurs, ménage et types de biens couverts en Drôme-Ardèche.",
        crumbHome: "Accueil",
        crumbHere: "Services",
        h1: "Nos services",
        intro: "Une gestion complète et locale pour libérer votre temps tout en augmentant la rentabilité de votre logement.",
        ctaTitle: "Curieux de notre méthode ?",
        ctaSub: "Découvrez comment nous optimisons les revenus de votre logement.",
      }
    : {
        title: "Services — Airbnb concierge Drôme-Ardèche | Qit Concierge",
        desc: "Short-term rental concierge services: Airbnb / Booking / Abritel management, cleaning, linen, guests and property types covered in Drôme-Ardèche.",
        crumbHome: "Home",
        crumbHere: "Services",
        h1: "Our services",
        intro: "Full, local management to free your time while boosting your property's performance.",
        ctaTitle: "Curious about our method?",
        ctaSub: "See how we optimise your property's revenue.",
      };

  useSEO({
    title: L.title,
    description: L.desc,
    path: "/services",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.crumbHome, item: "https://qitconcierge.fr/" },
          { "@type": "ListItem", position: 2, name: L.crumbHere, item: "https://qitconcierge.fr/services" },
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

        <ServicesSection />
        <Properties />

        <div className="container mx-auto px-4 md:px-6 mb-16 mt-4">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ServicesPage;
