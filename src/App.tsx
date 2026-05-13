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
          <Route path="/conciergerie-airbnb-tain-hermitage" element={
            <LocalLanding
              slug="conciergerie-airbnb-tain-hermitage"
              title="Conciergerie Airbnb à Tain-l'Hermitage | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Tain-l'Hermitage : gestion locale de votre maison, gîte ou résidence secondaire, revenue management PriceLabs, ménage et check-in."
              h1="Conciergerie Airbnb à Tain-l'Hermitage"
              intro="Qit Concierge gère votre logement courte durée à Tain-l'Hermitage et alentours : optimisation Airbnb, Booking et Abritel, revenue management avec PriceLabs, ménage, linge, check-in et accompagnement humain et terrain."
            />
          } />
          <Route path="/conciergerie-airbnb-tournon" element={
            <LocalLanding
              slug="conciergerie-airbnb-tournon"
              title="Conciergerie Airbnb à Tournon-sur-Rhône | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Tournon-sur-Rhône : gestion courte durée locale, revenue management PriceLabs, ménage, check-in et suivi qualité."
              h1="Conciergerie Airbnb à Tournon-sur-Rhône"
              intro="Qit Concierge accompagne les propriétaires de Tournon-sur-Rhône dans la gestion de leur location courte durée : annonces Airbnb / Booking / Abritel, pricing PriceLabs, ménage et accompagnement humain."
            />
          } />
          <Route path="/conciergerie-airbnb-valence" element={
            <LocalLanding
              slug="conciergerie-airbnb-valence"
              title="Conciergerie Airbnb à Valence | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Valence : gestion courte durée d'appartements et résidences secondaires, revenue management PriceLabs, ménage et check-in."
              h1="Conciergerie Airbnb à Valence"
              intro="Qit Concierge gère votre appartement, maison ou résidence secondaire à Valence : optimisation Airbnb, Booking et Abritel, revenue management avec PriceLabs, ménage et suivi qualité."
            />
          } />
          <Route path="/gestion-location-courte-duree-drome-ardeche" element={
            <LocalLanding
              slug="gestion-location-courte-duree-drome-ardeche"
              title="Gestion Location Courte Durée en Drôme-Ardèche | Qit Concierge"
              metaDescription="Gestion locative courte durée en Drôme-Ardèche : revenue management PriceLabs, optimisation Airbnb / Booking / Abritel, ménage, check-in, accompagnement humain."
              h1="Gestion de location courte durée en Drôme-Ardèche"
              intro="Une gestion locale et pilotée pour vos maisons de campagne, gîtes, appartements et résidences secondaires en Drôme-Ardèche : meilleure rentabilité, sans gestion quotidienne."
            />
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
