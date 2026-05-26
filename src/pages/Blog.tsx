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
        all: "Toutes les catégories",
        empty: "Aucun article dans cette catégorie pour le moment.",
        ctaTitle: "Vous êtes propriétaire en Drôme-Ardèche ?",
        ctaSub: "Demandez une estimation gratuite de vos revenus potentiels en location courte durée — sans engagement.",
      }
    : {
        title: "Blog Qit Concierge — Tips, revenue management & Drôme-Ardèche",
        desc: "Owner tips, PriceLabs revenue management and local news in Drôme-Ardèche to better manage your short-term rental.",
        eyebrow: "Blog",
        h1: "Tips to rent better in Drôme-Ardèche",
        intro: "Owner tips, revenue management with PriceLabs and local news in Drôme-Ardèche.",
        all: "All categories",
        empty: "No article in this category yet.",
        ctaTitle: "Own a property in Drôme-Ardèche?",
        ctaSub: "Request a free estimate of your potential short-term rental revenue — no commitment.",
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="bg-qit-purple text-white py-14 md:py-20">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
              {L.eyebrow}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {L.h1}
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-2xl">
              {L.intro}
            </p>
          </div>
        </section>

        <section className="py-10 md:py-14 bg-qit-beige/40 border-b border-border">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setParams({})}
                className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                  !activeCategory
                    ? "bg-qit-purple text-white border-qit-purple"
                    : "bg-white text-qit-purple border-border hover:border-qit-purple/40"
                }`}
              >
                {L.all}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setParams({ cat })}
                  className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
                    activeCategory === cat
                      ? "bg-qit-purple text-white border-qit-purple"
                      : "bg-white text-qit-purple border-border hover:border-qit-purple/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group rounded-2xl border border-border bg-white overflow-hidden flex flex-col hover:border-qit-coral/40 hover:shadow-md transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-qit-beige/40">
                    <img
                      src={post.image}
                      alt={post.title}
                      width={1280}
                      height={720}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block self-start text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
                      {post.category}
                    </span>
                    <h2 className="text-lg md:text-xl font-bold text-qit-purple mb-3 leading-snug line-clamp-2 min-h-[3.5rem] group-hover:text-qit-coral transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.date).toLocaleDateString(language === "fr" ? "fr-FR" : "en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
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
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {L.empty}
              </p>
            )}
            <div className="mt-16 pt-8 border-t border-border">
              <SectionCTA
                title={L.ctaTitle}
                subtitle={L.ctaSub}
                variant="dark"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Blog;
