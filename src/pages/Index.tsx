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
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Qit Concierge | Conciergerie Airbnb Drôme-Ardèche",
    description: "Conciergerie courte durée autour de Tain-l'Hermitage : gestion Airbnb, Booking, Abritel, ménage, voyageurs et optimisation PriceLabs pour maisons, gîtes et résidences secondaires en Drôme-Ardèche.",
    path: "/",
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
        <Compliance />
        <FAQ />
        <BlogTeaser />
        <div className="container mx-auto px-4 md:px-6 mb-16">
          <SectionCTA
            title="Prêt à augmenter vos revenus locatifs ?"
            subtitle="Discutons de votre projet — sans engagement."
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
