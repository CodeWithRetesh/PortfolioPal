import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

  console.log(
  "JWT_SECRET LOGIN:",
  process.env.JWT_SECRET
);

  console.log("TOKEN:", token);

console.log(
  "JWT_SECRET:",
  process.env.JWT_SECRET
);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

console.log("TOKEN RECEIVED:", token);
console.log("JWT SECRET:", process.env.JWT_SECRET);
console.log("DECODED:", decoded);

    req.user = decoded;

    next();

  } catch (error) {
  console.log("JWT ERROR:", error);

  return res.status(401).json({
    success: false,
    message: error.message,
  });
}
};