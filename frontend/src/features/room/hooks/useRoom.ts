"use client";
import { useQuery } from "@tanstack/react-query";
import { getRoom } from "../api/getRoom";

export const useRoom = (id: string) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => getRoom(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
