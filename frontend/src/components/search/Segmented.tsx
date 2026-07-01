"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

export const DATE_SEARCH_MODE_OPTIONS = ["Dates", "Flexible dates"] as const;

type SegmentedProps = {
  setOption: React.Dispatch<React.SetStateAction<string>>;
};

const trackClass =
  "relative flex w-fit min-w-[303px] max-w-[400px] items-center justify-around rounded-full bg-[#ebebeb] p-0.5";

const optionClass =
  "z-[1] min-w-18 flex-1 capitalize text-[#222222] hover:bg-transparent hover:shadow-none";

export default function Segmented({ setOption }: SegmentedProps) {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const refs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    const el = refs.current[active];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <div className={trackClass}>
      <div
        className="absolute top-1 bottom-1 z-0 rounded-full bg-white transition-all duration-300 ease-in-out"
        style={{ left: pill.left, width: pill.width }}
      />
      {DATE_SEARCH_MODE_OPTIONS.map((label, i) => (
        <Button
          type="button"
          variant="ghost"
          key={label}
          ref={(node) => {
            if (node) refs.current[i] = node;
          }}
          onClick={() => {
            setOption(label);
            setActive(i);
          }}
          className={optionClass}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
