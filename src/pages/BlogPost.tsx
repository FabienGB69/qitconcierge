import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useSEO } from "@/hooks/useSEO";
import { getPostBySlug, posts } from "@/data/blogPosts";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const whatsappUrl =
  "https://wa.me/330601777633?text=" +
  encodeURIComponent("Bonjour, je viens de lire un article sur votre blog.");

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
  });

  if (!post) return <Navigate to="/blog" replace />;

  const related = posts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

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
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b border-border">
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

            <div className="prose-custom">{renderContent(post.content)}</div>

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
                    className="rounded-2xl border border-border bg-white p-5 hover:border-qit-coral/40 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-qit-purple mb-2 leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {p.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
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
