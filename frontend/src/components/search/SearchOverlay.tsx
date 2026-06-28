"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

import ExploreCategories from "@/components/layout/ExploreCategories";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchUI } from "@/context/SearchUIContext";
import { useIsDesktop } from "@/hooks/useIsDesktop";

import SearchMain from "./SearchMain";

const overlayClass =
  "fixed inset-0 flex h-screen w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0  rounded-none border-0 bg-[#f5f5f5] p-0 shadow-none overflow-auto ";

const closeButtonClass =
  "absolute top-[3%] right-[3%] z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-transparent hover:bg-white";

export default function SearchOverlay() {
  const {
    isSearchOpen,
    setSearchOpen,
    isDestinationExpanded,
    setDestinationExpanded,
  } = useSearchUI();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!isDesktop) return;
    setSearchOpen(false);
    setDestinationExpanded(false);
  }, [isDesktop, setSearchOpen, setDestinationExpanded]);

  if (isDesktop) return null;

  return (
    <Dialog open={isSearchOpen} onOpenChange={setSearchOpen}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className={overlayClass}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>

        {!isDestinationExpanded && (
          <>
            <ExploreCategories />
            <DialogClose asChild>
              <button type="button" className={closeButtonClass}>
                <X className="size-5" />
              </button>
            </DialogClose>
          </>
        )}

        <SearchMain />
      </DialogContent>
    </Dialog>
  );
}
