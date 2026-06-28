"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchUIProvider } from "@/context/SearchUIContext";
import { LocaleProvider } from "@/context/LocaleContext";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider>
        <SearchUIProvider>{children}</SearchUIProvider>
      </LocaleProvider>
    </QueryClientProvider>
  );
}
