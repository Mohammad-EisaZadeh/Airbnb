import type { SyntheticEvent } from "react";

export type SuggestedDestination = {
  city: string;
  description: string;
};
export type SearchAccordionProps = {
  expanded: boolean;
  handleChange: (event: SyntheticEvent, isExpanded: boolean) => void;
};

export const SEARCH_ACCORDION_PANELS = {
  WHERE: "panel1",
  WHEN: "panel2",
  WHO: "panel3",
} as const;

export const DATE_SEARCH_MODE_OPTIONS = ["Dates", "Flexible dates"] as const;
