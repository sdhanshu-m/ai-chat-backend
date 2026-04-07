import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { swaggerDocs } from "./docs/swagger.js";

const app = express();

/**
 * Core Middlewares
 */
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL_1,
      process.env.FRONTEND_URL_2,
    ],
    credentials: true,
  })
);
app.use(express.json());

/**
 * Health Check (optional but useful)
 */
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

/**
 * Routes
 */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/payments", paymentRoutes);

/**
 * Swagger Docs
 */
swaggerDocs(app);

/**
 * Global Error Handler (ALWAYS LAST)
 */
app.use(errorMiddleware);

export default app;
