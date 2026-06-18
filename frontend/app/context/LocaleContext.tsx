"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "USD" | "EUR" | "IRR";

type LocaleContextType = {
  currency: Currency;
  setCurrency: (c: Currency) => void;

  language: string;
  setLanguage: (l: string) => void;

  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [language, setLanguage] = useState("en");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LocaleContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}
export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used inside LocaleProvider");
  return ctx;
}
