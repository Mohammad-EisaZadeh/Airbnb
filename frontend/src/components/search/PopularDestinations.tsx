"use client";

import { Separator } from "@/components/ui/separator";
import { useSearchUI } from "@/context/SearchUIContext";
import type { SuggestedDestination } from "@/types/search";
import Destination from "./Destination";
import { cn } from "@/lib/utils";

const destinations: SuggestedDestination[] = [
  { city: "Nearby", description: "Find what's around you" },
  { city: "Barcelona,Spain", description: "Popular beach destination" },
  { city: "Paris,France", description: "For sights like Eiffel Tower" },
  { city: "Florence,Italy", description: "For its stunning architecture" },
  { city: "Torino,Italy", description: "Great for a weekend getaway" },
  { city: "Dublin,Ireland", description: "For a trip abroad" },
  { city: "Budapest,Hungary", description: "For its bustling nightlife" },
  { city: "Verona,Italy", description: "For a trip abroad" },
  { city: "Genoa,Italy", description: "Great for a weekend getaway" },
  { city: "Vienna,Austria", description: "For its top-notch dining" },
  { city: "Prague,Czechia", description: "For its bustling nightlife" },
  { city: "Venice,Italy", description: "For sights like Rialto Bridge" },
  { city: "Nice,France", description: "Popular beach destination" },
  { city: "Lake-Garda,Italy", description: "Popular lake destination" },
  { city: "Lisbon,Portugal", description: "For sights like Praça do Comércio" },
  {
    city: "Valencia,Spain",
    description: "For sights like City of Arts and Sciences",
  },
  { city: "Naples,Italy", description: "For its top-notch dining" },
  { city: "Athens,Greece", description: "For sights like Acropolis of Athens" },
  { city: "Madrid,Spain", description: "For its stunning architecture" },
  {
    city: "London,United-Kingdom",
    description: "For sights like Buckingham Palace",
  },
  { city: "Bologna,Italy", description: "For a trip abroad" },
];

export default function PopularDestinations() {
  const { isDestinationExpanded } = useSearchUI();

  return (
    <div
      className={cn(
        "relative flex min-h-0 flex-1 flex-col",
        !isDestinationExpanded ? "overflow-y-scroll" : "overflow-hidden",
      )}
    >
      <span className="text-[12px]">Suggested destinations</span>
      {destinations.map((dest, i) => (
        <div className="w-full" key={dest.city}>
          <Destination destination={dest} />
          {i < destinations.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
