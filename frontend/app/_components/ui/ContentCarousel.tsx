import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/shared/ui/aspect-ratio";
import { Heart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";
import CarouselNextButton from "@/_components/ui/CarouselNextButton";
import CarouselPrevButton from "@/_components/ui/CarouselPrevButton";

import Image from "next/image";
import { ListingCardDTO } from "@/features/types/types";
type Props = {
  title: string;
  items: ListingCardDTO[];
};
export default function ContentCarousel({ title, items }: Props) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="flex w-full flex-col gap-2 px-6"
    >
      <div className="flex items-center">
        <div className="flex w-full justify-between gap-2 md:justify-normal">
          <span className="text-lg font-bold">{title}</span>
          <button className="flex size-7 items-center justify-center rounded-[14px] bg-[#f2f2f2]">
            <ArrowRight className="size-4 text-[#222222]" />
          </button>
        </div>
        <div className="ml-auto hidden flex-row gap-1 md:flex">
          <CarouselPrevButton />
          <CarouselNextButton />
        </div>
      </div>

      <CarouselContent>
        {items.map((el) => (
          <CarouselItem
            key={el.id}
            className="flex basis-1/2 flex-col md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
          >
            <AspectRatio ratio={20 / 19} className="relative">
              <Image
                fill
                src={"/images/1.jpeg"}
                alt={el.title}
                className="rounded-[20px] object-cover"
              />
              <div className="absolute top-0 flex w-full items-center justify-between p-3">
                <button className="top-1 right-1 flex h-[25.6px] max-w-full items-center justify-center rounded-[14px] bg-white/80 px-[9.5px] py-[5.5px] text-[12px] font-medium text-nowrap text-[#222222] capitalize">
                  {el.badge}
                </button>
                <button className="right-1 flex size-8 items-center justify-center">
                  <Heart
                    className="size-6 fill-black/50 text-white"
                    strokeWidth={1.5}
                  />
                </button>
              </div>
            </AspectRatio>
            <div className="flex flex-col">
              <span className="text-[13px] text-[#222]">{el.title}</span>
              <span className="text-[12px] text-[#6a6a6a]">{el.hostType}</span>
              <span className="text-[12px] text-[#6a6a6a]">
                &euro;{el.pricePreview.total}total{" "}
                <span className="text-[#c1c1c1">.</span> &#9733;{" "}
                {el.rating.average}
              </span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
