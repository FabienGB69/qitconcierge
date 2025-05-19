
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonialsData = [
  {
    id: 1,
    name: "Marie Dupont",
    role: "Propriétaire",
    testimonial: "J'utilise ConciergeElite depuis plus d'un an et mes revenus locatifs ont augmenté de 30%. Le service est impeccable et mes invités sont toujours satisfaits.",
    avatar: "MD"
  },
  {
    id: 2,
    name: "Thomas Laurent",
    role: "Propriétaire",
    testimonial: "Leur service de conciergerie est exceptionnel. Je n'ai plus à me soucier de la gestion quotidienne de mon appartement et les commentaires des voyageurs sont excellents.",
    avatar: "TL"
  },
  {
    id: 3,
    name: "Sophie Martin",
    role: "Investisseur immobilier",
    testimonial: "Je gère plusieurs propriétés avec ConciergeElite. Leur professionnalisme et leur attention aux détails ont transformé l'expérience de mes locataires.",
    avatar: "SM"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que nos clients disent</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les témoignages de propriétaires qui nous font confiance pour la gestion de leurs biens.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/20">
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                    </svg>
                  </div>
                  
                  <blockquote className="mb-4 text-base">
                    "{testimonial.testimonial}"
                  </blockquote>
                  
                  <footer>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </footer>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
