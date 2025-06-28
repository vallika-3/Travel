const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  tripId: String,
  title: String,
  description: String,
  img: String,
  tag: String
});

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true
    },
    trips: [tripSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', wishlistSchema);