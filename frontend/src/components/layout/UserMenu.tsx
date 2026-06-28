import { Separator } from "@/components/ui/separator";
import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function UserMenu() {
  return (
    <>
      <Link
        href="/#"
        className="flex cursor-pointer items-center gap-2 px-6 py-2.25 hover:bg-[#f7f7f7]"
      >
        <CircleQuestionMark />
        <span>Help Center</span>
      </Link>
      <Separator className="my-2" />
      <Link
        href="/#"
        className="flex cursor-pointer flex-row gap-2 px-6 py-1 hover:bg-[#f7f7f7]"
      >
        <div className="flex flex-col">
          <span className="text-[12px] text-[#222222]">Become a host</span>
          <span className="text-[12px] text-[#6a6a6a]">
            it`s easy to start hosting and earn extra income
          </span>
        </div>
        <Image
          width={60}
          height={60}
          alt="DefaultUserProfile.png"
          src="/images/DefaultUserProfile.png"
        />
      </Link>
      <Separator className="my-2" />
      <Link
        href="/#"
        className="cursor-pointer px-6 py-2.25 hover:bg-[#f7f7f7]"
      >
        Refer a Host
      </Link>
      <Link
        href="/#"
        className="cursor-pointer px-6 py-2.25 hover:bg-[#f7f7f7]"
      >
        Find a co-host
      </Link>
      <Link
        href="/#"
        className="cursor-pointer px-6 py-2.25 hover:bg-[#f7f7f7]"
      >
        Gift cards
      </Link>
      <Separator className="my-2" />
      <Link
        href="/#"
        className="cursor-pointer px-6 py-2.25 hover:bg-[#f7f7f7]"
      >
        Log in or sign up
      </Link>
    </>
  );
}
