import { generateResumeContent }
from "../ai/services/resumeService.js";

export async function generateResume(req, res) {
  try {

    const result =
      await generateResumeContent(
        req.body
      );

    console.log(
      "GENERATED RESUME:",
      JSON.stringify(result, null, 2)
    );

    return res.status(200).json({
      success: true,
      resume: result,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}