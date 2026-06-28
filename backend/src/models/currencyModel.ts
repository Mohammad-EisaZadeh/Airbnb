import mongoose, { Document, model, Schema } from "mongoose";

export interface ICurrency extends Document {
  currency: string;
  code: string;
  symbol: string;
}

const currencySchema = new Schema<ICurrency>(
  {
    currency: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    symbol: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

/* ---------------- INDEXES ---------------- */

currencySchema.index({ currency: 1 });

export const CurrencyModel = model<ICurrency>("Currency", currencySchema);
