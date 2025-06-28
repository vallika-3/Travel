const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  days: { type: Number, required: true }, // ✅ Added this line
  image: { type: String },
  rating: { type: Number },
  liked: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  category: { type: String },
}, { timestamps: true });

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
