import winston from "winston";

const logFormat = winston.format.printf(
  ({ level, message, timestamp, ...meta }) => {
    return JSON.stringify({
      level,
      message,
      timestamp,
      ...meta,
    });
  }
);

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    logFormat
  ),
  transports: [new winston.transports.Console()],
});