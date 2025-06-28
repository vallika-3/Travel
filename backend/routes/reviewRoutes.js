const express = require("express");
const Review = require("../models/reviewModel");

const router = express.Router();

// Get reviews for a package
router.get("/:packageId", async (req, res) => {
  try {
    const reviews = await Review.find({ packageId: req.params.packageId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add review
router.post("/", async (req, res) => {
  const { packageId, name, avatar, rating, comment } = req.body;
  try {
    const review = new Review({ packageId, name, avatar, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
