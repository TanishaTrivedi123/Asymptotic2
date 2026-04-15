const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; //pura user object attach karo

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
module.exports = { authMiddleware };