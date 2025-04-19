const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }, // Default to current date
});

const destinationSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  type: String, // Adventurous, Romantic, etc.
  coordinates: {
    lat: Number,
    lng: Number,
  },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Destination", destinationSchema);
