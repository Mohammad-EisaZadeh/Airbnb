"use client";
import { useLocale } from "@/context/LocaleContext";
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";

export default function LocaleDialog() {
  const { currency, setCurrency, language, setLanguage, isOpen, setIsOpen } =
    useLocale();
  //
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="h-full max-h-216.25 w-[90%] max-w-258">
        <DialogTitle className="sr-only">Search</DialogTitle>
        <Tabs defaultValue="currency">
          <TabsList>
            <TabsTrigger value="currency">Currency</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>

          <TabsContent value="currency">
            <button onClick={() => setCurrency("USD")}>USD</button>
            <button onClick={() => setCurrency("EUR")}>EUR</button>
            <button onClick={() => setCurrency("IRR")}>IRR</button>
          </TabsContent>

          <TabsContent value="language">
            <button onClick={() => setLanguage("en")}>English</button>
            <button onClick={() => setLanguage("fa")}>Persian</button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
