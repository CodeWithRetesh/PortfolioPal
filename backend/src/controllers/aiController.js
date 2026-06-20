import { generateProject } from "../ai/services/geminiService.js";

export async function generateProjectController(req, res) {
  try {
    const content = await generateProject(req.body);

    return res.status(200).json({
      success: true,
      message: "Project generated successfully.",
      data: content,
    });
  } catch (error) {
    console.error("AI Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate AI project.",
    });
  }
}