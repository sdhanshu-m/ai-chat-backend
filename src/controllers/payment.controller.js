import * as paymentService from "../services/payment.service.js";
import { sendResponse } from "../utils/response.js";
import { logger } from "../config/logger.js";

export const createOrder = async (req, res, next) => {
  try {
    const data = await paymentService.createOrder({
      amount: req.body.amount,
      userId: req.user.id,
    });

    logger.info("Payment Controller - CreateOrder Success", {
      controller: "payment",
      action: "createOrder",
      userId: req.user.id,
      amount: req.body.amount,
    });

    sendResponse(res, {
      success: true,
      message: "Order created",
      data,
    });
  } catch (err) {
    logger.error("Payment Controller - CreateOrder Failed", {
      controller: "payment",
      action: "createOrder",
      userId: req.user?.id,
      error: err.message,
    });
    next(err);
  }
};

export const verifyPayment = async (req, res, next) => {
  try {
    const data = await paymentService.verifyPayment({
      ...req.body,
      userId: req.user.id,
    });

    logger.info("Payment Controller - Verify Success", {
      controller: "payment",
      action: "verifyPayment",
      userId: req.user.id,
    });

    sendResponse(res, {
      success: true,
      message: "Payment verified",
      data,
    });
  } catch (err) {
    logger.error("Payment Controller - Verify Failed", {
      controller: "payment",
      action: "verifyPayment",
      userId: req.user?.id,
      error: err.message,
    });
    next(err);
  }
};