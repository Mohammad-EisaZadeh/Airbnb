"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SearchFormValues } from "@/lib/validations/search";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

const guestTypes = [
  { key: "adults", title: "Adults", description: "Ages 13 or above" },
  { key: "children", title: "Children", description: "Ages 2–12" },
  { key: "infants", title: "Infants", description: "Under 2" },
  { key: "pets", title: "Pets", description: "Bringing a service animal?" },
] as const;
type GuestKey = (typeof guestTypes)[number]["key"];
export default function GuestSelector() {
  const { control, setValue } = useFormContext<SearchFormValues>();

  const guests = useWatch({
    control,
    name: "guests",
  });

  const totalGuests = guests.adults + guests.children;

  const updateCount = (key: GuestKey, delta: number) => {
    setValue(`guests.${key}`, Math.max(0, guests[key] + delta), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  return (
    <div className="flex flex-col">
      {guestTypes.map((guest, i) => (
        <div key={guest.title} className="w-full">
          {i > 0 && <Separator />}
          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col">
              <span className="text-[16px] text-[#222222]">{guest.title}</span>
              {guest.title === "Pets" ? (
                <Link
                  href="#"
                  className="text-[14px] font-medium text-[#c1c1c1] underline"
                >
                  {guest.description}
                </Link>
              ) : (
                <span className="text-[14px] text-[#6a6a6a]">
                  {guest.description}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="cursor-pointer rounded-full bg-[#f2f2f2] hover:bg-[#f2f2f2] disabled:bg-[#f2f2f2]"
                onClick={() => updateCount(guest.key, -1)}
                disabled={guests[guest.key] === 0}
                aria-label={`Decrease ${guest.title}`}
              >
                <Minus className="size-4 text-[#333333]" />
              </Button>
              <span className="w-6 text-center">{guests[guest.key]}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={
                  (guest.key === "pets" && guests.pets >= 5) ||
                  (guest.key === "infants" && guests.infants >= 5) ||
                  ((guest.key === "adults" || guest.key === "children") &&
                    totalGuests >= 15)
                }
                className="cursor-pointer rounded-full bg-[#f2f2f2] hover:bg-[#f2f2f2] disabled:bg-[#f2f2f2]"
                onClick={() => updateCount(guest.key, 1)}
                aria-label={`Increase ${guest.title}`}
              >
                <Plus className="size-4 text-[#333333]" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
