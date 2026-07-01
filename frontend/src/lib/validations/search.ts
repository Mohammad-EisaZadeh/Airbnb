import { z } from "zod";

export const guestsSchema = z
  .object({
    adults: z.number().int().min(0),
    children: z.number().int().min(0),
    infants: z.number().int().min(0),
    pets: z.number().int().min(0),
  })
  .refine((data) => data.adults + data.children <= 15, {
    message: "You can have at most 15 adults and children combined.",
    path: ["adults"],
  });

export const dateRangeSchema = z
  .object({
    checkIn: z.date().nullable(),
    checkOut: z.date().nullable(),
  })
  .refine(
    (data) => {
      if (!data.checkIn || !data.checkOut) return true;
      return data.checkOut > data.checkIn;
    },
    {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"],
    },
  );

export const flexibleDateSchema = z.object({
  month: z.string().nullable(),
  duration: z.enum(["weekend", "week", "month"]).nullable(),
});

export const searchFormSchema = z.object({
  destination: z.string().trim().max(100, "Destination is too long"),
  dateMode: z.enum(["dates", "flexible"]), // no .default() here
  dates: dateRangeSchema,
  flexible: flexibleDateSchema,
  guests: guestsSchema,
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
