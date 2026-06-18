import { ListingType, Currency, HostType } from "../types/listing";

export type HomeSectionDTO = {
  id: string;
  sectionTitle: string;
  items: ListingCardDTO[];
};

export type HomePageDTO = {
  sections: HomeSectionDTO[];
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

  badge?: string;

  checkIn: string; // ISO
  checkOut: string; // ISO
}
