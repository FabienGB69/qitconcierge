import { FileCheck, Hash, Building2, Receipt, Info } from "lucide-react";

const items = [
  { icon: FileCheck, title: "Déclaration du logement", text: "Identifier les démarches à effectuer auprès de votre mairie avant la mise en location." },
  { icon: Hash, title: "Numéro d'enregistrement", text: "Obtenir et afficher le numéro requis sur les annonces des plateformes." },
  { icon: Building2, title: "Règlement de copropriété", text: "Vérifier que la location courte durée est compatible avec votre copropriété." },
  { icon: Receipt, title: "Fiscalité et statut du bien", text: "Comprendre les régimes applicables et le statut fiscal adapté à votre situation." },
];

const Compliance = () => {
  return (
    <section className="py-14 md:py-28 bg-qit-beige/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3 md:mb-4">
            Conformité
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-qit-purple mb-5 md:mb-6 leading-tight">
            Une gestion courte durée plus sereine et conforme
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            <span className="hidden sm:inline">La location courte durée évolue rapidement : déclaration en mairie, numéro d'enregistrement, règlement de copropriété, fiscalité, durée de location, DPE et règles locales. Qit Concierge aide les propriétaires à identifier les points de vigilance avant la mise en location afin d'éviter les erreurs coûteuses.</span>
            <span className="sm:hidden">Déclaration, numéro d'enregistrement, copropriété, fiscalité… On vous aide à identifier les points de vigilance avant la mise en location.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto mb-10">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-qit-purple/5 flex items-center justify-center mb-4">
                  <Icon className="h-5 w-5 text-qit-purple" />
                </div>
                <h3 className="text-base font-semibold text-qit-purple mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto flex items-start gap-3 rounded-xl bg-white/70 border border-border px-5 py-4">
          <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            Qit Concierge ne remplace pas un conseil juridique ou fiscal, mais vous aide à structurer les bonnes démarches et à identifier les sujets à vérifier.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Compliance;
