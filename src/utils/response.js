import crypto from "crypto";

export const sendResponse = (
  res,
  {
    success,
    message,
    data = null,
    error = null,
    statusCode = 200,
  }
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    error,
    meta: {
      requestId: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    },
  });
};