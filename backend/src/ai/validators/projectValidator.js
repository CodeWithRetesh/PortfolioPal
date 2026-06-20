export function validateProjectResponse(data) {

  if (!data || typeof data !== "object") {
    throw new Error("Invalid AI response.");
  }

  const requiredFields = [
    "title",
    "abstract",
    "problemStatement",
    "objectives",
    "features",
    "modules",
    "conclusion",
  ];

  for (const field of requiredFields) {

    if (
      data[field] === undefined ||
      data[field] === null
    ) {
      throw new Error(
        `Missing required field: ${field}`
      );
    }
  }

  return true;
}