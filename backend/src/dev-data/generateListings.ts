import { writeFileSync } from "fs";
import {
  Badge,
  Currency,
  Listing,
  ListingType,
  HostType,
} from "../types/listing";

/* ---------------- DATA POOLS ---------------- */

const cities = ["Tehran", "Shiraz", "Isfahan", "Dubai", "Istanbul"];
const countries = ["Iran", "UAE", "Turkey"];

const types: ListingType[] = ["house", "apartment", "hotel", "guest_house"];
const currencies: Currency[] = ["USD", "EUR", "IRR"];
const badges: Badge[] = ["guest_favorite", "top_10_percent"];

const amenitiesPool = ["wifi", "pool", "parking", "gym", "ac", "kitchen"];

/* ---------------- HELPERS ---------------- */

const random = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

const uuid = () => Math.random().toString(36).substring(2, 10);

/* ---------------- SEED DATA ---------------- */

const createListing = (index: number): Listing => {
  const city = random(cities);

  return {
    title: `Beautiful ${random(types)} in ${city} #${index}`,
    description: "A very nice place to stay",
    type: random(types),
    country: random(countries),
    city,
    address: `${index} Main Street`,

    badges: Math.random() > 0.7 ? [random(badges)] : undefined,

    location: {
      type: "Point",
      coordinates: [
        51 + Math.random(), // longitude
        35 + Math.random(), // latitude
      ],
    },

    pricePerNight: Math.floor(Math.random() * 300) + 20,
    currency: random(currencies),

    guests: Math.floor(Math.random() * 6) + 1,
    bedrooms: Math.floor(Math.random() * 4) + 1,
    beds: Math.floor(Math.random() * 5) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,

    images: [
      `https://picsum.photos/400/300?random=${index}`,
      `https://picsum.photos/401/300?random=${index}`,
      `https://picsum.photos/402/300?random=${index}`,
      `https://picsum.photos/403/300?random=${index}`,
      `https://picsum.photos/404/300?random=${index}`,
      `https://picsum.photos/405/300?random=${index}`,
      `https://picsum.photos/406/300?random=${index}`,
      `https://picsum.photos/407/300?random=${index}`,
      `https://picsum.photos/408/300?random=${index}`,
      `https://picsum.photos/409/300?random=${index}`,
      `https://picsum.photos/410/300?random=${index}`,
    ],

    coverImage: `https://picsum.photos/500/300?random=${index}`,

    amenities: amenitiesPool.filter(() => Math.random() > 0.5),

    isAvailable: Math.random() > 0.2,

    rating: {
      average: Number((Math.random() * 2 + 3).toFixed(1)),
      count: Math.floor(Math.random() * 500),
    },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/* ---------------- GENERATE ---------------- */

export const generateListings = (count = 2000): Listing[] => {
  return Array.from({ length: count }, (_, i) => createListing(i + 1));
};

const listings = generateListings(2000);

writeFileSync("listings.json", JSON.stringify(listings, null, 2), "utf-8");

console.log("✅ 2000 listings saved");
