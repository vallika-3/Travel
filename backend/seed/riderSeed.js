const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Rider = require("../models/Rider");

dotenv.config();

const riders = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    location: "Delhi, India",
    expertise: "Mountain Biking, Snow Routes",
  },
  {
    name: "Sanya Kapoor",
    email: "sanya.kapoor@example.com",
    location: "Mumbai, India",
    expertise: "Photography, Trail Navigation",
  },
  {
    name: "Rahul Menon",
    email: "rahul.menon@example.com",
    location: "Kochi, India",
    expertise: "Culture Tours, Beach Trails",
  },
  {
    name: "Priya Nair",
    email: "priya.nair@example.com",
    location: "Bangalore, India",
    expertise: "Long-Distance Riding",
  },
  {
    name: "Vikram Joshi",
    email: "vikram.joshi@example.com",
    location: "Pune, India",
    expertise: "Off-Road Adventures",
  }
];

async function seedRiders() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Rider.deleteMany();
    await Rider.insertMany(riders);
    console.log("✅ Riders seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedRiders();
