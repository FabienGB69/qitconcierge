import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, ArrowRight } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/330601777633";

const Hero = () => {
  return (
    <div
      className="relative min-h-[100svh] w-full bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-qit-purple/85 via-qit-purple/70 to-black/60" />

      <div className="relative container mx-auto h-full flex flex-col justify-center px-4 sm:px-6 py-24 md:py-32">
        <div className="max-w-3xl animate-fade-in">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-qit-coral" />
            Conciergerie premium, humaine et performante
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Rentabilisez votre logement courte durée{" "}
            <span className="text-qit-coral">sans gérer</span> les voyageurs, le ménage ni les imprévus
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
            Qit Concierge accompagne les propriétaires dans la gestion complète de leur location courte durée :
            mise en ligne, optimisation des prix, communication voyageurs, ménage, linge, check-in, suivi qualité et assistance.
          </p>

          <div className="flex items-start gap-2 text-white/90 text-sm sm:text-base mb-8 max-w-2xl">
            <CheckCircle2 className="w-5 h-5 text-qit-coral mt-0.5 flex-shrink-0" />
            <p>
              Expérience terrain : gestion de plus de 30 logements courte durée, automatisation des opérations
              et optimisation des revenus.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              asChild
              size="lg"
              className="bg-qit-coral hover:bg-qit-coral/90 text-white shadow-lg shadow-qit-coral/30 h-12 sm:h-14 text-base"
            >
              <a href="#contact">
                Demander une estimation de revenus
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/40 text-white hover:bg-white hover:text-qit-purple h-12 sm:h-14 text-base"
            >
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" />
                Échanger sur WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/80 text-xs sm:text-sm">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-qit-coral" /> Sans engagement
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-qit-coral" /> Réponse sous 24h
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-qit-coral" /> Suivi transparent
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
