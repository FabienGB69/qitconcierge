
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Key, Calendar, Users, Hotel, Luggage } from "lucide-react";

const servicesData = [
  {
    icon: <Key className="h-12 w-12 text-qit-purple mb-4" />,
    title: "Gestion des arrivées et départs",
    description: "Accueil personnalisé, remise des clés et état des lieux complets pour chaque séjour."
  },
  {
    icon: <Hotel className="h-12 w-12 text-qit-purple mb-4" />,
    title: "Ménage professionnel",
    description: "Service de nettoyage complet entre chaque location avec des standards hôteliers."
  },
  {
    icon: <Calendar className="h-12 w-12 text-qit-purple mb-4" />,
    title: "Gestion des réservations",
    description: "Optimisation de votre calendrier et de vos tarifs sur toutes les plateformes."
  },
  {
    icon: <Users className="h-12 w-12 text-qit-purple mb-4" />,
    title: "Service client 24/7",
    description: "Assistance permanente pour vos locataires pendant toute la durée de leur séjour."
  },
  {
    icon: <Luggage className="h-12 w-12 text-qit-purple mb-4" />,
    title: "Maintenance et réparations",
    description: "Intervention rapide et coordination des artisans en cas de problème technique."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nos Services Premium</h2>
          <p className="text-lg text-muted-foreground">
            Une gestion complète et personnalisée pour maximiser vos revenus locatifs et satisfaire vos invités.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service, index) => (
            <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-t-4 border-t-qit-coral">
                <CardHeader className="text-center">
                  <div className="flex justify-center">{service.icon}</div>
                  <CardTitle className="text-qit-purple">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
