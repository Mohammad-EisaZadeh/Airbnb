"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

import { pillClass } from "@/lib/styles/searchAccordionStyles";

const durations = ["Weekend", "Week", "Month"];

const months = [
  { month: "June", year: 2026 },
  { month: "July", year: 2026 },
  { month: "August", year: 2026 },
  { month: "September", year: 2026 },
  { month: "October", year: 2026 },
  { month: "November", year: 2026 },
  { month: "December", year: 2026 },
  { month: "January", year: 2027 },
  { month: "February", year: 2027 },
  { month: "March", year: 2027 },
  { month: "April", year: 2027 },
  { month: "May", year: 2027 },
];

function monthCardClass(selected: boolean) {
  return [
    "flex min-w-28.5 cursor-pointer flex-col items-center rounded-[20px] border-[0.8px] py-3 text-[14px]",
    selected ? "border-[#222222] bg-[#f0f0f0]" : "border-[#dddddd] bg-white",
  ].join(" ");
}

export default function FlexibleDates() {
  const [stay, setStay] = useState("");
  const [picked, setPicked] = useState<string[]>([]);

  const toggleMonth = (name: string) => {
    setPicked((prev) =>
      prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name],
    );
  };

  return (
    <div className="flex w-full flex-col">
      <section className="flex w-full flex-col items-center py-5">
        <p className="pb-3.5 text-lg font-medium">
          {!stay ? "How long would you like to stay?" : `Stay for a ${stay}`}
        </p>
        <div className="flex items-center gap-2">
          {durations.map((d) => (
            <button
              type="button"
              key={d}
              onClick={() => setStay(d)}
              className={pillClass(stay === d, "px-4 py-2.75")}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col items-center py-5">
        <p className="pb-3.5 text-lg font-medium">
          {!picked.length ? "Go Any Time" : `Go In ${picked.join(", ")}`}
        </p>
        <div className="flex w-full items-center gap-2 overflow-scroll">
          {months.map(({ month, year }) => (
            <button
              type="button"
              key={month}
              onClick={() => toggleMonth(month)}
              className={monthCardClass(picked.includes(month))}
            >
              <Calendar className="size-8 text-[#6a6a6a]" />
              <span className="mt-2 text-[14px] font-medium">{month}</span>
              <span className="text-[12px]">{year}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
