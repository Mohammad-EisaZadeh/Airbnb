import { api } from "@/lib/apiClient";
import type { SearchApiParams, SearchApiResponse } from "@/types/search";

export async function searchListings(
  params: SearchApiParams,
): Promise<SearchApiResponse> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, String(value));
    }
  });

  return api<SearchApiResponse>(`/search?${query.toString()}`);
}
