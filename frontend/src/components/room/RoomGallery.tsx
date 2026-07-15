"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
type Props = { images: string[] };

export default function RoomGallery({ images }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="relative">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {images.map((el, index) => (
            <CarouselItem className="m-0 p-0" key={index}>
              <AspectRatio ratio={100 / 95}>
                <Image
                  fill
                  src={`${process.env.NODE_ENV === "development" ? "/images/1.jpeg" : el}`}
                  alt={el}
                  className="object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="absolute top-0 flex w-full items-center px-3.25 py-2.5">
        <button
          onClick={() => router.back()}
          className="mr-auto flex size-10 cursor-pointer items-center justify-center rounded-full bg-[rgba(250,250,250,0.72)]"
        >
          <ArrowLeft className="size-4" />
        </button>

        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-[rgba(250,250,250,0.72)]">
          <Upload className="size-4" />
        </button>

        <button className="ml-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-[rgba(250,250,250,0.72)]">
          <Heart className="size-4" />
        </button>
      </div>
      <div className="absolute right-3 bottom-13 flex items-center justify-between rounded-[6px] bg-black/50 px-3 py-px text-[14px] font-medium text-white">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}
