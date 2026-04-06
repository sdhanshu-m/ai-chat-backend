import { AppError } from "../utils/appError.js";

export const premiumMiddleware = (req, res, next) => {
  if (!req.user.isPremium) {
    throw new AppError("Upgrade to premium", "PREMIUM_REQUIRED", 403);
  }
  next();
};