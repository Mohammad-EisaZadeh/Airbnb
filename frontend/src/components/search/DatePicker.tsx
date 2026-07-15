"use client";

import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useFormContext, useWatch } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { pillClass } from "@/lib/styles/searchAccordionStyles";
import { SearchFormValues } from "@/lib/validations/search";

const flexibility = [
  "Exact dates",
  "±1 day",
  "±2 days",
  "±3 days",
  "±7 days",
  "±14 days",
];

type DatePickerProps = {
  variant: "desktop" | "mobile";
};

export default function DatePicker({ variant }: DatePickerProps) {
  const { control, setValue } = useFormContext<SearchFormValues>();

  const dates = useWatch({
    control,
    name: "dates",
  });

  const range: DateRange | undefined = {
    from: dates.checkIn ?? undefined,
    to: dates.checkOut ?? undefined,
  };

  const [monthCount, setMonthCount] = useState(variant === "desktop" ? 2 : 4);
  const [flex, setFlex] = useState("");
  const [month, setMonth] = useState(new Date());

  const isDesktop = variant === "desktop";

  const goPrevMonth = () => {
    setMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const goNextMonth = () => {
    setMonth((prev) => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div
        className={`flex ${
          variant === "desktop" ? "" : "max-h-75"
        } w-full flex-col overflow-y-auto`}
      >
        {isDesktop && (
          <div className="flex items-center justify-between px-2 pb-2">
            <button type="button" onClick={goPrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button type="button" onClick={goNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <DayPicker
          animate
          month={month}
          onMonthChange={setMonth}
          mode="range"
          selected={range}
          onSelect={(range) => {
            setValue("dates.checkIn", range?.from ?? null, {
              shouldDirty: true,
              shouldValidate: true,
            });

            setValue("dates.checkOut", range?.to ?? null, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }}
          disabled={{ before: new Date() }}
          numberOfMonths={monthCount}
          hideNavigation
          modifiers={{ today: false }}
          modifiersStyles={{
            today: { color: "inherit" },
          }}
          formatters={{
            formatWeekdayName: (date) =>
              new Intl.DateTimeFormat("en-US", {
                weekday: "narrow",
              }).format(date),
          }}
          classNames={{
            months: `flex ${isDesktop ? "flex-row gap-8" : "flex-col"}`,
            month: "w-full",
            month_grid: "w-full",
            day_button:
              "text-[14px] w-full aspect-[45/43] flex items-center justify-center disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer",
            range_start:
              "bg-[#222222] !text-white rounded-l-[50px] rounded-bl-[50px]",
            range_end:
              "bg-[#222222] text-white rounded-r-[50px] rounded-br-[50px]",
            range_middle: "bg-[#f7f7f7] text-[#222222]",
          }}
        />

        {monthCount <= 20 && variant === "mobile" && (
          <button
            type="button"
            onClick={() => setMonthCount((n) => n + 4)}
            className="my-4 cursor-pointer rounded-xl bg-[#f2f2f2] px-6 py-3.5 text-[16px] font-medium text-[#222222]"
          >
            Load more dates
          </button>
        )}
      </div>

      <Separator />

      <div className="flex min-h-8 min-w-13.5 items-center gap-2.5 overflow-scroll pt-2 pb-2.5 text-nowrap">
        {flexibility.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFlex(option)}
            className={pillClass(flex === option, "w-full px-3.5 py-2")}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
