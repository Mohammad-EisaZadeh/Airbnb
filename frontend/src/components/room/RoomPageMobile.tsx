"use client";
import { useRoom } from "@/features/room/hooks/useRoom";
import RoomGallery from "./RoomGallery";
import RoomContent from "./RoomContent";
type Props = {
  adults?: string;
  check_in?: string;
  check_out?: string;
  photo_id?: string;
};

export default function RoomPageMobile({
  searchParams,
  id,
}: {
  searchParams: Props;
  id: string;
}) {
  const { data } = useRoom(id);
  const listing = data?.data.listing;
  if (!listing) return null;
  const { images } = listing;
  return (
    <>
      <RoomGallery images={images} />
      <RoomContent listing={listing} />{" "}
      <div className="fixed bottom-0 left-0 flex w-full justify-between px-6 pt-3 pb-4">
        <div className="flex flex-col">
          <span></span>
          <span></span>
        </div>
        <button>Reserve</button>
      </div>
    </>
  );
}
