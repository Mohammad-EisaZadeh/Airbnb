import { usePathname } from "next/navigation";

export function useMapMode() {
  const pathname = usePathname();

  return {
    isMapPage: pathname.endsWith("/map"),
  };
}
