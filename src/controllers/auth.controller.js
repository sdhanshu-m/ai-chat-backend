import * as authService from "../services/auth.service.js";
import { sendResponse } from "../utils/response.js";
import { logger } from "../config/logger.js";

export const register = async (req, res, next) => {
  try {
    const data = await authService.registerUser(req.body);

    logger.info("Auth Controller - Register Success", {
      controller: "auth",
      action: "register",
      email: req.body.email,
    });

    sendResponse(res, {
      success: true,
      message: "User registered",
      data,
    });
  } catch (err) {
    logger.error("Auth Controller - Register Failed", {
      controller: "auth",
      action: "register",
      email: req.body.email,
      error: err.message,
    });
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);

    logger.info("Auth Controller - Login Success", {
      controller: "auth",
      action: "login",
      email: req.body.email,
    });

    sendResponse(res, {
      success: true,
      message: "Login successful",
      data,
    });
  } catch (err) {
    logger.error("Auth Controller - Login Failed", {
      controller: "auth",
      action: "login",
      email: req.body.email,
      error: err.message,
    });
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);

    logger.info("Auth Controller - GetMe Success", {
      controller: "auth",
      action: "getMe",
      userId: req.user.id,
    });

    sendResponse(res, {
      success: true,
      message: "User fetched",
      data: user,
    });
  } catch (err) {
    logger.error("Auth Controller - GetMe Failed", {
      controller: "auth",
      action: "getMe",
      userId: req.user?.id,
      error: err.message,
    });
    next(err);
  }
};