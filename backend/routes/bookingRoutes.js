const express = require("express");
const Booking = require("../models/Booking");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new booking and add it to the user's bookings array
// Get all bookings for logged-in user
router.get("/booking", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookings = await Booking.find({ userId });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/booking", authMiddleware, async (req, res) => {
  try {
    const { destination, startDate, endDate } = req.body;
    const userId = req.user.id; // ✅ Authenticated user ID

    const newBooking = new Booking({ userId, destination, startDate, endDate });
    await newBooking.save();

    await User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
