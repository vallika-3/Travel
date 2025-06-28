const RewardProfile = require("../models/RewardProfile");

exports.getUserData = async (req, res) => {
  const { email } = req.query;
  let user = await RewardProfile.findOne({ email });
  if (user) return res.json(user);
  user = await RewardProfile.create({ email, name: "Traveller" });
  res.json(user);
};

exports.uploadReel = async (req, res) => {
  const { email } = req.body;
  const user = await RewardProfile.findOne({ email });
  user.xp += 200;
  user.totalPoints += 200;
  user.earnedPoints += 200;
  await user.save();
  res.json({ message: "Reel uploaded", user });
};

exports.makeDeposit = async (req, res) => {
  const { email } = req.body;
  const user = await RewardProfile.findOne({ email });
  const maxSave = user.planMonths * user.monthlyDeposit;
  if (user.currentSaved + user.monthlyDeposit <= maxSave) {
    user.currentSaved += user.monthlyDeposit;
    await user.save();
    return res.json({ message: "Deposit successful", user });
  }
  res.status(400).json({ message: "Plan already completed" });
};

exports.redeemReward = async (req, res) => {
  const { email, reward } = req.body;
  const user = await RewardProfile.findOne({ email });
  if (user.totalPoints >= reward.pointsRequired) {
    user.totalPoints -= reward.pointsRequired;
    await user.save();
    const code = `TRVL-${Math.floor(1000 + Math.random() * 9000)}`;
    return res.json({ message: "Reward redeemed", code });
  }
  res.status(400).json({ message: "Not enough points" });
};

exports.unlockLoot = async (req, res) => {
  const { email } = req.body;
  const user = await RewardProfile.findOne({ email });
  const level = Math.floor(user.xp / 1000) + 1;
  if (level >= 3) {
    const lootOptions = ["Free Lounge Pass", "500 Bonus Points", "10% Off Flight", "Free Tour Voucher"];
    const reward = lootOptions[Math.floor(Math.random() * lootOptions.length)];
    return res.json({ reward });
  }
  res.status(400).json({ message: "Level too low" });
};
