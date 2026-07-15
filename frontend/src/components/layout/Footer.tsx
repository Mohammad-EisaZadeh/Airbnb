"use client";

import FooterSection from "./FooterSection";
import FooterBottom from "./FooterBottom";

export default function Footer() {
  return (
    <footer className="flex-1 items-center bg-[#f7f7f7] px-6 py-12">
      <p className="text-[#222222} mx-auto w-full max-w-480 flex-1 text-[22px] font-medium">
        Inspiration for future getaways
      </p>

      <FooterSection />
      <FooterBottom />
    </footer>
  );
}
