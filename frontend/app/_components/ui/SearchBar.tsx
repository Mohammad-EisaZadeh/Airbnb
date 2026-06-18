"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { Separator } from "@/shared/ui/separator";
import { useRef, useState } from "react";
import DatePicker from "../search/DatePicker";
import { DATE_SEARCH_MODE_OPTIONS } from "@/shared/_types/search";
import Segmented from "../search/Segmented";
import FlexibleDates from "../search/FlexibleDates";
import PopularDestinations from "../search/PopularDestinations";
import GuestSelector from "../search/GuestSelector";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [mode, setMode] = useState<string>(DATE_SEARCH_MODE_OPTIONS[0]);
  const [active, setActive] = useState<"where" | "when" | "who" | null>(null);

  const openWhere = () => {
    if (active !== "where") {
      setActive("where");
    }
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <div
      className={`bg-re relative flex w-full max-w-212.5 min-w-180 gap-px rounded-full border ${active !== null ? "bg-[#DDDDDD]" : "bg-white"} border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.08)]`}
    >
      <Popover
        open={active === "where"}
        onOpenChange={(o) => setActive(o ? "where" : null)}
      >
        <PopoverTrigger asChild>
          <div
            onClick={openWhere}
            className={`${active === "where" && "bg-white hover:bg-white"} flex min-w-0 flex-1 cursor-pointer flex-col rounded-full px-8 py-3.75 hover:bg-[#ebebeb]`}
          >
            <span className="text-xs text-[#222222]">Where</span>
            <input
              onFocus={() => setActive("where")}
              className="flex-1 outline-none"
              ref={inputRef}
              placeholder=" Search destinations"
            ></input>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="mt-2 h-135 w-full rounded-[50px] px-8 py-8"
        >
          <PopularDestinations />
        </PopoverContent>
      </Popover>
      {!active && <Separator orientation="vertical" />}
      <Popover
        open={active === "when"}
        onOpenChange={(o) => setActive(o ? "when" : null)}
      >
        <PopoverTrigger asChild>
          <div
            className={`${active === "when" && "bg-white hover:bg-white"} flex flex-1 cursor-pointer flex-col rounded-full px-8 py-3.75 hover:bg-[#ebebeb]`}
          >
            <span className="text-xs text-[#222222]">When</span>{" "}
            <span className="text-[14px] text-[#6a6a6a]">Add dates</span>
          </div>
        </PopoverTrigger>

        <PopoverContent align="center" className="mt-2 w-212.5 rounded-[50px]">
          <div className="flex flex-col items-center rounded-full px-8 py-8.5">
            <Segmented setOption={setMode} />
            {mode === DATE_SEARCH_MODE_OPTIONS[0] ? (
              <DatePicker variant="desktop" />
            ) : (
              <FlexibleDates variant="desktop" />
            )}
          </div>
        </PopoverContent>
      </Popover>
      {!active && <Separator orientation="vertical" />}
      <Popover
        open={active === "who"}
        onOpenChange={(o) => setActive(o ? "who" : null)}
      >
        <PopoverTrigger asChild>
          <div
            className={`flex flex-1 cursor-pointer flex-col rounded-full px-8 ${active === "who" && "bg-white hover:bg-white"} py-3.75 hover:bg-[#ebebeb]`}
          >
            <span className="text-xs text-[#222222]">Who</span>
            <span className="text-[14px] text-[#6a6a6a]">Add guests</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="mt-2 w-full rounded-[50px] px-8 py-8"
        >
          <GuestSelector />
        </PopoverContent>
      </Popover>
      <button className="absolute top-1/2 right-2 flex h-12 min-w-12 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-linear-to-r from-[rgb(230,30,77)] via-[rgb(227,28,95)] to-[rgb(215,4,102)] px-2.5 py-2.5">
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
    </div>
  );
}
