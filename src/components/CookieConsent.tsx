import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const STORAGE_KEY = "qit-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  date: string;
};

const CookieConsent = () => {
  const { isFR } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const t = isFR
    ? {
        dialogLabel: "Consentement aux cookies",
        bannerTitle: "Gestion des cookies",
        bannerBody: "Nous utilisons des cookies pour assurer le bon fonctionnement du site et, avec votre accord, mesurer l'audience. Vous pouvez accepter, refuser ou paramétrer vos préférences à tout moment.",
        more: "En savoir plus",
        configure: "Paramétrer",
        reject: "Refuser",
        accept: "Accepter",
        title: "Préférences cookies",
        desc: "Choisissez les catégories de cookies que vous autorisez. Les cookies strictement nécessaires sont toujours actifs.",
        necTitle: "Strictement nécessaires",
        necBody: "Indispensables au fonctionnement du site. Toujours actifs.",
        analyticsTitle: "Mesure d'audience",
        analyticsBody: "Statistiques anonymes pour améliorer le site.",
        marketingTitle: "Marketing",
        marketingBody: "Personnalisation des contenus et publicités.",
        rejectAll: "Tout refuser",
        acceptAll: "Tout accepter",
        save: "Enregistrer mes choix",
      }
    : {
        dialogLabel: "Cookie consent",
        bannerTitle: "Cookie management",
        bannerBody: "We use cookies to ensure the site works correctly and, with your consent, to measure audience. You can accept, refuse or adjust your preferences at any time.",
        more: "Learn more",
        configure: "Configure",
        reject: "Reject",
        accept: "Accept",
        title: "Cookie preferences",
        desc: "Choose which categories of cookies you allow. Strictly necessary cookies are always active.",
        necTitle: "Strictly necessary",
        necBody: "Required for the site to function. Always active.",
        analyticsTitle: "Analytics",
        analyticsBody: "Anonymous statistics to improve the site.",
        marketingTitle: "Marketing",
        marketingBody: "Personalisation of content and ads.",
        rejectAll: "Reject all",
        acceptAll: "Accept all",
        save: "Save my choices",
      };

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
      else {
        const parsed: Consent = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      }
    } catch {
      setVisible(true);
    }

    const handleOpen = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: Consent = JSON.parse(stored);
          setAnalytics(!!parsed.analytics);
          setMarketing(!!parsed.marketing);
        }
      } catch {/* ignore */}
      setVisible(false);
      setSettingsOpen(true);
    };
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const save = (consent: Omit<Consent, "date" | "necessary">) => {
    const data: Consent = {
      necessary: true,
      analytics: consent.analytics,
      marketing: consent.marketing,
      date: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setVisible(false);
    setSettingsOpen(false);
  };

  const acceptAll = () => save({ analytics: true, marketing: true });
  const rejectAll = () => save({ analytics: false, marketing: false });
  const saveCustom = () => save({ analytics, marketing });

  if (!visible && !settingsOpen) return null;

  return (
    <>
      {visible && (
        <div role="dialog" aria-live="polite" aria-label={t.dialogLabel} className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6">
          <div className="mx-auto max-w-4xl bg-white border border-gray-200 shadow-lg rounded-lg p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
              <div className="flex-1 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 mb-1">{t.bannerTitle}</p>
                <p>
                  {t.bannerBody}{" "}
                  <Link to="/politique-confidentialite" className="underline text-qit-purple hover:text-qit-coral">
                    {t.more}
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:flex-shrink-0">
                <Button variant="outline" onClick={() => setSettingsOpen(true)} className="w-full sm:w-auto">{t.configure}</Button>
                <Button variant="outline" onClick={rejectAll} className="w-full sm:w-auto">{t.reject}</Button>
                <Button onClick={acceptAll} className="w-full sm:w-auto bg-qit-coral hover:bg-qit-coral/90 text-white">{t.accept}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{t.title}</DialogTitle>
            <DialogDescription>{t.desc}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 border rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">{t.necTitle}</p>
                <p className="text-sm text-gray-600">{t.necBody}</p>
              </div>
              <Switch checked disabled aria-label={t.necTitle} />
            </div>

            <div className="flex items-start justify-between gap-4 border rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">{t.analyticsTitle}</p>
                <p className="text-sm text-gray-600">{t.analyticsBody}</p>
              </div>
              <Switch checked={analytics} onCheckedChange={setAnalytics} aria-label={t.analyticsTitle} />
            </div>

            <div className="flex items-start justify-between gap-4 border rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">{t.marketingTitle}</p>
                <p className="text-sm text-gray-600">{t.marketingBody}</p>
              </div>
              <Switch checked={marketing} onCheckedChange={setMarketing} aria-label={t.marketingTitle} />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={rejectAll} className="w-full sm:w-auto">{t.rejectAll}</Button>
            <Button variant="outline" onClick={acceptAll} className="w-full sm:w-auto">{t.acceptAll}</Button>
            <Button onClick={saveCustom} className="w-full sm:w-auto bg-qit-coral hover:bg-qit-coral/90 text-white">{t.save}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
