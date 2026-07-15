import Image from "next/image";
import { Host } from "@/types/listing";

export default function HostedBy({ host }: { host: Host }) {
  return (
    <div className="flex w-full flex-row items-center gap-5 py-5">
      <div className="relative h-10 w-10">
        <Image
          fill
          className="rounded-full"
          alt="Host-Avatar"
          src="/images/1.jpeg"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-medium">Hosted by Mmd</span>
        <span className="text-[14px] text-[#6c6c6c]">
          Superhost &middot; 2 years hosting
        </span>
      </div>
    </div>
  );
}
