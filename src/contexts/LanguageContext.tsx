import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "fr" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isFR: boolean;
  isEN: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    "properties.heading": "Quelques logements que nous gérons",
    "properties.subheading": "Un aperçu d'appartements, maisons et gîtes confiés à Qit Concierge — du studio urbain au logement familial.",
    "properties.loading": "Chargement des propriétés...",
    "properties.guests": "pers.",
    "properties.bedrooms": "ch.",
    "properties.contact": "Nous contacter",
    "properties.book": "Réserver",
  },
  en: {
    "properties.heading": "A few properties we manage",
    "properties.subheading": "A look at the apartments, houses and gîtes entrusted to Qit Concierge — from urban studios to family homes.",
    "properties.loading": "Loading properties...",
    "properties.guests": "guests",
    "properties.bedrooms": "bd",
    "properties.contact": "Contact us",
    "properties.book": "Book",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "qit-language";

const detectBrowserLanguage = (): Language => {
  if (typeof navigator === "undefined") return "fr";
  const langs = (navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language || "fr"]
  ).map((l) => l.toLowerCase());
  // FR if user has any french preference, else EN
  if (langs.some((l) => l.startsWith("fr"))) return "fr";
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLanguageState(stored);
    } else {
      setLanguageState(detectBrowserLanguage());
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string) => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, isFR: language === "fr", isEN: language === "en" }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
