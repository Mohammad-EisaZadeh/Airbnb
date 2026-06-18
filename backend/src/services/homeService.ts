import { ListingModel } from "../models/listingModel";
import { ListingType } from "../types/listing";
import { HomePageDTO, HomeSectionDTO } from "../dto/homeDTO";
import { toListingCardDTO } from "../dto/listingMapper";

/* ---------------- CAROUSEL TYPE ---------------- */

type Carousel = {
  id: string;
  sectionTitle: string;
  priority: number;
  filter: (city: string) => Record<string, any>;
};

/* ---------------- CAROUSELS ---------------- */

export const CAROUSELS: Carousel[] = [
  {
    id: "popular_tehran",
    sectionTitle: "Popular homes in Tehran",
    priority: 1,
    filter: (city: string) => ({
      city,
      "rating.average": { $gte: 4.5 },
    }),
  },

  {
    id: "hotels_deals",
    sectionTitle: "Great deals on hotels",
    priority: 2,
    filter: () => ({
      type: "hotel" as ListingType,
      pricePerNight: { $lte: 100 },
    }),
  },

  {
    id: "istanbul_next",
    sectionTitle: "Available next month in Istanbul",
    priority: 3,
    filter: () => ({
      city: "Istanbul",
      isAvailable: true,
    }),
  },

  {
    id: "dubai",
    sectionTitle: "Stay in Dubai",
    priority: 4,
    filter: () => ({
      city: "Dubai",
    }),
  },

  {
    id: "shiraz",
    sectionTitle: "Homes in Shiraz",
    priority: 5,
    filter: () => ({
      city: "Shiraz",
    }),
  },
];

/* ---------------- UTILS ---------------- */

const shuffle = <T>(arr: T[]) => arr.sort(() => Math.random() - 0.5);

/* ---------------- SERVICE ---------------- */

export const getHomePage = async (city = "Tehran"): Promise<HomePageDTO> => {
  const sorted = [...CAROUSELS].sort((a, b) => a.priority - b.priority);

  const sections: HomeSectionDTO[] = await Promise.all(
    sorted.map(async (carousel) => {
      const filter = carousel.filter(city);

      const listings = await ListingModel.find(filter)
        .select(
          "title type city coverImage pricePerNight currency host rating badges",
        )
        .limit(10);

      return {
        id: carousel.id,
        sectionTitle: carousel.sectionTitle,
        items: shuffle(listings).map(toListingCardDTO),
      };
    }),
  );

  return {
    sections,
  };
};
