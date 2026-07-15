/**
 * Builds a Mongoose query from URL search params.
 * Supports filtering, sorting, field limiting, and pagination.
 * Methods are chainable: .filter().sort().limitFields().paginate()
 */
import { Query, Document } from "mongoose";
import { ParsedQs } from "qs";

class APIFeatures<T extends Document> {
  query: Query<T[], T>;
  queryString: ParsedQs;

  constructor(query: Query<T[], T>, queryString: ParsedQs) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    // 1A) Basic filtering — e.g. ?duration=5&difficulty=easy
    const queryObj: Record<string, unknown> = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort(): this {
    // e.g. ?sort=price,-ratingsAverage  (prefix - for descending)
    if (this.queryString.sort) {
      const sortBy = (this.queryString.sort as string).split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields(): this {
    // e.g. ?fields=name,price  (projection / field limiting)
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate(): this {
    // e.g. ?page=2&limit=10
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
