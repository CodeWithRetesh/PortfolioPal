import { generatePortfolioBlueprint } from "../ai/services/portfolioBuilderService.js";

export async function generatePortfolio(req, res) {
  try {
    const portfolio = await generatePortfolioBlueprint(req.body);

    return res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.error("Portfolio Builder Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to generate portfolio blueprint",
    });
  }
}