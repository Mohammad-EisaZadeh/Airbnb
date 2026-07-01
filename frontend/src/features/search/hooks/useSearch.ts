import { useMutation } from "@tanstack/react-query";
import { searchListings } from "../api/search";
import { toSearchApiParams } from "../types";
import type { SearchFormValues } from "@/lib/validations/search";

export function useSearch() {
  return useMutation({
    mutationFn: (values: SearchFormValues) =>
      searchListings(toSearchApiParams(values)),
  });
}
