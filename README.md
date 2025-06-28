# TravelX
A modern, full-stack travel platform combining trip planning, community engagement, and reward-based experiences. Users can explore reels, plan trips, earn rewards, discover curated packages, and connect with a vibrant biker community.

🌟 Features

✅ Reels
Discover and watch engaging short travel videos
Like, share, and comment on reels

✅ Rewards
Earn points for bookings, reviews, and community engagement
Redeem rewards for discounts on travel packages

✅ Trip Planner
Create and manage custom trip itineraries
Add activities, destinations, and notes

✅ Travel Packages
Browse curated travel experiences
Filter packages by destination, price, and theme

✅ Bike Rider Hub
Connect with fellow riders
Share ride plans and experiences
Join or create biker groups

✅ User Profiles
Manage bookings, saved reels, and reward balance

✅ Responsive Design
Fully optimized for desktop and mobile

✅ Admin Panel (optional if implemented)
Manage users, trips, reels, and rewards

🚀 Tech Stack
Layer	Technology
Frontend	React, Axios, React Router
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JWT, bcrypt
Storage	Cloudinary (Reels/media)
Deployment	Vercel, Render
🗄️ Project Structure
wanderlust-hub/
├── client/           # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── api/
│       ├── App.js
│       └── index.js
├── server/           # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
├── package.json
└── README.md
⚙️ Installation

Prerequisites
Node.js
MongoDB Atlas account or local MongoDB
Clone the repo
git clone https://github.com/your-username/wanderlust-hub.git
cd TravelX-hub
Backend Setup
cd server
npm install
Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

Run the server:
npm run dev
Frontend Setup
cd ../client
npm install
npm start

Scaling & Performance

To ensure a production-grade experience, the following strategies are planned or implemented:
Pagination: API pagination for reels and travel packages
Caching: Redis caching for popular content
CDN: Serving static assets via CDN
Rate Limiting: To prevent abuse
Optimized Media: Cloudinary for video/image optimization
Indexing: MongoDB indexes on frequently queried fields

🛡️ Security Practices
password hashing with bcrypt
JWT authentication with expiry
Input validation & sanitization
Helmet for secure headers
CORS restrictions

🌐 Live Demo
Frontend: https://travel-frontend-oug2vvupm-vallika-3s-projects.vercel.app
Backend API: https://travel-backend-7hf8.onrender.com

👤 Author
Tirumalla Vallika Sai Sree
LinkedIn • GitHub

📄 License

MIT License
