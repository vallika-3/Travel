const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/protected
// @desc    Example protected route
// @access  Private
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    msg: "Welcome to the protected route!",
    user: req.user,
  });
});

module.exports = router;
