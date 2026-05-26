import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { posts } from "@/data/blogPosts";
import { useLanguage } from "@/contexts/LanguageContext";

const BlogTeaser = () => {
  const { isFR, language } = useLanguage();
  // Show the 6 cards requested by Qit Concierge (latest curated set)
  const featured = posts.slice(0, 6);
  const t = isFR
    ? { heading: "Conseils pour mieux louer en Drôme-Ardèche", all: "Voir tous les articles", cta: "Faire analyser mon logement" }
    : { heading: "Tips to better rent in Drôme-Ardèche", all: "See all articles", cta: "Have my property analysed" };

  return (
    <section className="py-14 md:py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
              Blog
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple leading-tight">
              {t.heading}
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-qit-coral hover:underline"
          >
            {t.all}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((post) => (
            <article
              key={post.slug}
              className="group rounded-2xl border border-border bg-white overflow-hidden flex flex-col hover:border-qit-coral/40 hover:shadow-md transition-all"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="block aspect-[16/9] overflow-hidden bg-qit-beige/40"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  width={1280}
                  height={720}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block self-start text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
                  {post.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-qit-purple mb-3 leading-snug line-clamp-2 min-h-[3.5rem]">
                  <Link to={`/blog/${post.slug}`} className="hover:text-qit-coral transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-2 border-t border-border/60">
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
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-qit-coral hover:bg-qit-coral/90 text-white"
          >
            <a href="#contact">{t.cta}</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">{t.all}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;
