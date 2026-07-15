"use client";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { House, Layers2, Maximize2, XIcon } from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMapMode } from "@/features/map/hooks/useMapMode";
const html = renderToStaticMarkup(
  <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-black">
    <House className="text-white" />
    <div className="absolute -bottom-0.5 size-4 rotate-45 bg-black"></div>
  </div>,
);
const markerIcon = L.divIcon({
  className: "",
  html,
  iconSize: [60, 30],
  iconAnchor: [30, 15],
});

export default function Map() {
  const [mapType, setMapType] = useState<"street" | "satellite">("street");
  const { isMapPage } = useMapMode();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClick = () => {
    router.push(`${pathname}/map?${searchParams.toString()}`);
  };
  return (
    <MapContainer
      dragging={isMapPage}
      scrollWheelZoom={isMapPage}
      doubleClickZoom={isMapPage}
      touchZoom={isMapPage}
      boxZoom={isMapPage}
      keyboard={isMapPage}
      zoomControl={false}
      attributionControl={false}
      center={[50.0861177, 14.4512026]}
      zoom={14}
      className={cn(
        "w-full",
        isMapPage ? "h-screen" : "h-108",
        "rounded-[10px]",
        "relative",
      )}
    >
      {mapType === "street" ? (
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
      ) : (
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="Tiles © Esri"
        />
      )}

      <Marker icon={markerIcon} position={[50.0861177, 14.4512026]} />
      <div className="absolute top-0 right-0 z-10000 flex flex-col gap-2 p-2">
        {isMapPage ? (
          <button
            onClick={() => router.back()}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white"
          >
            <XIcon className="size-4" />
          </button>
        ) : (
          <button
            onClick={handleClick}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white"
          >
            <Maximize2 className="size-4" />
          </button>
        )}
        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white">
          <Layers2 className="size-4" />
        </button>
      </div>
    </MapContainer>
  );
}
