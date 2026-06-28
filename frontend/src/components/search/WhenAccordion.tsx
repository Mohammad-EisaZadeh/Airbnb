"use client";

import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DATE_SEARCH_MODE_OPTIONS,
  type SearchAccordionProps,
} from "@/types/search";

import DatePicker from "./DatePicker";
import FlexibleDates from "./FlexibleDates";
import Segmented from "./Segmented";
import { bindOpenChange, shellClass } from "./searchAccordionStyles";

export default function WhenAccordion({
  expanded,
  handleChange,
}: SearchAccordionProps) {
  const [mode, setMode] = useState<string>(DATE_SEARCH_MODE_OPTIONS[0]);

  return (
    <Accordion
      type="multiple"
      value={expanded ? ["panel"] : []}
      onValueChange={bindOpenChange(handleChange)}
      className={shellClass(expanded)}
    >
      <AccordionItem value="panel">
        <AccordionTrigger className="w-full p-0 hover:no-underline focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden">
          <div className="flex w-full items-center justify-between">
            <span
              className={
                expanded
                  ? "text-[22px] font-black text-[#222222]"
                  : "text-[14px] text-[#6a6a6a]"
              }
            >
              {expanded ? "When?" : "When"}
            </span>
            {!expanded && (
              <span className="text-[14px] text-[#222222]">Add dates</span>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent className={`flex flex-col gap-2`}>
          <div className="flex flex-col items-center">
            <Segmented setOption={setMode} />
            {mode === DATE_SEARCH_MODE_OPTIONS[0] ? (
              <DatePicker variant="mobile" />
            ) : (
              <FlexibleDates />
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
