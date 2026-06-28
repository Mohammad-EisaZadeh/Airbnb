import express, { Router } from "express";
import settingController from "../controllers/settingController";

const router: Router = express.Router();

/* ---------------- ROUTES ---------------- */

router.get("/languages", settingController.getLanguages);
router.get("/currencies", settingController.getCurrencies);

export default router;
