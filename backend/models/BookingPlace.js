const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  travelDate: { type: String, required: true },
  guests: { type: Number, required: true },
  destination: { type: String, required: true },
  provider: { type: String, required: true },
  pricePerGuest: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("BookingPlace", bookingSchema);
