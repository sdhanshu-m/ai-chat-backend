import express from "express";
import { register, login, me } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/me", authMiddleware, me);

export default router;

// different middlewares used here before any controller

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password, name]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User registered"
 *               data:
 *                 user:
 *                   id: "uuid"
 *                   email: "user@example.com"
 *                   name: "John Doe"
 *                   isPremium: false
 *                 token: "jwt_token"
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       400:
 *         description: Email already exists or validation error
 */



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Login successful"
 *               data:
 *                 user:
 *                   id: "uuid"
 *                   email: "user@example.com"
 *                   name: "John Doe"
 *                   isPremium: false
 *                 token: "jwt_token"
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */





/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "User fetched"
 *               data:
 *                 id: "uuid"
 *                 email: "user@example.com"
 *                 name: "John Doe"
 *                 isPremium: false
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       401:
 *         description: Unauthorized / Invalid token
 */