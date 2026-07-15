export type HostType = "individual" | "business_host" | "professional";
export type Badge = "guest_favorite" | "top_10_percent";
export type ListingType = "house" | "apartment" | "hotel" | "guest_house";
export type Currency = "USD" | "EUR" | "IRR";

export type HostSeed = {
  name: string;
  avatar?: string;
  type: HostType;
};

export interface Listing {
  title: string;
  description: string;
  type: ListingType;
  country: string;
  city: string;
  address: string;
  badges?: Badge[];
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  pricePerNight: number;
  currency: Currency;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  images: string[];
  coverImage?: string;
  host?: HostSeed;
  amenities: string[];
  isAvailable: boolean;
  rating: {
    average: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type ListingsResponse = {
  sectionTitle: string;
  items: ListingCardDTO[];
};
export interface ListingCardDTO {
  id: string;
  title: string;
  type: ListingType;
  city: string;
  coverImage?: string;
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
