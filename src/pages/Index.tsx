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

const Index = () => {
  useSEO({
    title: "Qit Concierge | Conciergerie Airbnb Drôme-Ardèche",
    description: "Conciergerie courte durée en Drôme-Ardèche : gestion Airbnb, Booking et Abritel, ménage, linge, voyageurs et optimisation PriceLabs pour maisons, gîtes et résidences secondaires. Commission 25% TTC, sans abonnement.",
    path: "/",
    ogImage: "https://qitconcierge.fr/og-image.jpg",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Qit Concierge",
        description: "Conciergerie courte durée en Drôme-Ardèche, gestion Airbnb, Booking et Abritel depuis 2023. Commission 25% TTC, optimisation PriceLabs.",
        url: "https://qitconcierge.fr",
        email: "guest.qitconcierge@gmail.com",
        telephone: "+33601777633",
        foundingDate: "2023",
        priceRange: "25% TTC",
        areaServed: [
          { "@type": "Place", name: "Drôme" },
          { "@type": "Place", name: "Ardèche" },
          { "@type": "Place", name: "Drôme-Ardèche" },
        ],
        serviceType: [
          "Conciergerie Airbnb",
          "Gestion location courte durée",
          "Revenue management PriceLabs",
          "Gestion Booking et Abritel",
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Qit Concierge",
        url: "https://qitconcierge.fr",
      },
    ],
  });
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
          <SectionCTA
            title="Faites analyser votre logement"
            subtitle="En quelques minutes, recevez une estimation personnalisée de vos revenus en location courte durée."
          />
        </div>
        <Properties />
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <SectionCTA
            title="Confiez-nous votre bien"
            subtitle="Rejoignez les propriétaires qui nous font confiance pour la gestion complète de leur location."
            variant="dark"
          />
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
          <SectionCTA
            title="Vous avez un bien en Drôme ou en Ardèche ?"
            subtitle="Parlons de son potentiel locatif — estimation gratuite, sans engagement."
            variant="dark"
          />
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
