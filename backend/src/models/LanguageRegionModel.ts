import mongoose, { Document, model, Schema } from "mongoose";

export interface ILanguageRegion extends Document {
  language: string;
  country: string;
  locale: string;
  country_override: string;
}

const languageRegionSchema = new Schema<ILanguageRegion>(
  {
    language: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    locale: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    country_override: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ---------------- INDEXES ---------------- */

export const LanguageRegionModel = model<ILanguageRegion>(
  "LanguageRegion",
  languageRegionSchema,
);
