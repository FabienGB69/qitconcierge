
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [guests, setGuests] = useState("2");
  
  return (
    <div className="relative h-[90vh] min-h-[600px] w-full bg-cover bg-center" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')" }}>
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="relative container mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
        <div className="max-w-3xl animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Votre conciergerie de location premium
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Maximisez vos revenus locatifs et offrez une expérience exceptionnelle à vos invités grâce à nos services de conciergerie haut de gamme.
          </p>
          
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  Destination
                </label>
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Paris, Nice, Lyon..."
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  Dates
                </label>
                <div className="w-full p-2 border border-gray-200 rounded-md text-gray-500">
                  Sélectionner des dates
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  Voyageurs
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1">1 voyageur</option>
                  <option value="2">2 voyageurs</option>
                  <option value="3">3 voyageurs</option>
                  <option value="4">4 voyageurs</option>
                  <option value="5+">5+ voyageurs</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <Button className="w-full md:w-auto">
                Rechercher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
