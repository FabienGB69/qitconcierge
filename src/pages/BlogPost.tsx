import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug, posts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const whatsappUrl = buildWhatsAppUrl(
  "Bonjour, je viens de lire un article sur votre blog."
);

const linkClass = "text-qit-coral underline underline-offset-2 hover:text-qit-coral/80";

const renderInline = (text: string, keyPrefix: string) => {
  const parts: (string | JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, url] = match;
    const isInternal = url.startsWith("/") || url.startsWith("#");
    parts.push(
      isInternal ? (
        <Link key={`${keyPrefix}-${i}`} to={url} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a
          key={`${keyPrefix}-${i}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      )
    );
    lastIndex = match.index + match[0].length;
    i++;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

const renderContent = (content: string) =>
  content.split("\n\n").map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="text-xl md:text-2xl font-bold text-qit-purple mt-8 mb-3 leading-tight"
        >
          {block.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (/^\d+\.\s/.test(block) || block.startsWith("- ")) {
      const items = block.split("\n").map((l) => l.replace(/^(\d+\.|-)\s+/, ""));
      const Tag = block.startsWith("- ") ? "ul" : "ol";
      return (
        <Tag
          key={i}
          className={`my-4 pl-5 space-y-1.5 text-base text-muted-foreground leading-relaxed ${
            Tag === "ul" ? "list-disc" : "list-decimal"
          }`}
        >
          {items.map((it, j) => (
            <li key={j}>{renderInline(it, `${i}-${j}`)}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p
        key={i}
        className="my-4 text-base md:text-lg text-muted-foreground leading-relaxed"
      >
        {renderInline(block, `${i}`)}
      </p>
    );
  });

const BlogPost = () => {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : null;

  useSEO({
    title: post
      ? `${post.title} | Blog Qit Concierge`
      : "Article | Blog Qit Concierge",
    description: post?.excerpt ?? "Article du blog Qit Concierge.",
    path: post ? `/blog/${post.slug}` : "/blog",
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            url: `https://qitconcierge.fr/blog/${post.slug}`,
            datePublished: post.date,
            inLanguage: "fr-FR",
            author: {
              "@type": "Organization",
              name: "Qit Concierge",
              url: "https://qitconcierge.fr",
            },
            publisher: {
              "@type": "Organization",
              name: "Qit Concierge",
              url: "https://qitconcierge.fr",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: "https://qitconcierge.fr/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://qitconcierge.fr/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://qitconcierge.fr/blog/${post.slug}` },
            ],
          },
        ]
      : undefined,
  });

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const landingsByCategory: Record<string, { href: string; label: string }[]> = {
    "Drôme-Ardèche": [
      { href: "/conciergerie-airbnb-drome", label: "Conciergerie Airbnb Drôme" },
      { href: "/conciergerie-airbnb-ardeche", label: "Conciergerie Airbnb Ardèche" },
      { href: "/conciergerie-airbnb-tain-hermitage", label: "Conciergerie Tain-l'Hermitage" },
      { href: "/gestion-location-courte-duree-drome-ardeche", label: "Gestion courte durée Drôme-Ardèche" },
    ],
    "Revenue management": [
      { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management PriceLabs" },
      { href: "/gestion-booking-abritel-drome-ardeche", label: "Gestion Booking & Abritel" },
      { href: "/gestion-location-courte-duree-drome-ardeche", label: "Gestion courte durée Drôme-Ardèche" },
      { href: "/conciergerie-airbnb-drome", label: "Conciergerie Airbnb Drôme" },
    ],
    "Conseils propriétaires": [
      { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Résidence secondaire Drôme-Ardèche" },
      { href: "/gestion-gite-drome", label: "Gestion de gîte Drôme" },
      { href: "/gestion-gite-ardeche", label: "Gestion de gîte Ardèche" },
      { href: "/conciergerie-airbnb-valence", label: "Conciergerie Valence" },
    ],
  };
  const relatedLandings = landingsByCategory[post.category] ?? [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-qit-coral hover:underline mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au blog
            </Link>

            <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple mb-5 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border bg-qit-beige/40 mb-10">
              <img
                src={post.image}
                alt={post.title}
                width={1280}
                height={720}
                className="w-full h-auto aspect-[16/9] object-cover"
              />
            </div>

            <div className="prose-custom border-t border-border pt-8">{renderContent(post.content)}</div>

            <div className="mt-12 rounded-2xl bg-qit-beige/40 border border-border p-6 md:p-8 text-center">
              <h3 className="text-xl md:text-2xl font-bold text-qit-purple mb-2">
                Une question sur votre logement ?
              </h3>
              <p className="text-muted-foreground mb-5">
                Demandez une estimation gratuite ou discutez avec nous sur
                WhatsApp.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-qit-coral hover:bg-qit-coral/90 text-white"
                >
                  <Link to="/#contact">Demander une estimation</Link>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Échanger sur WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="py-14 bg-qit-beige/40 border-t border-border">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
              <h2 className="text-xl md:text-2xl font-bold text-qit-purple mb-6">
                À lire aussi dans {post.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/blog/${p.slug}`}
                    className="group rounded-2xl border border-border bg-white overflow-hidden hover:border-qit-coral/40 hover:shadow-md transition-all"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-qit-beige/40">
                      <img
                        src={p.image}
                        alt={p.title}
                        width={1280}
                        height={720}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold text-qit-purple mb-3 leading-snug line-clamp-2 min-h-[3.5rem] group-hover:text-qit-coral transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {p.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {relatedLandings.length > 0 && (
          <section className="py-14 bg-white border-t border-border">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
              <h2 className="text-xl md:text-2xl font-bold text-qit-purple mb-2">
                Conciergerie & gestion locale en Drôme-Ardèche
              </h2>
              <p className="text-muted-foreground mb-6">
                Découvrez comment Qit Concierge accompagne les propriétaires sur le terrain.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedLandings.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="group flex items-center justify-between rounded-xl border border-border bg-qit-beige/30 px-4 py-3 hover:border-qit-coral/40 hover:bg-qit-beige/60 transition-colors"
                    >
                      <span className="text-sm font-medium text-qit-purple group-hover:text-qit-coral">
                        {l.label}
                      </span>
                      <span className="text-qit-coral text-lg leading-none">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPost;
