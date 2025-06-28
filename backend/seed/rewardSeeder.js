const mongoose = require("mongoose");
const dotenv = require("dotenv");
const RewardProfile = require("../models/RewardProfile"); // adjust path if needed

// Load environment variables
dotenv.config();

// Use your .env connection string
const MONGO_URI = process.env.MONGO_URI;

const sampleRewards = [
  {
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    totalPoints: 1500,
    earnedPoints: 500,
    xp: 250,
    currentSaved: 4000,
    planMonths: 12,
    monthlyDeposit: 2000,
    achievements: ["First Deposit", "Savings Milestone"]
  },
  {
    name: "Diya Patel",
    email: "diya.patel@example.com",
    totalPoints: 900,
    earnedPoints: 300,
    xp: 150,
    currentSaved: 2000,
    planMonths: 6,
    monthlyDeposit: 1500,
    achievements: ["Joined Rewards"]
  },
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    totalPoints: 2000,
    earnedPoints: 800,
    xp: 350,
    currentSaved: 5000,
    planMonths: 12,
    monthlyDeposit: 2500,
    achievements: ["First Deposit", "Referral Bonus", "Savings Milestone"]
  },
  {
    name: "Priya Singh",
    email: "priya.singh@example.com",
    totalPoints: 750,
    earnedPoints: 250,
    xp: 120,
    currentSaved: 1800,
    planMonths: 6,
    monthlyDeposit: 1000,
    achievements: []
  },
  {
    name: "Vikram Reddy",
    email: "vikram.reddy@example.com",
    totalPoints: 1800,
    earnedPoints: 700,
    xp: 300,
    currentSaved: 4500,
    planMonths: 12,
    monthlyDeposit: 2200,
    achievements: ["First Deposit"]
  },
  {
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    totalPoints: 1200,
    earnedPoints: 400,
    xp: 200,
    currentSaved: 3200,
    planMonths: 6,
    monthlyDeposit: 1800,
    achievements: ["Joined Rewards"]
  },
  {
    name: "Karthik Iyer",
    email: "karthik.iyer@example.com",
    totalPoints: 1000,
    earnedPoints: 350,
    xp: 180,
    currentSaved: 2700,
    planMonths: 12,
    monthlyDeposit: 2000,
    achievements: []
  },
  {
    name: "Ananya Das",
    email: "ananya.das@example.com",
    totalPoints: 1300,
    earnedPoints: 500,
    xp: 220,
    currentSaved: 3500,
    planMonths: 6,
    monthlyDeposit: 1500,
    achievements: ["Referral Bonus"]
  },
  {
    name: "Siddharth Mehta",
    email: "siddharth.mehta@example.com",
    totalPoints: 1700,
    earnedPoints: 650,
    xp: 280,
    currentSaved: 4200,
    planMonths: 12,
    monthlyDeposit: 2300,
    achievements: ["First Deposit", "Savings Milestone"]
  },
  {
    name: "Traveller",
    email: "traveller@example.com",
    totalPoints: 2500,
    earnedPoints: 1000,
    xp: 500,
    currentSaved: 6000,
    planMonths: 12,
    monthlyDeposit: 3000,
    achievements: ["First Deposit", "Referral Bonus", "VIP Tier"]
  }
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing RewardProfiles
    await RewardProfile.deleteMany({});
    console.log("🧹 Existing Reward Profiles cleared");

    // Insert sample profiles
    await RewardProfile.insertMany(sampleRewards);
    console.log("🎉 Sample Reward Profiles inserted");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
    process.exit(1);
  }
})();
