"use client";

import { createContext, useContext, useState, ReactNode } from "react";

import type { Currency, LanguageRegion } from "@/features/localization/types";
interface LocaleContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedLanguage: LanguageRegion | null;
  setSelectedLanguage: React.Dispatch<
    React.SetStateAction<LanguageRegion | null>
  >;

  selectedCurrency: Currency | null;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<Currency | null>>;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageRegion | null>(null);

  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(
    null,
  );

  return (
    <LocaleContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedLanguage,
        setSelectedLanguage,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used inside LocaleProvider");
  }

  return context;
}
