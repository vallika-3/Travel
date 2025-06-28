const mongoose = require("mongoose");
const dotenv = require("dotenv");
const TripPlanner = require("../models/TripPlanner");


dotenv.config();

const sampleTrips = [
  {
    tripType: "solo",
    destination: "Goa",
    startDate: new Date("2025-09-01"),
    endDate: new Date("2025-09-07"),
    transport: "Flight",
    travelers: 1,
    notes: "Relaxing solo trip."
  },
  {
    tripType: "group",
    destination: "Manali",
    startDate: new Date("2025-10-10"),
    endDate: new Date("2025-10-20"),
    transport: "Train",
    travelers: 4,
    notes: "Group adventure!",
    groupMembers: [
      { name: "Amit", email: "amit@example.com" },
      { name: "Neha", email: "neha@example.com" }
    ]
  }
];

const seedTrips = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    await TripPlanner.deleteMany();
    await TripPlanner.insertMany(sampleTrips);

    console.log("✅ TripPlanner data seeded!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedTrips();
