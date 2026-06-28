"use client";
import NextButton from "../home/CarouselNextButton";
import PrevButton from "../home/CarouselPrevButton";
import { Card, CardContent } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

export default function Footer() {
  return (
    <footer className="flex-1 bg-[#f7f7f7] px-6 py-12">
      <p className="text-[#222222} text-[22px] font-medium">
        Inspiration for future getaways
      </p>
      <Carousel className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <PrevButton />
        <NextButton />
      </Carousel>
    </footer>
  );
}
