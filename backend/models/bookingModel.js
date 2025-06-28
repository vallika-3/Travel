const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  selectedDate: String,
  status: { type: String, default: "Booked" },
  createdAt: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError
module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
