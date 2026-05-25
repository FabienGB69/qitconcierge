import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Info, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SEASON_PROFILE = {
  rural: [0.55, 0.6, 0.75, 0.9, 1.05, 1.25, 1.45, 1.45, 1.15, 0.95, 0.7, 0.7],
  village: [0.7, 0.75, 0.85, 0.95, 1.05, 1.2, 1.3, 1.3, 1.1, 1.0, 0.8, 0.8],
  pluri: [0.95, 1.0, 0.95, 0.95, 1.0, 1.15, 1.3, 1.3, 1.05, 0.95, 0.85, 0.95],
} as const;

type ProfileKey = keyof typeof SEASON_PROFILE;

const RevenueEstimator = () => {
  const { isFR } = useLanguage();
  const [price, setPrice] = useState(140);
  const [occupancy, setOccupancy] = useState(60);
  const [profile, setProfile] = useState<ProfileKey>("rural");

  const formatEUR = (v: number) =>
    new Intl.NumberFormat(isFR ? "fr-FR" : "en-GB", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Math.round(v));

  const result = useMemo(() => {
    const seasonAvg = SEASON_PROFILE[profile].reduce((a, b) => a + b, 0) / 12;
    const availableNights = 365 * 0.95;
    const baseNights = availableNights * (occupancy / 100);
    const adjustedAvgPrice = price * seasonAvg;
    const central = baseNights * adjustedAvgPrice;
    const low = central * 0.85;
    const high = central * 1.1;
    const commission = central * 0.25;
    const net = central - commission;
    return { low, high, central, net, commission, nights: baseNights };
  }, [price, occupancy, profile]);

  const t = isFR
    ? {
        label: "Estimation",
        heading: "Estimez les revenus de votre logement",
        body: "Ajustez les paramètres ci-dessous pour obtenir une fourchette indicative, calculée sur une base annuelle et une saisonnalité Drôme-Ardèche.",
        priceLabel: "Prix moyen par nuit",
        priceHint: "Prix moyen affiché toutes saisons confondues (hors frais de ménage).",
        occLabel: "Taux d'occupation visé",
        occHint: "Sur l'année. En Drôme-Ardèche, 50–70% est un objectif réaliste pour un bien bien positionné.",
        profLabel: "Profil de saisonnalité",
        profHint: "Profil indicatif basé sur l'historique observé en Drôme-Ardèche.",
        profRural: "Rural / vignoble (forte haute saison)",
        profVillage: "Village / proche axes (lissé)",
        profPluri: "Pluri-saison (montagne, ville étape)",
        cautious: "Fourchette prudente",
        annual: "Revenus locatifs annuels estimés",
        central: "Estimation centrale",
        nights: "nuits / an",
        commission: "Commission Qit (25% TTC)",
        net: "Revenus nets propriétaire",
        disclaimer: "Estimation indicative, hors frais de ménage refacturés aux voyageurs, taxe de séjour et charges propriétaire (assurance, énergie, entretien). La fourchette intègre une marge de prudence (-15% / +10%) car les revenus réels dépendent du marché local, de la qualité de l'annonce, des photos et de la stratégie tarifaire pilotée avec PriceLabs.",
        cta: "Obtenir une estimation détaillée",
      }
    : {
        label: "Estimate",
        heading: "Estimate your property's revenue",
        body: "Adjust the parameters below to get an indicative range, calculated on an annual basis with Drôme-Ardèche seasonality.",
        priceLabel: "Average nightly price",
        priceHint: "Average price across all seasons (excluding cleaning fees).",
        occLabel: "Target occupancy rate",
        occHint: "Over the year. In Drôme-Ardèche, 50–70% is a realistic target for a well-positioned property.",
        profLabel: "Seasonality profile",
        profHint: "Indicative profile based on observed Drôme-Ardèche history.",
        profRural: "Rural / vineyard (strong high season)",
        profVillage: "Village / near main roads (smoothed)",
        profPluri: "Year-round (mountain, stopover town)",
        cautious: "Cautious range",
        annual: "Estimated annual rental revenue",
        central: "Central estimate",
        nights: "nights / year",
        commission: "Qit commission (25% incl. tax)",
        net: "Net owner revenue",
        disclaimer: "Indicative estimate, excluding cleaning fees billed to guests, tourist tax and owner costs (insurance, energy, maintenance). The range includes a margin of caution (-15% / +10%) — actual revenue depends on local market, listing quality, photos and the pricing strategy driven with PriceLabs.",
        cta: "Get a detailed estimate",
      };

  return (
    <section id="estimation" className="py-14 md:py-24 bg-qit-beige/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="inline-block text-xs uppercase tracking-widest text-qit-coral font-semibold mb-3">{t.label}</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-qit-purple mb-4 leading-tight">{t.heading}</h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t.body}</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8">
          <div className="rounded-3xl bg-white border border-border p-6 md:p-8 shadow-sm space-y-8">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-semibold text-qit-purple">{t.priceLabel}</Label>
                <span className="text-base font-bold text-qit-purple">{formatEUR(price)}</span>
              </div>
              <Slider value={[price]} min={60} max={400} step={5} onValueChange={(v) => setPrice(v[0])} />
              <p className="text-xs text-muted-foreground mt-2">{t.priceHint}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-semibold text-qit-purple">{t.occLabel}</Label>
                <span className="text-base font-bold text-qit-purple">{occupancy}%</span>
              </div>
              <Slider value={[occupancy]} min={20} max={85} step={1} onValueChange={(v) => setOccupancy(v[0])} />
              <p className="text-xs text-muted-foreground mt-2">{t.occHint}</p>
            </div>

            <div>
              <Label className="text-sm font-semibold text-qit-purple mb-3 block">{t.profLabel}</Label>
              <Select value={profile} onValueChange={(v) => setProfile(v as ProfileKey)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rural">{t.profRural}</SelectItem>
                  <SelectItem value="village">{t.profVillage}</SelectItem>
                  <SelectItem value="pluri">{t.profPluri}</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-2">{t.profHint}</p>
            </div>
          </div>

          <div className="rounded-3xl bg-qit-purple text-white p-6 md:p-8 shadow-md flex flex-col">
            <div className="flex items-center gap-2 mb-2 opacity-80">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs uppercase tracking-widest font-semibold">{t.cautious}</span>
            </div>
            <p className="text-sm opacity-80 mb-1">{t.annual}</p>
            <div className="text-3xl md:text-4xl font-bold mb-1">
              {formatEUR(result.low)} – {formatEUR(result.high)}
            </div>
            <p className="text-sm opacity-80 mb-6">
              {t.central} : {formatEUR(result.central)} · {Math.round(result.nights)} {t.nights}
            </p>

            <div className="space-y-2 text-sm border-t border-white/20 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="opacity-80">{t.commission}</span>
                <span className="font-semibold">{formatEUR(result.commission)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-80">{t.net}</span>
                <span className="font-semibold">{formatEUR(result.net)}</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-4 text-xs leading-relaxed mb-6">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <p>{t.disclaimer}</p>
              </div>
            </div>

            <Button asChild size="lg" className="w-full bg-qit-coral hover:bg-qit-coral/90 text-white mt-auto">
              <a href="#contact">{t.cta}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueEstimator;
