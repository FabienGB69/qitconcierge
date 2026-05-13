import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

import { WHATSAPP_URL } from "@/lib/whatsapp";
export { WHATSAPP_URL };

interface SectionCTAProps {
  title?: string;
  subtitle?: string;
  variant?: "light" | "dark";
}

const SectionCTA = ({
  title = "Prêt à confier votre bien ?",
  subtitle = "Recevez une estimation gratuite des revenus que votre logement peut générer.",
  variant = "light",
}: SectionCTAProps) => {
  const isDark = variant === "dark";
  return (
    <div
      className={`rounded-2xl p-6 sm:p-10 text-center ${
        isDark
          ? "bg-qit-purple text-white"
          : "bg-white border border-border shadow-sm"
      }`}
    >
      <h3
        className={`text-xl sm:text-2xl md:text-3xl font-bold mb-3 ${
          isDark ? "text-white" : "text-qit-purple"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm sm:text-base mb-6 max-w-xl mx-auto ${
          isDark ? "text-white/85" : "text-muted-foreground"
        }`}
      >
        {subtitle}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          size="lg"
          className="bg-qit-coral hover:bg-qit-coral/90 text-white h-12 sm:h-11 text-base font-semibold w-full sm:w-auto shadow-md shadow-qit-coral/30"
        >
          <a href="#contact">
            Demander une estimation gratuite
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className={`h-12 sm:h-11 text-base w-full sm:w-auto ${
            isDark
              ? "bg-white/10 border-white/40 text-white hover:bg-white hover:text-qit-purple"
              : ""
          }`}
        >
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Échanger sur WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SectionCTA;
