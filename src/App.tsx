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
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
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
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
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
          <Route path="/conciergerie-airbnb-drome" element={
            <LocalLanding
              slug="conciergerie-airbnb-drome"
              title="Conciergerie Airbnb Drôme | Qit Concierge"
              metaDescription="Conciergerie Airbnb dans la Drôme : gestion locale de maisons, gîtes et résidences secondaires, revenue management PriceLabs, ménage et check-in."
              h1="Conciergerie Airbnb dans la Drôme"
              intro="Qit Concierge accompagne les propriétaires de la Drôme — Tain-l'Hermitage, Romans-sur-Isère, Valence, Drôme des Collines, vallée du Rhône — dans la gestion complète de leur location courte durée : Airbnb, Booking, Abritel, ménage, voyageurs, calendrier et tarification dynamique avec PriceLabs."
            />
          } />
          <Route path="/conciergerie-airbnb-ardeche" element={
            <LocalLanding
              slug="conciergerie-airbnb-ardeche"
              title="Conciergerie Airbnb Ardèche | Qit Concierge"
              metaDescription="Conciergerie Airbnb en Ardèche : gestion de gîtes, maisons de campagne et résidences secondaires en Ardèche verte, revenue management PriceLabs, ménage et check-in."
              h1="Conciergerie Airbnb en Ardèche"
              intro="Qit Concierge gère vos gîtes, maisons de campagne et résidences secondaires en Ardèche — Tournon-sur-Rhône, Annonay, Ardèche verte, vallée du Rhône — avec optimisation Airbnb, Booking et Abritel, revenue management PriceLabs et accompagnement humain et terrain."
            />
          } />
          <Route path="/conciergerie-location-courte-duree-drome" element={
            <LocalLanding
              slug="conciergerie-location-courte-duree-drome"
              title="Conciergerie location courte durée Drôme | Qit Concierge"
              metaDescription="Conciergerie spécialisée location courte durée dans la Drôme : Airbnb, Booking, Abritel, ménage, linge, check-in et tarification dynamique PriceLabs."
              h1="Conciergerie location courte durée dans la Drôme"
              intro="Une conciergerie locale dédiée à la location courte durée dans la Drôme : maisons de campagne, gîtes, appartements et résidences secondaires. Optimisation multi-plateformes, ménage, voyageurs et revenue management avec PriceLabs."
            />
          } />
          <Route path="/conciergerie-location-courte-duree-ardeche" element={
            <LocalLanding
              slug="conciergerie-location-courte-duree-ardeche"
              title="Conciergerie location courte durée Ardèche | Qit Concierge"
              metaDescription="Conciergerie location courte durée en Ardèche : gestion de gîtes et maisons en Ardèche verte, vallée du Rhône, ViaRhôna. Airbnb, Booking, Abritel + PriceLabs."
              h1="Conciergerie location courte durée en Ardèche"
              intro="Qit Concierge gère votre logement courte durée en Ardèche, à proximité de la ViaRhôna, des vignobles et de l'Ardèche verte : annonces Airbnb / Booking / Abritel, ménage, voyageurs et tarification dynamique PriceLabs."
            />
          } />
          <Route path="/conciergerie-airbnb-saint-vallier" element={
            <LocalLanding
              slug="conciergerie-airbnb-saint-vallier"
              title="Conciergerie Airbnb Saint-Vallier | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Saint-Vallier (Drôme) : gestion locale de votre logement courte durée, ménage, check-in et tarification dynamique PriceLabs."
              h1="Conciergerie Airbnb à Saint-Vallier"
              intro="Qit Concierge gère votre logement courte durée à Saint-Vallier et dans la vallée du Rhône : Airbnb, Booking, Abritel, ménage, voyageurs, calendrier et revenue management PriceLabs."
            />
          } />
          <Route path="/conciergerie-airbnb-romans-sur-isere" element={
            <LocalLanding
              slug="conciergerie-airbnb-romans-sur-isere"
              title="Conciergerie Airbnb Romans-sur-Isère | Qit Concierge"
              metaDescription="Conciergerie Airbnb à Romans-sur-Isère : gestion d'appartements, maisons et résidences secondaires, revenue management PriceLabs, ménage et check-in."
              h1="Conciergerie Airbnb à Romans-sur-Isère"
              intro="Qit Concierge accompagne les propriétaires de Romans-sur-Isère et de la Drôme des Collines dans la gestion complète de leur location courte durée : Airbnb, Booking, Abritel, ménage, voyageurs et tarification dynamique PriceLabs."
            />
          } />
          <Route path="/gestion-gite-drome" element={
            <LocalLanding
              slug="gestion-gite-drome"
              title="Gestion de gîte dans la Drôme | Qit Concierge"
              metaDescription="Gestion de gîtes dans la Drôme : conciergerie locale pour propriétaires non disponibles sur place, optimisation Airbnb / Booking / Abritel et tarification PriceLabs."
              h1="Gestion de gîte dans la Drôme"
              intro="Vous possédez un gîte dans la Drôme et vous n'êtes pas disponible sur place ? Qit Concierge prend en charge la gestion complète : annonces multi-plateformes, voyageurs, ménage, linge, check-in et revenue management PriceLabs."
            />
          } />
          <Route path="/gestion-gite-ardeche" element={
            <LocalLanding
              slug="gestion-gite-ardeche"
              title="Gestion de gîte en Ardèche | Qit Concierge"
              metaDescription="Gestion de gîtes en Ardèche : conciergerie locale pour propriétaires distants, optimisation Airbnb / Booking / Abritel et tarification dynamique PriceLabs."
              h1="Gestion de gîte en Ardèche"
              intro="Confiez la gestion de votre gîte en Ardèche — Ardèche verte, vallée du Rhône, vignobles — à une conciergerie locale : annonces, voyageurs, ménage, linge, check-in et revenue management PriceLabs."
            />
          } />
          <Route path="/conciergerie-residence-secondaire-drome-ardeche" element={
            <LocalLanding
              slug="conciergerie-residence-secondaire-drome-ardeche"
              title="Conciergerie résidence secondaire Drôme-Ardèche | Qit Concierge"
              metaDescription="Conciergerie pour résidences secondaires en Drôme-Ardèche : rentabilisez votre bien sans gestion quotidienne. Airbnb, Booking, Abritel + revenue management PriceLabs."
              h1="Conciergerie pour résidence secondaire en Drôme-Ardèche"
              intro="Vous possédez une résidence secondaire en Drôme-Ardèche que vous n'occupez qu'une partie de l'année ? Qit Concierge la rentabilise via la location courte durée, sans gestion quotidienne : Airbnb, Booking, Abritel, ménage, voyageurs et tarification dynamique PriceLabs."
            />
          } />
          <Route path="/revenue-management-airbnb-drome-ardeche" element={
            <LocalLanding
              slug="revenue-management-airbnb-drome-ardeche"
              title="Revenue management Airbnb Drôme-Ardèche (PriceLabs) | Qit Concierge"
              metaDescription="Revenue management et tarification dynamique Airbnb en Drôme-Ardèche avec PriceLabs : prix ajustés en temps réel, taux d'occupation optimisé, revenus maximisés."
              h1="Revenue management Airbnb en Drôme-Ardèche"
              intro="Tarification dynamique avec PriceLabs : prix ajustés selon la saison, les événements locaux, la concurrence et le taux d'occupation. Une expertise revenue management dédiée aux propriétaires Airbnb / Booking / Abritel en Drôme-Ardèche."
            />
          } />
          <Route path="/gestion-booking-abritel-drome-ardeche" element={
            <LocalLanding
              slug="gestion-booking-abritel-drome-ardeche"
              title="Gestion Booking & Abritel Drôme-Ardèche | Qit Concierge"
              metaDescription="Gestion multi-plateformes Booking et Abritel en Drôme-Ardèche : annonces synchronisées, calendrier, voyageurs, ménage et tarification dynamique PriceLabs."
              h1="Gestion Booking et Abritel en Drôme-Ardèche"
              intro="Qit Concierge synchronise vos annonces Airbnb, Booking et Abritel pour maximiser votre visibilité et vos revenus en Drôme-Ardèche : calendrier unifié, voyageurs, ménage et revenue management PriceLabs."
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
