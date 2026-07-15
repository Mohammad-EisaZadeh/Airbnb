/**
 * Reusable CRUD factory functions shared across resource controllers.
 * Keeps controllers thin — pass a Mongoose model and get standard handlers back.
 *
 * Usage for your Listing model:
 *   export const getListing = getOne(Listing, { resourceName: "listing", popOptions: "host" });
 *   export const getAllListings = getAll(Listing, { resourceName: "listings" });
 *   export const createListing = createOne(Listing, { resourceName: "listing" });
 *   export const updateListing = updateOne(Listing, { resourceName: "listing" });
 *   export const deleteListing = deleteOne(Listing);
 */

import { Request, Response, NextFunction } from "express";
import { Model, Document, PopulateOptions } from "mongoose";
import APIFeatures from "./APIFeatures";
import AppError from "./appError";
import catchAsync from "./catchAsync";

type ResourceOptions = {
  /** Key used in the JSON response, e.g. "listing" -> { data: { listing } } */
  resourceName: string;
};

type GetOneOptions = ResourceOptions & {
  popOptions?: string | PopulateOptions | PopulateOptions[];
};

type NestedFilterOptions = {
  /** e.g. { paramName: "listingId", field: "listing" } for GET /listings/:listingId/reviews */
  paramName: string;
  field: string;
};

type GetAllOptions = ResourceOptions & {
  nestedFilter?: NestedFilterOptions;
};

/** DELETE /:id — remove a document */
export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID.", 404));
    }

    res.status(204).json({ status: "success", data: null });
  });

/** PATCH /:id — update a document and return the new version */
export const updateOne = <T>(
  Model: Model<T>,
  { resourceName }: ResourceOptions,
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError("No document found with that ID.", 404));
    }

    res.status(200).json({ status: "success", data: { [resourceName]: doc } });
  });

/** POST / — create a new document */
export const createOne = <T>(
  Model: Model<T>,
  { resourceName }: ResourceOptions,
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.create(req.body);

    // Fixed: was previously double-nested as { data: { data: doc } }
    res.status(201).json({ status: "success", data: { [resourceName]: doc } });
  });

/** GET /:id — fetch a single document, optionally populated */

export const getOne = <T>(
  Model: Model<T>,
  { resourceName, popOptions }: GetOneOptions,
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
      if (typeof popOptions === "string") {
        query = query.populate(popOptions);
      } else {
        query = query.populate(popOptions);
      }
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID.", 404));
    }

    res.status(200).json({ status: "success", data: { [resourceName]: doc } });
  });

/** GET / — list documents with filtering, sorting, pagination */
export const getAll = <T extends Document>(
  Model: Model<T>,
  { resourceName, nestedFilter }: GetAllOptions,
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Fixed: was hardcoded to "tourId"/"tour" (leftover from a tours-app
    // tutorial). Now configurable per-route, e.g. for
    // GET /listings/:listingId/reviews you'd pass
    // { paramName: "listingId", field: "listing" }.
    let filter = {};
    if (nestedFilter && req.params[nestedFilter.paramName]) {
      filter = { [nestedFilter.field]: req.params[nestedFilter.paramName] };
    }

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: { [resourceName]: doc },
    });
  });
