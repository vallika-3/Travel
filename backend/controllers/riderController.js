const Rider = require("../models/Rider");

// POST /api/riders
exports.registerRider = async (req, res) => {
  try {
    const { name, email, location, expertise } = req.body;

    const rider = new Rider({ name, email, location, expertise });
    await rider.save();

    res.json({ success: true, message: "Rider registered successfully", rider });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// GET /api/riders
exports.getAllRiders = async (req, res) => {
  try {
    const riders = await Rider.find().sort({ createdAt: -1 });
    res.json({ success: true, riders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
