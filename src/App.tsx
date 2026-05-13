import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGV from "./pages/CGV";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import LocalLanding from "./pages/LocalLanding";
import { LanguageProvider } from "./contexts/LanguageContext";
import CookieConsent from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/conciergerie-airbnb-lyon" element={
            <LocalLanding
              slug="conciergerie-airbnb-lyon"
              title="Conciergerie Airbnb à Lyon | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Lyon : gestion complète de votre location courte durée, ménage, check-in, optimisation des revenus et assistance voyageurs."
              h1="Conciergerie Airbnb à Lyon"
              intro="Qit Concierge gère votre logement Airbnb à Lyon de A à Z : mise en ligne, pricing dynamique, communication voyageurs, ménage, linge, check-in et suivi qualité."
            />
          } />
          <Route path="/conciergerie-airbnb-oullins" element={
            <LocalLanding
              slug="conciergerie-airbnb-oullins"
              title="Conciergerie Airbnb à Oullins | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Oullins : gestion locative courte durée, ménage, linge, check-in et optimisation des revenus pour votre logement."
              h1="Conciergerie Airbnb à Oullins"
              intro="Qit Concierge accompagne les propriétaires d'Oullins dans la gestion complète de leur location courte durée : annonces, voyageurs, ménage et performance."
            />
          } />
          <Route path="/gestion-location-courte-duree-lyon" element={
            <LocalLanding
              slug="gestion-location-courte-duree-lyon"
              title="Gestion Location Courte Durée à Lyon | Qit Concierge"
              metaDescription="Gestion de location courte durée à Lyon : pricing, communication voyageurs, ménage, linge, check-in, suivi qualité et reporting transparent."
              h1="Gestion de location courte durée à Lyon"
              intro="Une gestion complète et pilotée pour votre location courte durée à Lyon : optimisation des revenus, expérience voyageur soignée et suivi transparent."
            />
          } />
          <Route path="/conciergerie-booking-lyon" element={
            <LocalLanding
              slug="conciergerie-booking-lyon"
              title="Conciergerie Booking à Lyon | Qit Concierge"
              metaDescription="Conciergerie Booking à Lyon : gestion multi-plateformes de votre logement, optimisation des revenus, ménage et assistance voyageurs."
              h1="Conciergerie Booking à Lyon"
              intro="Qit Concierge gère votre logement sur Booking et les autres plateformes à Lyon : annonces, calendrier, voyageurs, ménage et performance."
            />
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
        <CookieConsent />
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
