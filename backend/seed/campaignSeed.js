const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Campaign = require("../models/Campaign");

dotenv.config();
const campaigns = [
  {
    id: 1,
    title: "Himalayan Adventure Trail",
    description:
      "Join fellow bikers on a 10-day expedition from Manali to Leh, through the most scenic mountain passes.",
    dates: "July 10 - July 20",
    route: "Manali → Sarchu → Leh → Pangong → Nubra → Manali",
    image: "https://source.unsplash.com/1200x600/?himalayas,bike",
    riders: [
      {
        name: "Aarav Mehta",
        location: "Delhi, India",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        expertise: ["Mountain Biking", "Snow Routes"],
        trips: 18,
        rating: 4.9,
      },
      {
        name: "Sanya Kapoor",
        location: "Mumbai, India",
        image: "https://randomuser.me/api/portraits/women/52.jpg",
        expertise: ["Photography", "Trail Navigation"],
        trips: 12,
        rating: 4.7,
      },
    ],
  },
  {
    id: 2,
    title: "South India Coastal Ride",
    description:
      "Explore serene beaches and temples on this coastal trip from Chennai to Kanyakumari.",
    dates: "August 2 - August 9",
    route: "Chennai → Pondicherry → Rameswaram → Kanyakumari",
    image: "https://source.unsplash.com/1200x600/?coastline,roadtrip",
    riders: [
      {
        name: "Rahul Menon",
        location: "Kochi, India",
        image: "https://randomuser.me/api/portraits/men/60.jpg",
        expertise: ["Culture Tours", "Beach Trails"],
        trips: 10,
        rating: 4.8,
      },
    ],
  },
];

async function seedCampaigns() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Campaign.deleteMany();
    await Campaign.insertMany(campaigns);
    console.log("✅ Campaigns seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedCampaigns();
