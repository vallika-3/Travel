// routes/destinationRoutes.js
const express = require('express');
const {
  getAllDestinations,
  getDestinationById,
} = require('../controllers/destinationController');

const router = express.Router();

router.get('/', getAllDestinations);
router.get('/:id', getDestinationById);

module.exports = router;
