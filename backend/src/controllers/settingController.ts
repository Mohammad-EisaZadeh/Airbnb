import { Request, Response } from "express";
import { getHomePage } from "../services/homeService";
import { LanguageRegionModel } from "../models/LanguageRegionModel";
import { CurrencyModel } from "../models/currencyModel";

const getLanguages = async (req: Request, res: Response) => {
  const data = await LanguageRegionModel.find();

  res.status(200).json({
    status: "success",
    data,
  });
};
const getCurrencies = async (req: Request, res: Response) => {
  const data = await CurrencyModel.find();

  res.status(200).json({
    status: "success",
    data,
  });
};
export default {
  getLanguages,
  getCurrencies,
};
