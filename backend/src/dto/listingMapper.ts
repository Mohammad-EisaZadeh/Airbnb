import { ListingCardDTO } from "../dto/homeDTO";
import { ListingDocument } from "../models/listingModel";

const DEFAULT_NIGHTS = 3;

export const toListingCardDTO = (
  listing: ListingDocument,
  nights = DEFAULT_NIGHTS,
): ListingCardDTO => {
  const total = listing.pricePerNight * nights;

  return {
    id: listing._id.toString(),

    title: listing.title,
    type: listing.type,
    city: listing.city,

    coverImage: listing.coverImage ?? undefined,

    pricePreview: {
      nights,
      total,
      currency: listing.currency,
    },

    hostType: "individual",

    rating: {
      average: listing.rating?.average ?? 0,
      count: listing.rating?.count ?? 0,
    },

    badge: listing.badges?.[0] ?? undefined,

    checkIn: new Date().toISOString(),

    checkOut: new Date(Date.now() + nights * 24 * 60 * 60 * 1000).toISOString(),
  };
};
