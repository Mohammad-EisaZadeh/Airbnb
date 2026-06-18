import {
  Badge,
  Currency,
  HostType,
  ListingType,
} from "@/shared/_types/listing";

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
  checkIn: string;
  checkOut: string;
}

export type HomeSectionDTO = {
  id: string;
  sectionTitle: string;
  items: ListingCardDTO[];
};
export type HomePageResponse = {
  status: "success";
  data: {
    sections: HomeSectionDTO[];
  };
};
