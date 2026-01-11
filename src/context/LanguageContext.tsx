"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

type Language = "es" | "en";
type Translations = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  es,
  en,
};

const LANGUAGE_STORAGE_KEY = "apen-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize with 'es' to prevent hydration mismatch
  const [language, setLanguageState] = useState<Language>("es");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage after component mounts (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguageState(savedLanguage);
    }
    setIsHydrated(true);
  }, []);

  // Custom setLanguage that also persists to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  // Render children immediately but with correct translations once hydrated
  // This prevents layout shift while maintaining SEO
  return (
    <LanguageContext.Provider value={value}>
      <div className={isHydrated ? "" : "opacity-100"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Custom hook for getting the current language (useful in server components via props)
export function getLanguageFromStorage(): Language {
  if (typeof window === "undefined") return "es";
  const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
  return saved || "es";
}
