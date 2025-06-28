const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: String,
  dates: String,
  route: String,
  image: String,
  riders: [
    {
      name: String,
      location: String,
      image: String,
      expertise: [String],
      trips: Number,
      rating: Number,
    },
  ],
});

module.exports = mongoose.model("Campaign", campaignSchema);
