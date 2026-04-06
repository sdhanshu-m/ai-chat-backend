import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

export default router;

// ----------------------------------- api docs ----------------------------------------------

/**
 * @swagger
 * /payments/create-order:
 *   post:
 *     summary: Create Razorpay order
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 49900
 *     responses:
 *       200:
 *         description: Order created
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Order created"
 *               data:
 *                 id: "order_xyz"
 *                 amount: 49900
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /payments/verify:
 *   post:
 *     summary: Verify Razorpay payment and upgrade user
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_order_id
 *               - razorpay_payment_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_order_id:
 *                 type: string
 *               razorpay_payment_id:
 *                 type: string
 *               razorpay_signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: Payment verified
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Payment verified"
 *               data:
 *                 success: true
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       400:
 *         description: Payment verification failed
 *       401:
 *         description: Unauthorized
 */