import { Listing } from "@/types/listing";
import ListingMeta from "./ListingMeta";
import HostedBy from "./HostedBy";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/map/Map"), {
  ssr: false,
});
export default function RoomContent({ listing }: { listing: Listing }) {
  const {
    title,
    city,
    country,
    guests,
    bedrooms,
    beds,
    host,
    bathrooms,
    rating,
  } = listing;

  return (
    <div className="relative flex -translate-y-6 flex-col rounded-[20px] bg-white px-6 py-6">
      <span className="text-center text-[22px]">{title}</span>
      <span className="text-center text-[14px] text-[#6c6c6c]">
        Entire home in {city}, {country}{" "}
      </span>
      <span className="flex self-center text-[14px] text-[#6c6c6c]">
        <span>{guests} guests &middot;</span>
        <span>{bedrooms} bedrooms &middot;</span>
        <span>{beds} bed &middot;</span>
        <span>{bathrooms} bath &middot;</span>
      </span>

      <ListingMeta reviews={15} rating={rating.average} />
      <HostedBy host={host} />
      <Map />
    </div>
  );
}
