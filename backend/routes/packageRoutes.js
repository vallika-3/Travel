const express = require("express");
const Package = require("../models/packageModel");
const router = express.Router();

router.get("/:destination", async (req, res) => {
  try {
    const rawDest = decodeURIComponent(req.params.destination); // decode URL-encoded strings like Amazon%20Rainforest
    console.log("🛰️ Requested Destination:", rawDest);

    const packages = await Package.find({
      destination: { $regex: new RegExp(`^${rawDest}$`, "i") } // case-insensitive exact match
    });

    if (!packages || packages.length === 0) {
      console.warn("⚠️ No matching packages found for:", rawDest);
    }

    console.log("📦 Matched Packages:", packages.length);
    res.json(packages);
  } catch (err) {
    console.error("❌ Package fetch error:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
