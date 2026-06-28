"use client";

import Image from "next/image";

import type { SuggestedDestination } from "@/types/search";

const IMAGE_SIZE = 56;

const cardClass =
  "flex w-full cursor-pointer items-center gap-4 rounded-xl border-none bg-transparent p-2 pl-0 text-left hover:bg-[#f4f4f4]";

export default function Destination({
  destination,
}: {
  destination: SuggestedDestination;
}) {
  return (
    <button type="button" className={cardClass}>
      <Image
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        alt={destination.city}
        src={`/images/${destination.city}.png`}
      />
      <div className="flex flex-col">
        <span className="text-sm font-bold text-[#222222]">
          {destination.city}
        </span>
        <span className="text-[14px] text-[#6a6a6a]">
          {destination.description}
        </span>
      </div>
    </button>
  );
}
