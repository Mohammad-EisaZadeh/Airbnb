import mongoose, { Schema, Document } from "mongoose";

export type BookableType = "listing" | "experience" | "service";

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  bookableType: BookableType;
  bookableId: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookableType: {
      type: String,
      enum: ["listing", "experience", "service"],
      required: true,
    },

    bookableId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "bookableType",
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

/* ---------------- INDEXES ---------------- */

bookingSchema.index({ bookableId: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ user: 1 });

export default mongoose.model<IBooking>("Booking", bookingSchema);
