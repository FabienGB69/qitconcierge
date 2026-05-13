import { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionCTA from "@/components/SectionCTA";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LocalSEO from "@/components/LocalSEO";
import { useSEO } from "@/hooks/useSEO";
import { getLocalPage, localPages } from "@/data/localPages";
import { posts } from "@/data/blogPosts";
import { CheckCircle2, MapPin, ChevronRight } from "lucide-react";

interface LocalLandingProps {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  city?: string;
  slug: string;
}

const SITE_URL = "https://qitconcierge.com";

const LocalLanding = ({ title, metaDescription, h1, intro, slug }: LocalLandingProps) => {
  const data = getLocalPage(slug);

  const jsonLd = useMemo(() => {
    if (!data) return undefined;
    return [
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Qit Concierge",
        description: metaDescription,
        url: `${SITE_URL}/${slug}`,
        email: "guest.qitconcierge@gmail.com",
        telephone: "+33601777633",
        areaServed: [
          { "@type": "Place", name: data.area },
          { "@type": "Place", name: data.region },
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
        "@type": "FAQPage",
        mainEntity: data.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: data.area, item: `${SITE_URL}/${slug}` },
        ],
      },
    ];
  }, [data, metaDescription, slug]);

  useSEO({ title, description: metaDescription, path: `/${slug}`, jsonLd });

  // Resolve related links to existing data sources.
  const relatedPages =
    data?.relatedSlugs
      .map((s) => ({ slug: s, page: localPages[s] }))
      .filter((p) => p.page) ?? [];

  const relatedPosts =
    data?.relatedBlogSlugs
      .map((s) => posts.find((p) => p.slug === s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p)) ?? [];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-qit-beige/40">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <nav aria-label="Fil d'ariane" className="text-xs text-muted-foreground mb-4">
              <a href="/" className="hover:text-qit-purple">Accueil</a>
              <ChevronRight className="inline h-3 w-3 mx-1" />
              <span className="text-qit-purple">{data?.area ?? slug}</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-bold text-qit-purple mb-6 leading-tight">
              {h1}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              {intro}
            </p>
            {data && (
              <p className="text-sm text-qit-purple/70 italic mb-8">
                {data.keywordsLine}
              </p>
            )}
            <SectionCTA
              title="Demandez votre estimation"
              subtitle="Évaluation gratuite et sans engagement des revenus que votre logement peut générer."
            />
          </div>
        </section>

        {data && (
          <>
            {/* Pourquoi Qit Concierge */}
            <section className="py-14 md:py-20">
              <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-qit-purple mb-5 leading-tight">
                  Pourquoi choisir Qit Concierge à {data.area} ?
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {data.whyParagraph}
                </p>
                <ul className="space-y-3">
                  {data.whyBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-qit-coral flex-shrink-0 mt-0.5" />
                      <span className="text-base text-foreground">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Services */}
            <section className="py-14 md:py-20 bg-qit-beige/40 border-t border-border">
              <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <h2 className="text-2xl md:text-3xl font-bold text-qit-purple mb-3 leading-tight">
                  Nos services de conciergerie courte durée à {data.area}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-10">
                  Une gestion complète Airbnb, Booking et Abritel pilotée localement,
                  avec revenue management PriceLabs et présence terrain.
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  {data.services.map((s) => (
                    <article
                      key={s.h3}
                      className="rounded-2xl bg-white border border-border p-6 shadow-sm"
                    >
                      <h3 className="text-lg font-semibold text-qit-purple mb-2 leading-snug">
                        {s.h3}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {s.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Spécificités locales */}
            <section className="py-14 md:py-20">
              <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-qit-purple mb-5 leading-tight">
                  Spécificités du marché courte durée à {data.area}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {data.localContext}
                </p>
              </div>
            </section>

            {/* FAQ locale */}
            <section className="py-14 md:py-20 bg-qit-beige/40 border-t border-border">
              <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <h2 className="text-2xl md:text-3xl font-bold text-qit-purple mb-8 leading-tight">
                  Questions fréquentes — {data.area}
                </h2>
                <div className="space-y-4">
                  {data.faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl bg-white border border-border p-5 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="cursor-pointer flex justify-between items-start gap-4 text-base font-semibold text-qit-purple">
                        <span>{item.q}</span>
                        <ChevronRight className="h-5 w-5 flex-shrink-0 transition-transform group-open:rotate-90 text-qit-coral" />
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* Maillage interne : pages voisines + blog */}
            {(relatedPages.length > 0 || relatedPosts.length > 0) && (
              <section className="py-14 md:py-20">
                <div className="container mx-auto px-4 md:px-6 max-w-5xl grid gap-10 md:grid-cols-2">
                  {relatedPages.length > 0 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-qit-purple mb-5 leading-tight">
                        Voir aussi nos zones et services proches
                      </h2>
                      <ul className="space-y-2">
                        {relatedPages.map(({ slug: s, page }) => (
                          <li key={s}>
                            <a
                              href={`/${s}`}
                              className="inline-flex items-start gap-2 text-qit-purple hover:text-qit-coral text-sm"
                            >
                              <MapPin className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                              Conciergerie & gestion à {page!.area}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {relatedPosts.length > 0 && (
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-qit-purple mb-5 leading-tight">
                        Articles utiles pour les propriétaires
                      </h2>
                      <ul className="space-y-3">
                        {relatedPosts.map((p) => (
                          <li key={p.slug}>
                            <a
                              href={`/blog/${p.slug}`}
                              className="text-sm text-qit-purple hover:text-qit-coral leading-snug inline-block"
                            >
                              {p.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}

        <LocalSEO />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default LocalLanding;
