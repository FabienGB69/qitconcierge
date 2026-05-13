import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { posts } from "@/data/blogPosts";

const BlogTeaser = () => {
  // Show the 6 cards requested by Qit Concierge (latest curated set)
  const featured = posts.slice(0, 6);

  return (
    <section className="py-14 md:py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
              Blog
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple leading-tight">
              Conseils pour mieux louer en Drôme-Ardèche
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-qit-coral hover:underline"
          >
            Voir tous les articles
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {featured.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-border bg-qit-beige/30 p-6 flex flex-col hover:bg-white hover:border-qit-coral/40 hover:shadow-md transition-all"
            >
              <span className="inline-block self-start text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
                {post.category}
              </span>
              <h3 className="text-base md:text-lg font-bold text-qit-purple mb-3 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {post.excerpt}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-qit-coral hover:underline self-start"
              >
                Lire l'article
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-qit-coral hover:bg-qit-coral/90 text-white"
          >
            <a href="#contact">Faire analyser mon logement</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">Voir tous les articles</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;
