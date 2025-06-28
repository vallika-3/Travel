const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  provider: { type: String, required: true },
  logo: String,
  price: Number,
  duration: Number,
  rating: Number,
  itinerary: String,
  foodIncluded: Boolean,
  transportIncluded: Boolean,
  availableDates: [String],
  galleryImages: [String]
});

module.exports = mongoose.model("Package", packageSchema);
