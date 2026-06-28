// features/localization/types.ts

/* =========================
 * Generic API Response
 * ========================= */

export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
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

/* =========================
 * API Response Types
 * ========================= */

export type CurrenciesResponse = ApiResponse<Currency[]>;
export type LanguagesResponse = ApiResponse<LanguageRegion[]>;
