import fs from "fs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

import { ListingModel } from "../models/listingModel"; //

dotenv.config({ path: path.join(__dirname, "../../config.env") });

const DB = process.env.DATABASE_LOCAL as string;

/* ---------------- DB CONNECT ---------------- */

mongoose
  .connect(DB)
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => console.log("DB Connection Failed 💥", err));

/* ---------------- READ JSON ---------------- */

const listings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "listings.json"), "utf-8"),
);

/* ---------------- IMPORT DATA ---------------- */

const importData = async (): Promise<void> => {
  try {
    await ListingModel.insertMany(listings, {});

    console.log("Data Successfully Loaded In The Database");
  } catch (err) {
    console.log("Import Error 💥", err);
  }

  process.exit();
};

/* ---------------- DELETE DATA ---------------- */

const deleteData = async (): Promise<void> => {
  try {
    await ListingModel.deleteMany();

    console.log("Data Successfully Deleted From The Database");
  } catch (err) {
    console.log("Delete Error 💥", err);
  }

  process.exit();
};

/* ---------------- CLI CONTROL ---------------- */

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
