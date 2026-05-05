import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "fr" | "en";

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    "properties.heading": "Nos Propriétés Sélectionnées",
    "properties.subheading": "Découvrez notre sélection de propriétés exceptionnelles que nous gérons avec le plus grand soin.",
    "properties.loading": "Chargement des propriétés...",
    "properties.guests": "pers.",
    "properties.bedrooms": "ch.",
    "properties.contact": "Nous contacter",
    "properties.book": "Réserver",
  },
  en: {
    "properties.heading": "Our Selected Properties",
    "properties.subheading": "Discover our selection of remarkable properties that we manage with the utmost care.",
    "properties.loading": "Loading properties...",
    "properties.guests": "guests",
    "properties.bedrooms": "bd",
    "properties.contact": "Contact us",
    "properties.book": "Book",
  },
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "qit-language";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "fr" || stored === "en") setLanguageState(stored);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const t = (key: string) => translations[language][key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
