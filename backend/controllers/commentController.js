const Comment = require('../models/Comment');

const postComment = async (req, res) => {
  const { reelId, user, text } = req.body;
  try {
    const comment = await Comment.create({ reelId, user, text });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getComments = async (req, res) => {
  const { reelId } = req.params;
  try {
    const comments = await Comment.find({ reelId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { postComment, getComments };
