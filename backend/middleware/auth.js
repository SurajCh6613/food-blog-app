const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  let token = req.headers["authorization"];

  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  try {
    token = token.split(" ")[1]; // Format: "Bearer <token>"
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); // ✅ Only called if token is valid
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
