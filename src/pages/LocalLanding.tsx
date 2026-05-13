import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionCTA from "@/components/SectionCTA";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LocalSEO from "@/components/LocalSEO";
import { useSEO } from "@/hooks/useSEO";

interface LocalLandingProps {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  city?: string;
  slug: string;
}

const LocalLanding = ({ title, metaDescription, h1, intro, slug }: LocalLandingProps) => {
  useSEO({
    title,
    description: metaDescription,
    path: `/${slug}`,
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-qit-beige/40">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <h1 className="text-3xl md:text-5xl font-bold text-qit-purple mb-6 leading-tight">
              {h1}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
              {intro}
            </p>
            <SectionCTA
              title="Demandez votre estimation"
              subtitle="Évaluation gratuite et sans engagement des revenus que votre logement peut générer."
            />
          </div>
        </section>
        <LocalSEO />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default LocalLanding;
