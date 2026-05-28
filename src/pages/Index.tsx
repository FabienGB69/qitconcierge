import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Difference from "@/components/Difference";
import Properties from "@/components/Properties";
import Trust from "@/components/Trust";
import Testimonials from "@/components/Testimonials";
import Cases from "@/components/Cases";
import Compliance from "@/components/Compliance";
import FAQ from "@/components/FAQ";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import LocalSEO from "@/components/LocalSEO";
import SectionCTA from "@/components/SectionCTA";
import RevenueManagement from "@/components/RevenueManagement";
import Platforms from "@/components/Platforms";
import About from "@/components/About";
import BlogTeaser from "@/components/BlogTeaser";
import Pricing from "@/components/Pricing";
import PricingFAQ from "@/components/PricingFAQ";
import RevenueEstimator from "@/components/RevenueEstimator";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const { isFR } = useLanguage();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // wait for sections to mount
      const t = setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return () => clearTimeout(t);
    }
  }, [location.hash, location.key]);
  useSEO({
    title: isFR
      ? "Qit Concierge | Conciergerie Airbnb Drôme-Ardèche"
      : "Qit Concierge | Airbnb concierge in Drôme-Ardèche, France",
    description: isFR
      ? "Conciergerie courte durée en Drôme-Ardèche : gestion Airbnb, Booking et Abritel, ménage, linge, voyageurs et optimisation PriceLabs pour maisons de campagne et résidences secondaires. Commission 25% TTC, sans abonnement."
      : "Short-term rental concierge in Drôme-Ardèche, France: Airbnb, Booking and Abritel management, cleaning, linen, guests and PriceLabs optimisation for country houses and second homes. 25% commission incl. tax, no subscription.",
    path: "/",
    ogImage: "https://qitconcierge.fr/og-image.jpg",
  });

  const cta1 = isFR
    ? { title: "Faites analyser votre logement", subtitle: "En quelques minutes, recevez une estimation personnalisée de vos revenus en location courte durée." }
    : { title: "Have your property analysed", subtitle: "In a few minutes, get a tailored estimate of your short-term rental revenue." };
  const cta2 = isFR
    ? { title: "Confiez-nous votre bien", subtitle: "Rejoignez les propriétaires qui nous font confiance pour la gestion complète de leur location." }
    : { title: "Entrust us with your property", subtitle: "Join the owners who rely on us for the full management of their rental." };
  const cta3 = isFR
    ? { title: "Vous avez un bien en Drôme ou en Ardèche ?", subtitle: "Parlons de son potentiel locatif — estimation gratuite, sans engagement." }
    : { title: "Do you own a property in Drôme or Ardèche?", subtitle: "Let's talk about its rental potential — free estimate, no commitment." };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Difference />
        <RevenueManagement />
        <Platforms />
        <div className="container mx-auto px-4 md:px-6 -mt-6 mb-16">
          <SectionCTA title={cta1.title} subtitle={cta1.subtitle} />
        </div>
        <Properties />
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <SectionCTA title={cta2.title} subtitle={cta2.subtitle} variant="dark" />
        </div>
        <About />
        <Trust />
        <Testimonials />
        <Cases />
        <Pricing />
        <PricingFAQ />
        <RevenueEstimator />
        <Compliance />
        <FAQ />
        <BlogTeaser />
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <SectionCTA title={cta3.title} subtitle={cta3.subtitle} variant="dark" />
        </div>
        <ContactCTA />
        <LocalSEO />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
