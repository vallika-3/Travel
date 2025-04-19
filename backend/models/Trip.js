// models/Trip.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const tripSchema = new mongoose.Schema({
  title: String,
  image: String,
  country: String,
  continent: String,
  tags: [String],
  coordinates: {
    lat: Number,
    lng: Number,
  },
  reviews: [reviewSchema],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("Trip", tripSchema);
