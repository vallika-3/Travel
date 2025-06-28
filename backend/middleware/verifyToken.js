const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
        return res.status(403).json({ message: 'Invalid token payload.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err.message);

    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired.' });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token signature or malformed token.' });
    } else {
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }
  }
};

module.exports = verifyToken;