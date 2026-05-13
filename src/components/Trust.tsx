import { Award, TrendingUp, ClipboardCheck, MessageSquare, Zap, Eye } from "lucide-react";

const items = [
  { icon: Award, title: "Expérience terrain", text: "Gestion opérationnelle de plus de 30 logements courte durée avec une approche concrète, testée sur le terrain." },
  { icon: TrendingUp, title: "Optimisation des revenus", text: "Prix ajustés selon la saison, les événements, le taux d'occupation et les contraintes du logement." },
  { icon: ClipboardCheck, title: "Suivi qualité après chaque séjour", text: "Contrôle du ménage, du linge, des équipements et remontée rapide des anomalies." },
  { icon: MessageSquare, title: "Communication voyageurs", text: "Messages clairs avant, pendant et après le séjour pour limiter les questions et améliorer l'expérience." },
  { icon: Zap, title: "Gestion des imprévus", text: "Réactivité en cas de problème d'accès, de ménage, de matériel ou de demande voyageur." },
  { icon: Eye, title: "Transparence propriétaire", text: "Suivi clair des performances, des interventions et des actions menées sur le logement." },
];

const Trust = () => {
  return (
    <section className="py-14 md:py-28 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3 md:mb-4">
            Réassurance
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple leading-tight">
            Pourquoi les propriétaires nous font confiance
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group rounded-2xl border border-border bg-qit-beige/40 hover:bg-white hover:border-qit-purple/20 hover:shadow-md transition-all p-6 md:p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-qit-purple/10 flex items-center justify-center mb-5 group-hover:bg-qit-coral/10 transition-colors">
                  <Icon className="h-5 w-5 text-qit-coral" />
                </div>
                <h3 className="text-lg font-semibold text-qit-purple mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Trust;
