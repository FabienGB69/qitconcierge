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
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { toast } from "@/components/ui/sonner";
import { Phone, Mail, ArrowLeft, ArrowRight, Check, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent } from "@/lib/analytics";

/* -------------------------------------------------------------------------- */
/*  Schemas — one per step + a final composed schema                          */
/* -------------------------------------------------------------------------- */

const stepSchemas = [
  // Step 1 — Logement
  z.object({
    city: z.string().trim().min(2, "Ville requise").max(100),
    propertyType: z.string().min(1, "Type requis"),
    surface: z.string().trim().max(20).optional().or(z.literal("")),
    beds: z.string().trim().max(20).optional().or(z.literal("")),
  }),
  // Step 2 — Situation actuelle
  z.object({
    online: z.enum(["oui", "non"], { required_error: "Veuillez répondre" }),
    platform: z.string().min(1, "Plateforme requise"),
    listingUrl: z
      .string()
      .trim()
      .max(500)
      .optional()
      .or(z.literal(""))
      .refine(
        (v) => !v || /^https?:\/\//i.test(v),
        "Lien invalide (commence par http:// ou https://)"
      ),
  }),
  // Step 3 — Objectif
  z.object({
    goal: z.string().min(1, "Objectif requis"),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
  }),
  // Step 4 — Coordonnées
  z.object({
    fullName: z.string().trim().min(2, "Nom requis").max(100),
    phone: z.string().trim().min(6, "Téléphone requis").max(30),
    email: z.string().trim().email("Email invalide").max(255),
  }),
] as const;

const fullSchema = stepSchemas[0]
  .merge(stepSchemas[1])
  .merge(stepSchemas[2])
  .merge(stepSchemas[3]);

type FormState = z.infer<typeof fullSchema>;

const initialState: FormState = {
  city: "",
  propertyType: "",
  surface: "",
  beds: "",
  online: "" as unknown as "oui",
  platform: "",
  listingUrl: "",
  goal: "",
  message: "",
  fullName: "",
  phone: "",
  email: "",
};

const STEPS = [
  { key: "logement", label: "Logement" },
  { key: "situation", label: "Situation" },
  { key: "objectif", label: "Objectif" },
  { key: "contact", label: "Vous" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const ContactCTA = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  // Track first interaction (form_started) and each step view.
  useEffect(() => {
    trackEvent("estimation_step_view", {
      step_index: step + 1,
      step_name: STEPS[step].key,
    });
  }, [step]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const progress = useMemo(
    () => Math.round(((step + (done ? 1 : 0)) / STEPS.length) * 100),
    [step, done]
  );

  const validateCurrentStep = () => {
    const schema = stepSchemas[step] as z.ZodObject<z.ZodRawShape>;
    const fields = Object.keys(schema.shape) as (keyof FormState)[];
    const subset = Object.fromEntries(
      fields.map((k) => [k, form[k]])
    ) as Partial<FormState>;
    const parsed = schema.safeParse(subset);
    if (!parsed.success) {
      const newErrors: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const path = iss.path[0] as keyof FormState | undefined;
        if (path) newErrors[path] = iss.message;
      });
      setErrors(newErrors);
      toast.error(parsed.error.issues[0]?.message ?? "Veuillez compléter cette étape");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateCurrentStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const buildRecap = (d: FormState) => [
    `Bonjour Qit Concierge,`,
    `Je souhaite une estimation pour mon logement.`,
    ``,
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
    `Message : ${d.message || "—"}`,
  ].join("\n");

  const validateAll = () => {
    if (!validateCurrentStep()) return null;
    const parsed = fullSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Formulaire invalide");
      return null;
    }
    return parsed.data;
  };

  const persistRequest = async (d: FormState, source: "email" | "whatsapp") => {
    try {
      const { error } = await supabase.from("estimation_requests").insert({
        name: d.fullName,
        email: d.email,
        phone: d.phone,
        city: d.city,
        property_type: d.propertyType,
        surface: d.surface || null,
        beds: d.beds || null,
        online_status: d.online,
        platform: d.platform,
        listing_url: d.listingUrl || null,
        goal: d.goal,
        message: d.message || null,
        source,
      });
      if (error) console.error("estimation_requests insert error", error);
    } catch (err) {
      console.error("estimation_requests insert exception", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const d = validateAll();
    if (!d) return;

    setSubmitting(true);
    await persistRequest(d, "email");
    const subject = encodeURIComponent(
      `Demande d'estimation — ${d.fullName} (${d.city})`
    );
    const body = encodeURIComponent(buildRecap(d));
    window.location.href = `mailto:guest.qitconcierge@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Merci ! Votre demande a été enregistrée et votre client mail s'ouvre.");
    setDone(true);
    setSubmitting(false);
  };

  const handleWhatsApp = async () => {
    const d = validateAll();
    if (!d) return;
    setSubmitting(true);
    await persistRequest(d, "whatsapp");
    const text = encodeURIComponent(buildRecap(d));
    // wa.me requires the number in international format, no +, no spaces.
    const url = `https://wa.me/330601777633?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Votre demande a été enregistrée. WhatsApp est prêt à envoyer.");
    setDone(true);
    setSubmitting(false);
  };

  const restart = () => {
    setForm(initialState);
    setErrors({});
    setStep(0);
    setDone(false);
  };

  /* ----- field error helper ----- */
  const fieldErr = (key: keyof FormState) =>
    errors[key] ? (
      <p className="text-xs text-destructive mt-1">{errors[key]}</p>
    ) : null;

  /* ----- step renderers ----- */
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="mb-1.5 block">Ville du logement *</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  maxLength={100}
                  placeholder="Tain-l'Hermitage, Valence..."
                  aria-invalid={!!errors.city}
                />
                {fieldErr("city")}
              </div>
              <div>
                <Label htmlFor="propertyType" className="mb-1.5 block">Type de logement *</Label>
                <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                  <SelectTrigger id="propertyType" aria-invalid={!!errors.propertyType}>
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
                {fieldErr("propertyType")}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="surface" className="mb-1.5 block">Surface approx. (m²)</Label>
                <Input
                  id="surface"
                  inputMode="numeric"
                  value={form.surface}
                  onChange={(e) => update("surface", e.target.value)}
                  maxLength={20}
                />
              </div>
              <div>
                <Label htmlFor="beds" className="mb-1.5 block">Nombre de couchages</Label>
                <Input
                  id="beds"
                  inputMode="numeric"
                  value={form.beds}
                  onChange={(e) => update("beds", e.target.value)}
                  maxLength={20}
                />
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">Le logement est-il déjà en ligne ? *</Label>
              <RadioGroup
                value={form.online}
                onValueChange={(v) => update("online", v as "oui" | "non")}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="online-oui" />
                  <Label htmlFor="online-oui" className="font-normal">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="online-non" />
                  <Label htmlFor="online-non" className="font-normal">Non</Label>
                </div>
              </RadioGroup>
              {fieldErr("online")}
            </div>
            <div>
              <Label htmlFor="platform" className="mb-1.5 block">Plateforme actuelle *</Label>
              <Select value={form.platform} onValueChange={(v) => update("platform", v)}>
                <SelectTrigger id="platform" aria-invalid={!!errors.platform}>
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
              {fieldErr("platform")}
            </div>
            <div>
              <Label htmlFor="listingUrl" className="mb-1.5 block">Lien de l'annonce (si dispo)</Label>
              <Input
                id="listingUrl"
                type="url"
                value={form.listingUrl}
                onChange={(e) => update("listingUrl", e.target.value)}
                maxLength={500}
                placeholder="https://..."
                aria-invalid={!!errors.listingUrl}
              />
              {fieldErr("listingUrl")}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div>
              <Label htmlFor="goal" className="mb-1.5 block">Objectif principal *</Label>
              <Select value={form.goal} onValueChange={(v) => update("goal", v)}>
                <SelectTrigger id="goal" aria-invalid={!!errors.goal}>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="louer-plus-souvent">Louer plus souvent</SelectItem>
                  <SelectItem value="augmenter-revenus">Augmenter les revenus</SelectItem>
                  <SelectItem value="deleguer">Déléguer la gestion</SelectItem>
                  <SelectItem value="lancer">Lancer le logement</SelectItem>
                </SelectContent>
              </Select>
              {fieldErr("goal")}
            </div>
            <div>
              <Label htmlFor="message" className="mb-1.5 block">Message complémentaire</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                maxLength={1000}
                rows={4}
                placeholder="Précisions sur votre projet, contraintes, calendrier..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                {(form.message ?? "").length}/1000
              </p>
            </div>
          </div>
        );

      case 3:
      default:
        return (
          <div className="space-y-5">
            <div>
              <Label htmlFor="fullName" className="mb-1.5 block">Nom et prénom *</Label>
              <Input
                id="fullName"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                maxLength={100}
                aria-invalid={!!errors.fullName}
              />
              {fieldErr("fullName")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="mb-1.5 block">Téléphone / WhatsApp *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  maxLength={30}
                  placeholder="+33 6 ..."
                  aria-invalid={!!errors.phone}
                />
                {fieldErr("phone")}
              </div>
              <div>
                <Label htmlFor="email" className="mb-1.5 block">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  maxLength={255}
                  aria-invalid={!!errors.email}
                />
                {fieldErr("email")}
              </div>
            </div>

            {/* Récap */}
            <div className="rounded-xl border border-border bg-qit-beige/40 p-4 text-sm text-foreground/80 space-y-1">
              <p className="font-semibold text-qit-purple">Récapitulatif</p>
              <p>{form.propertyType || "—"} à {form.city || "—"} · {form.surface || "?"} m² · {form.beds || "?"} couchages</p>
              <p>En ligne : {form.online || "—"} · Plateforme : {form.platform || "—"}</p>
              <p>Objectif : {form.goal || "—"}</p>
            </div>
          </div>
        );
    }
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
              Réponse sous 24h ouvrées avec une première analyse claire de votre potentiel locatif.
            </p>
            <p className="text-white/70 mb-8 text-sm">
              4 étapes rapides — moins de 2 minutes. Vos informations restent confidentielles.
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
            {done ? (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-qit-coral/10 flex items-center justify-center mb-4">
                  <Check className="h-6 w-6 text-qit-coral" />
                </div>
                <h3 className="text-xl font-bold text-qit-purple mb-2">Demande prête</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Si votre client mail ne s'est pas ouvert, écrivez-nous directement à
                  <br />
                  <span className="font-medium text-qit-purple">guest.qitconcierge@gmail.com</span>
                </p>
                <Button onClick={restart} variant="outline">
                  Faire une nouvelle demande
                </Button>
              </div>
            ) : (
              <>
                {/* Progress bar + steps indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-qit-purple">
                      Étape {step + 1} / {STEPS.length} — {STEPS[step].label}
                    </span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-qit-beige overflow-hidden">
                    <div
                      className="h-full bg-qit-coral transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <ol className="flex justify-between mt-3">
                    {STEPS.map((s, i) => {
                      const reached = i <= step;
                      return (
                        <li
                          key={s.key}
                          className={`flex flex-col items-center text-[10px] sm:text-xs ${
                            reached ? "text-qit-purple" : "text-muted-foreground"
                          }`}
                        >
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-[11px] font-semibold ${
                              i < step
                                ? "bg-qit-coral text-white"
                                : i === step
                                ? "bg-qit-purple text-white"
                                : "bg-qit-beige text-muted-foreground"
                            }`}
                          >
                            {i < step ? <Check className="h-3 w-3" /> : i + 1}
                          </span>
                          {s.label}
                        </li>
                      );
                    })}
                  </ol>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 form-touch" noValidate>
                  {renderStep()}

                  <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                    {step > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={back}
                        className="w-full sm:w-auto"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Retour
                      </Button>
                    )}
                    {step < STEPS.length - 1 ? (
                      <Button
                        type="button"
                        onClick={next}
                        size="lg"
                        className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white h-12 text-base font-semibold shadow-md shadow-qit-coral/30 sm:ml-auto"
                      >
                        Continuer
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2 w-full sm:ml-auto sm:w-auto">
                        <Button
                          type="button"
                          onClick={handleWhatsApp}
                          disabled={submitting}
                          size="lg"
                          className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white h-12 text-base font-semibold shadow-md shadow-qit-coral/30"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Envoyer sur WhatsApp
                        </Button>
                        <Button
                          type="submit"
                          disabled={submitting}
                          variant="outline"
                          size="lg"
                          className="w-full h-11 text-sm"
                        >
                          <Mail className="h-4 w-4" />
                          Envoyer par email
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Réponse sous 24h ouvrées — sans engagement.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
