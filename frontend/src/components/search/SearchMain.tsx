"use client";

import { useState } from "react";

import { useSearchUI } from "@/context/SearchUIContext";

import WhenAccordion from "./WhenAccordion";
import WhereAccordion from "./WhereAccordion";
import WhoAccordion from "./WhoAccordion";
import { Search } from "lucide-react";

export const PANELS = {
  WHERE: "panel1",
  WHEN: "panel2",
  WHO: "panel3",
} as const;

export default function SearchMain() {
  const [expanded, setExpanded] = useState<string | false>("panel3");
  const { isDestinationExpanded } = useSearchUI();
  const nextPanel = () => {
    if (expanded === PANELS.WHERE) setExpanded(PANELS.WHEN);
    else if (expanded === PANELS.WHEN) setExpanded(PANELS.WHO);
  };
  const openPanel =
    (id: string) => (_e: React.SyntheticEvent, next: boolean) => {
      if (next) setExpanded(id);
    };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 p-3">
      <WhereAccordion
        expanded={expanded === PANELS.WHERE}
        handleChange={openPanel(PANELS.WHERE)}
      />
      {!isDestinationExpanded && (
        <>
          <WhenAccordion
            expanded={expanded === PANELS.WHEN}
            handleChange={openPanel(PANELS.WHEN)}
          />

          <WhoAccordion
            expanded={expanded === PANELS.WHO}
            handleChange={openPanel(PANELS.WHO)}
          />
        </>
      )}
      {!isDestinationExpanded && (
        <div className="flex items-center justify-between px-3">
          <button className="cursor-pointer bg-transparent px-4 text-[16px] font-semibold">
            Clear all
          </button>
          {expanded === "panel3" ? (
            <button className="bg-position[100%_100%] flex h-12 min-w-30 cursor-pointer items-center justify-center gap-1 rounded-[10px] bg-[radial-gradient(circle,rgb(255,56,92)_0%,rgb(230,30,77)_27.5%,rgb(227,28,95)_40%,rgb(215,4,102)_57.5%,rgb(189,30,89)_75%,rgb(189,30,89)_100%)] bg-size-[200%_200%] text-[16px] text-white">
              <Search />
              Search
            </button>
          ) : (
            <button
              onClick={nextPanel}
              className="min-w-28 rounded-[12px] bg-[#222222] py-3.5 text-white"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
