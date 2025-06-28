import mongoose from "mongoose";
import dotenv from "dotenv";
import Package from "../models/packageModel.js";

dotenv.config();

const samplePackages = [
  {
    "destination": "Bali",
    "provider": "Island Breeze Tours",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 27000,
    "duration": 4,
    "rating": 4.7,
    "itinerary": "Ubud exploration, beach relaxation, water temples.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["12 July - 15 July", "20 July - 23 July"],
    "galleryImages": ["https://source.unsplash.com/400x300/?bali", "https://source.unsplash.com/400x300/?ubud"]
  },
  {
    "destination": "Bali",
    "provider": "Tropical Vibes",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 24000,
    "duration": 3,
    "rating": 4.5,
    "itinerary": "Beach day, cultural dance show, seafood dinner.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["5 Aug - 8 Aug", "18 Aug - 21 Aug"],
    "galleryImages": ["https://source.unsplash.com/400x300/?bali,beach", "https://source.unsplash.com/400x300/?bali,temple"]
  },
  {
    "destination": "Bali",
    "provider": "Dream Island Travels",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 29500,
    "duration": 5,
    "rating": 4.9,
    "itinerary": "Nusa Penida tour, yoga retreat, sunset dinner.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["1 Sept - 5 Sept", "15 Sept - 19 Sept"],
    "galleryImages": ["https://source.unsplash.com/400x300/?nusa,penida", "https://source.unsplash.com/400x300/?bali,sunset"]
  },
  {
    "destination": "Rajasthan",
    "provider": "Royal Sands Tours",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 21000,
    "duration": 4,
    "rating": 4.6,
    "itinerary": "Jaipur City Palace, camel safari in Jaisalmer, folk dance night.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["10 July - 14 July", "18 July - 22 July"],
    "galleryImages": ["https://source.unsplash.com/400x300/?rajasthan", "https://source.unsplash.com/400x300/?jaipur"]
  },
  {
    "destination": "Rajasthan",
    "provider": "Desert Trails",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 19500,
    "duration": 3,
    "rating": 4.4,
    "itinerary": "Jodhpur Fort tour, desert camp, Rajasthani cuisine tasting.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["25 July - 28 July", "5 Aug - 8 Aug"],
    "galleryImages": ["https://source.unsplash.com/400x300/?rajasthan,fort", "https://source.unsplash.com/400x300/?desert"]
  },
  {
    "destination": "Rajasthan",
    "provider": "Raj Heritage Travels",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 23000,
    "duration": 5,
    "rating": 4.8,
    "itinerary": "Udaipur lake cruise, temple visits, camel ride.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["12 Aug - 17 Aug", "20 Aug - 25 Aug"],
    "galleryImages": ["https://source.unsplash.com/400x300/?udaipur", "https://source.unsplash.com/400x300/?rajasthan,lake"]
  },
  {
    "destination": "Swiss Alps",
    "provider": "Alpine Trekkers",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 45000,
    "duration": 6,
    "rating": 4.9,
    "itinerary": "Mountain trekking, glacier hiking, scenic train to Jungfrau.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["1 Aug - 6 Aug", "10 Aug - 15 Aug"],
    "galleryImages": ["https://source.unsplash.com/400x300/?swiss,mountains", "https://source.unsplash.com/400x300/?glacier,hiking"]
  },
  {
    "destination": "Swiss Alps",
    "provider": "Snowy Escapes",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 43000,
    "duration": 5,
    "rating": 4.8,
    "itinerary": "Snow adventures, ski sessions, cable car ride.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["18 Aug - 23 Aug", "26 Aug - 31 Aug"],
    "galleryImages": ["https://source.unsplash.com/400x300/?ski,switzerland", "https://source.unsplash.com/400x300/?snow"]
  },
  {
    "destination": "Swiss Alps",
    "provider": "Matterhorn Views",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 47000,
    "duration": 7,
    "rating": 5.0,
    "itinerary": "Zermatt stay, alpine meadows, luxury spa views.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["5 Sept - 12 Sept", "15 Sept - 22 Sept"],
    "galleryImages": ["https://source.unsplash.com/400x300/?matterhorn", "https://source.unsplash.com/400x300/?switzerland,spa"]
  },
  {
    "destination": "Tokyo",
    "provider": "Nippon Explorers",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 28000,
    "duration": 3,
    "rating": 4.6,
    "itinerary": "Tech hub visits, sushi tour, anime district walk.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["5 Aug - 8 Aug", "15 Aug - 18 Aug"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?tokyo,japan",
      "https://source.unsplash.com/400x300/?sushi,technology"
    ]
  },
  {
    "destination": "Tokyo",
    "provider": "Sakura Tours",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 26000,
    "duration": 4,
    "rating": 4.7,
    "itinerary": "Cherry blossoms, temples, cultural immersion.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["20 Aug - 24 Aug", "28 Aug - 1 Sept"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?tokyo,sakura",
      "https://source.unsplash.com/400x300/?japanese,temple"
    ]
  },
  {
    "destination": "Tokyo",
    "provider": "Metro Adventures",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 30000,
    "duration": 5,
    "rating": 4.8,
    "itinerary": "City lights, Shibuya crossing, Mount Fuji view.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["2 Sept - 7 Sept", "10 Sept - 15 Sept"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?tokyo,night",
      "https://source.unsplash.com/400x300/?mountfuji,japan"
    ]
  },
  {
    "destination": "Amazon Rainforest",
    "provider": "Rainforest Escapes",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 32000,
    "duration": 5,
    "rating": 4.7,
    "itinerary": "Wildlife safari, jungle trails, boat rides.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["12 Sept - 17 Sept", "20 Sept - 25 Sept"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?rainforest,wildlife",
      "https://source.unsplash.com/400x300/?amazon,jungle"
    ]
  },
  {
    "destination": "Amazon Rainforest",
    "provider": "Eco Trekkers",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 35000,
    "duration": 6,
    "rating": 4.8,
    "itinerary": "Night safaris, indigenous village tour, birdwatching.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["1 Oct - 6 Oct", "10 Oct - 15 Oct"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?amazon,eco",
      "https://source.unsplash.com/400x300/?birds,forest"
    ]
  },
  {
    "destination": "Amazon Rainforest",
    "provider": "Jungle Pulse",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 34000,
    "duration": 7,
    "rating": 4.9,
    "itinerary": "Canopy walk, river rafting, medicinal plant tour.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["18 Oct - 25 Oct", "28 Oct - 4 Nov"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?amazon,river",
      "https://source.unsplash.com/400x300/?forest,plants"
    ]
  },
  {
    "destination": "Amazon Rainforest",
    "provider": "Rainforest Escapes",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 32000,
    "duration": 5,
    "rating": 4.7,
    "itinerary": "Wildlife safari, jungle trails, boat rides.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["12 Sept - 17 Sept", "20 Sept - 25 Sept"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?rainforest,wildlife",
      "https://source.unsplash.com/400x300/?amazon,jungle"
    ]
  },
  {
    "destination": "Amazon Rainforest",
    "provider": "Eco Trekkers",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 35000,
    "duration": 6,
    "rating": 4.8,
    "itinerary": "Night safaris, indigenous village tour, birdwatching.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["1 Oct - 6 Oct", "10 Oct - 15 Oct"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?amazon,eco",
      "https://source.unsplash.com/400x300/?birds,forest"
    ]
  },
  {
    "destination": "Amazon Rainforest",
    "provider": "Jungle Pulse",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 34000,
    "duration": 7,
    "rating": 4.9,
    "itinerary": "Canopy walk, river rafting, medicinal plant tour.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["18 Oct - 25 Oct", "28 Oct - 4 Nov"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?amazon,river",
      "https://source.unsplash.com/400x300/?forest,plants"
    ]
  },
  {
    "destination": "Maldives",
    "provider": "Island Hoppers",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 37000,
    "duration": 4,
    "rating": 5.0,
    "itinerary": "Resorts, snorkeling, overwater villas.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["1 Oct - 5 Oct", "10 Oct - 14 Oct"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?maldives,resort",
      "https://source.unsplash.com/400x300/?snorkeling,beach"
    ]
  },
  {
    "destination": "Maldives",
    "provider": "Tropical Waves",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 40000,
    "duration": 5,
    "rating": 4.9,
    "itinerary": "Island hopping, underwater diving, beach spa.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["18 Oct - 23 Oct", "25 Oct - 30 Oct"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?maldives,islands",
      "https://source.unsplash.com/400x300/?scuba,beach"
    ]
  },
  {
    "destination": "Maldives",
    "provider": "Ocean Serenity",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 38500,
    "duration": 4,
    "rating": 5.0,
    "itinerary": "Candlelight dinner, marine life tours, sea kayaking.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["2 Nov - 6 Nov", "12 Nov - 16 Nov"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?maldives,ocean",
      "https://source.unsplash.com/400x300/?kayaking,sunset"
    ]
  },
  {
    "destination": "Banff National Park",
    "provider": "Nature Walks",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 34000,
    "duration": 6,
    "rating": 4.6,
    "itinerary": "Hiking trails, lake visits, photography tours.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["10 Oct - 16 Oct", "18 Oct - 24 Oct"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?banff,hiking",
      "https://source.unsplash.com/400x300/?lake,mountain"
    ]
  },
  {
    "destination": "Banff National Park",
    "provider": "Canadian Treks",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 35500,
    "duration": 5,
    "rating": 4.7,
    "itinerary": "Glacier walks, wildlife viewing, hot springs.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["1 Nov - 6 Nov", "8 Nov - 13 Nov"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?banff,glacier",
      "https://source.unsplash.com/400x300/?wildlife,canada"
    ]
  },
  {
    "destination": "Banff National Park",
    "provider": "Trail Seekers",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 33000,
    "duration": 7,
    "rating": 4.8,
    "itinerary": "Camping, alpine lakes, star gazing experience.",
    "foodIncluded": false,
    "transportIncluded": false,
    "availableDates": ["15 Nov - 21 Nov", "25 Nov - 1 Dec"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?banff,camping",
      "https://source.unsplash.com/400x300/?stars,mountain"
    ]
  },{
    "destination": "Rome",
    "provider": "Historic Europe",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 29000,
    "duration": 3,
    "rating": 4.7,
    "itinerary": "Colosseum, Vatican, Roman Forum.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["5 Nov - 8 Nov", "10 Nov - 13 Nov"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?rome",
      "https://source.unsplash.com/400x300/?colosseum"
    ]
  },
  {
    "destination": "Rome",
    "provider": "Bella Italia Tours",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 31000,
    "duration": 4,
    "rating": 4.8,
    "itinerary": "Food tasting, historical city walks, catacombs.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["15 Nov - 19 Nov", "25 Nov - 29 Nov"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?rome,food",
      "https://source.unsplash.com/400x300/?rome,catacombs"
    ]
  },
  {
    "destination": "Rome",
    "provider": "Classic Travels",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 27500,
    "duration": 3,
    "rating": 4.6,
    "itinerary": "Pantheon, Spanish Steps, guided night tour.",
    "foodIncluded": false,
    "transportIncluded": true,
    "availableDates": ["30 Nov - 3 Dec", "5 Dec - 8 Dec"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?rome,night",
      "https://source.unsplash.com/400x300/?rome,pantheon"
    ]
  },{
    "destination": "Kerala Backwaters",
    "provider": "God's Own Tour",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 17000,
    "duration": 4,
    "rating": 4.6,
    "itinerary": "Houseboat, lagoons, spice plantation tours.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["20 Nov - 24 Nov", "1 Dec - 5 Dec"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?kerala",
      "https://source.unsplash.com/400x300/?houseboat"
    ]
  },
  {
    "destination": "Kerala Backwaters",
    "provider": "Spice Coast Adventures",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 19000,
    "duration": 5,
    "rating": 4.7,
    "itinerary": "Ayurvedic spa, cultural dance, nature trails.",
    "foodIncluded": true,
    "transportIncluded": true,
    "availableDates": ["10 Dec - 15 Dec", "20 Dec - 25 Dec"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?kerala,spa",
      "https://source.unsplash.com/400x300/?kerala,dance"
    ]
  },
  {
    "destination": "Kerala Backwaters",
    "provider": "Tranquil Trails",
    "logo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEX...",
    "price": 21000,
    "duration": 6,
    "rating": 4.8,
    "itinerary": "Village stay, eco-boat ride, traditional cuisine.",
    "foodIncluded": true,
    "transportIncluded": false,
    "availableDates": ["2 Jan - 7 Jan", "10 Jan - 15 Jan"],
    "galleryImages": [
      "https://source.unsplash.com/400x300/?kerala,village",
      "https://source.unsplash.com/400x300/?kerala,backwater"
    ]
  }
];

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(async () => {
    await Package.deleteMany(); // Clear old packages
    await Package.insertMany(samplePackages);
    console.log("✅ Sample travel packages inserted!");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Package seeding error:", err);
    process.exit(1);
  });
