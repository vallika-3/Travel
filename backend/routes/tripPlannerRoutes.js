const express = require("express");
const router = express.Router();
const tripPlannerController = require("../controllers/tripPlannerController");

router.post("/", tripPlannerController.createTrip);
router.get("/", tripPlannerController.getTrips);
router.get("/:id", tripPlannerController.getTripById);
router.delete("/:id", tripPlannerController.deleteTrip);
router.put("/:id", tripPlannerController.updateTrip);

module.exports = router;
