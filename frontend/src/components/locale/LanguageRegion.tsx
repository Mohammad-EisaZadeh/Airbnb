"use client";

import { useLanguages } from "@/features/localization/hooks/useLanguages";
import { useLocale } from "@/features/localization/context/LocaleContext";
import { Switch } from "../ui/switch";
import { Languages } from "lucide-react";
import LanguageRegionSkeleton from "./LanguageRegionSkeleton";

export default function LanguageRegion() {
  const { data, isLoading } = useLanguages();
  const languagesData = data?.data.languages;
  const { selectedLanguage, setSelectedLanguage } = useLocale();
  if (isLoading) return <LanguageRegionSkeleton />;
  return (
    <>
      <div className="my-12 flex w-fit items-center self-start bg-[#f7f7f7] p-4">
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
      <h1 className="text-2xl">Choose a language and region</h1>
      <div className="grid grid-cols-2 gap-4 px-2 py-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {languagesData?.map((el) => (
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
