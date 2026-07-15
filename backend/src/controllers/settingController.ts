import { Request, Response } from "express";
import { getHomePage } from "../services/homeService";
import { LanguageRegionModel } from "../models/LanguageRegionModel";
import { CurrencyModel } from "../models/currencyModel";
import catchAsync from "../utils/catchAsync";
import { getAll } from "../utils/handlerFactory";

const getLanguages = getAll(LanguageRegionModel, { resourceName: "languages" });
const getCurrencies = getAll(CurrencyModel, {
  resourceName: "currencies",
});

export default {
  getLanguages,
  getCurrencies,
};
