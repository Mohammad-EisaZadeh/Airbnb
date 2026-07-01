"use client";

import { useHomePage } from "@/features/home/hooks/useHomePage";
import ContentCarousel from "./ContentCarousel";
import ContentCarouselSkeleton from "./ContentCarouselSkeleton";

export default function HomeMain() {
  const { data, isLoading } = useHomePage();

  return (
    <main className="3xl:max-w-480 mx-auto mt-13 flex w-full max-w-360 flex-1 flex-col gap-10">
      {isLoading
        ? Array.from({ length: 5 }).map((_, i) => (
            <ContentCarouselSkeleton key={i} />
          ))
        : data?.data.sections.map((section) => (
            <ContentCarousel
              key={section.sectionTitle}
              title={section.sectionTitle}
              items={section.items}
            />
          ))}
    </main>
  );
}
