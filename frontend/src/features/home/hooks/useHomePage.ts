"use client";
import { useQuery } from "@tanstack/react-query";
import { getHomePage } from "../api/getHomePage";

export const useHomePage = (city?: string) => {
  return useQuery({
    queryKey: ["home", city],
    queryFn: () => getHomePage(city),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
