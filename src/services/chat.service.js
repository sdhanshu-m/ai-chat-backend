import { prisma } from "../config/db.js";
import { generateReply, generateTitle } from "./ai.service.js";

export const handleChat = async ({ userId, chatId, message }) => {
  let chat;

  if (!chatId) {
    const title = await generateTitle(message);

    chat = await prisma.chat.create({
      data: {
        userId,
        title,
      },
    });
  } else {
    chat = await prisma.chat.findUnique({ where: { id: chatId } });
  }

  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "user",
      content: message,
    },
  });

  const messages = await prisma.message.findMany({
    where: { chatId: chat.id },
    orderBy: { createdAt: "asc" },
  });

  const reply = await generateReply(messages);

  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "assistant",
      content: reply,
    },
  });

  return { chatId: chat.id, reply };
};

export const getHistory = (userId) => {
  return prisma.chat.findMany({
    where: { userId },
    select: { id: true, title: true },
  });
};

export const getChat = (chatId, userId) => {
  return prisma.chat.findFirst({
    where: { id: chatId, userId },
    include: { messages: true },
  });
};