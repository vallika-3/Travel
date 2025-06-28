const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  totalPoints: { type: Number, default: 0 },
  earnedPoints: { type: Number, default: 0 },
  xp: { type: Number, default: 0 },
  currentSaved: { type: Number, default: 0 },
  planMonths: { type: Number, default: 6 },
  monthlyDeposit: { type: Number, default: 1000 },
  achievements: [String],
});

module.exports = mongoose.model("RewardProfile", rewardSchema);
