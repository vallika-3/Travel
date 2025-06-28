const express = require('express');
const { getReels, uploadReel, likeReel } = require('../controllers/reelController');

const router = express.Router();

router.get('/', getReels);
router.post('/upload', uploadReel);
router.post('/like', likeReel);

module.exports = router;
