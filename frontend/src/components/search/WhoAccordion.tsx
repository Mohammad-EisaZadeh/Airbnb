"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { shellClass } from "@/lib/styles/searchAccordionStyles";
import GuestSelector from "./GuestSelector";
import type { SyntheticEvent } from "react";
type SearchAccordionProps = {
  expanded: boolean;
  handleChange: (event: SyntheticEvent, isExpanded: boolean) => void;
};

export default function WhoAccordion({
  expanded,
  handleChange,
}: SearchAccordionProps) {
  return (
    <Accordion
      type="multiple"
      value={expanded ? ["panel"] : []}
      onValueChange={(next) => {
        if (next.length) handleChange({} as React.SyntheticEvent, true);
      }}
      className={shellClass(expanded)}
    >
      <AccordionItem value={"panel"}>
        <AccordionTrigger className="w-full p-0 hover:no-underline focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden">
          <div className="flex w-full items-center justify-between">
            <span
              className={
                expanded
                  ? "text-[22px] font-black text-[#222222]"
                  : "text-[14px] text-[#6a6a6a]"
              }
            >
              {expanded ? "Who?" : "Who"}
            </span>
            {!expanded && (
              <span className="text-[14px] text-[#222222]">Add guests</span>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <GuestSelector />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
