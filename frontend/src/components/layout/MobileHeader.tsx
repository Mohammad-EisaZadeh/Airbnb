"use client";

import { Search } from "lucide-react";

import ExploreCategories from "./ExploreCategories";
import { useSearchUI } from "@/features/search/context/SearchUIContext";

export default function MobileHeader() {
  const { setSearchOpen } = useSearchUI();

  return (
    <header className="flex w-full flex-col bg-linear-to-b from-white to-[#F8F8F8] px-6 pt-3">
      <button
        type="button"
        onClick={() => setSearchOpen(true)}
        className="flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-full border-[1] border-[#DDDDDD] py-4 shadow-[0px_6px_20px_0px_rgba(0,0,0,0.1)]"
      >
        <Search className="size-4.5 text-[#333333]" />
        <span className="text-[14px] font-bold text-[#333333]">
          Start your search
        </span>
      </button>
      <ExploreCategories />
    </header>
  );
}
