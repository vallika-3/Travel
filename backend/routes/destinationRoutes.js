const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

const useMockData = true;

let mockDestinations = [
  {
    _id: "1",
    name: "Bali",
    type: "Romantic",
    image: "https://example.com/images/bali.jpg",
    description: "Tropical paradise for couples and nature lovers.",
    reviews: [],
  },
  {
    _id: "2",
    name: "Swiss Alps",
    type: "Adventurous",
    image: "https://example.com/images/swiss.jpg",
    description: "Perfect for skiing and alpine adventure.",
    reviews: [],
  },
  {
    _id: "3",
    name: "Kyoto",
    type: "Cultural",
    image: "https://example.com/images/kyoto.jpg",
    description: "Historic temples and traditional Japanese beauty.",
    reviews: [],
  },
  {
    _id: "4",
    name: "Paris",
    type: "Romantic",
    image: "https://example.com/images/paris.jpg",
    description: "City of love with iconic landmarks and cafes.",
    reviews: [],
  },
  {
    _id: "5",
    name: "Machu Picchu",
    type: "Adventurous",
    image: "https://example.com/images/machu-picchu.jpg",
    description: "Ancient Incan city nestled in the Andes.",
    reviews: [],
  },
  {
    _id: "6",
    name: "New York City",
    type: "Urban",
    image: "https://example.com/images/nyc.jpg",
    description: "Bustling metropolis with iconic skyline and culture.",
    reviews: [],
  },
  {
    _id: "7",
    name: "Santorini",
    type: "Romantic",
    image: "https://example.com/images/santorini.jpg",
    description: "Famous for sunsets, white-washed buildings, and blue domes.",
    reviews: [],
  },
  {
    _id: "8",
    name: "Banff National Park",
    type: "Nature",
    image: "https://example.com/images/banff.jpg",
    description: "Stunning lakes, mountain ranges, and wildlife in Canada.",
    reviews: [],
  },
  {
    _id: "9",
    name: "Cairo",
    type: "Historical",
    image: "https://example.com/images/cairo.jpg",
    description: "Explore ancient Egyptian history and the Pyramids of Giza.",
    reviews: [],
  },
  {
    _id: "10",
    name: "Barcelona",
    type: "Cultural",
    image: "https://example.com/images/barcelona.jpg",
    description: "Gaudí architecture, beaches, and rich Catalan culture.",
    reviews: [],
  },
  {
    _id: "11",
    name: "Iceland",
    type: "Adventurous",
    image: "https://example.com/images/iceland.jpg",
    description: "Land of fire and ice — glaciers, geysers, and volcanoes.",
    reviews: [],
  },
  {
    _id: "12",
    name: "Maldives",
    type: "Romantic",
    image: "https://example.com/images/maldives.jpg",
    description: "Crystal-clear waters, luxurious villas, and coral reefs.",
    reviews: [],
  },
  {
    _id: "13",
    name: "Petra",
    type: "Historical",
    image: "https://example.com/images/petra.jpg",
    description: "Rock-cut architecture and ancient desert wonders in Jordan.",
    reviews: [],
  },
  {
    _id: "14",
    name: "Tokyo",
    type: "Urban",
    image: "https://example.com/images/tokyo.jpg",
    description: "High-tech metropolis fused with traditional Japanese culture.",
    reviews: [],
  },
  {
    _id: "15",
    name: "Great Barrier Reef",
    type: "Nature",
    image: "https://example.com/images/great-barrier-reef.jpg",
    description: "World’s largest coral reef system, perfect for diving.",
    reviews: [],
  }
]


router.get("/", async (req, res) => {
  try {
    if (useMockData) {
      return res.json(mockDestinations);
    } else {
      const data = await Destination.find();
      return res.json(data);
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
    res.status(500).json({ message: "Failed to fetch destinations" });
  }
});

router.post("/:id/reviews", async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (useMockData) {
      const destination = mockDestinations.find((d) => d._id === req.params.id);
      if (!destination) {
        return res.status(404).json({ message: "Destination not found" });
      }

      const newReview = { rating, comment, date: new Date() };
      destination.reviews = destination.reviews || [];
      destination.reviews.push(newReview);

      return res.status(201).json({ message: "Review added (mock)", review: newReview });
    }

    // Real DB
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: "Destination not found" });

    destination.reviews.push({ rating, comment, date: new Date() });
    await destination.save();

    res.status(201).json({ message: "Review added" });
  } catch (error) {
    console.error("Review submission error:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
});

module.exports = router;
