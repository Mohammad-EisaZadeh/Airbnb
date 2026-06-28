"use client";
import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../api/getCurrencies";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["Currencies"],
    queryFn: () => getCurrencies(),

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
  });
};
