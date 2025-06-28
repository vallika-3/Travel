const mongoose = require("mongoose");

const groupMemberSchema = new mongoose.Schema({
  name: String,
  email: String
});

const tripPlannerSchema = new mongoose.Schema({
  tripType: { type: String, required: true },
  destination: { type: String, required: true },
  startDate: Date,
  endDate: Date,
  transport: String,
  travelers: Number,
  notes: String,
  groupMembers: [groupMemberSchema],
  bikeType: String,
  campaignName: String,
  routePlan: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TripPlanner", tripPlannerSchema);
