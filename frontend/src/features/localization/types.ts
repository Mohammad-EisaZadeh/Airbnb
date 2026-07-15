// features/localization/types.ts

/* =========================
 * Generic API Response
 * ========================= */

export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
  results: number;
  data: T;
}

/* =========================
 * Currency
 * ========================= */

export interface Currency {
  _id: string;
  currency: string;
  code: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
}
export interface CurrenciesData {
  currencies: Currency[];
}
/* =========================
 * Language Region
 * ========================= */

export interface LanguageRegion {
  _id: string;
  locale: string;
  language: string;
  country: string;
  country_override: string;
  createdAt: string;
  updatedAt: string;
}
export interface LanguagesData {
  languages: LanguageRegion[];
}

/* =========================
 * API Response Types
 * ========================= */

export type LanguagesResponse = ApiResponse<LanguagesData>;
export type CurrenciesResponse = ApiResponse<CurrenciesData>;
