const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Load environment variables
dotenv.config();

// Define user data
const indianNames = [
  { name: "Aarav Sharma", email: "aarav.sharma@example.com" },
  { name: "Diya Patel", email: "diya.patel@example.com" },
  { name: "Rajesh Kumar", email: "rajesh.kumar@example.com" },
  { name: "Priya Singh", email: "priya.singh@example.com" },
  { name: "Vikram Reddy", email: "vikram.reddy@example.com" },
  { name: "Neha Joshi", email: "neha.joshi@example.com" },
  { name: "Karthik Iyer", email: "karthik.iyer@example.com" },
  { name: "Ananya Das", email: "ananya.das@example.com" },
  { name: "Siddharth Mehta", email: "siddharth.mehta@example.com" },
  { name: "Pooja Nair", email: "pooja.nair@example.com" },
  { name: "Traveller", email: "traveller@example.com" },
];

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Clear existing users
    await User.deleteMany({});
    console.log("🧹 Existing users cleared");

    const defaultPassword = "password123";
    const travellerPassword = "traveller123";
    const salt = await bcrypt.genSalt(10);

    // Prepare user data
    const usersToInsert = await Promise.all(
      indianNames.map(async (user) => {
        const passwordToHash =
          user.name === "Traveller" ? travellerPassword : defaultPassword;

        const hashedPassword = await bcrypt.hash(passwordToHash, salt);

        return {
          name: user.name,
          email: user.email,
          password: hashedPassword,
          avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${encodeURIComponent(
            user.name
          )}`,
          trips: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()],
          wishlist: [new mongoose.Types.ObjectId()],
          bookings: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
          ],
        };
      })
    );

    // Insert users
    await User.insertMany(usersToInsert);
    console.log("🎉 Sample users inserted successfully");

    // Exit
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeder Error:", err.message);
    process.exit(1);
  });
