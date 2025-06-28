const express = require("express");
const Booking = require("../models/bookingModel");
const router = express.Router();

// Book a package
router.post("/", async (req, res) => {
  const { userId, packageId, selectedDate } = req.body;
  try {
    const booking = new Booking({ userId, packageId, selectedDate });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all bookings for a user
router.get("/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).populate("packageId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
