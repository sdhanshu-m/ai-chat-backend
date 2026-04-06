import * as chatService from "../services/chat.service.js";
import { sendResponse } from "../utils/response.js";
import { logger } from "../config/logger.js";

export const chat = async (req, res, next) => {
  try {
    const data = await chatService.handleChat({
      userId: req.user.id,
      ...req.body,
    });

    logger.info("Chat Controller - Chat Success", {
      controller: "chat",
      action: "sendMessage",
      userId: req.user.id,
      chatId: data.chatId,
    });

    sendResponse(res, {
      success: true,
      message: "Reply generated",
      data,
    });
  } catch (err) {
    logger.error("Chat Controller - Chat Failed", {
      controller: "chat",
      action: "sendMessage",
      userId: req.user?.id,
      error: err.message,
    });
    next(err);
  }
};

export const history = async (req, res, next) => {
  try {
    const data = await chatService.getHistory(req.user.id);

    logger.info("Chat Controller - History Success", {
      controller: "chat",
      action: "history",
      userId: req.user.id,
    });

    sendResponse(res, {
      success: true,
      message: "History fetched",
      data,
    });
  } catch (err) {
    logger.error("Chat Controller - History Failed", {
      controller: "chat",
      action: "history",
      userId: req.user?.id,
      error: err.message,
    });
    next(err);
  }
};

export const getChat = async (req, res, next) => {
  try {
    const data = await chatService.getChat(
      req.params.chatId,
      req.user.id
    );

    logger.info("Chat Controller - GetChat Success", {
      controller: "chat",
      action: "getChat",
      userId: req.user.id,
      chatId: req.params.chatId,
    });

    sendResponse(res, {
      success: true,
      message: "Chat fetched",
      data,
    });
  } catch (err) {
    logger.error("Chat Controller - GetChat Failed", {
      controller: "chat",
      action: "getChat",
      userId: req.user?.id,
      chatId: req.params.chatId,
      error: err.message,
    });
    next(err);
  }
};