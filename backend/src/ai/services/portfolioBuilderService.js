import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

function cleanJsonText(text) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

export async function generatePortfolioBlueprint(data) {
  const prompt = `
You are an expert AI portfolio strategist.

Create a complete, professional portfolio blueprint based on the user input.

User Input:
Name: ${data.name}
Role: ${data.role}
Domain: ${data.domain}
Tone: ${data.tone}
Target Audience: ${data.targetAudience}
Skills: ${data.skills}
Experience: ${data.experience}
Projects: ${data.projects}
Goals: ${data.goals}

Return ONLY valid JSON in this exact format:

{
  "title": "",
  "tagline": "",
  "summary": "",
  "hero": {
    "headline": "",
    "subheadline": "",
    "cta": ""
  },
  "about": "",
  "skills": [],
  "featuredProjects": [
    {
      "title": "",
      "description": "",
      "impact": "",
      "techStack": []
    }
  ],
  "experienceHighlights": [
    {
      "role": "",
      "company": "",
      "bullets": []
    }
  ],
  "sections": [
    {
      "title": "",
      "content": ""
    }
  ],
  "seoKeywords": [],
  "theme": {
    "primaryColor": "",
    "secondaryColor": "",
    "accentColor": ""
  }
}
`;

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result = await model.generateContent(prompt);
  let text = result.response.text();
  text = cleanJsonText(text);

  return JSON.parse(text);
}