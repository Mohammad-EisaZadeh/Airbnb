"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useRef, useState, useEffect } from "react";
import DatePicker from "@/components/search/DatePicker";

import Segmented from "@/components/search/Segmented";
import FlexibleDates from "@/components/search/FlexibleDates";
import PopularDestinations from "@/components/search/PopularDestinations";
import GuestSelector from "@/components/search/GuestSelector";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useFormContext } from "react-hook-form";
import { SearchFormValues } from "@/lib/validations/search";

const DATE_SEARCH_MODE_OPTIONS = ["Dates", "Flexible dates"] as const;

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLFormElement>(null);

  const [mode, setMode] = useState<string>(DATE_SEARCH_MODE_OPTIONS[0]);
  const [active, setActive] = useState<"where" | "when" | "who" | null>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      const popovers = document.querySelectorAll(
        "[data-radix-popper-content-wrapper]",
      );
      for (const popover of popovers) {
        if (popover.contains(target)) return;
      }

      setActive(null);
    };

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  const form = useFormContext<SearchFormValues>();
  const { register } = form;

  const onSubmit = form.handleSubmit((data) => {
    console.log("submit:", data);
  });

  const destinationField = register("destination");

  return (
    <form
      onSubmit={onSubmit}
      ref={containerRef}
      className={`bg-re relative flex w-full max-w-212.5 min-w-180 gap-px rounded-full border ${active !== null ? "bg-[#DDDDDD]" : "bg-white"} border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.08)]`}
    >
      <Popover open={active === "where"}>
        <PopoverTrigger asChild>
          <div
            onMouseDown={() => {
              setActive("where");
              requestAnimationFrame(() => inputRef.current?.focus());
            }}
            className={`${active === "where" && "bg-white hover:bg-white"} flex min-w-0 flex-1 cursor-pointer flex-col rounded-full px-8 py-3.75 hover:bg-[#ebebeb]`}
          >
            <span className="text-xs text-[#222222]">Where</span>
            <input
              {...destinationField}
              className="flex-1 outline-none"
              ref={(el) => {
                destinationField.ref(el);
                inputRef.current = el;
              }}
              placeholder=" Search destinations"
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="mt-2 h-135 w-full rounded-[50px] px-8 py-8"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <PopularDestinations />
        </PopoverContent>
      </Popover>
      {!active && <Separator orientation="vertical" />}
      <Popover open={active === "when"}>
        <PopoverTrigger asChild>
          <div
            onMouseDown={() => setActive("when")}
            className={`${active === "when" && "bg-white hover:bg-white"} flex flex-1 cursor-pointer flex-col rounded-full px-8 py-3.75 hover:bg-[#ebebeb]`}
          >
            <span className="text-xs text-[#222222]">When</span>{" "}
            <span className="text-[14px] text-[#6a6a6a]">Add dates</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="center"
          className="mt-2 w-212.5 rounded-[50px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex flex-col items-center rounded-full px-8 py-8.5">
            <Segmented setOption={setMode} />
            {mode === DATE_SEARCH_MODE_OPTIONS[0] ? (
              <DatePicker variant="desktop" />
            ) : (
              <FlexibleDates />
            )}
          </div>
        </PopoverContent>
      </Popover>
      {!active && <Separator orientation="vertical" />}
      <Popover open={active === "who"}>
        <PopoverTrigger asChild>
          <div
            onMouseDown={() => setActive("who")}
            className={`flex flex-1 cursor-pointer flex-col rounded-full px-8 ${active === "who" && "bg-white hover:bg-white"} min-w-0 py-3.75 hover:bg-[#ebebeb]`}
          >
            <span className="text-xs text-[#222222]">Who</span>
            <span className="truncate text-[14px] text-[#6a6a6a]">
              Add guests
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="mt-2 w-full rounded-[50px] px-8 py-8"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <GuestSelector />
        </PopoverContent>
      </Popover>
      <button
        type="submit"
        className="absolute top-1/2 right-2 flex h-12 min-w-12 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-linear-to-r from-[rgb(230,30,77)] via-[rgb(227,28,95)] to-[rgb(215,4,102)] px-2.5 py-2.5"
      >
        <Search className="size-4 text-white" />{" "}
        <AnimatePresence>
          {active && (
            <motion.span
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-[16px] text-white"
            >
              Search
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </form>
  );
}
