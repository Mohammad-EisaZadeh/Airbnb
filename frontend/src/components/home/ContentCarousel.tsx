import { ArrowRight, Heart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import CarouselNextButton from "./CarouselNextButton";
import CarouselPrevButton from "./CarouselPrevButton";
import Image from "next/image";
import { ListingCardDTO } from "@/features/home/types";
import Link from "next/link";

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
          <button className="flex size-7 cursor-pointer items-center justify-center rounded-[14px] bg-[#f2f2f2]">
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
            className="flex basis-1/2 cursor-pointer flex-col md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7"
          >
            <Link href={`/room/${el.id}`}>
              <AspectRatio ratio={20 / 19} className="relative">
                <Image
                  fill
                  src={`${process.env.NODE_ENV === "development" ? "/images/1.jpeg" : el.coverImage}`}
                  alt={el.title}
                  className="rounded-[20px] object-cover"
                />
                <div className="absolute top-0 flex w-full items-center justify-between p-3">
                  {el.badge && (
                    <button className="top-1 right-1 flex h-[25.6px] max-w-full items-center justify-center rounded-[14px] bg-white/80 px-[9.5px] py-[5.5px] text-[12px] font-medium text-nowrap text-[#222222] capitalize">
                      {el.badge.replaceAll("_", " ")}
                    </button>
                  )}
                  <button className="right-1 ml-auto flex size-8 cursor-pointer items-center justify-center">
                    <Heart
                      className="size-6 fill-black/50 text-white"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </AspectRatio>
              <div className="flex flex-col">
                <span className="text-[13px] text-[#222]">{el.title}</span>
                <span className="text-[12px] text-[#6a6a6a]">
                  {el.hostType}
                </span>
                <span className="text-[12px] text-[#6a6a6a]">
                  &euro;{el.pricePreview.total}total{" "}
                  <span className="text-[#c1c1c1">.</span> &#9733;{" "}
                  {el.rating.average}
                </span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
