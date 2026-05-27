import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, BookOpen } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { Link } from "react-router-dom";
import { renderInlineLinks } from "@/lib/inlineLinks";
import { useLanguage } from "@/contexts/LanguageContext";

const faqsFR = [
  { q: "Qu'est-ce que Qit Concierge prend en charge ?", a: "Qit Concierge peut prendre en charge la gestion complète de votre location courte durée : mise en ligne ou [optimisation de l'annonce](/blog/annonce-airbnb-optimisation-checklist), gestion Airbnb, [Booking et Abritel](/gestion-booking-abritel-drome-ardeche), communication voyageurs, instructions d'arrivée, ménage, linge, suivi qualité, calendrier et [optimisation des prix avec PriceLabs](/revenue-management-airbnb-drome-ardeche)." },
  { q: "Dans quelles zones intervenez-vous ?", a: "Nous intervenons principalement en [Drôme-Ardèche](/gestion-location-courte-duree-drome-ardeche) : [Tain-l'Hermitage](/conciergerie-airbnb-tain-hermitage), [Tournon-sur-Rhône](/conciergerie-airbnb-tournon), [Romans-sur-Isère](/conciergerie-airbnb-romans-sur-isere), [Valence](/conciergerie-airbnb-valence), [Saint-Vallier](/conciergerie-airbnb-saint-vallier), Saint-Donat-sur-l'Herbasse, Annonay, Saint-Péray, Guilherand-Granges, Drôme des Collines, Ardèche Verte et Vallée du Rhône." },
  { q: "Travaillez-vous uniquement avec des logements haut de gamme ?", a: "Non. Qit Concierge accompagne des biens adaptés à la location courte durée : maisons de campagne, [maisons de campagne en Drôme](/gestion-gite-drome) et [maisons de campagne en Ardèche](/gestion-gite-ardeche), appartements, [résidences secondaires](/conciergerie-residence-secondaire-drome-ardeche) et logements touristiques bien situés." },
  { q: "Combien de biens gérez-vous actuellement ?", a: "Qit Concierge accompagne un nombre sélectionné de logements pour maintenir une qualité de suivi élevée, réactive et personnalisée pour chaque propriétaire." },
  { q: "Depuis quand existe la conciergerie ?", a: "Qit Concierge existe depuis 2023. La conciergerie s'est construite autour d'une expérience terrain en location courte durée, en gestion opérationnelle et en revenue management." },
  { q: "Utilisez-vous PriceLabs ?", a: "Oui. Qit Concierge utilise [PriceLabs](/blog/pricelabs-comment-ca-marche) pour piloter la tarification dynamique." },
  { q: "Sur quelles plateformes travaillez-vous ?", a: "Nous travaillons avec [Airbnb, Booking et Abritel](/gestion-booking-abritel-drome-ardeche)." },
  { q: "Est-ce que vous pouvez optimiser une annonce déjà existante ?", a: "Oui. Nous pouvons analyser une annonce existante, retravailler le titre, les photos, la description, les équipements, les paramètres de réservation, les prix et les règles de séjour." },
  { q: "Est-ce que vous gérez les maisons de campagne ?", a: "Oui. Les maisons de campagne, [maisons de campagne](/gestion-gite-drome) et [résidences secondaires](/conciergerie-residence-secondaire-drome-ardeche) sont particulièrement adaptés à notre positionnement en Drôme-Ardèche." },
  { q: "Comment estimez-vous le potentiel de revenus d'un logement ?", a: "Nous analysons la localisation, la capacité d'accueil, la qualité du logement, la saisonnalité, les plateformes adaptées, les prix du marché, les événements locaux et les règles de séjour possibles." },
  { q: "Qui s'occupe du ménage et du linge ?", a: "Qit Concierge organise le ménage, le linge et le suivi qualité entre les séjours." },
  { q: "Comment sont gérés les voyageurs ?", a: "Nous gérons les échanges avant, pendant et après le séjour : instructions d'arrivée, réponses aux questions, demandes spécifiques, rappels importants et suivi en cas d'imprévu." },
  { q: "Puis-je continuer à utiliser mon logement ?", a: "Oui. Le calendrier peut être bloqué selon vos besoins personnels." },
  { q: "Est-ce que vous accompagnez sur les obligations réglementaires ?", a: "Nous aidons les propriétaires à identifier les points de vigilance. Cet accompagnement ne remplace pas un conseil juridique ou fiscal." },
  { q: "Comment démarrer avec Qit Concierge ?", a: "Il suffit de demander une estimation. Nous analysons votre logement, sa localisation, son potentiel, vos objectifs, puis nous vous proposons une stratégie adaptée." },
];

const faqsEN = [
  { q: "What does Qit Concierge take care of?", a: "Qit Concierge can take full responsibility for your short-term rental: listing creation or optimisation, Airbnb, Booking and Abritel management, guest communication, arrival instructions, cleaning, linen, quality control, calendar and price optimisation with PriceLabs." },
  { q: "Which areas do you cover?", a: "We mainly work in Drôme-Ardèche: Tain-l'Hermitage, Tournon-sur-Rhône, Romans-sur-Isère, Valence, Saint-Vallier, Saint-Donat-sur-l'Herbasse, Annonay, Saint-Péray, Guilherand-Granges, Drôme des Collines, Ardèche Verte and the Rhône Valley." },
  { q: "Do you only work with high-end properties?", a: "No. Qit Concierge supports properties well suited to short-term rental: country houses in Drôme and Ardèche, apartments, second homes and well-located holiday properties." },
  { q: "How many properties do you currently manage?", a: "Qit Concierge looks after a deliberately selected number of properties to maintain high-quality, responsive and personal follow-up for every owner." },
  { q: "How long has Qit Concierge been around?", a: "Qit Concierge has been operating since 2023, built on hands-on experience in short-term rental, operations and revenue management." },
  { q: "Do you use PriceLabs?", a: "Yes. Qit Concierge uses PriceLabs to drive dynamic pricing, adjusting rates by season, events, demand, length-of-stay and quieter periods." },
  { q: "Which platforms do you work with?", a: "We work with Airbnb, Booking and Abritel. Depending on the property, we adapt the distribution strategy to improve visibility and avoid relying on a single platform." },
  { q: "Can you optimise an existing listing?", a: "Yes. We can audit an existing listing and rework the title, photos, description, amenities, booking settings, prices and stay rules." },
  { q: "Do you manage country houses?", a: "Yes. Country houses and second homes fit our Drôme-Ardèche positioning particularly well, especially when they're well equipped and in a tourist or pass-through area." },
  { q: "How do you estimate a property's revenue potential?", a: "We analyse location, capacity, quality, seasonality, suitable platforms, market prices, local events and possible stay rules to build a realistic estimate — not an artificial promise." },
  { q: "Who handles cleaning and linen?", a: "Qit Concierge organises cleaning, linen and quality control between stays to ensure a clean, smooth and reliable guest experience." },
  { q: "How are guests managed?", a: "We handle conversations before, during and after the stay: arrival instructions, answers to questions, specific requests, important reminders and follow-up if something goes wrong." },
  { q: "Can I still use the property myself?", a: "Yes. The calendar can be blocked to match your personal needs — typical for a second home." },
  { q: "Do you help with regulatory obligations?", a: "We help owners identify key topics: city hall declaration, registration number where applicable, condo rules, taxation, energy rating (DPE) and local rules. This guidance is not a substitute for legal or tax advice." },
  { q: "How do I get started with Qit Concierge?", a: "Just request an estimate. We assess your property, location, potential and goals, then propose a tailored strategy." },
];

const goFurtherLandingsFR = [
  { href: "/conciergerie-airbnb-drome", label: "Conciergerie Airbnb Drôme" },
  { href: "/conciergerie-airbnb-ardeche", label: "Conciergerie Airbnb Ardèche" },
  { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management PriceLabs" },
  { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Résidence secondaire" },
];
const goFurtherLandingsEN = [
  { href: "/conciergerie-airbnb-drome", label: "Airbnb concierge — Drôme" },
  { href: "/conciergerie-airbnb-ardeche", label: "Airbnb concierge — Ardèche" },
  { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management — PriceLabs" },
  { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Second home" },
];

const goFurtherPosts = [
  { href: "/blog/conciergerie-airbnb-drome-choisir-prestataire", labelFR: "Comment choisir sa conciergerie en Drôme", labelEN: "How to choose a concierge in Drôme" },
  { href: "/blog/pourquoi-utiliser-pricelabs-drome-ardeche", labelFR: "Pourquoi utiliser PriceLabs", labelEN: "Why use PriceLabs" },
  { href: "/blog/louer-en-courte-duree-drome-ardeche", labelFR: "Les zones qui marchent en Drôme-Ardèche", labelEN: "Which areas work in Drôme-Ardèche" },
];

const FAQ = () => {
  const { isFR } = useLanguage();
  const faqs = isFR ? faqsFR : faqsEN;
  const landings = isFR ? goFurtherLandingsFR : goFurtherLandingsEN;
  const whatsappUrl = buildWhatsAppUrl(
    isFR ? "Bonjour, j'ai une question concernant Qit Concierge." : "Hello, I have a question about Qit Concierge."
  );

  const t = isFR
    ? {
        eyebrow: "Vos questions",
        heading: "Questions fréquentes des propriétaires",
        body: "Les réponses concrètes que se posent la plupart des propriétaires.",
        explore: "Explorer par zone",
        readMore: "Lire aussi",
        wa: "Poser ma question sur WhatsApp",
      }
    : {
        eyebrow: "Your questions",
        heading: "Frequently asked questions from owners",
        body: "Concrete answers to the questions most owners ask.",
        explore: "Browse by area",
        readMore: "Also read",
        wa: "Ask my question on WhatsApp",
      };

  return (
    <section id="faq" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">{t.eyebrow}</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-qit-purple mb-3 md:mb-4 leading-tight">{t.heading}</h2>
          <p className="text-muted-foreground">{t.body}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium text-qit-purple hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {renderInlineLinks(item.a, `faq-${i}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-qit-beige/40 p-5">
              <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-3">{t.explore}</h3>
              <ul className="space-y-2">
                {landings.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="inline-flex items-start gap-2 text-sm text-qit-purple hover:text-qit-coral">
                      <MapPin className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-qit-beige/40 p-5">
              <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-3">{t.readMore}</h3>
              <ul className="space-y-2">
                {goFurtherPosts.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="inline-flex items-start gap-2 text-sm text-qit-purple hover:text-qit-coral">
                      <BookOpen className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                      {isFR ? l.labelFR : l.labelEN}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button asChild className="bg-qit-coral hover:bg-qit-coral/90 text-white">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                {t.wa}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
