import { TrendingUp, Calendar, Tag, BarChart3, Clock, Sparkles } from "lucide-react";

const pillars = [
  { icon: TrendingUp, title: "Tarification dynamique", text: "Des prix ajustés en continu selon la demande, le marché et la concurrence locale." },
  { icon: Tag, title: "Prix minimum et maximum", text: "Des bornes claires pour protéger la valeur de votre bien tout en restant compétitif." },
  { icon: Calendar, title: "Ajustement saisonnier", text: "Profils saisonniers et événements locaux intégrés pour suivre les variations de demande." },
  { icon: Clock, title: "Règles de durée minimum", text: "Minimum stay adapté à la période, pour équilibrer occupation et rentabilité." },
  { icon: Sparkles, title: "Optimisation des trous de calendrier", text: "Remises last minute et règles ciblées pour limiter les nuits non réservées." },
  { icon: BarChart3, title: "Suivi des performances", text: "Analyse régulière des résultats Airbnb, Booking et Abritel pour ajuster la stratégie." },
];

const RevenueManagement = () => {
  return (
    <section className="py-14 md:py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="max-w-3xl mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">
            Revenue management
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple mb-5 leading-tight">
            Une conciergerie qui ne se contente pas de gérer : elle optimise vos revenus
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            La location courte durée ne se résume pas à publier une annonce et
            attendre les réservations. Chez Qit Concierge, chaque bien est piloté
            avec une logique de revenue management : prix minimum, prix maximum,
            saisonnalité, événements locaux, durée minimum de séjour, trous de
            calendrier, réservations de dernière minute et performance par
            plateforme.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Nous utilisons <span className="font-semibold text-qit-purple">PriceLabs</span> pour
            ajuster les prix et améliorer le potentiel de revenus sur Airbnb,
            Booking et Abritel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {pillars.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-qit-beige/40 p-5 md:p-6 hover:border-qit-coral/40 transition-colors"
            >
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-qit-coral/10 text-qit-coral mb-3">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-qit-purple mb-1.5">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RevenueManagement;
