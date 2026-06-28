"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LocaleContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

  selectedLanguage: string | null;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<string | null>>;

  selectedCurrency: string | null;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string | null>>;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

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
