"use client";
import { useLocale } from "@/features/localization/context/LocaleContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import { Separator } from "../ui/separator";
import LanguageRegion from "./LanguageRegion";
import Currency from "./Currency";

export default function LocaleDialog() {
  const { isOpen, setIsOpen } = useLocale();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[calc(100vh-80px)] max-h-875 w-[calc(100%-80px)] max-w-258 flex-col px-6 py-0"
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        <DialogClose className="top-6 left-6 h-16 w-full" asChild>
          <button type="button">
            <X className="size-5" />
          </button>
        </DialogClose>

        <div className="h-full overflow-scroll">
          <Tabs defaultValue="overview" className="h-full">
            <TabsList variant="line">
              <TabsTrigger value="overview">Language and region</TabsTrigger>

              <TabsTrigger value="analytics">Currency</TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="overview">
              <LanguageRegion />
            </TabsContent>
            <TabsContent value="analytics">
              <Currency />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
