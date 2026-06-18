"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useState,
  type ReactNode,
} from "react";

type SearchUIState = {
  isSearchOpen: boolean;
  setSearchOpen: Dispatch<React.SetStateAction<boolean>>;
  isDestinationExpanded: boolean;
  setDestinationExpanded: Dispatch<React.SetStateAction<boolean>>;
};

const SearchUIContext = createContext<SearchUIState | null>(null);

export function SearchUIProvider({ children }: { children: ReactNode }) {
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isDestinationExpanded, setDestinationExpanded] = useState(false);

  return (
    <SearchUIContext.Provider
      value={{
        isSearchOpen,
        setSearchOpen,
        isDestinationExpanded,
        setDestinationExpanded,
      }}
    >
      {children}
    </SearchUIContext.Provider>
  );
}

export function useSearchUI() {
  const ctx = useContext(SearchUIContext);
  if (!ctx) throw new Error("useSearchUI must be used within SearchUIProvider");
  return ctx;
}
