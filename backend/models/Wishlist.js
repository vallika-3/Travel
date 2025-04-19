const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  destination: String,
  startDate: Date,
  endDate: Date
}, { collection: "wishlist" });  // ✅ Explicitly setting collection name

module.exports = mongoose.model("Wishlist", WishlistSchema);
