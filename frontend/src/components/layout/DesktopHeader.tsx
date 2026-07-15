"use client";
import { Globe, Menu } from "lucide-react";
import ExploreCategories from "./ExploreCategories";
import Image from "next/image";
import SearchBar from "./SearchBar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { useLocale } from "@/features/localization/context/LocaleContext";
export default function DesktopHeader() {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { setIsOpen } = useLocale();
  useMotionValueEvent(scrollY, "change", (current) => {
    if (current > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <header
      className={`flex w-full flex-col items-center justify-start ${isLoginPage ? "bg-white" : "bg-linear-to-b from-white to-[#F8F8F8]"} px-6`}
    >
      <div className="mx-auto flex h-24 w-full max-w-480 items-center justify-between">
        <Link href="/#" className="flex-1 justify-start">
          <Image
            width={102}
            height={80}
            alt="Airbnb Logo"
            src="/images/Logo.png"
            className="hidden lg:block"
          />
          <Image
            width={30}
            height={32}
            alt="Airbnb Logo"
            src="/images/Small-Logo.png"
            className="lg:hidden"
          />
        </Link>

        {!isLoginPage && (
          <div className="flex flex-1 justify-center">
            <ExploreCategories />
          </div>
        )}

        <div className="flex flex-1 items-center justify-end gap-3">
          <Link
            href="/login"
            className="hidden rounded-3xl px-3 py-2.75 text-[14px] font-medium text-[#222222] hover:bg-[#f2f2f2] xl:block"
          >
            Become a host
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2]"
          >
            <Globe className="size-4 text-[#222]" />
          </button>

          <Popover>
            <PopoverTrigger asChild>
              <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[#f2f2f2]">
                <Menu className="size-4 text-[#222]" />
              </button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="mt-4 flex min-w-60 flex-col gap-0 py-3"
            >
              <UserMenu />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {!hidden && !isLoginPage && <SearchBar />}
    </header>
  );
}
