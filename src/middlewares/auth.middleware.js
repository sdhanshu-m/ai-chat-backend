import { verifyToken } from "../utils/jwt.js";
import { AppError } from "../utils/appError.js";
import { prisma } from "../config/db.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized", ERROR_CODES.UNAUTHORIZED, 401);
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      throw new AppError("Invalid token", ERROR_CODES.INVALID_TOKEN, 401);
    }

    // fetch user (IMPORTANT for premium + validity)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      throw new AppError("User not found", ERROR_CODES.USER_NOT_FOUND, 404);
    }

    // attach full user (needed for premium middleware)
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      isPremium: user.isPremium,
    };

    next();
  } catch (err) {
    next(err);
  }
};