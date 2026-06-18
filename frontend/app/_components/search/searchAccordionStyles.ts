import type { SyntheticEvent } from "react";

export function shellClass(open: boolean) {
  return [
    "m-0 w-full rounded-[20px] border-0 bg-white px-6 py-4.75 shadow-none ",
    open &&
      "shadow-[rgba(0,0,0,0.04)_0px_0px_0px_1px,rgba(0,0,0,0.2)_0px_6px_20px_0px]",
    "[&_[data-slot=accordion-item]]:border-0",
  ]
    .filter(Boolean)
    .join(" ");
}

export function bindOpenChange(
  onChange: (event: SyntheticEvent, open: boolean) => void,
) {
  return (next: string[]) => {
    if (next.length) onChange({} as SyntheticEvent, true);
  };
}

export function pillClass(active: boolean, extra?: string) {
  return [
    "cursor-pointer rounded-[20px] border-[0.8px] text-[14px]",
    active ? "border-[#222222]" : "border-[#dddddd]",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}
