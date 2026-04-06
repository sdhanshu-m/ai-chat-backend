import { sendResponse } from "../utils/response.js";
import { logger } from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
  logger.error("Global Error Handler", {
    path: req.originalUrl,
    method: req.method,
    error: err.message,
    code: err.code,
  });

  return sendResponse(res, {
    success: false,
    message: err.message || "Internal Server Error",
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      details: err.stack,
    },
    statusCode: err.statusCode || 500,
  });
};