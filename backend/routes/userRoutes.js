const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");
const Booking = require("../models/Booking");
const Wishlist = require("../models/Wishlist");
const protect = require("../middleware/authMiddleware");


const { getUserData } = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");



router.get("/me", authMiddleware, getUserData);
router.get("/userdata", protect, getUserData);
router.get("/:userId/dashboard", async (req, res) => {
  const { userId } = req.params;

  try {
    const [trips, bookings, wishlist] = await Promise.all([
      Trip.find({ userId }),
      Booking.find({ userId }),
      Wishlist.find({ userId }),
    ]);

    res.json({
      trips,
      bookings,
      wishlist,
    });
  } catch (error) {
    console.error("Dashboard Fetch Error:", error);
    res.status(500).json({ error: "Failed to load dashboard data." });
  }
});

module.exports = router;
