"use client";

import { useEffect } from "react";
import { Globe } from "lucide-react";

import { useLocale } from "@/features/localization/context/LocaleContext";
import { useLanguages } from "@/features/localization/hooks/useLanguages";
import { useCurrencies } from "@/features/localization/hooks/useCurrencies";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";

export default function FooterBottom() {
  const { data: languages } = useLanguages();
  const { data: currencies } = useCurrencies();
  const languagesData = languages?.data.languages;
  const currenciesData = currencies?.data.currencies;
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedCurrency,
    setSelectedCurrency,
  } = useLocale();

  useEffect(() => {
    if (!selectedLanguage && languagesData?.length) {
      setSelectedLanguage(languagesData[0]);
    }
    if (!selectedCurrency && currenciesData?.length) {
      setSelectedCurrency(currenciesData[0]);
    }
  }, [
    currenciesData,
    languagesData,
    selectedLanguage,
    setSelectedLanguage,
    selectedCurrency,
    setSelectedCurrency,
  ]);

  return (
    <div className="text-red-[#222222] mx-auto flex max-w-480 flex-col justify-between gap-2 py-6 lg:flex-row">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-4 font-medium">
          <div className="flex cursor-pointer items-center gap-2">
            <Globe className="size-4" />
            <span>
              {selectedLanguage?.language}({selectedLanguage?.country_override})
            </span>
          </div>
          <div className="flex cursor-pointer items-center gap-2">
            <span>{selectedCurrency?.symbol}</span>
            <span>{selectedCurrency?.code}</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Link
            href="https://www.facebook.com/airbnb"
            target="_blank"
            className="cursor-pointer rounded-full border-none bg-transparent hover:bg-[#ebebeb]"
          >
            <FaFacebook className="size-4" />
          </Link>

          <Link
            href="https://x.com/airbnb"
            target="_blank"
            className="cursor-pointer rounded-full border-none bg-transparent hover:bg-[#ebebeb]"
          >
            <FaXTwitter className="size-4" />
          </Link>

          <Link
            href="https://www.instagram.com/airbnb"
            target="_blank"
            className="cursor-pointer rounded-full border-none bg-transparent hover:bg-[#ebebeb]"
          >
            <FaInstagram className="size-4" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2 lg:order-first">
        <p>© {new Date().getFullYear()} Airbnb, Inc</p>&middot;
        <Link href="/#">Privacy</Link> &middot;
        <Link href="/#">Terms</Link> &middot;
        <Link href="/#"> YourPrivacyChoices</Link>
        <Image
          alt="PrivacyOptions"
          src="/icons/privacyoptions.svg"
          width={26}
          height={12}
        />
      </div>
    </div>
  );
}
