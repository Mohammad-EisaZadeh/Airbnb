"use client";

import { useLanguages } from "@/features/localization/hooks/useLanguages";
import { useLocale } from "@/context/LocaleContext";
import { Switch } from "../ui/switch";
import { Languages } from "lucide-react";
import { LoadingDots } from "../ui/LoadingDots";
export default function LanguageRegion() {
  const { data, isLoading } = useLanguages();
  const { selectedLanguage, setSelectedLanguage } = useLocale();
  if (isLoading) return <LoadingDots />;
  return (
    <>
      <div className="flex w-fit items-center self-start bg-[#f7f7f7] p-4">
        <div className="flex flex-col">
          <div className="flex">
            <span>Translation</span>
            <span>
              <Languages />
            </span>
          </div>
          <span className="text-[#6a6a6a]">
            Automatically translate descriptions and reviews to English.
          </span>
        </div>
        <Switch />
      </div>
      <div className="grid grid-cols-2 gap-4 px-2 py-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {data?.data.map((el) => (
          <div
            key={el._id}
            onClick={() => setSelectedLanguage(el)}
            className={`flex cursor-pointer flex-col rounded-[8px] border px-3 py-2.5 ${
              selectedLanguage === el
                ? "border-[#222222]"
                : "border-transparent"
            }`}
          >
            <span className="text-[#222222]">{el.language}</span>
            <span className="text-[#6a6a6a]">{el.country}</span>
          </div>
        ))}
      </div>
    </>
  );
}
