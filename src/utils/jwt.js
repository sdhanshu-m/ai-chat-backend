import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Generate JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN || "1d",
  });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, env.JWT_SECRET);
};