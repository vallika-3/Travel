const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }, 
});

const destinationSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  type: String, 
  coordinates: {
    lat: Number,
    lng: Number,
  },
  reviews: [reviewSchema],
});

module.exports = mongoose.model("Destination", destinationSchema);
