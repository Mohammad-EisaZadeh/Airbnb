import { Request, Response } from "express";
import { getHomePage } from "../services/homeService";

const getHome = async (req: Request, res: Response) => {
  const { city } = req.query;

  const data = await getHomePage(city as string);

  res.status(200).json({
    status: "success",
    data,
  });
};

export default {
  getHome,
};
