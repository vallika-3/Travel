const mongoose = require("mongoose"); // You forgot this import!
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // adjust if needed

const MONGO_URI = "mongodb+srv://vallika:Vallik%402005@cluster0.dskz18b.mongodb.net/test?retryWrites=true&w=majority"; // replace with your DB name

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

async function seedUsers() {
  try {
    // Connect without deprecated options
    await mongoose.connect(MONGO_URI);

    console.log("Connected to MongoDB");

    // Clear existing users
    await User.deleteMany();

    const defaultPassword = "password123";
    const travellerPassword = "traveller123";
    const salt = await bcrypt.genSalt(10);

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
          trips: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
          ],
          wishlist: [
            new mongoose.Types.ObjectId(),
          ],
          bookings: [
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
            new mongoose.Types.ObjectId(),
          ],
        };
      })
    );

    await User.insertMany(usersToInsert);

    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedUsers();
