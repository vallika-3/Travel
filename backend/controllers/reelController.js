const Reel = require('../models/Reel');

// GET /api/reels
const getReels = async (req, res) => {
  try {
    const reels = await Reel.find().sort({ createdAt: -1 });
    res.json(reels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/reels/upload
const uploadReel = async (req, res) => {
  const { username, profilePic, audio, videoUrl } = req.body;
  try {
    const reel = await Reel.create({ username, profilePic, audio, videoUrl });
    res.status(201).json(reel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/reels/like
const likeReel = async (req, res) => {
  const { reelId, userId } = req.body;
  try {
    const reel = await Reel.findById(reelId);
    if (!reel) return res.status(404).json({ message: 'Reel not found' });

    const alreadyLiked = reel.likedBy.includes(userId);

    if (alreadyLiked) {
      reel.likedBy = reel.likedBy.filter((id) => id !== userId);
    } else {
      reel.likedBy.push(userId);
    }

    await reel.save();
    res.json(reel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Export AFTER all functions are defined
module.exports = { getReels, uploadReel, likeReel };
