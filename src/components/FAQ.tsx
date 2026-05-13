import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle, MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { renderInlineLinks } from "@/lib/inlineLinks";

const faqs = [
  {
    q: "Qu'est-ce que Qit Concierge prend en charge ?",
    a: "Qit Concierge peut prendre en charge la gestion complète de votre location courte durée : mise en ligne ou [optimisation de l'annonce](/blog/annonce-airbnb-optimisation-checklist), gestion Airbnb, [Booking et Abritel](/gestion-booking-abritel-drome-ardeche), communication voyageurs, instructions d'arrivée, ménage, linge, suivi qualité, calendrier et [optimisation des prix avec PriceLabs](/revenue-management-airbnb-drome-ardeche).",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Nous intervenons principalement en [Drôme-Ardèche](/gestion-location-courte-duree-drome-ardeche), dans un rayon d'environ 1h autour de [Tain-l'Hermitage](/conciergerie-airbnb-tain-hermitage) : [Tournon-sur-Rhône](/conciergerie-airbnb-tournon), [Romans-sur-Isère](/conciergerie-airbnb-romans-sur-isere), [Valence](/conciergerie-airbnb-valence), [Saint-Vallier](/conciergerie-airbnb-saint-vallier), Saint-Donat-sur-l'Herbasse, Annonay, Saint-Péray, Guilherand-Granges, Drôme des Collines, Ardèche Verte et Vallée du Rhône.",
  },
  {
    q: "Travaillez-vous uniquement avec des logements haut de gamme ?",
    a: "Non. Qit Concierge accompagne des biens adaptés à la location courte durée : maisons de campagne, [gîtes en Drôme](/gestion-gite-drome) et [gîtes en Ardèche](/gestion-gite-ardeche), appartements, [résidences secondaires](/conciergerie-residence-secondaire-drome-ardeche) et logements touristiques bien situés. Le plus important est le potentiel du logement, sa localisation, son niveau d'équipement et la qualité de l'expérience proposée aux voyageurs.",
  },
  {
    q: "Combien de biens gérez-vous actuellement ?",
    a: "Qit Concierge gère actuellement 5 biens. Nous assumons une approche à taille humaine afin de garder un suivi précis, réactif et personnalisé pour chaque propriétaire.",
  },
  {
    q: "Depuis quand existe la conciergerie ?",
    a: "Qit Concierge existe depuis 2023. La conciergerie s'est construite autour d'une expérience terrain en location courte durée, en gestion opérationnelle et en revenue management.",
  },
  {
    q: "Utilisez-vous PriceLabs ?",
    a: "Oui. Qit Concierge utilise [PriceLabs](/blog/pricelabs-comment-ca-marche) pour piloter la tarification dynamique, ajuster les prix selon la saison, les événements, la demande, les durées de séjour et les périodes creuses. Voir aussi : [pourquoi PriceLabs en Drôme-Ardèche](/blog/pourquoi-utiliser-pricelabs-drome-ardeche).",
  },
  {
    q: "Sur quelles plateformes travaillez-vous ?",
    a: "Nous travaillons avec [Airbnb, Booking et Abritel](/gestion-booking-abritel-drome-ardeche). Selon le type de logement, nous adaptons la stratégie de diffusion pour améliorer la visibilité et éviter de dépendre d'une seule plateforme — voir [quelle plateforme choisir](/blog/airbnb-booking-abritel-quelle-plateforme-choisir).",
  },
  {
    q: "Est-ce que vous pouvez optimiser une annonce déjà existante ?",
    a: "Oui. Nous pouvons analyser une annonce existante, retravailler le titre, les photos, la description, les équipements, les paramètres de réservation, les prix et les règles de séjour. Voir notre [checklist d'optimisation d'annonce Airbnb](/blog/annonce-airbnb-optimisation-checklist).",
  },
  {
    q: "Est-ce que vous gérez les maisons et les gîtes ?",
    a: "Oui. Les maisons de campagne, [gîtes](/gestion-gite-drome) et [résidences secondaires](/conciergerie-residence-secondaire-drome-ardeche) sont particulièrement adaptés à notre positionnement en Drôme-Ardèche, notamment lorsqu'ils sont bien équipés et situés dans une zone touristique ou de passage. À lire : [louer sa maison de campagne en Ardèche](/blog/louer-maison-campagne-ardeche-points-a-verifier).",
  },
  {
    q: "Comment estimez-vous le potentiel de revenus d'un logement ?",
    a: "Nous analysons la localisation, la capacité d'accueil, la qualité du logement, la saisonnalité, les plateformes adaptées, les prix du marché, les événements locaux et les règles de séjour possibles. L'objectif est de construire une estimation réaliste, pas une promesse artificielle. Voir [les zones qui marchent en Drôme-Ardèche](/blog/louer-en-courte-duree-drome-ardeche).",
  },
  {
    q: "Qui s'occupe du ménage et du linge ?",
    a: "Qit Concierge organise le ménage, le linge et le suivi qualité entre les séjours. L'objectif est d'assurer une expérience propre, fluide et fiable pour les voyageurs.",
  },
  {
    q: "Comment sont gérés les voyageurs ?",
    a: "Nous gérons les échanges avant, pendant et après le séjour : instructions d'arrivée, réponses aux questions, demandes spécifiques, rappels importants et suivi en cas d'imprévu.",
  },
  {
    q: "Puis-je continuer à utiliser mon logement ?",
    a: "Oui. Le calendrier peut être bloqué selon vos besoins personnels. C'est typiquement le cas pour une [résidence secondaire](/conciergerie-residence-secondaire-drome-ardeche) — voir [par où commencer](/blog/louer-residence-secondaire-courte-duree).",
  },
  {
    q: "Est-ce que vous accompagnez sur les obligations réglementaires ?",
    a: "Nous aidons les propriétaires à identifier les points de vigilance : déclaration en mairie, numéro d'enregistrement si applicable, règlement de copropriété, fiscalité, DPE et règles locales. Voir [les obligations en Drôme-Ardèche](/blog/obligations-location-courte-duree-drome-ardeche). Cet accompagnement ne remplace pas un conseil juridique ou fiscal.",
  },
  {
    q: "Comment démarrer avec Qit Concierge ?",
    a: "Il suffit de demander une estimation. Nous analysons votre logement, sa localisation, son potentiel, vos objectifs, puis nous vous proposons une stratégie adaptée.",
  },
];

const goFurtherLandings: { href: string; label: string }[] = [
  { href: "/conciergerie-airbnb-drome", label: "Conciergerie Airbnb Drôme" },
  { href: "/conciergerie-airbnb-ardeche", label: "Conciergerie Airbnb Ardèche" },
  { href: "/revenue-management-airbnb-drome-ardeche", label: "Revenue management PriceLabs" },
  { href: "/conciergerie-residence-secondaire-drome-ardeche", label: "Résidence secondaire" },
];

const goFurtherPosts: { href: string; label: string }[] = [
  { href: "/blog/conciergerie-airbnb-drome-choisir-prestataire", label: "Comment choisir sa conciergerie en Drôme" },
  { href: "/blog/pourquoi-utiliser-pricelabs-drome-ardeche", label: "Pourquoi utiliser PriceLabs" },
  { href: "/blog/louer-en-courte-duree-drome-ardeche", label: "Les zones qui marchent en Drôme-Ardèche" },
];

const whatsappUrl =
  "https://wa.me/330601777633?text=" +
  encodeURIComponent("Bonjour, j'ai une question concernant Qit Concierge.");

const FAQ = () => {
  return (
    <section id="faq" className="py-14 md:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">
            Vos questions
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-qit-purple mb-3 md:mb-4 leading-tight">
            Questions fréquentes des propriétaires
          </h2>
          <p className="text-muted-foreground">
            Les réponses concrètes que se posent la plupart des propriétaires.
          </p>
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
              <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-3">
                Explorer par zone
              </h3>
              <ul className="space-y-2">
                {goFurtherLandings.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="inline-flex items-start gap-2 text-sm text-qit-purple hover:text-qit-coral"
                    >
                      <MapPin className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-qit-beige/40 p-5">
              <h3 className="text-sm uppercase tracking-widest text-qit-coral font-semibold mb-3">
                Lire aussi
              </h3>
              <ul className="space-y-2">
                {goFurtherPosts.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="inline-flex items-start gap-2 text-sm text-qit-purple hover:text-qit-coral"
                    >
                      <BookOpen className="h-4 w-4 text-qit-coral flex-shrink-0 mt-0.5" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              asChild
              className="bg-qit-coral hover:bg-qit-coral/90 text-white"
            >
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Poser ma question sur WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
