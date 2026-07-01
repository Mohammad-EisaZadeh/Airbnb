"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchUIProvider } from "@/context/SearchUIContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FormProvider } from "react-hook-form";
import { useSearchForm } from "@/features/search/hooks/useSearchForm";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  const form = useSearchForm();
  return (
    <QueryClientProvider client={queryClient}>
      {" "}
      <FormProvider {...form}>
        <LocaleProvider>
          <SearchUIProvider>{children}</SearchUIProvider>
        </LocaleProvider>{" "}
      </FormProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
