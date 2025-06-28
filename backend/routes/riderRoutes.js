const express = require("express");
const router = express.Router();
const riderController = require("../controllers/riderController");

// GET /api/riders
router.get("/", riderController.getAllRiders);

// POST /api/riders
router.post("/", riderController.registerRider);

module.exports = router;
