import React, { useState, useEffect } from "react";
import api from "../api"; // ✅ Import your centralized axios instance
import "./TripPlanner.css";

const TripPlanner = () => {
  const [tripType, setTripType] = useState("solo");
  const [plan, setPlan] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    transport: "Flight",
    travelers: 1,
    notes: "",
    groupMembers: [{ name: "", email: "" }],
    bikeType: "",
    campaignName: "",
    routePlan: ""
  });

  const [daysCount, setDaysCount] = useState(0);
  const [savedTrips, setSavedTrips] = useState([]);

  // Compute trip duration
  useEffect(() => {
    if (plan.startDate && plan.endDate) {
      const start = new Date(plan.startDate);
      const end = new Date(plan.endDate);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setDaysCount(diff + 1);
    } else {
      setDaysCount(0);
    }
  }, [plan.startDate, plan.endDate]);

  // Load saved trips on mount
  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await api.get("/api/trip-planner"); // ✅ No base URL
      if (res.data.success) {
        setSavedTrips(res.data.trips);
      }
    } catch (err) {
      console.error("Failed to fetch trips:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan({ ...plan, [name]: value });
  };

  const handleGroupMemberChange = (index, field, value) => {
    const updated = [...plan.groupMembers];
    updated[index][field] = value;
    setPlan({ ...plan, groupMembers: updated });
  };

  const addGroupMember = () => {
    setPlan({
      ...plan,
      groupMembers: [...plan.groupMembers, { name: "", email: "" }]
    });
  };

  const saveToLocal = () => {
    localStorage.setItem("tripDraft", JSON.stringify({ tripType, ...plan }));
    alert("💾 Trip saved locally!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/trip-planner", { tripType, ...plan });
      if (res.data.success) {
        alert(`✅ Trip to ${plan.destination} saved successfully!`);
        // Reset form
        setPlan({
          destination: "",
          startDate: "",
          endDate: "",
          transport: "Flight",
          travelers: 1,
          notes: "",
          groupMembers: [{ name: "", email: "" }],
          bikeType: "",
          campaignName: "",
          routePlan: ""
        });
        setTripType("solo");
        fetchTrips();
      } else {
        alert(`❌ Error: ${res.data.error}`);
      }
    } catch (err) {
      alert(`❌ Request failed: ${err.response?.data?.message || err.message}`);
    }
  };
  return (
    <div className="trip-wrapper">
      {/* LEFT FORM */}
      <div className="trip-form glass">
        <h2>✨ Ultimate Trip Planner</h2>
        <form onSubmit={handleSubmit}>
          {/* Your form as before */}
          {/* ... */}
          {/* (No changes needed in the form markup) */}
          {/* ... */}
          <label>Trip Type</label>
          <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
            <option value="solo">Solo</option>
            <option value="group">Group</option>
            <option value="biker">Biker Campaign</option>
            <option value="family">Family</option>
            <option value="corporate">Corporate</option>
          </select>
          <label>Destination</label>
          <input
            type="text"
            name="destination"
            placeholder="e.g., Manali, Bali..."
            value={plan.destination}
            onChange={handleChange}
            required
          />
          <div className="row">
            <div>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={plan.startDate}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={plan.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <label>Mode of Travel</label>
          <select
            name="transport"
            value={plan.transport}
            onChange={handleChange}
          >
            <option>Flight</option>
            <option>Train</option>
            <option>Road</option>
            <option>Bike</option>
          </select>

          {tripType === "group" && (
            <>
              <h4>👥 Group Members</h4>
              {plan.groupMembers.map((member, idx) => (
                <div className="row" key={idx}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      handleGroupMemberChange(idx, "name", e.target.value)
                    }
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) =>
                      handleGroupMemberChange(idx, "email", e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                className="add-btn"
                onClick={addGroupMember}
              >
                + Add Member
              </button>
            </>
          )}

          {tripType === "biker" && (
            <>
              <label>Campaign Name</label>
              <input
                type="text"
                name="campaignName"
                value={plan.campaignName}
                onChange={handleChange}
              />
              <label>Bike Type</label>
              <input
                type="text"
                name="bikeType"
                value={plan.bikeType}
                onChange={handleChange}
              />
              <label>Route Plan</label>
              <textarea
                name="routePlan"
                rows="2"
                value={plan.routePlan}
                onChange={handleChange}
              />
            </>
          )}

          <label>Notes</label>
          <textarea
            name="notes"
            rows="3"
            placeholder="Any custom plans?"
            value={plan.notes}
            onChange={handleChange}
          />

          <div className="row space-between">
            <button type="submit" className="submit-btn">
              📩 Save Trip
            </button>
            <button
              type="button"
              onClick={saveToLocal}
              className="add-btn"
            >
              💾 Save as Draft
            </button>
          </div>
        </form>
      </div>

      {/* RIGHT PREVIEW */}
      <div className="trip-preview glass">
        <div
          className="preview-header"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e)"
          }}
        >
          <div className="overlay">
            <h3>{plan.destination || "Your Destination"}</h3>
            {daysCount > 0 && (
              <p>
                {daysCount} day{daysCount > 1 ? "s" : ""} trip
              </p>
            )}
          </div>
        </div>

        <div className="preview-body">
          <p>
            <strong>Type:</strong> {tripType}
          </p>
          <p>
            <strong>Dates:</strong> {plan.startDate || "—"} →{" "}
            {plan.endDate || "—"}
          </p>
          <p>
            <strong>Mode:</strong> {plan.transport}
          </p>
          {tripType === "group" && (
            <>
              <p>
                <strong>Group Size:</strong> {plan.groupMembers.length}
              </p>
              <div className="member-list">
                {plan.groupMembers.map((member, index) => (
                  <div key={index} className="member-item">
                    <span>👤 {member.name || "Unnamed"}</span>
                    <span>📧 {member.email || "No email"}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {tripType === "biker" && (
            <>
              <p>
                <strong>Campaign:</strong> {plan.campaignName}
              </p>
              <p>
                <strong>Bike:</strong> {plan.bikeType}
              </p>
              <p>
                <strong>Route:</strong> {plan.routePlan || "—"}
              </p>
            </>
          )}
          <p>
            <strong>Notes:</strong> {plan.notes || "None"}
          </p>
        </div>

        <hr />
        <h4>🌟 Saved Trips</h4>
        {savedTrips.length === 0 ? (
          <p>No trips saved yet.</p>
        ) : (
          savedTrips.map((trip) => (
            <div key={trip._id} className="saved-trip">
              <h5>{trip.destination}</h5>
              <p>{trip.startDate?.slice(0,10)} → {trip.endDate?.slice(0,10)}</p>
              <p>Type: {trip.tripType}</p>
              <p>Mode: {trip.transport}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TripPlanner;
