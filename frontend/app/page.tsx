"use client";
import Footer from "./_components/layout/Footer";
import Header from "./_components/layout/Header";
import ContentCarousel from "./_components/ui/ContentCarousel";
import { useHomePage } from "@/features/hooks/useHomePage";

export default function Home() {
  const { data, isLoading } = useHomePage("Tehran");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main className="mx-auto mt-13 flex max-w-480 flex-col gap-10">
        {data?.data.sections.map((section) => (
          <ContentCarousel
            key={section.sectionTitle}
            title={section.sectionTitle}
            items={section.items}
          />
        ))}
      </main>{" "}
      <Footer />
    </>
  );
}
