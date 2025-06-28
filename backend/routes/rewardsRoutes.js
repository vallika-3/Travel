const express = require("express");
const {
  getUserData,
  uploadReel,
  makeDeposit,
  redeemReward,
  unlockLoot
} = require("../controllers/rewardsController");

const router = express.Router();

router.get("/user", getUserData);
router.post("/reel", uploadReel);
router.post("/deposit", makeDeposit);
router.post("/redeem", redeemReward);
router.post("/lootbox", unlockLoot);

module.exports = router;
