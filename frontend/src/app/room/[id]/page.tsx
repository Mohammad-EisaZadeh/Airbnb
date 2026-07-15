import RoomPageDesktop from "@/components/room/RoomPageDesktop";
import RoomPageMobile from "@/components/room/RoomPageMobile";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    adults?: string;
    check_in?: string;
    check_out?: string;
    photo_id?: string;
  }>;
};

export default async function RoomPage({ params, searchParams }: Props) {
  const { id } = await params;
  const query = await searchParams;

  return (
    <>
      <div className="relative md:hidden">
        <RoomPageMobile id={id} searchParams={query} />
      </div>
      <div className="hidden md:block">
        <RoomPageDesktop id={id} searchParams={query} />
      </div>
    </>
  );
}
