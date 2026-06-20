import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
  );

export async function generateResumeContent(
  data
) {
  const prompt = `
Generate a professional ATS friendly resume.

Name:
${data.name}

Skills:
${data.skills}

Education:
${data.education}

Experience:
${data.experience}

Projects:
${data.projects}

Return ONLY valid JSON.

{
  "summary":"",
  "skills":[],
  "experience":[],
  "projects":[]
}
`;

  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

  const result =
    await model.generateContent(
      prompt
    );

  let text =
    result.response.text();

  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(text);
}