import axios from "axios";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

export default async function generateWithOpenRouter(prompt) {
  try {
    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: process.env.OPENROUTER_MODEL,
        messages: [
          {
            role: "system",
            content:
              "You are a professional AI assistant that writes high-quality, structured, and accurate project documentation for students.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.APP_URL || "http://localhost:3000",
          "X-Title": "PortfolioPal",
        },
      }
    );

    const content =
      response.data?.choices?.[0]?.message?.content || "";

    return content;
  } catch (error) {
    console.error(
      "OpenRouter Error:",
      error.response?.data || error.message
    );
    throw new Error("Failed to generate AI content");
  }
}