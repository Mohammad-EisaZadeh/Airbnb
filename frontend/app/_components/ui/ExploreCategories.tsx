"use client";

import Image from "next/image";
import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";

const categories = [
  { name: "Homes", isNew: false },
  { name: "Experiences", isNew: true },
  { name: "Services", isNew: true },
] as const;

type Category = (typeof categories)[number];

const ICON_SIZE = {
  width: 68,
  height: 60,
} as const;

function CategoryTab({
  category,
  active,
}: {
  category: Category;
  active: boolean;
}) {
  return (
    <div className="relative flex flex-col items-center md:flex-row">
      {category.isNew && (
        <span className="absolute top-2 left-13 z-10 rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] rounded-bl-none bg-[linear-gradient(357.5deg,rgba(62,86,124,1)_1.59%,rgba(58,84,117,1)_21.23%,rgba(45,60,91,1)_58.6%,rgba(128,157,192,1)_97.4%)] px-1.5 py-1 text-[8px] font-extrabold text-white md:top-0">
          NEW
        </span>
      )}
      <Image
        src={`/icons/${category.name}Icon.png`}
        alt={`${category.name} icon`}
        width={ICON_SIZE.width}
        height={ICON_SIZE.height}
        priority
        className="-mb-2.5 shrink-0"
      />
      <span
        className={`text-xs md:mt-2 md:text-sm ${active ? "text-black" : "text-[#666666]"}`}
      >
        {category.name}
      </span>
    </div>
  );
}

export default function ExploreCategories({
  variant = "home",
}: {
  variant?: "home" | "searchOverlay";
}) {
  const [tab, setTab] = useState<string>(categories[0].name);

  return (
    <Tabs
      value={tab}
      onValueChange={setTab}
      className="min-h-20 gap-0 md:w-125"
    >
      <TabsList
        variant="line"
        className={`h-auto min-h-20 w-full rounded-none bg-transparent px-6 ${variant === "home" ? "justify-between" : "justify-center"}`}
      >
        {categories.map((category) => (
          <TabsTrigger
            key={category.name}
            value={category.name}
            className="justify-center normal-case"
          >
            <CategoryTab category={category} active={tab === category.name} />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
