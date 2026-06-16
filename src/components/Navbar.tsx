import { useState } from "react";
import { Link } from "react-router-dom";
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
  const { isFR } = useLanguage();

  const t = isFR
    ? {
        services: "Nos Services",
        properties: "Propriétés",
        testimonials: "Témoignages",
        blog: "Blog",
        contact: "Contact",
        cta: "Demander une estimation gratuite",
      }
    : {
        services: "Services",
        properties: "Properties",
        testimonials: "Approach",
        blog: "Blog",
        contact: "Contact",
        cta: "Request a free estimate",
      };

  return (
    <nav className="bg-qit-beige/80 backdrop-blur-md fixed w-full z-50 border-b border-qit-purple/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-5">
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

          <div className="hidden md:flex items-center gap-8">
            <Link to="/#services" className="text-[13px] uppercase tracking-[0.12em] text-qit-purple/80 hover:text-qit-coral transition-colors">{t.services}</Link>
            <Link to="/#properties" className="text-[13px] uppercase tracking-[0.12em] text-qit-purple/80 hover:text-qit-coral transition-colors">{t.properties}</Link>
            <Link to="/#approche" className="text-[13px] uppercase tracking-[0.12em] text-qit-purple/80 hover:text-qit-coral transition-colors">{t.testimonials}</Link>
            <Link to="/blog" className="text-[13px] uppercase tracking-[0.12em] text-qit-purple/80 hover:text-qit-coral transition-colors">{t.blog}</Link>
            <Link to="/#contact" className="text-[13px] uppercase tracking-[0.12em] text-qit-purple/80 hover:text-qit-coral transition-colors">{t.contact}</Link>
            <Button asChild className="bg-qit-coral hover:bg-qit-coral/90 text-white rounded-full px-5 h-10 text-[13px] font-medium">
              <Link to="/#contact">{t.cta}</Link>
            </Button>
            <LanguageToggle />
          </div>

          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button className="flex items-center text-qit-purple" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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

      <div className={cn("md:hidden", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white shadow-lg">
          <Link to="/#services" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>{t.services}</Link>
          <Link to="/#properties" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>{t.properties}</Link>
          <Link to="/#approche" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>{t.testimonials}</Link>
          <Link to="/blog" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>{t.blog}</Link>
          <Link to="/#contact" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>{t.contact}</Link>
          <div className="px-3 py-2">
            <Button asChild className="w-full bg-qit-coral hover:bg-qit-coral/90">
              <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)}>{t.cta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
