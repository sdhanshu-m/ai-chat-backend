export class AppError extends Error {
  constructor(message, code = "INTERNAL_SERVER_ERROR", statusCode = 500) {
    super(message);

    this.code = code;
    this.statusCode = statusCode;

    // maintain proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}