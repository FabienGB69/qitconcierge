
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Users, Bed } from "lucide-react";

const propertiesData = [
  {
    id: 1,
    title: "Appartement luxueux au cœur de Paris",
    location: "Paris, France",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    capacity: "4 personnes",
    bedrooms: "2 chambres",
    price: "180€/nuit",
    tag: "Populaire"
  },
  {
    id: 2,
    title: "Villa moderne avec vue sur mer",
    location: "Nice, France",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    capacity: "8 personnes",
    bedrooms: "4 chambres",
    price: "350€/nuit",
    tag: "Luxe"
  },
  {
    id: 3,
    title: "Chalet confortable dans les Alpes",
    location: "Chamonix, France",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    capacity: "6 personnes",
    bedrooms: "3 chambres",
    price: "220€/nuit",
    tag: "Nouveau"
  }
];

const Properties = () => {
  return (
    <section id="properties" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Propriétés Sélectionnées</h2>
          <p className="text-lg text-muted-foreground">
            Découvrez notre sélection de propriétés exceptionnelles que nous gérons avec le plus grand soin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertiesData.map((property) => (
            <Card key={property.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-64 object-cover"
                />
                {property.tag && (
                  <Badge className="absolute top-4 right-4 bg-primary">{property.tag}</Badge>
                )}
              </div>
              
              <CardContent className="pt-6 flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{property.title}</h3>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-primary" />
                    <span>{property.capacity}</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="mr-1 h-4 w-4 text-primary" />
                    <span>{property.bedrooms}</span>
                  </div>
                  <div className="font-medium">{property.price}</div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full mt-4">Voir les détails</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">Voir toutes nos propriétés</Button>
        </div>
      </div>
    </section>
  );
};

export default Properties;
