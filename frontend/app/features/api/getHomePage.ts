import { api } from "@/lib/apiClient";
import type { HomePageResponse } from "../types/types";

export const getHomePage = (city?: string) => {
  const query = city ? `?city=${city}` : "";

  return api<HomePageResponse>(`/api/v1/home${query}`);
};
