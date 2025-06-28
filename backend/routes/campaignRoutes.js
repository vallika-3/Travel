const express = require("express");
const router = express.Router();
const Campaign = require("../models/Campaign");


router.get("/", async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json({ success: true, campaigns });
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ id: parseInt(req.params.id) });
    if (!campaign) {
      return res.status(404).json({ success: false, error: "Campaign not found" });
    }
    res.json({ success: true, campaign });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});



module.exports = router;
