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

const STORAGE_KEY = "qit-cookie-consent";

type Consent = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  date: string;
};

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        setVisible(true);
      } else {
        const parsed: Consent = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      }
    } catch {
      setVisible(true);
    }
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
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Consentement aux cookies"
          className="fixed bottom-0 inset-x-0 z-[60] p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl bg-white border border-gray-200 shadow-lg rounded-lg p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 gap-4">
              <div className="flex-1 text-sm text-gray-700 leading-relaxed">
                <p className="font-semibold text-gray-900 mb-1">Gestion des cookies</p>
                <p>
                  Nous utilisons des cookies pour assurer le bon fonctionnement du site
                  et, avec votre accord, mesurer l'audience. Vous pouvez accepter,
                  refuser ou paramétrer vos préférences à tout moment.{" "}
                  <Link
                    to="/politique-confidentialite"
                    className="underline text-qit-purple hover:text-qit-coral"
                  >
                    En savoir plus
                  </Link>
                  .
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 md:flex-shrink-0">
                <Button
                  variant="outline"
                  onClick={() => setSettingsOpen(true)}
                  className="w-full sm:w-auto"
                >
                  Paramétrer
                </Button>
                <Button
                  variant="outline"
                  onClick={rejectAll}
                  className="w-full sm:w-auto"
                >
                  Refuser
                </Button>
                <Button
                  onClick={acceptAll}
                  className="w-full sm:w-auto bg-qit-coral hover:bg-qit-coral/90 text-white"
                >
                  Accepter
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Préférences cookies</DialogTitle>
            <DialogDescription>
              Choisissez les catégories de cookies que vous autorisez. Les cookies
              strictement nécessaires sont toujours actifs.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 border rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">Strictement nécessaires</p>
                <p className="text-sm text-gray-600">
                  Indispensables au fonctionnement du site. Toujours actifs.
                </p>
              </div>
              <Switch checked disabled aria-label="Cookies nécessaires (toujours actifs)" />
            </div>

            <div className="flex items-start justify-between gap-4 border rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">Mesure d'audience</p>
                <p className="text-sm text-gray-600">
                  Statistiques anonymes pour améliorer le site.
                </p>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                aria-label="Cookies de mesure d'audience"
              />
            </div>

            <div className="flex items-start justify-between gap-4 border rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">Marketing</p>
                <p className="text-sm text-gray-600">
                  Personnalisation des contenus et publicités.
                </p>
              </div>
              <Switch
                checked={marketing}
                onCheckedChange={setMarketing}
                aria-label="Cookies marketing"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={rejectAll} className="w-full sm:w-auto">
              Tout refuser
            </Button>
            <Button variant="outline" onClick={acceptAll} className="w-full sm:w-auto">
              Tout accepter
            </Button>
            <Button
              onClick={saveCustom}
              className="w-full sm:w-auto bg-qit-coral hover:bg-qit-coral/90 text-white"
            >
              Enregistrer mes choix
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;
