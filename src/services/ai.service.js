import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

/**
 * SYSTEM PROMPT (core intelligence layer)
 */
const SYSTEM_PROMPT = `
You are a highly intelligent AI assistant.

Follow these strict rules while responding:

1. Always structure responses in multiple paragraphs (never one big block).
2. Keep answers clear, readable, and well spaced.
3. Adapt tone based on the question:
   - If technical/academic → be precise, structured, slightly formal.
   - If casual/aesthetic → be smooth, conversational, slightly expressive.
4. Avoid overly robotic tone.
5. Avoid unnecessary fluff.
6. Use simple language but deep clarity.
7. When explaining concepts:
   - Break into logical parts
   - Use short paragraphs
8. When answering short questions:
   - Still maintain formatting (at least 2 paragraphs if possible)
9. Never return messy or unstructured text.
10. Keep responses moderately detailed (not too short, not excessively long).

Goal:
Make every response feel clean, premium, and easy to read.
`;

/**
 * Generate AI reply
 */
export const generateReply = async (messages) => {
  const formattedMessages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
  ];

  const res = await client.chat.completions.create({
    model: "openai/gpt-oss-safeguard-20b",
    messages: formattedMessages,
    temperature: 0.7,
  });

  return res.choices[0].message.content;
};

/**
 * Generate chat title (first message only)
 */
export const generateTitle = async (message) => {
  const res = await client.chat.completions.create({
    model: "openai/gpt-oss-safeguard-20b",
    messages: [
      {
        role: "system",
        content: "Generate a very short title (max 5 words). No punctuation, no extra text.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.5,
  });

  return res.choices[0].message.content.trim();
};