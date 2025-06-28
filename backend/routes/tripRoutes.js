const express = require("express");
const Trip = require("../models/Trip");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get all trips for the authenticated user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const trips = await Trip.find({ createdBy: userId });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Create a new trip
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, location, price, duration, description, date, imageUrl } = req.body;
    const userId = req.user.id;

    if (!title || !location || !description || !date) {
      return res.status(400).json({ message: "Title, location, description, and date are required" });
    }

    const newTrip = new Trip({
      createdBy: userId,
      title,
      location,
      price: price || 0,
      duration: duration || "Not specified",
      description,
      date,
      imageUrl: imageUrl || "https://via.placeholder.com/300x200?text=No+Image"
    });

    await newTrip.save();
    res.status(201).json(newTrip);
  } catch (err) {
    console.error("❌ Error creating trip:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Like/Unlike a trip
router.post("/like/:id", async (req, res) => {
  try {
    const userId = req.body.userId;
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    const index = trip.likes.indexOf(userId);
    if (index === -1) {
      trip.likes.push(userId);
    } else {
      trip.likes.splice(index, 1);
    }

    await trip.save();
    res.json({ likes: trip.likes.length });
  } catch (err) {
    console.error("❌ Like error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add a review to a trip
router.post("/review/:id", async (req, res) => {
  try {
    const { user, rating, comment } = req.body;
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    trip.reviews.push({ user, rating, comment });
    await trip.save();
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Review error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Filter Trips (optional)
router.get("/filter", async (req, res) => {
  try {
    const { continent, tags } = req.query;
    let query = {};
    if (continent) query.continent = continent;
    if (tags) query.tags = { $in: tags.split(",") };

    const trips = await Trip.find(query).limit(10);
    res.json(trips);
  } catch (err) {
    console.error("❌ Filter error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Public route to get all trips
router.get("/all", async (req, res) => {
  try {
    const data = await Trip.find();
    res.json(data);
  } catch (err) {
    console.error("❌ Public fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
