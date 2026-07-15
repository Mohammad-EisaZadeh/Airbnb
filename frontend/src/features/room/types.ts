import type { Listing } from "@/types/listing";

export type RoomPageResponse = {
  status: "success";
  data: {
    listing: Listing;
  };
};
