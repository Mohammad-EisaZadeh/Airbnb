"use client";

import { useEffect } from "react";
import { Globe } from "lucide-react";

import { useLocale } from "@/context/LocaleContext";
import { useLanguages } from "@/features/localization/hooks/useLanguages";
import { useCurrencies } from "@/features/localization/hooks/useCurrencies";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function FooterBottom() {
  const { data: languages } = useLanguages();
  const { data: currencies } = useCurrencies();
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedCurrency,
    setSelectedCurrency,
  } = useLocale();

  useEffect(() => {
    if (!selectedLanguage && languages?.data.length) {
      setSelectedLanguage(languages.data[0]);
    }
    if (!selectedCurrency && currencies?.data.length) {
      setSelectedCurrency(currencies.data[0]);
    }
  }, [
    languages,
    currencies,
    selectedLanguage,
    setSelectedLanguage,
    selectedCurrency,
    setSelectedCurrency,
  ]);
  console.log(selectedLanguage);

  return (
    <div className="text-red-[#222222] flex flex-col justify-between lg:flex-row">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-center">
          <div className="flex cursor-pointer items-center gap-2">
            <Globe className="size-4" />
            <span className="font-medium">
              {selectedLanguage?.language}({selectedLanguage?.country_override})
            </span>
          </div>
          <div className="flex cursor-pointer items-center gap-2">
            <span className="font-medium">{selectedCurrency?.symbol}</span>
            <span>{selectedCurrency?.code}</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <FaFacebook className="size-4" />
          <FaXTwitter className="size-4" />
          <FaInstagram className="size-4" />
        </div>
      </div>
      <div className="lg:order-first">asd</div>
    </div>
  );
}
