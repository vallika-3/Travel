const Trip = require('../models/Trip');

// GET all trips
exports.getAllTrips = async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
};

// POST review
exports.addReview = async (req, res) => {
  const { tripId, content } = req.body;

  const trip = await Trip.findById(tripId);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  trip.reviews.push({ content });
  await trip.save();

  res.json({ message: 'Review added successfully', trip });
};

// GET reviews of a trip
exports.getTripReviews = async (req, res) => {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return res.status(404).json({ message: 'Trip not found' });

  res.json(trip.reviews);
};
