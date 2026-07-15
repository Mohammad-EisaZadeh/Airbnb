import { getOne } from "../utils/handlerFactory";
import { ListingModel } from "../models/listingModel";

const getListing = getOne(ListingModel, {
  resourceName: "listing",
  popOptions: {
    path: "host",
  },
});

export default {
  getListing,
};
