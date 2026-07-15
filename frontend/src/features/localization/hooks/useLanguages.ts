"use client";
import { useQuery } from "@tanstack/react-query";
import { getLanguages } from "../api/getLanguages";

export const useLanguages = () => {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () => getLanguages(),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
