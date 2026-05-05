
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Heart } from 'lucide-react';
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

  return (
    <nav className="bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="relative">
              <Home className="h-6 w-6 text-qit-coral" />
              <Heart className="h-3 w-3 absolute bottom-0 right-0 text-qit-coral" />
            </div>
            <h1 className="text-2xl font-serif font-bold ml-2">
              <span className="text-qit-purple">Qit</span>
              <span className="text-gray-700">Concierge</span>
            </h1>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium hover:text-qit-purple transition-colors">
              Nos Services
            </a>
            <a href="#properties" className="text-sm font-medium hover:text-qit-purple transition-colors">
              Propriétés
            </a>
            <a href="#testimonials" className="text-sm font-medium hover:text-qit-purple transition-colors">
              Témoignages
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-qit-purple transition-colors">
              Contact
            </a>
            <Button className="bg-qit-coral hover:bg-qit-coral/90 text-white">Réserver</Button>
            <LanguageToggle />
          </div>

          {/* Mobile: language + menu */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              className="flex items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden",
        isMobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white shadow-lg">
          <a href="#services" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
            Nos Services
          </a>
          <a href="#properties" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
            Propriétés
          </a>
          <a href="#testimonials" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
            Témoignages
          </a>
          <a href="#contact" className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </a>
          <div className="px-3 py-2">
            <Button className="w-full bg-qit-coral hover:bg-qit-coral/90">Réserver</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
