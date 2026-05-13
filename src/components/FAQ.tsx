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
    q: "Combien puis-je gagner avec mon logement en courte durée ?",
    a: "Les revenus dépendent de la ville, de la saison, du type de logement et de sa capacité. Nous établissons une estimation basée sur les données du marché local, le taux d'occupation réaliste et un prix moyen ajusté par période. L'objectif : une projection prudente plutôt qu'une promesse.",
  },
  {
    q: "Est-ce que Qit Concierge s'occupe de créer mon annonce Airbnb ou Booking ?",
    a: "Oui. Nous prenons en charge la création des annonces sur les plateformes pertinentes (Airbnb, Booking, Abritel…), le descriptif, les photos lorsque c'est nécessaire, le paramétrage du calendrier, des prix et des règles de réservation.",
  },
  {
    q: "Qui gère le ménage et le linge ?",
    a: "Nous coordonnons le ménage et la fourniture du linge entre chaque séjour. Les frais de ménage sont en général facturés au voyageur ; selon la stratégie choisie, ils peuvent être intégrés au tarif. Un contrôle qualité est effectué après chaque départ.",
  },
  {
    q: "Comment sont gérés les voyageurs problématiques ?",
    a: "Sélection en amont (vérification des profils, communication, règlement intérieur), dépôt de garantie selon la plateforme, suivi pendant le séjour et contrôle complet du logement après le départ. En cas d'incident, nous gérons les démarches auprès de la plateforme.",
  },
  {
    q: "Puis-je bloquer des dates pour utiliser mon logement ?",
    a: "Oui, à tout moment. Vous nous indiquez vos périodes d'utilisation personnelle et nous bloquons le calendrier sur l'ensemble des plateformes. Le logement reste le vôtre.",
  },
  {
    q: "Est-ce que vous optimisez les prix selon la saison ?",
    a: "Oui. Les tarifs sont ajustés en fonction de la saison, des événements locaux, du taux d'occupation, de la concurrence et des contraintes spécifiques du logement. Les ajustements sont réguliers, pas figés sur l'année.",
  },
  {
    q: "Est-ce que vous m'aidez à vérifier les obligations réglementaires ?",
    a: "Nous vous orientons sur les principales obligations applicables à la location courte durée : déclaration en mairie, numéro d'enregistrement, taxe de séjour, assurance. Nous ne nous substituons pas à un conseil juridique mais nous vous aidons à savoir où regarder.",
  },
  {
    q: "Quels logements acceptez-vous ?",
    a: "Nous gérons des appartements, maisons, gîtes et résidences secondaires en Drôme-Ardèche, principalement. Avant tout engagement, nous évaluons le potentiel du logement et la cohérence avec notre approche.",
  },
  {
    q: "Quels sont les frais de gestion ?",
    a: "Les frais dépendent du périmètre confié (gestion complète, gestion partielle, lancement). Nous les présentons clairement dans la proposition envoyée après l'estimation, sans frais cachés.",
  },
  {
    q: "Comment démarrer avec Qit Concierge ?",
    a: "Vous remplissez le formulaire d'estimation. Nous revenons vers vous sous 24h ouvrées avec une première analyse. Si l'approche vous convient, nous planifions un échange, validons le périmètre et lançons la mise en ligne.",
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
