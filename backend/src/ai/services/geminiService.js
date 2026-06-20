import { GoogleGenAI } from "@google/genai";
import { buildProjectPrompt } from "../prompts/projectPrompt.js";
import { parseAIResponse } from "../parser/jsonParser.js";
import { validateProjectResponse }from "../validators/projectValidator.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateProject(data) {
  try {
    const prompt = buildProjectPrompt(data);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

let projectData;

try {

  projectData =
    parseAIResponse(response.text);

  validateProjectResponse(
    projectData
  );

} catch (error) {

  console.error(
    "Validation Error:",
    error.message
  );

  throw new Error(
    "AI returned invalid project structure."
  );
}

return projectData;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to generate AI project.");
  }
}