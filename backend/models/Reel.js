const mongoose = require('mongoose');

const reelSchema = new mongoose.Schema({
  username: String,
  profilePic: String,
  audio: String,
  videoUrl: String,
  likes: { type: Number, default: 0 },
  likedBy: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Reel', reelSchema);
