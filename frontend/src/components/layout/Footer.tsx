"use client";

import FooterSection from "../home/FooterSection";
import FooterBottom from "../home/FooterBottom";

import FooterTop from "./FooterTop";

export default function Footer() {
  return (
    <footer className="flex-1 bg-[#f7f7f7] px-6 py-12">
      <p className="text-[#222222} text-[22px] font-medium">
        Inspiration for future getaways
      </p>

      <FooterSection />
      <FooterBottom />
    </footer>
  );
}
