import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";

import SearchOverlay from "@/_components/search/SearchOverlay";
import Providers from "@/providers";
import "@/_styles/globals.css";
import LocaleDialog from "./_components/ui/LocaleDialog";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Airbnb | Vacation rentals, cabins, beach houses, & more",
  description: "Find places to stay and things to do",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`font-sans ${geist.variable}`}>
      <body className={inter.className}>
        <Providers>
          <div className="md:hidden">
            <SearchOverlay />
          </div>
          <LocaleDialog />
          {children}
        </Providers>
      </body>
    </html>
  );
}
