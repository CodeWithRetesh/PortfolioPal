import projectPrompt from "../prompts/projectPrompt.js";

export default function promptBuilder(data) {
  const projectData = {
    title: data.title?.trim() || "Untitled Project",

    domain: data.domain?.trim() || "Software Engineering",

    difficulty: data.difficulty?.trim() || "Intermediate",

    techStack: data.techStack?.trim() || "Not Specified",

    programmingLanguage:
      data.programmingLanguage?.trim() || "JavaScript",

    goal: data.goal?.trim() || "Build an innovative software solution.",

    targetUsers:
      data.targetUsers?.trim() || "General Users",

    requirements:
      data.requirements?.trim() || "None",
  };

  return projectPrompt(projectData);
}