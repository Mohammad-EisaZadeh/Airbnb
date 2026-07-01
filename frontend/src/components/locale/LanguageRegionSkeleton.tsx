import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_ITEM_COUNT = 45; // ~3 rows at the widest breakpoint (xl:grid-cols-5)

export default function LanguageRegionSkeleton() {
  return (
    <>
      <div className="my-12 flex w-fit items-center gap-6 self-start bg-[#f7f7f7] p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="size-4" />
          </div>
          <Skeleton className="h-3.5 w-64" />
        </div>
        <Skeleton className="h-6 w-11 rounded-full" />
      </div>
      <h1 className="text-2xl">Choose a language and region</h1>
      <div className="grid grid-cols-2 gap-4 px-2 py-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: SKELETON_ITEM_COUNT }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-1.5 rounded-[8px] border border-transparent px-3 py-2.5"
          >
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3.5 w-1/2" />
          </div>
        ))}
      </div>
    </>
  );
}
