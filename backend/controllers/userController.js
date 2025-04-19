const User = require("../models/User");

const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Getting data for user:", userId);

    const user = await User.findById(userId).select("-password")
      .populate('trips')
      .populate('wishlist')
      .populate('bookings');

    if (!user) {
      console.log("User not found in DB for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar || "https://via.placeholder.com/120",
      },
      trips: user.trips?.map(trip => ({
        _id: trip._id,
        destination: trip.destination,
        date: trip.date,
        image: trip.image || "https://source.unsplash.com/400x300/?travel,destination",
      })) || [],
      wishlist: user.wishlist?.map(wish => ({
        _id: wish._id,
        destination: wish.destination,
        startDate: wish.startDate,
        endDate: wish.endDate,
        image: wish.image || "https://source.unsplash.com/300x200/?travel,adventure",
      })) || [],
      bookings: user.bookings?.map(booking => ({
        _id: booking._id,
        destination: booking.destination,
        startDate: booking.startDate,
        endDate: booking.endDate,
        hotel: booking.hotel,
      })) || [],
    });
  } catch (error) {
    console.error("getUserData error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserData };
