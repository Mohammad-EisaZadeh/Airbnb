import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";

import { ListingModel } from "../models/listingModel";
import { LanguageRegionModel } from "../models/LanguageRegionModel";
import { CurrencyModel } from "../models/currencyModel";

dotenv.config({ path: path.join(__dirname, "../../config.env") });

const DB =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE
    : process.env.DATABASE_LOCAL;

if (!DB) {
  throw new Error("Database connection string is not defined");
}

mongoose.connect(DB).then(() => {
  console.log("DB Connection Successful!");
});

/* ---------------- READ JSON ---------------- */

const listings = JSON.parse(
  fs.readFileSync(path.join(__dirname, "listings.json"), "utf-8"),
);

const languageRegions = JSON.parse(
  fs.readFileSync(path.join(__dirname, "language-regions.json"), "utf-8"),
);

const currencies = JSON.parse(
  fs.readFileSync(path.join(__dirname, "currencies.json"), "utf-8"),
);

/* ---------------- IMPORT DATA ---------------- */

const importData = async () => {
  try {
    await ListingModel.insertMany(listings);
    await LanguageRegionModel.insertMany(languageRegions);
    await CurrencyModel.insertMany(currencies);

    console.log("✅ Data imported successfully.");
  } catch (err) {
    console.error(err);
  }

  process.exit();
};

/* ---------------- DELETE DATA ---------------- */

const deleteData = async () => {
  try {
    await ListingModel.deleteMany();
    await LanguageRegionModel.deleteMany();
    await CurrencyModel.deleteMany();

    console.log("✅ Data deleted successfully.");
  } catch (err) {
    console.error(err);
  }

  process.exit();
};

/* ---------------- CLI CONTROL ---------------- */

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
