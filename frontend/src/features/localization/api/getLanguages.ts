import { api } from "@/lib/apiClient";
import type { LanguagesResponse } from "../types";

export const getLanguages = () => {
  return api<LanguagesResponse>(`/settings/languages`);
};
