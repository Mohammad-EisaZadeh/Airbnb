import express, { Router } from "express";
import homeController from "../controllers/homeController";

const router: Router = express.Router();

/* ---------------- ROUTES ---------------- */

router.get("/", homeController.getHome);

export default router;
