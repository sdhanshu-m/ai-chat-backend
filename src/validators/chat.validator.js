import { z } from "zod";

export const chatSchema = z.object({
  chatId: z.string().optional(),
  message: z.string().min(1),
});

// what's this for ??
// chatId optional we'll give to it ??