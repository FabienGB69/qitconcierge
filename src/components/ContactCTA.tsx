import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Phone, Mail } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(2, "Nom requis").max(100),
  phone: z.string().trim().min(6, "Téléphone requis").max(30),
  email: z.string().trim().email("Email invalide").max(255),
  city: z.string().trim().min(2, "Ville requise").max(100),
  propertyType: z.string().min(1, "Type requis"),
  surface: z.string().trim().max(20).optional().or(z.literal("")),
  beds: z.string().trim().max(20).optional().or(z.literal("")),
  online: z.enum(["oui", "non"], { required_error: "Veuillez répondre" }),
  platform: z.string().min(1, "Plateforme requise"),
  goal: z.string().min(1, "Objectif requis"),
  listingUrl: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

const initialState = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  propertyType: "",
  surface: "",
  beds: "",
  online: "" as "" | "oui" | "non",
  platform: "",
  goal: "",
  listingUrl: "",
  message: "",
};

const ContactCTA = () => {
  const [form, setForm] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return;
    }

    setSubmitting(true);
    const d = parsed.data;
    const subject = encodeURIComponent(
      `Demande d'estimation — ${d.fullName} (${d.city})`
    );
    const body = encodeURIComponent(
      [
        `Nom : ${d.fullName}`,
        `Téléphone / WhatsApp : ${d.phone}`,
        `Email : ${d.email}`,
        `Ville : ${d.city}`,
        `Type de logement : ${d.propertyType}`,
        `Surface : ${d.surface || "—"}`,
        `Couchages : ${d.beds || "—"}`,
        `Déjà en ligne : ${d.online}`,
        `Plateforme : ${d.platform}`,
        `Objectif : ${d.goal}`,
        `Lien annonce : ${d.listingUrl || "—"}`,
        ``,
        `Message :`,
        d.message || "—",
      ].join("\n")
    );
    window.location.href = `mailto:guest.qitconcierge@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Merci ! Votre client mail s'ouvre pour finaliser l'envoi.");
    setForm(initialState);
    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-14 md:py-20 bg-qit-purple text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Estimation gratuite de votre logement
            </h2>
            <p className="text-lg text-white/80 mb-4">
              Réponse sous 24h ouvrées avec une première analyse claire de votre
              potentiel locatif.
            </p>
            <p className="text-white/70 mb-8 text-sm">
              Quelques informations sur votre logement suffisent pour évaluer
              vos revenus possibles et la stratégie la plus adaptée.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Téléphone / WhatsApp</p>
                  <p>+33 6 01 77 76 33</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p>guest.qitconcierge@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white text-foreground rounded-lg p-5 md:p-7 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-5 form-touch">
              <div>
                <Label htmlFor="fullName" className="mb-1.5 block">
                  Nom et prénom
                </Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  required
                  maxLength={100}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="mb-1.5 block">
                    Téléphone / WhatsApp
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                    maxLength={30}
                    placeholder="+33 6 ..."
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1.5 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    maxLength={255}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="mb-1.5 block">
                    Ville du logement
                  </Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => update("city", e.target.value)}
                    required
                    maxLength={100}
                  />
                </div>
                <div>
                  <Label htmlFor="propertyType" className="mb-1.5 block">
                    Type de logement
                  </Label>
                  <Select
                    value={form.propertyType}
                    onValueChange={(v) => update("propertyType", v)}
                  >
                    <SelectTrigger id="propertyType">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="appartement">Appartement</SelectItem>
                      <SelectItem value="maison">Maison</SelectItem>
                      <SelectItem value="gite">Gîte</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="surface" className="mb-1.5 block">
                    Surface approximative (m²)
                  </Label>
                  <Input
                    id="surface"
                    type="text"
                    inputMode="numeric"
                    value={form.surface}
                    onChange={(e) => update("surface", e.target.value)}
                    maxLength={20}
                  />
                </div>
                <div>
                  <Label htmlFor="beds" className="mb-1.5 block">
                    Nombre de couchages
                  </Label>
                  <Input
                    id="beds"
                    type="text"
                    inputMode="numeric"
                    value={form.beds}
                    onChange={(e) => update("beds", e.target.value)}
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <Label className="mb-2 block">
                  Le logement est-il déjà en ligne ?
                </Label>
                <RadioGroup
                  value={form.online}
                  onValueChange={(v) => update("online", v as "oui" | "non")}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="oui" id="online-oui" />
                    <Label htmlFor="online-oui" className="font-normal">
                      Oui
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non" id="online-non" />
                    <Label htmlFor="online-non" className="font-normal">
                      Non
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="platform" className="mb-1.5 block">
                  Plateforme actuelle
                </Label>
                <Select
                  value={form.platform}
                  onValueChange={(v) => update("platform", v)}
                >
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airbnb">Airbnb</SelectItem>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="abritel">Abritel</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                    <SelectItem value="pas-encore">Pas encore</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goal" className="mb-1.5 block">
                  Objectif principal
                </Label>
                <Select
                  value={form.goal}
                  onValueChange={(v) => update("goal", v)}
                >
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="louer-plus-souvent">
                      Louer plus souvent
                    </SelectItem>
                    <SelectItem value="augmenter-revenus">
                      Augmenter les revenus
                    </SelectItem>
                    <SelectItem value="deleguer">
                      Déléguer la gestion
                    </SelectItem>
                    <SelectItem value="lancer">Lancer le logement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="listingUrl" className="mb-1.5 block">
                  Lien de l'annonce existante (si disponible)
                </Label>
                <Input
                  id="listingUrl"
                  type="url"
                  value={form.listingUrl}
                  onChange={(e) => update("listingUrl", e.target.value)}
                  maxLength={500}
                  placeholder="https://..."
                />
              </div>

              <div>
                <Label htmlFor="message" className="mb-1.5 block">
                  Message complémentaire
                </Label>
                <Textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  maxLength={1000}
                  rows={4}
                  placeholder="Précisions sur votre projet, contraintes, calendrier..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white h-12 text-base font-semibold shadow-md shadow-qit-coral/30"
              >
                Demander mon estimation gratuite
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Réponse sous 24h ouvrées — sans engagement.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
