import app from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";
import { prisma } from "./config/db.js";

const startServer = async () => {
  try {
    // DB connection check
    await prisma.$connect();
    logger.info("Database connected");

    app.listen(env.PORT, () => {
      logger.info(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    logger.error("Server startup failed", {
      error: error.message,
    });
    process.exit(1);
  }
};

startServer();

// ok new approach