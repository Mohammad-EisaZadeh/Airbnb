import Image from "next/image";

type Props = { reviews: number; rating: number };
export default function ListingMeta({ reviews, rating }: Props) {
  return (
    <div className="grid grid-cols-3 border-b py-6">
      <div className="flex flex-col items-center">
        <span className="text-[18px] font-medium">{rating}</span>
        <span className="flex text-[12px]">
          {Array.from({ length: Math.ceil(rating) }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </span>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 border-r border-l">
        <Image
          width={32}
          height={32}
          alt="Left-Wheat"
          src="/images/wheat-left.png"
        />
        <div className="flex flex-col items-center text-[14px] font-semibold">
          <span>Guest</span>
          <span>favorite</span>{" "}
        </div>

        <Image
          width={32}
          height={32}
          alt="Right-Wheat"
          src="/images/wheat-right.png"
        />
      </div>
      <div className="flex flex-col items-center text-[14px] font-semibold">
        <span>{reviews}</span>
        <span>Reviews</span>
      </div>
    </div>
  );
}
