import express from "express";
import { chat, history, getChat } from "../controllers/chat.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { chatSchema } from "../validators/chat.validator.js";
import { premiumMiddleware } from "../middlewares/premium.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, premiumMiddleware, validate(chatSchema), chat);
router.get("/history", authMiddleware, history);
router.get("/:chatId", authMiddleware, getChat);

export default router;

// -------------------------------- api docs ---------------------------------

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Send message to AI (create or continue chat)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               chatId:
 *                 type: string
 *                 example: "optional-chat-id"
 *               message:
 *                 type: string
 *                 example: "Explain JWT"
 *     responses:
 *       200:
 *         description: AI response generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               message: "Reply generated"
 *               data:
 *                 chatId: "chat123"
 *                 reply: "JWT works by..."
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "2026-01-01T00:00:00Z"
 *       403:
 *         description: Premium required
 *       401:
 *         description: Unauthorized
 */


// ----------------------------------------


/**
 * @swagger
 * /chat/history:
 *   get:
 *     summary: Get chat history (sidebar)
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Chat history fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "History fetched"
 *               data:
 *                 - id: "chat1"
 *                   title: "JWT Explained"
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       401:
 *         description: Unauthorized
 */

// ------------------------------------------------------------------

/**
 * @swagger
 * /chat/{chatId}:
 *   get:
 *     summary: Get full chat messages
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chatId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Chat fetched"
 *               data:
 *                 id: "chat1"
 *                 messages:
 *                   - role: "user"
 *                     content: "Hello"
 *                   - role: "assistant"
 *                     content: "Hi!"
 *               error: null
 *               meta:
 *                 requestId: "uuid"
 *                 timestamp: "..."
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Chat not found
 */