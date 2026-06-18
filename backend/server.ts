import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

process.on("uncaughtException", (err: Error) => {
  console.log("Uncaught Exception 💥 Shutting Down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE_LOCAL as string;

/* ---------------- DB CONNECT ---------------- */

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB Connection Successful!");
  })
  .catch((err: Error) => {
    console.log("DB Connection Failed 💥", err);
  });

/* ---------------- SERVER START ---------------- */

const port: number = Number(process.env.PORT) || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

/* ---------------- UNHANDLED REJECTION ---------------- */

process.on("unhandledRejection", (err: Error) => {
  console.log("Unhandled Rejection 💥 Shutting Down...");
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
