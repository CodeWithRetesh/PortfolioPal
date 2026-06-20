export function parseAIResponse(text) {
  try {
    if (!text) {
      throw new Error("Empty AI response.");
    }

    // Remove Markdown code blocks
    let cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Find first {
    const start = cleaned.indexOf("{");

    // Find last }
    const end = cleaned.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1);
    }

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Parser Error:", error);

    throw new Error("Invalid AI JSON response.");
  }
}