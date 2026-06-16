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
  const [scrolled, setScrolled] = useState(false);
  const { isFR } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const t = isFR
    ? { services: "Services", methode: "Méthode", tarifs: "Tarifs", faq: "FAQ", blog: "Blog", cta: "Estimation gratuite" }
    : { services: "Services", methode: "Approach", tarifs: "Pricing", faq: "FAQ", blog: "Blog", cta: "Free estimate" };

  const navItems = [
    { to: "/services", label: t.services },
    { to: "/methode", label: t.methode },
    { to: "/tarifs", label: t.tarifs },
    { to: "/faq", label: t.faq },
    { to: "/blog", label: t.blog },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => {
    if (to === "/blog") return location.pathname.startsWith("/blog");
    return location.pathname === to;
  };

  const handleContactClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      if (location.pathname !== "/") {
        navigate("/#contact");
        return;
      }
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", "#contact");
      }
    },
    [location.pathname, navigate]
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
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <Home className="h-5 w-5 text-qit-coral" />
              <Heart className="h-2.5 w-2.5 absolute bottom-0 right-0 text-qit-coral" />
            </div>
            <h1 className="text-xl font-serif ml-2.5 tracking-tight">
              <span className="text-qit-purple font-semibold">Qit</span>
              <span className="text-qit-purple/60 italic font-normal ml-0.5">Concierge</span>
            </h1>
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative text-[13px] uppercase tracking-[0.12em] transition-colors py-1",
                    active ? "text-qit-coral" : "text-qit-purple/80 hover:text-qit-coral"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute left-0 -bottom-0.5 h-px bg-qit-coral transition-all duration-300",
                      active ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              );
            })}
            <Button asChild className="bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full px-5 h-10 text-[13px] font-medium">
              <a href="/#contact" onClick={handleContactClick}>{t.cta}</a>
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
          isMobileMenuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-[13px] uppercase tracking-[0.12em] rounded-md transition-colors",
                  active ? "text-qit-coral bg-white/60" : "text-qit-purple/80 hover:bg-white/40"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="px-3 pt-3">
            <Button asChild className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full h-10 text-[13px]">
              <a href="/#contact" onClick={handleContactClick}>{t.cta}</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
