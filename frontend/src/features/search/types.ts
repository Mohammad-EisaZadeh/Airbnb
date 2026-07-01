export type { SearchFormValues } from "@/lib/validations/search";
export type {
  SearchApiParams,
  SearchApiResponse,
  SearchResultItem,
} from "@/types/search";

import type { SearchFormValues } from "@/lib/validations/search";
import type { SearchApiParams } from "@/types/search";

// Maps form shape -> API query shape
export function toSearchApiParams(values: SearchFormValues): SearchApiParams {
  const { destination, dateMode, dates, flexible, guests } = values;

  return {
    destination,
    ...(dateMode === "dates" && dates.checkIn && dates.checkOut
      ? {
          checkIn: dates.checkIn.toISOString().split("T")[0],
          checkOut: dates.checkOut.toISOString().split("T")[0],
        }
      : {}),
    ...(dateMode === "flexible" && flexible.month
      ? {
          month: flexible.month,
          duration: flexible.duration ?? undefined,
        }
      : {}),
    adults: guests.adults,
    children: guests.children,
    infants: guests.infants,
    pets: guests.pets,
  };
}
