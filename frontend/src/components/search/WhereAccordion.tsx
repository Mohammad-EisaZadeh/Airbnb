"use client";

import { ArrowLeft, ChevronDown, Search } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { useSearchUI } from "@/context/SearchUIContext";
import type { SearchAccordionProps } from "@/types/search";

import PopularDestinations from "./PopularDestinations";
import { bindOpenChange, shellClass } from "./searchAccordionStyles";
import { cn } from "@/lib/utils";

export default function WhereAccordion({
  expanded,
  handleChange,
}: SearchAccordionProps) {
  const { isDestinationExpanded, setDestinationExpanded } = useSearchUI();

  return (
    <Accordion
      type="multiple"
      value={expanded ? ["panel"] : []}
      onValueChange={bindOpenChange(handleChange)}
      className={cn(
        shellClass(expanded),
        expanded && "relative",
        !isDestinationExpanded ? "overflow-hidden" : "overflow-auto",
      )}
    >
      <AccordionItem value={"panel"}>
        {!isDestinationExpanded && (
          <AccordionTrigger className="w-full flex-1 p-0 hover:no-underline focus-visible:ring-0 **:data-[slot=accordion-trigger-icon]:hidden">
            <div className="flex w-full items-center justify-between">
              <span
                className={
                  expanded
                    ? "text-[22px] font-black text-[#222222]"
                    : "text-[14px] text-[#6a6a6a]"
                }
              >
                {expanded ? "Where?" : "Where"}
              </span>
              {!expanded && (
                <span className="text-[14px] text-[#222222]">
                  I&apos;m flexible
                </span>
              )}
            </div>
          </AccordionTrigger>
        )}

        <AccordionContent className="flex min-h-0 flex-1 flex-col overflow-scroll">
          <div className="flex h-13.5 items-stretch justify-between rounded-xl border border-[#DDDDDD] pr-5">
            {!isDestinationExpanded ? (
              <span className="flex h-full items-center p-6">
                <Search className="size-4" />
              </span>
            ) : (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="size-5 h-full self-center p-6"
                onClick={() => setDestinationExpanded(false)}
              >
                <ArrowLeft />
              </Button>
            )}

            <input
              onFocus={() => setDestinationExpanded(true)}
              placeholder="Search destination"
              className="flex-1 outline-none"
            />
          </div>

          <PopularDestinations />

          {!isDestinationExpanded && (
            <button
              type="button"
              className="absolute bottom-0 left-0 flex w-full cursor-pointer items-center justify-center border-t py-2 backdrop-blur-xs"
              onClick={() => setDestinationExpanded(true)}
            >
              <ChevronDown />
            </button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
