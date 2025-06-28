const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist
} = require('../controllers/wishlistController');
const verifyToken = require('../middleware/verifyToken');


router.get('/:userId', verifyToken, getWishlist);
router.post('/:userId', verifyToken, addToWishlist);
router.delete('/:userId/:tripId', verifyToken, removeFromWishlist);

module.exports = router;
