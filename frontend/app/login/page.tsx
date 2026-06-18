"use client";
import DesktopHeader from "@/_components/layout/DesktopHeader";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [focused, setFocused] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 hidden w-full md:block">
        <DesktopHeader />
      </div>
      <div className="relative h-full w-full md:h-[calc(100vh-96px)]">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/images/loginBackGround.jpg')] bg-cover bg-center" />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="flex h-full w-full flex-col items-center rounded-none bg-white p-6 pt-16 md:h-auto md:min-h-100 md:max-w-120 md:rounded-4xl">
            <Image
              alt="Logo"
              width={40}
              height={40}
              src="/images/Small-Logo.png"
              className="mb-4"
            />
            <span className="mb-8 text-[26px] font-semibold">
              Log in or sign up
            </span>
            <Input
              onFocus={() => setFocused(true)}
              type="email"
              className="rounded-xl border border-[#6c6c6c] py-8 transition-all duration-300 hover:border-[#222] focus-visible:border-black focus-visible:ring-0 focus-visible:outline-none"
              placeholder="Phone number or email"
            />
            {focused && (
              <div className="flex flex-col">
                <span className="text-[12px] text-[#6a6a6a]">
                  We’ll send a confirmation code by text or email. Message and
                  data rates apply.
                </span>
                <Link
                  href="Privacy Policy"
                  className="text-[12px] font-medium text-black"
                >
                  Privacy Policy
                </Link>
              </div>
            )}
            <button className="mt-4 w-full cursor-pointer rounded-xl bg-linear-to-r from-[rgb(230,30,77)] via-[rgb(227,28,95)] to-[rgb(215,4,102)] py-3 text-white">
              Continue
            </button>{" "}
            <div className="my-6 flex w-full items-center gap-4">
              <Separator className="flex-1 bg-[#ebebeb]" />

              <span className="text-sm">or</span>

              <Separator className="flex-1 bg-[#ebebeb]" />
            </div>
            <div className="flex gap-3">
              <Button className="size-12 cursor-pointer border border-[#dddddd] bg-transparent hover:border-[#222] hover:bg-transparent">
                <Image
                  src="/icons/googleIcon.png"
                  alt="Google Icon"
                  width={20}
                  height={20}
                />
              </Button>
              <Button className="size-12 cursor-pointer border border-[#dddddd] bg-transparent hover:border-[#222] hover:bg-transparent">
                <Image
                  src="/icons/appleIcon.png"
                  alt="Apple Icon"
                  width={20}
                  height={20}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
