const express = require("express");
const Trip = require("../models/Trip");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
// Like/Unlike
router.post("/like/:id", async (req, res) => {
  const userId = req.body.userId;
  const trip = await Trip.findById(req.params.id);
  const index = trip.likes.indexOf(userId);
  if (index === -1) {
    trip.likes.push(userId);
  } else {
    trip.likes.splice(index, 1);
  }
  await trip.save();
  res.json({ likes: trip.likes.length });
});

// Filter Trips
router.get("/filter", async (req, res) => {
  const { continent, tags } = req.query;
  let query = {};
  if (continent) query.continent = continent;
  if (tags) query.tags = { $in: tags.split(",") };

  const trips = await Trip.find(query).limit(10);
  res.json(trips);
});

// Add Review
router.post("/review/:id", async (req, res) => {
  const { user, rating, comment } = req.body;
  const trip = await Trip.findById(req.params.id);
  trip.reviews.push({ user, rating, comment });
  await trip.save();
  res.json({ success: true });
});

// ✅ Get all trips for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const trips = await Trip.find({ userId });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// routes/tripRoutes.js
router.get('/api/trips', async (req, res) => {
  const data = await Trip.find(); // assuming a Trip model
  res.json(data);
});


// ✅ Create a new trip
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, location, price, duration, description } = req.body;
    const userId = req.user.id;

    if (!title || !location || !price || !duration || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTrip = new Trip({
      userId,
      title,
      location,
      price,
      duration,
      description,
    });

    await newTrip.save();
    await User.findByIdAndUpdate(userId, { $push: { trips: newTrip._id } });

    res.status(201).json(newTrip);
  } catch (err) {
    console.error("Error creating trip:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
