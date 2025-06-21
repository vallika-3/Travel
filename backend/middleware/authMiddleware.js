const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return res.status(401).json({ msg: "Authorization header missing" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ msg: "Token format must be: Bearer <token>" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ msg: "Token is invalid or missing user id" });
    }

    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err.message);

   
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ msg: "Invalid token" });
    } else {
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};

module.exports = authMiddleware;
