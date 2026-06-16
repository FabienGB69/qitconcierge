import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import About from "@/components/About";
import Trust from "@/components/Trust";
import Cases from "@/components/Cases";
import SectionCTA from "@/components/SectionCTA";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronRight } from "lucide-react";

const APropos = () => {
  const { isFR } = useLanguage();
  const L = isFR
    ? {
        title: "À propos — Qit Concierge, conciergerie Drôme-Ardèche",
        desc: "Qit Concierge : conciergerie locale, humaine et performante en Drôme-Ardèche. Notre approche, nos engagements et exemples de situations gérées.",
        crumbHome: "Accueil",
        crumbHere: "À propos",
        h1: "À propos de Qit Concierge",
        intro: "Une conciergerie locale, humaine et performante en Drôme-Ardèche.",
        ctaTitle: "Discutons de votre logement",
        ctaSub: "On répond sous 24h, sans engagement.",
      }
    : {
        title: "About — Qit Concierge, Drôme-Ardèche concierge",
        desc: "Qit Concierge: a local, human and reliable concierge in Drôme-Ardèche. Our approach, commitments and examples of situations we manage.",
        crumbHome: "Home",
        crumbHere: "About",
        h1: "About Qit Concierge",
        intro: "A local, human and reliable concierge in Drôme-Ardèche.",
        ctaTitle: "Let's talk about your property",
        ctaSub: "We reply within 24 hours, no commitment.",
      };

  useSEO({
    title: L.title,
    description: L.desc,
    path: "/a-propos",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.crumbHome, item: "https://qitconcierge.fr/" },
          { "@type": "ListItem", position: 2, name: L.crumbHere, item: "https://qitconcierge.fr/a-propos" },
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

        <About />
        <Trust />
        <Cases />

        <div className="container mx-auto px-4 md:px-6 mb-16 mt-4">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default APropos;
