"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Locale } from "@/types";

interface LanguageContextType {
  locale: Locale;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "fr",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("fr");
  const toggle = () => setLocale((p) => (p === "fr" ? "en" : "fr"));
  return (
    <LanguageContext.Provider value={{ locale, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
