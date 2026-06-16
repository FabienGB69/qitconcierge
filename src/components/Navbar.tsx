import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = ({ className = "" }: { className?: string }) => {
  const { language, setLanguage } = useLanguage();
  return (
    <div className={cn("inline-flex items-center rounded-md border border-border overflow-hidden text-xs font-medium", className)}>
      <button
        onClick={() => setLanguage("fr")}
        className={cn("px-2 py-1 transition-colors", language === "fr" ? "bg-qit-purple text-white" : "bg-transparent hover:bg-accent")}
        aria-label="Français"
      >
        FR
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={cn("px-2 py-1 transition-colors", language === "en" ? "bg-qit-purple text-white" : "bg-transparent hover:bg-accent")}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const { isFR } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  const t = isFR
    ? {
        services: "Services",
        methode: "Méthode",
        tarifs: "Tarifs",
        faq: "FAQ",
        blog: "Blog",
        contact: "Contact",
        cta: "Estimation gratuite",
      }
    : {
        services: "Services",
        methode: "Approach",
        tarifs: "Pricing",
        faq: "FAQ",
        blog: "Blog",
        contact: "Contact",
        cta: "Free estimate",
      };

  const navItems = [
    { id: "services", label: t.services },
    { id: "methode", label: t.methode },
    { id: "tarifs", label: t.tarifs },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!onHome) {
      setActiveId("");
      return;
    }
    const ids = navItems.map((n) => n.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome, isFR]);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (!onHome) {
        navigate(`/#${id}`);
        return;
      }
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
      }
    },
    [onHome, navigate]
  );

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-qit-beige/90 backdrop-blur-md border-b border-qit-purple/15 shadow-sm"
          : "bg-qit-beige/70 backdrop-blur-md border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className={cn("flex justify-between items-center transition-all duration-300", scrolled ? "py-3" : "py-5")}>
          <a href="/" className="flex items-center group">
            <div className="relative">
              <Home className="h-5 w-5 text-qit-coral" />
              <Heart className="h-2.5 w-2.5 absolute bottom-0 right-0 text-qit-coral" />
            </div>
            <h1 className="text-xl font-serif ml-2.5 tracking-tight">
              <span className="text-qit-purple font-semibold">Qit</span>
              <span className="text-qit-purple/60 italic font-normal ml-0.5">Concierge</span>
            </h1>
          </a>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = onHome && activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(e) => handleAnchorClick(e, item.id)}
                  className={cn(
                    "relative text-[13px] uppercase tracking-[0.12em] transition-colors py-1",
                    isActive ? "text-qit-coral" : "text-qit-purple/80 hover:text-qit-coral"
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-px bg-qit-coral transition-all duration-300",
                      isActive ? "w-full" : "w-0"
                    )}
                  />
                </a>
              );
            })}
            <Link
              to="/blog"
              className={cn(
                "text-[13px] uppercase tracking-[0.12em] transition-colors py-1",
                location.pathname.startsWith("/blog")
                  ? "text-qit-coral"
                  : "text-qit-purple/80 hover:text-qit-coral"
              )}
            >
              {t.blog}
            </Link>
            <Link
              to="/faq"
              className={cn(
                "relative text-[13px] uppercase tracking-[0.12em] transition-colors py-1",
                location.pathname === "/faq"
                  ? "text-qit-coral"
                  : "text-qit-purple/80 hover:text-qit-coral"
              )}
            >
              {t.faq}
              <span
                className={cn(
                  "absolute left-0 -bottom-0.5 h-px bg-qit-coral transition-all duration-300",
                  location.pathname === "/faq" ? "w-full" : "w-0"
                )}
              />
            </Link>
            <Button asChild className="bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full px-5 h-10 text-[13px] font-medium">
              <a href="/#contact" onClick={(e) => handleAnchorClick(e, "contact")}>{t.cta}</a>
            </Button>
            <LanguageToggle />
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              className="flex items-center text-qit-purple"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out bg-qit-beige border-t border-qit-purple/10",
          isMobileMenuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = onHome && activeId === item.id;
            return (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className={cn(
                  "block px-3 py-2.5 text-[13px] uppercase tracking-[0.12em] rounded-md transition-colors",
                  isActive ? "text-qit-coral bg-white/60" : "text-qit-purple/80 hover:bg-white/40"
                )}
              >
                {item.label}
              </a>
            );
          })}
          <Link
            to="/blog"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2.5 text-[13px] uppercase tracking-[0.12em] rounded-md text-qit-purple/80 hover:bg-white/40"
          >
            {t.blog}
          </Link>
          <Link
            to="/faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
              "block px-3 py-2.5 text-[13px] uppercase tracking-[0.12em] rounded-md transition-colors",
              location.pathname === "/faq" ? "text-qit-coral bg-white/60" : "text-qit-purple/80 hover:bg-white/40"
            )}
          >
            {t.faq}
          </Link>
          <div className="px-3 pt-3">
            <Button asChild className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full h-10 text-[13px]">
              <a href="/#contact" onClick={(e) => handleAnchorClick(e, "contact")}>{t.cta}</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
