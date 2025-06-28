// seed/seedDestinations.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "../models/Destination.js";

dotenv.config();

const sampleDestinations = [
  {
    name: 'Bali',
    location: 'Indonesia',
    price: 18000,
    days: 5,
    image: 'https://source.unsplash.com/600x400/?bali,beach,temple',
    rating: 4.8,
    liked: false,
    trending: true,
    category: 'beach'
  },
  {
    name: 'Rajasthan',
    location: 'India',
    price: 15000,
    days: 4,
    image: 'https://source.unsplash.com/600x400/?rajasthan,desert,palace',
    rating: 4.7,
    liked: false,
    trending: true,
    category: 'desert'
  },
  {
    name: 'Swiss Alps',
    location: 'Switzerland',
    price: 40000,
    days: 6,
    image: 'https://source.unsplash.com/600x400/?swiss-alps,mountains',
    rating: 4.9,
    liked: false,
    trending: true,
    category: 'mountains'
  },
  {
    name: 'Tokyo',
    location: 'Japan',
    price: 25000,
    days: 3,
    image: 'https://source.unsplash.com/600x400/?tokyo,city,lights',
    rating: 4.6,
    liked: false,
    trending: false,
    category: 'city'
  },
  {
    name: 'Amazon Rainforest',
    location: 'Brazil',
    price: 30000,
    days: 5,
    image: 'https://source.unsplash.com/600x400/?amazon,forest,jungle',
    rating: 4.8,
    liked: false,
    trending: false,
    category: 'forest'
  },
  {
    name: 'Himalayas',
    location: 'Nepal',
    price: 20000,
    days: 7,
    image: 'https://source.unsplash.com/600x400/?himalayas,trekking',
    rating: 4.7,
    liked: false,
    trending: true,
    category: 'trek'
  },
  {
    name: 'Maldives',
    location: 'Maldives',
    price: 35000,
    days: 4,
    image: 'https://source.unsplash.com/600x400/?maldives,beach,blue-water',
    rating: 5.0,
    liked: false,
    trending: true,
    category: 'island'
  },
  {
    name: 'Banff National Park',
    location: 'Canada',
    price: 32000,
    days: 6,
    image: 'https://source.unsplash.com/600x400/?banff,mountains,lake',
    rating: 4.8,
    liked: false,
    trending: false,
    category: 'mountains'
  },
  {
    name: 'Rome',
    location: 'Italy',
    price: 27000,
    days: 3,
    image: 'https://source.unsplash.com/600x400/?rome,historical,architecture',
    rating: 4.7,
    liked: false,
    trending: true,
    category: 'historical'
  },
  {
    name: 'Kerala Backwaters',
    location: 'India',
    price: 16000,
    days: 4,
    image: 'https://source.unsplash.com/600x400/?kerala,backwaters',
    rating: 4.6,
    liked: false,
    trending: false,
    category: 'countryside'
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    await Destination.deleteMany();
    await Destination.insertMany(sampleDestinations);
    console.log("✅ Sample destinations inserted!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Seeder error:", err);
    process.exit(1);
  });
