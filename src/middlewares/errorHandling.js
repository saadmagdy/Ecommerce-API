import apiError from "../utils/apiError.js";

export const errorHandler = (err, req, res, next) => {
  let message = err.message;
  let statusCode = err.statusCoude === 200 ? 500 : err.statusCode;
  if (err.name === "CastError" || err.kind === "ObjectId") {
    message = `Resource not found`;
    statusCode = 404;
  }
  return res.status(statusCode || 500).json({
    message,
    statusCode,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export const notFound = (req, res, next) => {
  return next(apiError.create(`Not Found - ${req.originalUrl}`, 404));
};
