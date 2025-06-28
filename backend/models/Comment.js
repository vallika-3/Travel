const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  reelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reel' },
  user: String,
  text: String,
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
