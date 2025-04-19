// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Loading environment variables from .env

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// ✅ Import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const protectedRoutes = require("./routes/protectedRoutes");
const tripRoutes = require("./routes/tripRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const destinationRoutes = require("./routes/destinationRoutes");

// ✅ Route mappings
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/destinations", destinationRoutes); // Ensure this is correctly placed

// ✅ Catch undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route Not Found" });
});

// ✅ Connect to DB and start server
const PORT = process.env.PORT || 5001;
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
