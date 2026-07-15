import express, { Router } from "express";
import listingController from "../controllers/listingController";

const router: Router = express.Router();

router.get("/:id", listingController.getListing);

export default router;
