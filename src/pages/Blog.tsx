import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useSEO } from "@/hooks/useSEO";
import { posts, categories, BlogCategory } from "@/data/blogPosts";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import SectionCTA from "@/components/SectionCTA";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = () => {
  const { isFR, language } = useLanguage();
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get("cat") as BlogCategory | null;

  const L = isFR
    ? {
        title: "Blog Qit Concierge — Conseils, revenue management & Drôme-Ardèche",
        desc: "Conseils propriétaires, revenue management PriceLabs et actualités locales en Drôme-Ardèche pour mieux gérer votre location courte durée.",
        eyebrow: "Blog",
        h1: "Conseils pour mieux louer en courte durée en Drôme-Ardèche",
        intro: "Conseils propriétaires, revenue management avec PriceLabs et actualités locales en Drôme-Ardèche.",
        all: "Tous",
        empty: "Aucun article dans cette catégorie pour le moment.",
        ctaTitle: "Vous êtes propriétaire en Drôme-Ardèche ?",
        ctaSub: "Demandez une estimation gratuite de vos revenus potentiels en location courte durée — sans engagement.",
        featured: "À la une",
        readMore: "Lire l'article",
        count: (n: number) => `${n} article${n > 1 ? "s" : ""}`,
        latest: "Derniers articles",
      }
    : {
        title: "Blog Qit Concierge — Tips, revenue management & Drôme-Ardèche",
        desc: "Owner tips, PriceLabs revenue management and local news in Drôme-Ardèche to better manage your short-term rental.",
        eyebrow: "Blog",
        h1: "Tips to rent better in Drôme-Ardèche",
        intro: "Owner tips, revenue management with PriceLabs and local news in Drôme-Ardèche.",
        all: "All",
        empty: "No article in this category yet.",
        ctaTitle: "Own a property in Drôme-Ardèche?",
        ctaSub: "Request a free estimate of your potential short-term rental revenue — no commitment.",
        featured: "Featured",
        readMore: "Read article",
        count: (n: number) => `${n} article${n > 1 ? "s" : ""}`,
        latest: "Latest articles",
      };


  useSEO({
    title: L.title,
    description: L.desc,
    path: "/blog",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Blog Qit Concierge",
        description:
          "Conseils propriétaires, revenue management PriceLabs et actualités locales en Drôme-Ardèche pour mieux gérer votre location courte durée.",
        url: "https://qitconcierge.fr/blog",
        publisher: {
          "@type": "Organization",
          name: "Qit Concierge",
          url: "https://qitconcierge.fr",
        },
        inLanguage: "fr-FR",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://qitconcierge.fr/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://qitconcierge.fr/blog",
          },
        ],
      },
    ],
  });

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  const sorted = [...filtered].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  const featured = !activeCategory && sorted.length > 0 ? sorted[0] : null;
  const rest = featured ? sorted.slice(1) : sorted;
  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString(language === "fr" ? "fr-FR" : "en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <section className="bg-qit-beige pt-28 md:pt-32 pb-16 md:pb-20 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
              <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">
                {L.eyebrow}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-qit-purple mb-6 leading-[1.05] tracking-tight max-w-3xl">
              {L.h1.split(" ").slice(0, -2).join(" ")}{" "}
              <span className="italic font-normal text-qit-coral">{L.h1.split(" ").slice(-2).join(" ")}</span>
            </h1>
            <p className="text-base md:text-lg text-qit-purple/70 max-w-2xl leading-relaxed">
              {L.intro}
            </p>
          </div>
        </section>

        <section className="sticky top-[60px] z-30 bg-white/90 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setParams({})}
                className={`rounded-full px-3.5 py-1.5 text-xs uppercase tracking-[0.1em] font-medium border transition-colors ${
                  !activeCategory
                    ? "bg-qit-purple text-white border-qit-purple"
                    : "bg-white text-qit-purple/80 border-border hover:border-qit-purple/40"
                }`}
              >
                {L.all}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setParams({ cat })}
                  className={`rounded-full px-3.5 py-1.5 text-xs uppercase tracking-[0.1em] font-medium border transition-colors ${
                    activeCategory === cat
                      ? "bg-qit-purple text-white border-qit-purple"
                      : "bg-white text-qit-purple/80 border-border hover:border-qit-purple/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{L.count(filtered.length)}</span>
          </div>
        </section>

        {featured && (
          <section className="py-14 md:py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">
                  {L.featured}
                </span>
              </div>
              <Link
                to={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center rounded-3xl overflow-hidden"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-qit-beige/40 order-1 lg:order-2">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    width={1280}
                    height={960}
                    loading="eager"
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
                <div className="order-2 lg:order-1">
                  <span className="inline-block text-[11px] uppercase tracking-[0.18em] text-qit-coral font-semibold mb-4">
                    {featured.category}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-qit-purple leading-[1.15] tracking-tight mb-4 group-hover:text-qit-coral transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed mb-6 line-clamp-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {fmtDate(featured.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-qit-coral">
                    {L.readMore}
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </div>
          </section>
        )}

        <section className="py-10 md:py-16 bg-qit-beige/30 border-t border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            {!activeCategory && rest.length > 0 && (
              <div className="inline-flex items-center gap-3 mb-8">
                <span className="h-px w-8 bg-qit-coral" aria-hidden="true" />
                <span className="text-[11px] uppercase tracking-[0.22em] text-qit-purple/70 font-medium">
                  {L.latest}
                </span>
              </div>
            )}
            {rest.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group rounded-2xl border border-border bg-white overflow-hidden flex flex-col hover:border-qit-coral/40 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-qit-beige/40">
                      <img
                        src={post.image}
                        alt={post.title}
                        width={1280}
                        height={800}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="inline-block self-start text-[11px] uppercase tracking-[0.18em] text-qit-coral font-semibold mb-3">
                        {post.category}
                      </span>
                      <h2 className="font-serif text-lg md:text-xl text-qit-purple mb-3 leading-snug line-clamp-2 group-hover:text-qit-coral transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/60">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {fmtDate(post.date)}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {post.readTime}
                          </span>
                        </div>
                        <ArrowRight className="h-4 w-4 text-qit-coral group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              !featured && (
                <p className="text-center text-muted-foreground py-12">{L.empty}</p>
              )
            )}
          </div>
        </section>

        <div className="container mx-auto px-4 md:px-6 max-w-5xl py-16">
          <SectionCTA title={L.ctaTitle} subtitle={L.ctaSub} variant="dark" />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Blog;
