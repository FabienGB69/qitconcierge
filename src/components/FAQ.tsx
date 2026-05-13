import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    q: "Qu'est-ce que Qit Concierge prend en charge ?",
    a: "Qit Concierge peut prendre en charge la gestion complète de votre location courte durée : mise en ligne ou optimisation de l'annonce, gestion Airbnb, Booking et Abritel, communication voyageurs, instructions d'arrivée, ménage, linge, suivi qualité, calendrier et optimisation des prix.",
  },
  {
    q: "Dans quelles zones intervenez-vous ?",
    a: "Nous intervenons principalement en Drôme-Ardèche, dans un rayon d'environ 1h autour de Tain-l'Hermitage : Tournon-sur-Rhône, Romans-sur-Isère, Valence, Saint-Vallier, Saint-Donat-sur-l'Herbasse, Annonay, Saint-Péray, Guilherand-Granges, Drôme des Collines, Ardèche Verte et Vallée du Rhône.",
  },
  {
    q: "Travaillez-vous uniquement avec des logements haut de gamme ?",
    a: "Non. Qit Concierge accompagne des biens adaptés à la location courte durée : maisons de campagne, gîtes, appartements, résidences secondaires et logements touristiques bien situés. Le plus important est le potentiel du logement, sa localisation, son niveau d'équipement et la qualité de l'expérience proposée aux voyageurs.",
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
    a: "Oui. Qit Concierge utilise PriceLabs pour piloter la tarification dynamique, ajuster les prix selon la saison, les événements, la demande, les durées de séjour et les périodes creuses.",
  },
  {
    q: "Sur quelles plateformes travaillez-vous ?",
    a: "Nous travaillons avec Airbnb, Booking et Abritel. Selon le type de logement, nous adaptons la stratégie de diffusion pour améliorer la visibilité et éviter de dépendre d'une seule plateforme.",
  },
  {
    q: "Est-ce que vous pouvez optimiser une annonce déjà existante ?",
    a: "Oui. Nous pouvons analyser une annonce existante, retravailler le titre, les photos, la description, les équipements, les paramètres de réservation, les prix et les règles de séjour.",
  },
  {
    q: "Est-ce que vous gérez les maisons et les gîtes ?",
    a: "Oui. Les maisons de campagne, gîtes et résidences secondaires sont particulièrement adaptés à notre positionnement en Drôme-Ardèche, notamment lorsqu'ils sont bien équipés et situés dans une zone touristique ou de passage.",
  },
  {
    q: "Comment estimez-vous le potentiel de revenus d'un logement ?",
    a: "Nous analysons la localisation, la capacité d'accueil, la qualité du logement, la saisonnalité, les plateformes adaptées, les prix du marché, les événements locaux et les règles de séjour possibles. L'objectif est de construire une estimation réaliste, pas une promesse artificielle.",
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
    a: "Oui. Le calendrier peut être bloqué selon vos besoins personnels. L'objectif est d'adapter la gestion à votre usage du bien.",
  },
  {
    q: "Est-ce que vous accompagnez sur les obligations réglementaires ?",
    a: "Nous aidons les propriétaires à identifier les points de vigilance : déclaration en mairie, numéro d'enregistrement si applicable, règlement de copropriété, fiscalité, DPE et règles locales. Cet accompagnement ne remplace pas un conseil juridique ou fiscal.",
  },
  {
    q: "Comment démarrer avec Qit Concierge ?",
    a: "Il suffit de demander une estimation. Nous analysons votre logement, sa localisation, son potentiel, vos objectifs, puis nous vous proposons une stratégie adaptée.",
  },
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
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

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
