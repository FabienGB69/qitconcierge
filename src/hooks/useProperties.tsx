import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Property {
  id: string;
  title: string;
  description: string | null;
  location: string;
  image_url: string | null;
  airbnb_url: string | null;
  booking_url: string | null;
  other_platform_url: string | null;
  other_platform_name: string | null;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  is_active: boolean;
  airbnb_id: string | null;
  airbnb_rating: number | null;
  airbnb_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PropertyInsert = Partial<Pick<Property, "airbnb_id" | "airbnb_rating" | "airbnb_synced_at">> &
  Omit<Property, "id" | "created_at" | "updated_at" | "airbnb_id" | "airbnb_rating" | "airbnb_synced_at">;
export type PropertyUpdate = Partial<PropertyInsert> & { id: string };

export const useProperties = () => {
  return useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useActiveProperties = () => {
  return useQuery({
    queryKey: ["properties", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Property[];
    },
  });
};

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (property: PropertyInsert) => {
      const { data, error } = await supabase
        .from("properties")
        .insert(property)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "Propriété ajoutée",
        description: "La propriété a été ajoutée avec succès.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProperty = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: PropertyUpdate) => {
      const { data, error } = await supabase
        .from("properties")
        .update(updates)
        .eq("id", id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "Propriété mise à jour",
        description: "Les modifications ont été enregistrées.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProperty = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("properties")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "Propriété supprimée",
        description: "La propriété a été supprimée.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
