import Razorpay from "razorpay";
import crypto from "crypto";
import { prisma } from "../config/db.js";
import { AppError } from "../utils/appError.js";

// razorpay instance (keys used here)
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// createOrder
export const createOrder = async ({ amount, userId }) => {
  console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_ID);
  console.log("RAZORPAY KEY:", process.env.RAZORPAY_KEY_SECRET);
  try {
  const order = await razorpay.orders.create({
    amount: Number(amount),
    currency: "INR",
    receipt: `rcpt_${Math.random().toString(36).substring(2, 10)}`, // receipt: the length must be no more than 40. (always sort it - it always gives error)
  });

  return order;
} catch (err) {
  console.error("RAZORPAY ERROR FULL:", err);
  throw err;
}
};


// verifyPayment
export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
  userId,
}) => {
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expected !== razorpay_signature) {
    throw new AppError("Payment verification failed", "PAYMENT_FAILED", 400);
  }

  // upgrade user
  await prisma.user.update({
    where: { id: userId },
    data: { isPremium: true },
  });

  return { success: true };
};