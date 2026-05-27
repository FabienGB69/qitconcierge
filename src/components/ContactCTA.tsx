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
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";

type FormState = {
  city: string;
  propertyType: string;
  surface: string;
  beds: string;
  online: "oui" | "non" | "";
  platform: string;
  listingUrl: string;
  goal: string;
  message: string;
  fullName: string;
  phone: string;
  email: string;
};

const initialState: FormState = {
  city: "",
  propertyType: "",
  surface: "",
  beds: "",
  online: "",
  platform: "",
  listingUrl: "",
  goal: "",
  message: "",
  fullName: "",
  phone: "",
  email: "",
};

const ContactCTA = () => {
  const { isFR } = useLanguage();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  const L = isFR
    ? {
        stepsLabels: ["Logement", "Situation", "Objectif", "Vous"],
        cityReq: "Ville requise", typeReq: "Type requis", answerReq: "Veuillez répondre",
        platformReq: "Plateforme requise", linkInvalid: "Lien invalide (commence par http:// ou https://)",
        goalReq: "Objectif requis", nameReq: "Nom requis", phoneReq: "Téléphone requis",
        emailInvalid: "Email invalide", completeStep: "Veuillez compléter cette étape",
        formInvalid: "Formulaire invalide",
        heading: "Estimation gratuite de votre logement",
        lead: "Réponse sous 24h ouvrées avec une première analyse claire de votre potentiel locatif.",
        sub: "4 étapes rapides — moins de 2 minutes. Vos informations restent confidentielles.",
        phoneLbl: "Téléphone / WhatsApp", emailLbl: "Email",
        doneTitle: "Demande prête",
        doneSub: "Si votre client mail ne s'est pas ouvert, écrivez-nous directement à",
        newRequest: "Faire une nouvelle demande",
        stepN: (i: number, n: number, name: string) => `Étape ${i} / ${n} — ${name}`,
        back: "Retour", continue: "Continuer",
        sendWa: "Envoyer sur WhatsApp", sendEmail: "Envoyer par email",
        replyNote: "Réponse sous 24h ouvrées — sans engagement.",
        savedEmail: "Merci ! Votre demande a été enregistrée et votre client mail s'ouvre.",
        savedWa: "Votre demande a été enregistrée. WhatsApp est prêt à envoyer.",
        // step1
        cityLbl: "Ville du logement *", cityPh: "Tain-l'Hermitage, Valence...",
        typeLbl: "Type de logement *", select: "Sélectionner",
        types: { appartement: "Appartement", maison: "Maison", gite: "Maison de campagne", studio: "Studio", autre: "Autre" },
        surfaceLbl: "Surface approx. (m²)", bedsLbl: "Nombre de couchages",
        // step2
        onlineLbl: "Le logement est-il déjà en ligne ? *", yes: "Oui", no: "Non",
        platformLbl: "Plateforme actuelle *",
        platforms: { airbnb: "Airbnb", booking: "Booking", abritel: "Abritel", autre: "Autre", "pas-encore": "Pas encore" },
        listingLbl: "Lien de l'annonce (si dispo)",
        // step3
        goalLbl: "Objectif principal *",
        goals: { "louer-plus-souvent": "Louer plus souvent", "augmenter-revenus": "Augmenter les revenus", "deleguer": "Déléguer la gestion", "lancer": "Lancer le logement" },
        msgLbl: "Message complémentaire",
        msgPh: "Précisions sur votre projet, contraintes, calendrier...",
        // step4
        nameLbl: "Nom et prénom *",
        recap: "Récapitulatif", at: "à", peopleSleep: "couchages", platformWord: "Plateforme", onlineWord: "En ligne", goalWord: "Objectif",
        subjectFn: (name: string, city: string) => `Demande d'estimation — ${name} (${city})`,
        recapBuild: (d: FormState) => [
          `Bonjour Qit Concierge,`, `Je souhaite une estimation pour mon logement.`, ``,
          `Nom : ${d.fullName}`, `Téléphone / WhatsApp : ${d.phone}`, `Email : ${d.email}`,
          `Ville : ${d.city}`, `Type de logement : ${d.propertyType}`,
          `Surface : ${d.surface || "—"}`, `Couchages : ${d.beds || "—"}`,
          `Déjà en ligne : ${d.online}`, `Plateforme : ${d.platform}`, `Objectif : ${d.goal}`,
          `Lien annonce : ${d.listingUrl || "—"}`, ``, `Message : ${d.message || "—"}`,
        ].join("\n"),
      }
    : {
        stepsLabels: ["Property", "Status", "Goal", "You"],
        cityReq: "City required", typeReq: "Type required", answerReq: "Please answer",
        platformReq: "Platform required", linkInvalid: "Invalid link (must start with http:// or https://)",
        goalReq: "Goal required", nameReq: "Name required", phoneReq: "Phone required",
        emailInvalid: "Invalid email", completeStep: "Please complete this step",
        formInvalid: "Invalid form",
        heading: "Free estimate for your property",
        lead: "Reply within 24 business hours with an initial clear analysis of your rental potential.",
        sub: "4 quick steps — under 2 minutes. Your information stays confidential.",
        phoneLbl: "Phone / WhatsApp", emailLbl: "Email",
        doneTitle: "Request ready",
        doneSub: "If your email client didn't open, write to us directly at",
        newRequest: "Make a new request",
        stepN: (i: number, n: number, name: string) => `Step ${i} / ${n} — ${name}`,
        back: "Back", continue: "Continue",
        sendWa: "Send via WhatsApp", sendEmail: "Send via email",
        replyNote: "Reply within 24 business hours — no commitment.",
        savedEmail: "Thanks! Your request has been saved and your email client is opening.",
        savedWa: "Your request has been saved. WhatsApp is ready to send.",
        cityLbl: "Property city *", cityPh: "Tain-l'Hermitage, Valence...",
        typeLbl: "Property type *", select: "Select",
        types: { appartement: "Apartment", maison: "House", gite: "Maison de campagne", studio: "Studio", autre: "Other" },
        surfaceLbl: "Approx. surface (m²)", bedsLbl: "Number of beds",
        onlineLbl: "Is the property already listed? *", yes: "Yes", no: "No",
        platformLbl: "Current platform *",
        platforms: { airbnb: "Airbnb", booking: "Booking", abritel: "Abritel", autre: "Other", "pas-encore": "Not yet" },
        listingLbl: "Listing URL (if available)",
        goalLbl: "Main goal *",
        goals: { "louer-plus-souvent": "Rent more often", "augmenter-revenus": "Increase revenue", "deleguer": "Delegate management", "lancer": "Launch the property" },
        msgLbl: "Additional message",
        msgPh: "Details about your project, constraints, timeline...",
        nameLbl: "Full name *",
        recap: "Summary", at: "in", peopleSleep: "beds", platformWord: "Platform", onlineWord: "Listed", goalWord: "Goal",
        subjectFn: (name: string, city: string) => `Estimate request — ${name} (${city})`,
        recapBuild: (d: FormState) => [
          `Hello Qit Concierge,`, `I'd like an estimate for my property.`, ``,
          `Name: ${d.fullName}`, `Phone / WhatsApp: ${d.phone}`, `Email: ${d.email}`,
          `City: ${d.city}`, `Property type: ${d.propertyType}`,
          `Surface: ${d.surface || "—"}`, `Beds: ${d.beds || "—"}`,
          `Already listed: ${d.online}`, `Platform: ${d.platform}`, `Goal: ${d.goal}`,
          `Listing URL: ${d.listingUrl || "—"}`, ``, `Message: ${d.message || "—"}`,
        ].join("\n"),
      };

  const stepSchemas = [
    z.object({
      city: z.string().trim().min(2, L.cityReq).max(100),
      propertyType: z.string().min(1, L.typeReq),
      surface: z.string().trim().max(20).optional().or(z.literal("")),
      beds: z.string().trim().max(20).optional().or(z.literal("")),
    }),
    z.object({
      online: z.enum(["oui", "non"], { required_error: L.answerReq }),
      platform: z.string().min(1, L.platformReq),
      listingUrl: z.string().trim().max(500).optional().or(z.literal(""))
        .refine((v) => !v || /^https?:\/\//i.test(v), L.linkInvalid),
    }),
    z.object({
      goal: z.string().min(1, L.goalReq),
      message: z.string().trim().max(1000).optional().or(z.literal("")),
    }),
    z.object({
      fullName: z.string().trim().min(2, L.nameReq).max(100),
      phone: z.string().trim().min(6, L.phoneReq).max(30),
      email: z.string().trim().email(L.emailInvalid).max(255),
    }),
  ];

  const fullSchema = stepSchemas[0].merge(stepSchemas[1] as never).merge(stepSchemas[2] as never).merge(stepSchemas[3] as never);

  const STEPS = [
    { key: "logement", label: L.stepsLabels[0] },
    { key: "situation", label: L.stepsLabels[1] },
    { key: "objectif", label: L.stepsLabels[2] },
    { key: "contact", label: L.stepsLabels[3] },
  ];

  useEffect(() => {
    trackEvent("estimation_step_view", { step_index: step + 1, step_name: STEPS[step].key });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (!started) {
      setStarted(true);
      trackEvent("estimation_started");
    }
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const progress = useMemo(
    () => Math.round(((step + (done ? 1 : 0)) / STEPS.length) * 100),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, done]
  );

  const validateCurrentStep = () => {
    const schema = stepSchemas[step] as z.ZodObject<z.ZodRawShape>;
    const fields = Object.keys(schema.shape) as (keyof FormState)[];
    const subset = Object.fromEntries(fields.map((k) => [k, form[k]])) as Partial<FormState>;
    const parsed = schema.safeParse(subset);
    if (!parsed.success) {
      const newErrors: Partial<Record<keyof FormState, string>> = {};
      parsed.error.issues.forEach((iss) => {
        const path = iss.path[0] as keyof FormState | undefined;
        if (path) newErrors[path] = iss.message;
      });
      setErrors(newErrors);
      trackEvent("estimation_step_error", {
        step_index: step + 1, step_name: STEPS[step].key,
        first_error: parsed.error.issues[0]?.path[0]?.toString() ?? "unknown",
      });
      toast.error(parsed.error.issues[0]?.message ?? L.completeStep);
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateCurrentStep()) return;
    trackEvent("estimation_step_completed", { step_index: step + 1, step_name: STEPS[step].key });
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const validateAll = () => {
    if (!validateCurrentStep()) return null;
    const parsed = fullSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? L.formInvalid);
      return null;
    }
    return parsed.data as FormState;
  };

  const persistRequest = async (d: FormState, source: "email" | "whatsapp") => {
    try {
      const { error } = await supabase.from("estimation_requests").insert({
        name: d.fullName, email: d.email, phone: d.phone, city: d.city,
        property_type: d.propertyType, surface: d.surface || null, beds: d.beds || null,
        online_status: d.online, platform: d.platform, listing_url: d.listingUrl || null,
        goal: d.goal, message: d.message || null, source,
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
    trackEvent("estimation_submit", { method: "email", city: d.city, property_type: d.propertyType, goal: d.goal, online_status: d.online });
    const subject = encodeURIComponent(L.subjectFn(d.fullName, d.city));
    const body = encodeURIComponent(L.recapBuild(d));
    window.location.href = `mailto:guest.qitconcierge@gmail.com?subject=${subject}&body=${body}`;
    toast.success(L.savedEmail);
    setDone(true);
    setSubmitting(false);
  };

  const handleWhatsApp = async () => {
    const d = validateAll();
    if (!d) return;
    trackEvent("estimation_whatsapp_click", { city: d.city, property_type: d.propertyType, goal: d.goal, online_status: d.online });
    setSubmitting(true);
    await persistRequest(d, "whatsapp");
    trackEvent("estimation_submit", { method: "whatsapp", city: d.city, property_type: d.propertyType, goal: d.goal, online_status: d.online });
    const text = encodeURIComponent(L.recapBuild(d));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success(L.savedWa);
    setDone(true);
    setSubmitting(false);
  };

  const restart = () => {
    setForm(initialState);
    setErrors({});
    setStep(0);
    setDone(false);
    setStarted(false);
    trackEvent("estimation_restart");
  };

  const fieldErr = (key: keyof FormState) =>
    errors[key] ? <p className="text-xs text-destructive mt-1">{errors[key]}</p> : null;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city" className="mb-1.5 block">{L.cityLbl}</Label>
                <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} maxLength={100} placeholder={L.cityPh} aria-invalid={!!errors.city} />
                {fieldErr("city")}
              </div>
              <div>
                <Label htmlFor="propertyType" className="mb-1.5 block">{L.typeLbl}</Label>
                <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                  <SelectTrigger id="propertyType" aria-invalid={!!errors.propertyType}>
                    <SelectValue placeholder={L.select} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appartement">{L.types.appartement}</SelectItem>
                    <SelectItem value="maison">{L.types.maison}</SelectItem>
                    <SelectItem value="gite">{L.types.gite}</SelectItem>
                    <SelectItem value="studio">{L.types.studio}</SelectItem>
                    <SelectItem value="autre">{L.types.autre}</SelectItem>
                  </SelectContent>
                </Select>
                {fieldErr("propertyType")}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="surface" className="mb-1.5 block">{L.surfaceLbl}</Label>
                <Input id="surface" inputMode="numeric" value={form.surface} onChange={(e) => update("surface", e.target.value)} maxLength={20} />
              </div>
              <div>
                <Label htmlFor="beds" className="mb-1.5 block">{L.bedsLbl}</Label>
                <Input id="beds" inputMode="numeric" value={form.beds} onChange={(e) => update("beds", e.target.value)} maxLength={20} />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-5">
            <div>
              <Label className="mb-2 block">{L.onlineLbl}</Label>
              <RadioGroup value={form.online} onValueChange={(v) => update("online", v as "oui" | "non")} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="online-oui" />
                  <Label htmlFor="online-oui" className="font-normal">{L.yes}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="online-non" />
                  <Label htmlFor="online-non" className="font-normal">{L.no}</Label>
                </div>
              </RadioGroup>
              {fieldErr("online")}
            </div>
            <div>
              <Label htmlFor="platform" className="mb-1.5 block">{L.platformLbl}</Label>
              <Select value={form.platform} onValueChange={(v) => update("platform", v)}>
                <SelectTrigger id="platform" aria-invalid={!!errors.platform}>
                  <SelectValue placeholder={L.select} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="airbnb">{L.platforms.airbnb}</SelectItem>
                  <SelectItem value="booking">{L.platforms.booking}</SelectItem>
                  <SelectItem value="abritel">{L.platforms.abritel}</SelectItem>
                  <SelectItem value="autre">{L.platforms.autre}</SelectItem>
                  <SelectItem value="pas-encore">{L.platforms["pas-encore"]}</SelectItem>
                </SelectContent>
              </Select>
              {fieldErr("platform")}
            </div>
            <div>
              <Label htmlFor="listingUrl" className="mb-1.5 block">{L.listingLbl}</Label>
              <Input id="listingUrl" type="url" value={form.listingUrl} onChange={(e) => update("listingUrl", e.target.value)} maxLength={500} placeholder="https://..." aria-invalid={!!errors.listingUrl} />
              {fieldErr("listingUrl")}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-5">
            <div>
              <Label htmlFor="goal" className="mb-1.5 block">{L.goalLbl}</Label>
              <Select value={form.goal} onValueChange={(v) => update("goal", v)}>
                <SelectTrigger id="goal" aria-invalid={!!errors.goal}>
                  <SelectValue placeholder={L.select} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="louer-plus-souvent">{L.goals["louer-plus-souvent"]}</SelectItem>
                  <SelectItem value="augmenter-revenus">{L.goals["augmenter-revenus"]}</SelectItem>
                  <SelectItem value="deleguer">{L.goals.deleguer}</SelectItem>
                  <SelectItem value="lancer">{L.goals.lancer}</SelectItem>
                </SelectContent>
              </Select>
              {fieldErr("goal")}
            </div>
            <div>
              <Label htmlFor="message" className="mb-1.5 block">{L.msgLbl}</Label>
              <Textarea id="message" value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} rows={4} placeholder={L.msgPh} />
              <p className="text-xs text-muted-foreground mt-1">{(form.message ?? "").length}/1000</p>
            </div>
          </div>
        );
      case 3:
      default:
        return (
          <div className="space-y-5">
            <div>
              <Label htmlFor="fullName" className="mb-1.5 block">{L.nameLbl}</Label>
              <Input id="fullName" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} maxLength={100} aria-invalid={!!errors.fullName} />
              {fieldErr("fullName")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="mb-1.5 block">{L.phoneLbl} *</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={30} placeholder="+33 6 ..." aria-invalid={!!errors.phone} />
                {fieldErr("phone")}
              </div>
              <div>
                <Label htmlFor="email" className="mb-1.5 block">{L.emailLbl} *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} aria-invalid={!!errors.email} />
                {fieldErr("email")}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-qit-beige/40 p-4 text-sm text-foreground/80 space-y-1">
              <p className="font-semibold text-qit-purple">{L.recap}</p>
              <p>{form.propertyType || "—"} {L.at} {form.city || "—"} · {form.surface || "?"} m² · {form.beds || "?"} {L.peopleSleep}</p>
              <p>{L.onlineWord} : {form.online || "—"} · {L.platformWord} : {form.platform || "—"}</p>
              <p>{L.goalWord} : {form.goal || "—"}</p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">{L.heading}</h2>
            <p className="text-lg text-white/80 mb-4">{L.lead}</p>
            <p className="text-white/70 mb-8 text-sm">{L.sub}</p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4"><Phone className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold">{L.phoneLbl}</p>
                  <p>+33 6 01 77 76 33</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-white/10 p-3 rounded-full mr-4"><Mail className="h-5 w-5" /></div>
                <div>
                  <p className="font-semibold">{L.emailLbl}</p>
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
                <h3 className="text-xl font-bold text-qit-purple mb-2">{L.doneTitle}</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {L.doneSub}
                  <br />
                  <span className="font-medium text-qit-purple">guest.qitconcierge@gmail.com</span>
                </p>
                <Button onClick={restart} variant="outline">{L.newRequest}</Button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-muted-foreground mb-2">
                    <span className="font-medium text-qit-purple">{L.stepN(step + 1, STEPS.length, STEPS[step].label)}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-qit-beige overflow-hidden">
                    <div className="h-full bg-qit-coral transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                  <ol className="flex justify-between mt-3">
                    {STEPS.map((s, i) => {
                      const reached = i <= step;
                      return (
                        <li key={s.key} className={`flex flex-col items-center text-[10px] sm:text-xs ${reached ? "text-qit-purple" : "text-muted-foreground"}`}>
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center mb-1 text-[11px] font-semibold ${i < step ? "bg-qit-coral text-white" : i === step ? "bg-qit-purple text-white" : "bg-qit-beige text-muted-foreground"}`}>
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
                      <Button type="button" variant="outline" onClick={back} className="w-full sm:w-auto">
                        <ArrowLeft className="h-4 w-4" />
                        {L.back}
                      </Button>
                    )}
                    {step < STEPS.length - 1 ? (
                      <Button type="button" onClick={next} size="lg" className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white h-12 text-base font-semibold shadow-md shadow-qit-coral/30 sm:ml-auto">
                        {L.continue}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    ) : (
                      <div className="flex flex-col gap-2 w-full sm:ml-auto sm:w-auto">
                        <Button type="button" onClick={handleWhatsApp} disabled={submitting} size="lg" className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white h-12 text-base font-semibold shadow-md shadow-qit-coral/30">
                          <MessageCircle className="h-4 w-4" />
                          {L.sendWa}
                        </Button>
                        <Button type="submit" disabled={submitting} variant="outline" size="lg" className="w-full h-11 text-sm">
                          <Mail className="h-4 w-4" />
                          {L.sendEmail}
                        </Button>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground text-center">{L.replyNote}</p>
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
