const express = require("express");
const router = express.Router();

const Wishlist = require("../models/Wishlist");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/wishlist - Create wishlist item
// Get all wishlist items for logged-in user
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId });
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/wishlist", authMiddleware, async (req, res) => {
  try {
    const { destination, startDate, endDate } = req.body;
    const userId = req.user.id;

    const newWishlist = new Wishlist({ userId, destination, startDate, endDate });
    await newWishlist.save();

    await User.findByIdAndUpdate(userId, { $push: { wishlist: newWishlist._id } });

    res.status(201).json(newWishlist);
  } catch (err) {
    console.error("Error creating wishlist item:", err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/wishlist/:id - Remove wishlist item
router.delete("/wishlist/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.wishlist = user.wishlist.filter((itemId) => itemId.toString() !== id);
    await user.save();

    await Wishlist.findByIdAndDelete(id);

    res.json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error("Error removing wishlist item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
