// routes/user.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate("trips")
      .populate("wishlist")
      .populate("bookings")
      .select("-password"); 

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      user,
      trips: user.trips || [],
      wishlist: user.wishlist || [],
      bookings: user.bookings || [],
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
