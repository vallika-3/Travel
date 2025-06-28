const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const tripRoutes = require("./routes/tripRoutes");
const tripPlannerRoutes = require("./routes/tripPlannerRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const reelRoutes = require("./routes/reelRoutes");
const commentRoutes = require("./routes/commentRoutes");
const packageRoutes = require("./routes/packageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const rewardRoutes = require("./routes/rewardsRoutes");
const riderRoutes = require("./routes/riderRoutes");
const campaignRoutes = require("./routes/campaignRoutes");

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/trip-planner", tripPlannerRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings", bookingRoutes);

app.use("/api/destinations", destinationRoutes);
app.use("/api/reels", reelRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/packages", packageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/rewards", rewardRoutes);
app.use("/api/riders", riderRoutes);
app.use("/api/campaigns", campaignRoutes);

// Catch-all
app.use("*", (req, res) => {
  res.status(404).json({ message: "❌ Route Not Found" });
});

// Start Server
const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
