import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import compression from "compression";
import morgan from "morgan";

import globalErrorHandler from "./src/middleware/errorMiddleWare";

import homeRouter from "./src/routes/homeRouter";

const app: Application = express();
const allowedOrigins = [
  "http://localhost:3000",

  "http://127.0.0.1:3000",

  "https://your-frontend.vercel.app",
];
/* ---------------- SECURITY ---------------- */

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

/* ---------------- RATE LIMIT ---------------- */

app.use(
  rateLimit({
    max: 100,
    windowMs: 15 * 60 * 1000,
    message: "Too many requests from this IP, please try again later.",
  }),
);

/* ---------------- BODY PARSERS ---------------- */

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

/* ---------------- DATA SANITIZATION ---------------- */

app.use(hpp({}));

/* ---------------- PERFORMANCE ---------------- */

app.use(compression());

/* ---------------- LOGGING ---------------- */

app.use(morgan("dev"));

/* ---------------- ROUTES ---------------- */

app.use("/api/v1/home", homeRouter);

/* ---------------- 404 HANDLER ---------------- */

app.all(/.*/, (req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

/* ---------------- GLOBAL ERROR HANDLER ---------------- */

app.use(globalErrorHandler);

export default app;
