import { api } from "@/lib/apiClient";
import type { CurrenciesResponse } from "../types";

export const getCurrencies = () => {
  return api<CurrenciesResponse>(`/settings/currencies`);
};
