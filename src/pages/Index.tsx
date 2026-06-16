import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import LocalSEO from "@/components/LocalSEO";
import SectionCTA from "@/components/SectionCTA";
import RevenueEstimator from "@/components/RevenueEstimator";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

  const explore = isFR
    ? {
        label: "Explorer",
        heading: "Tout ce que vous devez savoir",
        sub: "Quatre pages dédiées pour aller en profondeur.",
        cards: [
          { to: "/services", title: "Services", desc: "Gestion complète Airbnb, Booking, Abritel, ménage et voyageurs." },
          { to: "/methode", title: "Méthode", desc: "Revenue management PriceLabs et accompagnement humain." },
          { to: "/tarifs", title: "Tarifs", desc: "25% TTC sur les revenus générés, sans abonnement." },
          { to: "/a-propos", title: "À propos", desc: "Qui nous sommes et exemples de situations gérées." },
        ],
        more: "Voir",
      }
    : {
        label: "Explore",
        heading: "Everything you need to know",
        sub: "Four dedicated pages to go deeper.",
        cards: [
          { to: "/services", title: "Services", desc: "Full Airbnb, Booking, Abritel, cleaning and guest management." },
          { to: "/methode", title: "Method", desc: "PriceLabs revenue management and hands-on support." },
          { to: "/tarifs", title: "Pricing", desc: "25% incl. tax on revenue generated, no subscription." },
          { to: "/a-propos", title: "About", desc: "Who we are and examples of situations we manage." },
        ],
        more: "View",
      };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />

        <section className="py-20 md:py-28 bg-qit-beige/40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">{explore.label}</span>
                <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-qit-purple mb-4 leading-[1.1] tracking-tight">
                {explore.heading}
              </h2>
              <p className="text-qit-purple/70">{explore.sub}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {explore.cards.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="group rounded-2xl border border-border bg-white p-6 hover:border-qit-coral/40 hover:shadow-md transition-all"
                >
                  <h3 className="font-serif text-xl text-qit-purple mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{c.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-qit-coral group-hover:gap-2 transition-all">
                    {explore.more}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 my-16">
          <SectionCTA title={cta1.title} subtitle={cta1.subtitle} />
        </div>

        <RevenueEstimator />
        <ContactCTA />
        <LocalSEO />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;

