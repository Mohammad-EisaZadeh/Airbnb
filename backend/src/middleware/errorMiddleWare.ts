import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

/* ---------------- TYPES ---------------- */

interface MongoError extends Error {
  path?: string;
  value?: any;
  keyValue?: Record<string, any>;
  code?: number;
  errors?: Record<string, { message: string }>;
  isOperational?: boolean;
  statusCode?: number;
  status?: string;
}

/* ---------------- DB ERROR HANDLERS ---------------- */

// Invalid MongoDB ObjectId
const handleCastErrorDB = (err: MongoError) => {
  return new AppError(`Invalid ${err.path}: ${err.value}`, 400);
};

// Duplicate key error
const handleDuplicateFieldsDB = (err: MongoError) => {
  const value = err.keyValue ? JSON.stringify(err.keyValue) : "duplicate field";

  return new AppError(`Duplicate field value: ${value}`, 400);
};

// Validation error
const handleValidationErrorDB = (err: MongoError) => {
  const errors = err.errors
    ? Object.values(err.errors).map((el) => el.message)
    : [];

  return new AppError(`Invalid input data. ${errors.join(". ")}`, 400);
};

/* ---------------- JWT ERRORS ---------------- */

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again.", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired. Please log in again.", 401);

/* ---------------- DEV ERROR ---------------- */

const sendErrorDev = (err: MongoError, res: Response) => {
  return res.status(err.statusCode || 500).json({
    status: err.status || "error",
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

/* ---------------- PROD ERROR ---------------- */

const sendErrorProd = (err: MongoError, req: Request, res: Response) => {
  // API
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      return res.status(err.statusCode || 500).json({
        status: err.status,
        message: err.message,
      });
    }

    console.error("💥 UNKNOWN ERROR:", err);

    return res.status(500).json({
      status: "error",
      message: "Something went wrong. Please try again later.",
    });
  }

  // SSR (future use)
  if (err.isOperational) {
    return res.status(err.statusCode || 500).render("error", {
      title: "Error",
      msg: err.message,
    });
  }

  console.error("💥 UNKNOWN ERROR:", err);

  return res.status(500).render("error", {
    title: "Error",
    msg: "Please try again later.",
  });
};

/* ---------------- GLOBAL ERROR HANDLER ---------------- */

const globalErrorHandler = (
  err: MongoError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  const env = process.env.NODE_ENV;

  if (env === "development") {
    return sendErrorDev(err, res);
  }

  if (env === "production") {
    let error: MongoError = err;

    // Mongo / Mongoose errors
    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    // JWT errors
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    return sendErrorProd(error, req, res);
  }

  return res.status(500).json({
    status: "error",
    message: "Unknown environment configuration",
  });
};

export default globalErrorHandler;
