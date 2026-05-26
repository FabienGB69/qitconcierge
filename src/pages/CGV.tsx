import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useLanguage } from "@/contexts/LanguageContext";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section>
    <h2 className="text-xl font-semibold mb-3 text-qit-purple">{title}</h2>
    <div className="space-y-3">{children}</div>
  </section>
);

const CGV = () => {
  const { isEN } = useLanguage();
  useSEO({
    title: "Conditions générales de vente — Qit Concierge",
    description: "Conditions générales de vente des prestations de conciergerie et gestion locative courte durée Qit Concierge.",
    path: "/cgv",
  });
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-3xl mx-auto">
          {isEN && (
            <div className="mb-6 rounded-md border border-qit-coral/30 bg-qit-coral/5 px-4 py-3 text-sm text-qit-purple">
              These terms of sale are kept in French as they govern services delivered in France. Contact us at guest.qitconcierge@gmail.com for an English summary.
            </div>
          )}
          <header className="mb-10 border-b border-border pb-6">
            <p className="text-sm uppercase tracking-wider text-qit-coral font-medium mb-2">Cadre contractuel</p>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-qit-purple">Conditions générales de vente</h1>
            <p className="mt-3 text-muted-foreground text-sm">Dernière mise à jour : [à compléter]</p>
          </header>

          <div className="space-y-10 text-foreground/90 leading-relaxed text-sm">
            <Section title="1. Objet">
              <p>
                Les présentes conditions générales de vente ont pour objet de définir les conditions dans
                lesquelles Qit Concierge propose ses prestations de conciergerie, de gestion opérationnelle et
                d'accompagnement à la location courte durée.
              </p>
              <p>
                Qit Concierge intervient principalement auprès de propriétaires de maisons, gîtes, appartements,
                logements touristiques et résidences secondaires situés en Drôme-Ardèche.
              </p>
            </Section>

            <Section title="2. Prestations proposées">
              <p>Qit Concierge peut proposer notamment les prestations suivantes :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>accompagnement à la mise en location courte durée ;</li>
                <li>création ou optimisation d'annonces sur Airbnb, Booking et Abritel ;</li>
                <li>gestion des échanges avec les voyageurs ;</li>
                <li>suivi des réservations ;</li>
                <li>organisation des arrivées et départs ;</li>
                <li>coordination du ménage ;</li>
                <li>coordination du linge ;</li>
                <li>suivi qualité entre les séjours ;</li>
                <li>remontée des anomalies constatées ;</li>
                <li>accompagnement dans le paramétrage des plateformes ;</li>
                <li>optimisation tarifaire avec PriceLabs ;</li>
                <li>pilotage du calendrier, des prix et des durées de séjour ;</li>
                <li>accompagnement propriétaire.</li>
              </ul>
              <p>
                La liste exacte des prestations est précisée dans la proposition commerciale, le mandat, le devis
                ou le contrat conclu avec le client.
              </p>
            </Section>

            <Section title="3. Client concerné">
              <p>
                Les présentes CGV s'adressent aux propriétaires ou représentants de propriétaires souhaitant
                confier tout ou partie de la gestion de leur logement en location courte durée.
              </p>
              <p>
                Le client déclare disposer des droits nécessaires pour proposer le logement à la location courte
                durée et confier les prestations à Qit Concierge.
              </p>
            </Section>

            <Section title="4. Zone d'intervention">
              <p>
                Qit Concierge intervient principalement en Drôme-Ardèche, dans les départements de la Drôme et de l'Ardèche.
              </p>
              <p>
                Toute demande située en dehors de cette zone pourra faire l'objet d'une étude spécifique et d'une
                acceptation expresse par Qit Concierge.
              </p>
            </Section>

            <Section title="5. Tarif">
              <p>
                La rémunération de Qit Concierge est fixée à <strong>25% TTC</strong> des revenus locatifs générés
                par le logement, sauf accord différent prévu dans une proposition commerciale, un devis, un mandat
                ou un contrat spécifique.
              </p>
              <p>
                Cette commission rémunère la gestion et le pilotage du logement selon les prestations définies
                entre les parties.
              </p>
              <p>
                Les frais annexes tels que ménage, linge, consommables, maintenance, réparations, remplacement
                d'équipement, interventions techniques, frais de plateforme, frais bancaires ou frais
                exceptionnels peuvent être facturés séparément ou supportés selon les modalités prévues entre les
                parties.
              </p>
            </Section>

            <Section title="6. Revenus locatifs pris en compte">
              <p>
                Sauf disposition contraire prévue au contrat, les revenus locatifs pris en compte correspondent
                aux montants générés par les réservations du logement, hors frais expressément exclus ou frais
                annexes définis entre les parties.
              </p>
              <p>
                Les modalités précises de calcul de la commission peuvent être détaillées dans le contrat ou le
                mandat signé avec le propriétaire.
              </p>
            </Section>

            <Section title="7. Conditions de paiement">
              <p>
                Les modalités de paiement sont précisées dans la proposition commerciale, le mandat, le devis ou
                le contrat conclu avec le client.
              </p>
              <p>
                Sauf accord contraire, les sommes dues à Qit Concierge sont exigibles selon une périodicité
                définie entre les parties : mensuelle, par réservation ou selon le relevé des plateformes.
              </p>
              <p>
                En cas de retard de paiement, Qit Concierge pourra appliquer les pénalités et indemnités prévues
                par la réglementation applicable, après information du client.
              </p>
            </Section>

            <Section title="8. Absence de garantie de revenus">
              <p>
                Qit Concierge met en œuvre son expertise et ses outils pour améliorer la visibilité, la gestion et
                le potentiel de rentabilité du logement.
              </p>
              <p>
                Toutefois, Qit Concierge ne garantit aucun niveau minimal de revenus, de taux d'occupation, de
                classement sur les plateformes ou de nombre de réservations.
              </p>
              <p>
                Les performances peuvent varier selon la localisation, la saisonnalité, la qualité du logement,
                les prix du marché, la concurrence, les événements, les avis voyageurs, les règles des plateformes
                et le contexte économique.
              </p>
            </Section>

            <Section title="9. Plateformes utilisées">
              <p>
                Qit Concierge peut accompagner le propriétaire dans la gestion ou l'optimisation des annonces sur
                Airbnb, Booking et Abritel.
              </p>
              <p>
                Le propriétaire reconnaît que ces plateformes disposent de leurs propres conditions d'utilisation,
                frais, règles de classement, politiques d'annulation, procédures de litige et modalités de
                paiement.
              </p>
              <p>
                Qit Concierge ne peut être tenue responsable des décisions prises par ces plateformes, notamment
                suspension d'annonce, modification d'algorithme, changement de règlement, annulation,
                remboursement imposé ou retenue de paiement.
              </p>
            </Section>

            <Section title="10. PriceLabs et optimisation tarifaire">
              <p>
                Qit Concierge peut utiliser PriceLabs ou tout autre outil de tarification dynamique afin
                d'optimiser les prix, les durées de séjour et le calendrier.
              </p>
              <p>
                L'utilisation d'un outil de revenue management ne constitue pas une garantie de résultat. Les
                recommandations tarifaires peuvent être adaptées selon le logement, le marché, la saison, les
                objectifs du propriétaire et les contraintes opérationnelles.
              </p>
            </Section>

            <Section title="11. Obligations du client">
              <p>Le client s'engage à :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>fournir des informations exactes sur le logement ;</li>
                <li>déclarer toute contrainte réglementaire, technique ou juridique ;</li>
                <li>s'assurer que le logement peut légalement être loué en courte durée ;</li>
                <li>vérifier les règles de copropriété, d'urbanisme, de fiscalité et d'assurance applicables ;</li>
                <li>maintenir le logement en bon état d'usage et de sécurité ;</li>
                <li>fournir les équipements nécessaires à l'accueil des voyageurs ;</li>
                <li>signaler toute anomalie connue ;</li>
                <li>régler les frais et commissions dus selon les modalités prévues ;</li>
                <li>collaborer avec Qit Concierge pour permettre la bonne exécution des prestations.</li>
              </ul>
            </Section>

            <Section title="12. Obligations de Qit Concierge">
              <p>
                Qit Concierge s'engage à exécuter ses prestations avec sérieux, diligence et professionnalisme.
              </p>
              <p>Qit Concierge est tenue à une obligation de moyens et non de résultat.</p>
              <p>
                Qit Concierge met en œuvre les actions nécessaires à la gestion du logement selon les prestations
                convenues avec le client.
              </p>
            </Section>

            <Section title="13. Ménage, linge et prestataires externes">
              <p>
                Qit Concierge peut coordonner des prestations de ménage, de linge, de maintenance ou
                d'intervention technique.
              </p>
              <p>Ces prestations peuvent être réalisées directement ou par des prestataires externes.</p>
              <p>Les conditions financières, responsabilités et modalités d'intervention sont précisées entre les parties.</p>
              <p>
                Qit Concierge ne peut être tenue responsable des dommages causés par un prestataire externe
                indépendant, sauf faute démontrée dans sa mission de coordination.
              </p>
            </Section>

            <Section title="14. Dégradations, vols et litiges voyageurs">
              <p>
                Qit Concierge peut accompagner le propriétaire dans la remontée des anomalies, dégradations ou
                litiges constatés après un séjour.
              </p>
              <p>
                Toutefois, Qit Concierge ne garantit pas l'indemnisation par les plateformes, assurances ou
                voyageurs.
              </p>
              <p>
                Le traitement des litiges dépend notamment des règles des plateformes, des délais de déclaration,
                des justificatifs disponibles, des photos, des factures et des politiques applicables.
              </p>
            </Section>

            <Section title="15. Réglementation location courte durée">
              <p>Le client est seul responsable de la conformité réglementaire de son logement, notamment concernant :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>déclaration en mairie ;</li>
                <li>numéro d'enregistrement si applicable ;</li>
                <li>règlement de copropriété ;</li>
                <li>fiscalité ;</li>
                <li>assurance ;</li>
                <li>DPE ;</li>
                <li>règles locales ;</li>
                <li>autorisations administratives éventuelles.</li>
              </ul>
              <p>
                Qit Concierge peut accompagner le client dans l'identification des points de vigilance, mais ne
                fournit pas de conseil juridique, fiscal ou réglementaire personnalisé.
              </p>
            </Section>

            <Section title="16. Assurance">
              <p>
                Le client s'engage à disposer d'une assurance adaptée à la location courte durée et à informer son
                assureur de l'activité de location.
              </p>
              <p>Qit Concierge peut demander une attestation d'assurance avant la mise en location du logement.</p>
            </Section>

            <Section title="17. Responsabilité">
              <p>
                La responsabilité de Qit Concierge ne pourra être engagée qu'en cas de faute prouvée dans
                l'exécution de ses prestations.
              </p>
              <p>Qit Concierge ne peut être tenue responsable :</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>d'une baisse de revenus ;</li>
                <li>d'une absence de réservation ;</li>
                <li>d'un mauvais comportement voyageur ;</li>
                <li>d'une dégradation causée par un voyageur ;</li>
                <li>d'une décision prise par une plateforme ;</li>
                <li>d'un défaut caché du logement ;</li>
                <li>d'un manquement réglementaire imputable au propriétaire ;</li>
                <li>d'un cas de force majeure ;</li>
                <li>d'un problème technique indépendant de sa volonté.</li>
              </ul>
            </Section>

            <Section title="18. Durée et résiliation">
              <p>La durée de collaboration est définie dans le contrat, mandat ou accord conclu avec le client.</p>
              <p>Les modalités de résiliation, préavis et fin de mission sont précisées dans le contrat.</p>
              <p>
                En cas de manquement grave d'une partie à ses obligations, l'autre partie pourra mettre fin à la
                collaboration après mise en demeure restée sans effet, sauf urgence ou situation particulière.
              </p>
            </Section>

            <Section title="19. Propriété des contenus">
              <p>
                Les textes, photos, annonces, descriptions, réglages, supports, méthodes et contenus créés ou
                optimisés dans le cadre de la mission peuvent faire l'objet de droits spécifiques.
              </p>
              <p>Les modalités d'utilisation, de transfert ou de réutilisation sont définies entre les parties.</p>
              <p>
                Sauf accord contraire, les contenus créés par Qit Concierge dans le cadre de la mission ne peuvent
                être réutilisés hors du cadre prévu sans autorisation préalable.
              </p>
            </Section>

            <Section title="20. Données personnelles">
              <p>
                Dans le cadre de ses prestations, Qit Concierge peut être amenée à traiter certaines données
                personnelles relatives au propriétaire, aux voyageurs ou aux demandes reçues.
              </p>
              <p>Les modalités de traitement sont précisées dans la Politique de confidentialité.</p>
            </Section>

            <Section title="21. Médiation">
              <p>
                En cas de litige avec un client consommateur, celui-ci peut recourir gratuitement à un médiateur
                de la consommation.
              </p>
              <ul className="space-y-1">
                <li><strong>Médiateur compétent :</strong> [à compléter]</li>
                <li><strong>Site web :</strong> [à compléter]</li>
              </ul>
            </Section>

            <Section title="22. Droit applicable">
              <p>Les présentes CGV sont soumises au droit français.</p>
              <p>En cas de litige, les parties rechercheront prioritairement une solution amiable.</p>
              <p>À défaut d'accord amiable, le litige sera porté devant les juridictions compétentes.</p>
            </Section>
          </div>
        </div>
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-muted-foreground">
          <a href="/" className="text-qit-purple hover:text-qit-coral font-medium transition-colors">
            ← Retour à l'accueil
          </a>
          <a
            href="https://wa.me/33601777633"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-qit-coral text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-qit-coral/90 transition-colors"
          >
            Une question ? Écrivez-nous sur WhatsApp
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CGV;
