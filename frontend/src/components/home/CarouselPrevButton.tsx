"use client";
import { useCarousel } from "@/components/ui/carousel";
import { ChevronLeft } from "lucide-react";

export default function PrevButton() {
  const { api, scrollPrev, canScrollPrev } = useCarousel();
  if (!api) return null;
  return (
    <button
      onClick={scrollPrev}
      disabled={!canScrollPrev}
      className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2] shadow-md transition hover:bg-gray-200 disabled:opacity-30"
    >
      <ChevronLeft className="size-5" />
    </button>
  );
}
