import { checkHealth } from "../services/healthService.js";
import { apiResponse } from "../utils/apiResponse.js";

export const healthController = (req, res) => {
  const data = checkHealth();

  apiResponse(
    res,
    200,
    true,
    data.message,
    data
  );
};