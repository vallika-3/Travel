const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: String,
  startDate: Date,
  endDate: Date
});

module.exports = mongoose.model("Booking", BookingSchema);
