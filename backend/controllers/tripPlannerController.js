const TripPlanner = require("../models/TripPlanner");

// Create Trip
exports.createTrip = async (req, res) => {
  try {
    const trip = new TripPlanner(req.body);
    await trip.save();
    res.status(201).json({ success: true, trip });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Get All Trips
exports.getTrips = async (req, res) => {
  try {
    const trips = await TripPlanner.find().sort({ createdAt: -1 });
    res.json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get Trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await TripPlanner.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }
    res.json({ success: true, trip });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Delete Trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await TripPlanner.findByIdAndDelete(req.params.id);
    if (!trip) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }
    res.json({ success: true, message: "Trip deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update Trip
exports.updateTrip = async (req, res) => {
  try {
    const updated = await TripPlanner.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, error: "Trip not found" });
    }
    res.json({ success: true, trip: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
