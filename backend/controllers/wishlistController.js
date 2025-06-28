const mongoose = require('mongoose');
const Wishlist = require('../models/Wishlist');

const getWishlist = async (req, res) => {
  try {
    const authenticatedUserId = req.user.id;
    const objectId = new mongoose.Types.ObjectId(authenticatedUserId);

    const wishlist = await Wishlist.findOne({ userId: objectId });
    if (!wishlist) return res.json({ trips: [] });
    res.json({ trips: wishlist.trips });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ message: 'Failed to fetch wishlist' });
  }
};

const addToWishlist = async (req, res) => {
  const userId = req.user.id;
  const { trip, trips, replace } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    let wishlist = await Wishlist.findOne({ userId: objectId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: objectId,
        trips: trips || (trip ? [trip] : []),
      });
    } else {
      if (replace && Array.isArray(trips)) {
        wishlist.trips = trips;
      } else if (Array.isArray(trips)) {
        trips.forEach((t) => {
          const exists = wishlist.trips.some(existing => existing.tripId === t.tripId);
          if (!exists) wishlist.trips.push(t);
        });
      } else if (trip) {
        const exists = wishlist.trips.some(t => t.tripId === trip.tripId);
        if (!exists) wishlist.trips.push(trip);
      }
    }

    await wishlist.save();
    res.status(200).json({ trips: wishlist.trips });
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: 'Failed to add to wishlist' });
  }
};

const removeFromWishlist = async (req, res) => {
  const userId = req.user.id;
  const { tripId } = req.params;

  try {
    const objectId = new mongoose.Types.ObjectId(userId);
    const wishlist = await Wishlist.findOne({ userId: objectId });

    if (wishlist) {
      wishlist.trips = wishlist.trips.filter(t => t.tripId !== tripId);
      await wishlist.save();
    }

    res.status(200).json({ message: 'Trip removed from wishlist' });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ message: 'Failed to remove from wishlist' });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};