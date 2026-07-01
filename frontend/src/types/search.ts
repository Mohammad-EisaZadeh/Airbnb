import type { ListingType } from "@/types/listing";

export type Currency = "USD" | "EUR" | "GBP"; // adjust to match your actual currency list
export type HostType = "individual" | "professional" | "superhost"; // adjust to your actual values
export type Badge = "guest_favorite" | "new" | "rare_find"; // adjust to your actual values

export interface SearchApiParams {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  month?: string;
  duration?: "weekend" | "week" | "month";
  adults: number;
  children: number;
  infants: number;
  pets: number;
}

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  type: ListingType;
  city: string;
  images: string[];
  pricePreview: {
    nights: number;
    total: number;
    currency: Currency;
  };
  hostType: HostType;
  rating: {
    average: number;
    count: number;
  };
  badge?: Badge;
  checkIn: string; // ISO
  checkOut: string; // ISO
}

export interface SearchApiResponse {
  results: SearchResultItem[];
  totalCount: number;
}
