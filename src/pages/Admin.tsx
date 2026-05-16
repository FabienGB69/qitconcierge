import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProperties, useCreateProperty, useUpdateProperty, useDeleteProperty, Property, PropertyInsert } from "@/hooks/useProperties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, LogOut, Home, RefreshCw, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EstimationRequestsAdmin from "@/components/admin/EstimationRequestsAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

const PropertyForm = ({ 
  property, 
  onSubmit, 
  onClose 
}: { 
  property?: Property; 
  onSubmit: (data: PropertyInsert) => void; 
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState<PropertyInsert>({
    title: property?.title || "",
    description: property?.description || "",
    location: property?.location || "",
    image_url: property?.image_url || "",
    airbnb_url: property?.airbnb_url || "",
    booking_url: property?.booking_url || "",
    other_platform_url: property?.other_platform_url || "",
    other_platform_name: property?.other_platform_name || "",
    bedrooms: property?.bedrooms || 1,
    bathrooms: property?.bathrooms || 1,
    guests: property?.guests || 2,
    is_active: property?.is_active ?? true,
    airbnb_id: property?.airbnb_id ?? null,
    airbnb_rating: property?.airbnb_rating ?? null,
    airbnb_synced_at: property?.airbnb_synced_at ?? null,
  });
  const [airbnbInput, setAirbnbInput] = useState(property?.airbnb_id || property?.airbnb_url || "");
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    if (!airbnbInput.trim()) {
      toast.error("Colle un lien, un ID ou un embed Airbnb");
      return;
    }
    setSyncing(true);
    try {
      const { data, error } = await supabase.functions.invoke("sync-airbnb-property", {
        body: { input: airbnbInput },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setFormData((prev) => ({
        ...prev,
        airbnb_id: data.airbnb_id ?? prev.airbnb_id,
        airbnb_url: data.airbnb_url ?? prev.airbnb_url,
        airbnb_rating: data.airbnb_rating ?? prev.airbnb_rating,
        airbnb_synced_at: data.airbnb_synced_at ?? prev.airbnb_synced_at,
        title: data.title || prev.title,
        image_url: data.image_url || prev.image_url,
      }));
      toast.success(
        data.title ? `Synchronisé : ${data.title}` : "Identifiant Airbnb enregistré",
      );
    } catch (e: any) {
      toast.error(e.message || "Échec de la synchronisation");
    } finally {
      setSyncing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Titre *</label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          placeholder="Appartement cosy Paris 11"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Localisation *</label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          placeholder="Paris, France"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          value={formData.description || ""}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Bel appartement lumineux..."
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL de l'image</label>
        <Input
          value={formData.image_url || ""}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Chambres</label>
          <Input
            type="number"
            min={0}
            value={formData.bedrooms}
            onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">SdB</label>
          <Input
            type="number"
            min={0}
            value={formData.bathrooms}
            onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Voyageurs</label>
          <Input
            type="number"
            min={1}
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-3">Liens de réservation</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Lien Airbnb</label>
            <Input
              value={formData.airbnb_url || ""}
              onChange={(e) => setFormData({ ...formData, airbnb_url: e.target.value })}
              placeholder="https://airbnb.com/rooms/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Lien Booking.com</label>
            <Input
              value={formData.booking_url || ""}
              onChange={(e) => setFormData({ ...formData, booking_url: e.target.value })}
              placeholder="https://booking.com/hotel/..."
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">Autre plateforme</label>
              <Input
                value={formData.other_platform_name || ""}
                onChange={(e) => setFormData({ ...formData, other_platform_name: e.target.value })}
                placeholder="Vrbo, Abritel..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lien</label>
              <Input
                value={formData.other_platform_url || ""}
                onChange={(e) => setFormData({ ...formData, other_platform_url: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.is_active}
            onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
          />
          <label className="text-sm">Afficher sur le site</label>
        </div>
        <Button type="submit">
          {property ? "Mettre à jour" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};

const Admin = () => {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { data: properties, isLoading: propertiesLoading } = useProperties();
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();
  const deleteProperty = useDeleteProperty();
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | undefined>();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || propertiesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleCreate = (data: PropertyInsert) => {
    createProperty.mutate(data);
  };

  const handleUpdate = (data: PropertyInsert) => {
    if (editingProperty) {
      updateProperty.mutate({ id: editingProperty.id, ...data });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette propriété ?")) {
      deleteProperty.mutate(id);
    }
  };

  const openEditDialog = (property: Property) => {
    setEditingProperty(property);
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingProperty(undefined);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Administration QIT Concierge</h1>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Home className="w-4 h-4 mr-2" />
                Voir le site
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut} className="text-primary-foreground hover:bg-primary-foreground/10">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="properties" className="space-y-6">
          <TabsList>
            <TabsTrigger value="properties">Propriétés</TabsTrigger>
            <TabsTrigger value="requests">Demandes d'estimation</TabsTrigger>
          </TabsList>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Mes propriétés</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter une propriété
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProperty ? "Modifier la propriété" : "Nouvelle propriété"}
                    </DialogTitle>
                  </DialogHeader>
                  <PropertyForm
                    property={editingProperty}
                    onSubmit={editingProperty ? handleUpdate : handleCreate}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>

            {properties?.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground mb-4">Aucune propriété pour le moment</p>
                  <Button onClick={openCreateDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter votre première propriété
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {properties?.map((property) => (
                  <Card key={property.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {property.image_url && (
                          <img
                            src={property.image_url}
                            alt={property.title}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{property.title}</h3>
                              <p className="text-sm text-muted-foreground">{property.location}</p>
                              <p className="text-sm mt-1">
                                {property.guests} voyageurs · {property.bedrooms} chambres · {property.bathrooms} SdB
                              </p>
                              <div className="flex gap-2 mt-2">
                                {property.airbnb_url && (
                                  <a href={property.airbnb_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                    Airbnb
                                  </a>
                                )}
                                {property.booking_url && (
                                  <a href={property.booking_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                    Booking
                                  </a>
                                )}
                                {property.other_platform_url && (
                                  <a href={property.other_platform_url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                                    {property.other_platform_name || "Autre"}
                                  </a>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs px-2 py-1 rounded ${property.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                {property.is_active ? "Actif" : "Masqué"}
                              </span>
                              <Button variant="ghost" size="icon" onClick={() => openEditDialog(property)}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(property.id)}>
                                <Trash2 className="w-4 h-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests">
            <EstimationRequestsAdmin />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
