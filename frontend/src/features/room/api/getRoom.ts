import { api } from "@/lib/apiClient";
import type { RoomPageResponse } from "@/features/room/types";

export const getRoom = (id: string) => {
  return api<RoomPageResponse>(`/room/${id}`);
};
