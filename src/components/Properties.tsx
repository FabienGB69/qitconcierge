import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Users, Bed } from "lucide-react";
import { useActiveProperties, type Property } from "@/hooks/useProperties";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Translation {
  title: string;
  description: string | null;
}

const useTranslatedProperty = (property: Property, language: "fr" | "en") => {
  return useQuery({
    queryKey: ["property-translation", property.id, language],
    enabled: language !== "fr",
    staleTime: Infinity,
    queryFn: async (): Promise<Translation> => {
      const { data, error } = await supabase.functions.invoke("translate-property", {
        body: { propertyId: property.id, targetLanguage: language },
      });
      if (error) throw error;
      return data as Translation;
    },
  });
};

const PropertyCard = ({ property }: { property: Property }) => {
  const { language, t } = useLanguage();
  const { data: translation, isLoading } = useTranslatedProperty(property, language);

  const title = language === "fr" ? property.title : translation?.title ?? property.title;
  const description =
    language === "fr"
      ? property.description
      : translation?.description ?? property.description;

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img
          src={
            property.image_url ||
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          }
          alt={title}
          className="w-full h-64 object-cover"
        />
      </div>

      <CardContent className="pt-6 flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="mr-1 h-4 w-4" />
          <span>{property.location}</span>
        </div>

        <h3 className={`text-xl font-semibold mb-4 ${language !== "fr" && isLoading ? "opacity-60" : ""}`}>
          {title}
        </h3>

        {description && (
          <p className={`text-sm text-muted-foreground mb-4 line-clamp-2 ${language !== "fr" && isLoading ? "opacity-60" : ""}`}>
            {description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4 text-primary" />
            <span>
              {property.guests} {t("properties.guests")}
            </span>
          </div>
          <div className="flex items-center">
            <Bed className="mr-1 h-4 w-4 text-primary" />
            <span>
              {property.bedrooms} {t("properties.bedrooms")}
            </span>
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
            <Button variant="outline" size="sm">
              {property.other_platform_name || t("properties.book")}
            </Button>
          </a>
        )}
        {!property.airbnb_url && !property.booking_url && !property.other_platform_url && (
          <Button variant="outline" size="sm" className="w-full">
            {t("properties.contact")}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const Properties = () => {
  const { data: properties, isLoading } = useActiveProperties();
  const { t } = useLanguage();

  if (isLoading) {
    return (
      <section id="properties" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">{t("properties.loading")}</div>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <section id="properties" className="py-14 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">{t("properties.heading")}</h2>
          <p className="text-base md:text-lg text-muted-foreground">{t("properties.subheading")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
