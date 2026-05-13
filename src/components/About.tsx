import { Users } from "lucide-react";

const About = () => {
  return (
    <section className="py-14 md:py-20 bg-white border-t border-border">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="rounded-2xl border border-border bg-qit-beige/40 p-6 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-qit-coral/10 text-qit-coral">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-xs uppercase tracking-widest text-qit-coral font-semibold">
              Notre approche
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-qit-purple mb-5 leading-tight">
            Une conciergerie locale, créée en 2023, avec un suivi vraiment personnalisé
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Qit Concierge est une conciergerie à taille humaine. Depuis 2023,
            nous accompagnons des propriétaires dans la gestion de leurs
            logements courte durée. Aujourd'hui, 5 biens sont suivis avec une
            approche volontairement sélective : meilleure disponibilité,
            meilleure qualité de suivi et accompagnement plus précis pour
            chaque propriétaire.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
