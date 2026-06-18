"use client";
import { useCarousel } from "@/shared/ui/carousel";
import { ChevronRight } from "lucide-react";

export default function NextButton() {
  const { api, scrollNext, canScrollNext } = useCarousel();
  if (!api) return null;
  return (
    <button
      onClick={scrollNext}
      disabled={!canScrollNext}
      className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2] shadow-md transition hover:bg-gray-200 disabled:opacity-30"
    >
      <ChevronRight className="size-5" />
    </button>
  );
}
