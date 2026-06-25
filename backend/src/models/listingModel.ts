import mongoose, { Schema, model, InferSchemaType } from "mongoose";

/* ---------------- ENUMS ---------------- */

const HostTypeEnum = ["individual", "business_host", "professional"] as const;
const BadgeEnum = ["guest_favorite", "top_10_percent"] as const;
const ListingTypeEnum = ["house", "apartment", "hotel", "guest_house"] as const;
const CurrencyEnum = ["USD", "EUR", "IRR"] as const;

/* ---------------- SCHEMA ---------------- */
const ListingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ListingTypeEnum,
      required: true,
    },

    country: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    badges: {
      type: [String],
      enum: BadgeEnum,
      default: undefined,
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      enum: CurrencyEnum,
      default: "USD",
    },

    guests: {
      type: Number,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    beds: {
      type: Number,
      required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },

    coverImage: {
      type: String,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amenities: {
      type: [String],
      default: [],
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);
ListingSchema.index({ location: "2dsphere" });
/* ---------------- TYPES ---------------- */

export type Listing = InferSchemaType<typeof ListingSchema>;

export type ListingDocument = Listing & {
  _id: mongoose.Types.ObjectId;
};

/* ---------------- MODEL ---------------- */

export const ListingModel = model("Listing", ListingSchema);
