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
import { useLanguage } from "@/contexts/LanguageContext";

interface LocalLandingProps {
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  city?: string;
  slug: string;
}

const SITE_URL = "https://qitconcierge.fr";

const LocalLanding = ({ title, metaDescription, h1, intro, slug }: LocalLandingProps) => {
  const { isFR } = useLanguage();
  const data = getLocalPage(slug);
  const L = isFR
    ? { home: "Accueil", breadcrumb: "Fil d'ariane", ctaTitle: "Demandez votre estimation", ctaSub: "Évaluation gratuite et sans engagement des revenus que votre logement peut générer.", notice: null }
    : { home: "Home", breadcrumb: "Breadcrumb", ctaTitle: "Request your estimate", ctaSub: "Free, no-commitment evaluation of the revenue your property can generate.", notice: "This local page targets the French market and is kept in French." };

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
        <section className="pt-32 pb-16 md:pt-44 md:pb-24 bg-qit-beige">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <nav aria-label={L.breadcrumb} className="text-[11px] uppercase tracking-[0.18em] text-qit-purple/60 mb-8">
              <a href="/" className="hover:text-qit-coral">{L.home}</a>
              <ChevronRight className="inline h-3 w-3 mx-1.5" />
              <span className="text-qit-purple">{data?.area ?? slug}</span>
            </nav>
            {L.notice && (
              <p className="text-xs text-qit-purple/70 italic mb-4 border-l-2 border-qit-coral pl-3">
                {L.notice}
              </p>
            )}
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">
                {data?.area ?? "Drôme-Ardèche"}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-qit-purple mb-8 leading-[1.05] tracking-tight">
              {h1.split(" ").slice(0, Math.max(1, h1.split(" ").length - 2)).join(" ")}{" "}
              <span className="italic font-normal text-qit-coral">
                {h1.split(" ").slice(-2).join(" ")}
              </span>
            </h1>
            <p className="text-base md:text-lg text-qit-purple/75 leading-relaxed mb-5 max-w-2xl">
              {intro}
            </p>
            {data && (
              <p className="text-sm text-qit-purple/60 italic mb-10 max-w-2xl">
                {data.keywordsLine}
              </p>
            )}
            <SectionCTA
              title={L.ctaTitle}
              subtitle={L.ctaSub}
            />
          </div>
        </section>

        {data && (
          <>
            {/* Pourquoi Qit Concierge */}
            <section className="py-20 md:py-28 bg-white">
              <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">Pourquoi nous</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-qit-purple mb-8 leading-[1.1] tracking-tight">
                  Pourquoi choisir Qit Concierge{" "}
                  <span className="italic font-normal text-qit-coral">à {data.area}</span> ?
                </h2>
                <p className="text-base md:text-lg text-qit-purple/75 leading-relaxed mb-8">
                  {data.whyParagraph}
                </p>
                <ul className="space-y-4">
                  {data.whyBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-qit-coral flex-shrink-0 mt-0.5" />
                      <span className="text-base text-qit-purple/85 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Services */}
            <section className="py-20 md:py-28 bg-qit-beige/40 border-t border-border">
              <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">Services</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-qit-purple mb-4 leading-[1.1] tracking-tight">
                  Nos services de conciergerie courte durée{" "}
                  <span className="italic font-normal text-qit-coral">à {data.area}</span>
                </h2>
                <p className="text-base md:text-lg text-qit-purple/70 leading-relaxed mb-12 max-w-3xl">
                  Une gestion complète Airbnb, Booking et Abritel pilotée localement,
                  avec revenue management PriceLabs et présence terrain.
                </p>
                <div className="grid gap-5 md:grid-cols-2">
                  {data.services.map((s) => (
                    <article
                      key={s.h3}
                      className="rounded-2xl bg-white border border-border p-7 hover:border-qit-coral/40 transition-colors"
                    >
                      <h3 className="font-serif text-xl text-qit-purple mb-3 leading-snug">
                        {s.h3}
                      </h3>
                      <p className="text-sm md:text-base text-qit-purple/70 leading-relaxed">
                        {s.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            {/* Spécificités locales */}
            <section className="py-20 md:py-28 bg-white">
              <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">Marché local</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-qit-purple mb-8 leading-[1.1] tracking-tight">
                  Spécificités du marché courte durée{" "}
                  <span className="italic font-normal text-qit-coral">à {data.area}</span>
                </h2>
                <p className="text-base md:text-lg text-qit-purple/75 leading-relaxed">
                  {data.localContext}
                </p>
              </div>
            </section>

            {/* FAQ locale */}
            <section className="py-20 md:py-28 bg-qit-beige/40 border-t border-border">
              <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="inline-flex items-center gap-3 mb-5">
                  <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                  <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">FAQ</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-qit-purple mb-10 leading-[1.1] tracking-tight">
                  Questions fréquentes —{" "}
                  <span className="italic font-normal text-qit-coral">{data.area}</span>
                </h2>
                <div className="space-y-4">
                  {data.faq.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-xl bg-white border border-border p-5 [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="cursor-pointer flex justify-between items-start gap-4 text-base font-medium text-qit-purple">
                        <span>{item.q}</span>
                        <ChevronRight className="h-5 w-5 flex-shrink-0 transition-transform group-open:rotate-90 text-qit-coral" />
                      </summary>
                      <p className="mt-3 text-sm md:text-base text-qit-purple/75 leading-relaxed">
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
