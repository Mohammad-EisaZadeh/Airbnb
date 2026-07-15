"use client";

import { useRoom } from "@/features/room/hooks/useRoom";

type Props = {
  adults?: string;
  check_in?: string;
  check_out?: string;
  photo_id?: string;
};

export default function RoomPageDesktop({
  searchParams,
  id,
}: {
  searchParams: Props;
  id: string;
}) {
  const { data, isLoading } = useRoom(id);
  console.log(data);
  return <div></div>;
}
