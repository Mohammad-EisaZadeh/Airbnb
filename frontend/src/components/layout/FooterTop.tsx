import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
const tabs = [
  {
    id: "1",
    title: "همه",
    content: <div>محتوای همه</div>,
  },
  {
    id: "2",
    title: "فیلم",
    content: <div>محتوای فیلم‌ها</div>,
  },
  {
    id: "3",
    title: "سریال",
    content: <div>محتوای سریال‌ها</div>,
  },
  {
    id: "4",
    title: "انیمه",
    content: <div>محتوای انیمه‌ها</div>,
  },
  {
    id: "5",
    title: "مستند",
    content: <div>محتوای مستندها</div>,
  },
  {
    id: "6",
    title: "ورزشی",
    content: <div>محتوای ورزشی</div>,
  },
];
export default function FooterTop() {
  return (
    <Tabs defaultValue={tabs[0].id}>
      <TabsList className="h-auto w-full bg-transparent p-0">
        <Carousel
          className="w-full"
          opts={{
            dragFree: true,
            containScroll: "trimSnaps",
          }}
        >
          <CarouselContent className="-ml-2">
            {tabs.map((tab) => (
              <CarouselItem key={tab.id} className="basis-auto pl-2">
                <TabsTrigger value={tab.id}>{tab.title}</TabsTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
