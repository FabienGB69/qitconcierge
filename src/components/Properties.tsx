import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Users, Bed } from "lucide-react";
import { useActiveProperties } from "@/hooks/useProperties";

const Properties = () => {
  const { data: properties, isLoading } = useActiveProperties();

  if (isLoading) {
    return (
      <section id="properties" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">Chargement des propriétés...</div>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return null;
  }

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
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative">
                <img 
                  src={property.image_url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"} 
                  alt={property.title} 
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <CardContent className="pt-6 flex-grow">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin className="mr-1 h-4 w-4" />
                  <span>{property.location}</span>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">{property.title}</h3>
                
                {property.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {property.description}
                  </p>
                )}
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Users className="mr-1 h-4 w-4 text-primary" />
                    <span>{property.guests} pers.</span>
                  </div>
                  <div className="flex items-center">
                    <Bed className="mr-1 h-4 w-4 text-primary" />
                    <span>{property.bedrooms} ch.</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0 flex gap-2 flex-wrap">
                {property.airbnb_url && (
                  <a href={property.airbnb_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">Airbnb</Button>
                  </a>
                )}
                {property.booking_url && (
                  <a href={property.booking_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">Booking</Button>
                  </a>
                )}
                {property.other_platform_url && (
                  <a href={property.other_platform_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">{property.other_platform_name || "Réserver"}</Button>
                  </a>
                )}
                {!property.airbnb_url && !property.booking_url && !property.other_platform_url && (
                  <Button variant="outline" size="sm" className="w-full">Nous contacter</Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
