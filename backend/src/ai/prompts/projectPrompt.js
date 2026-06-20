import systemPrompt from "./systemPrompt.js";

export function buildProjectPrompt(data) {
  return `
${systemPrompt}

You are an expert Software Architect, Technical Writer, and Senior Full Stack Developer.

Generate a complete software project documentation based on the following project details.

=========================
PROJECT DETAILS
=========================

Title:
${data.title}
The project title must match the user-provided title exactly. Do not invent a different project name.

Domain:
${data.domain}

Difficulty:
${data.difficulty}

Programming Language:
${data.programmingLanguage}

Tech Stack:
${data.techStack}

Goal:
${data.goal}

Target Users:
${data.targetUsers}

Requirements:
${data.requirements}

=========================
OUTPUT FORMAT
=========================

Return ONLY a valid JSON object.

The JSON MUST contain the following fields:

{
  "title": "",
  "abstract": "",
  "problemStatement": "",
  "objectives": [],
  "features": [],
  "targetUsers": "",
  "techStack": {
    "frontend": "",
    "backend": "",
    "database": "",
    "ai": ""
  },
  "systemArchitecture": "",
  "modules": [],
  "databaseSchema": [],
  "apiEndpoints": [],
  "projectStructure": [],
  "futureEnhancements": [],
  "conclusion": ""
}

Rules:

1. Return ONLY JSON.
2. Do NOT return Markdown.
3. Do NOT use \`\`\`json.
4. Do NOT explain anything.
5. Do NOT add notes.
6. Do NOT add extra text before or after the JSON.
7. Every field must contain meaningful content.
8. Arrays must contain multiple items where appropriate.
9. The JSON must be valid and parsable.

`;
}