import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { generateToken } from "../utils/jwt.js";
import { AppError } from "../utils/appError.js";
import { ERROR_CODES } from "../constants/errorCodes.js";

/**
 * Utility to remove sensitive fields
 */
const sanitizeUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  isPremium: user.isPremium,
});

/**
 * REGISTER
 */
export const registerUser = async ({ email, password, name }) => {
  // check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new AppError(
      "Email already exists",
      ERROR_CODES.EMAIL_EXISTS,
      400
    );
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // generate token
  const token = generateToken({ id: user.id });

  return {
    user: sanitizeUser(user),
    token,
  };
};

/**
 * LOGIN
 */
export const loginUser = async ({ email, password }) => {
  // find user
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError(
      "User not found",
      ERROR_CODES.USER_NOT_FOUND,
      404
    );
  }

  // compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(
      "Invalid password",
      ERROR_CODES.INVALID_PASSWORD,
      400
    );
  }

  // generate token
  const token = generateToken({ id: user.id });

  return {
    user: sanitizeUser(user),
    token,
  };
};

/**
 * GET ME
 */
export const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new AppError(
      "User not found",
      ERROR_CODES.USER_NOT_FOUND,
      404
    );
  }

  return sanitizeUser(user);
};