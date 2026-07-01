import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

const MAX_VISIBLE_ITEMS = 7;

// index -> which breakpoint it should disappear at
function getVisibilityClass(index: number) {
  if (index < 2) return ""; // always visible (mobile: 2)
  if (index < 4) return "hidden md:flex"; // visible from md (4)
  if (index < 5) return "hidden lg:flex"; // visible from lg (5)
  if (index < 6) return "hidden xl:flex"; // visible from xl (6)
  return "hidden 2xl:flex"; // visible from 2xl (7)
}

export default function ContentCarouselSkeleton() {
  return (
    <div className="flex w-full flex-col gap-2 px-6">
      <div className="flex items-center">
        <div className="flex w-full justify-between gap-2 md:justify-normal">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="size-7 rounded-[14px]" />
        </div>
        <div className="ml-auto hidden flex-row gap-1 md:flex">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="-ml-4 flex">
          {Array.from({ length: MAX_VISIBLE_ITEMS }).map((_, i) => (
            <div
              key={i}
              className={`${getVisibilityClass(i)} basis-1/2 flex-col gap-2 pl-4 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-1/7`}
            >
              <AspectRatio ratio={20 / 19} className="relative">
                <Skeleton className="size-full rounded-[20px]" />
              </AspectRatio>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-3.5 w-4/5" />
                <Skeleton className="h-3 w-2/5" />
                <Skeleton className="h-3 w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
