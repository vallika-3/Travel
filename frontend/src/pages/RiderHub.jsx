
import React, { useEffect, useState } from "react";
import "./RiderHub.css";
import { useNavigate } from "react-router-dom";

const campaigns = [
  {
    id: 1,
    title: "Himalayan Adventure Trail",
    description: "Join fellow bikers on a 10-day expedition from Manali to Leh, through the most scenic mountain passes.",
    dates: "July 10 - July 20",
    route: "Manali → Sarchu → Leh → Pangong → Nubra → Manali",
    image: "https://source.unsplash.com/800x400/?himalayas,bike",
  },
  {
    id: 2,
    title: "South India Coastal Ride",
    description: "Explore serene beaches and temples on this coastal trip from Chennai to Kanyakumari.",
    dates: "August 2 - August 9",
    route: "Chennai → Pondicherry → Rameswaram → Kanyakumari",
    image: "https://source.unsplash.com/800x400/?coastline,roadtrip",
  },
];

const RiderHub = () => {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [riderForm, setRiderForm] = useState({
    name: "",
    email: "",
    location: "",
    expertise: "",
  });

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/riders");
        const data = await res.json();
        setRiders(data.riders || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to load riders.");
        setLoading(false);
      }
    };
    fetchRiders();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/riders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(riderForm),
      });
      const data = await res.json();
      if (data.success) {
        alert(`✅ Thank you for registering, ${riderForm.name}!`);
        setRiderForm({ name: "", email: "", location: "", expertise: "" });
        const updatedRes = await fetch("http://localhost:5001/api/riders");
        const updatedData = await updatedRes.json();
        setRiders(updatedData.riders || []);
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      alert(`❌ Registration failed.`);
    }
  };

  return (
    <div className="riderhub-campaign-container">
      <h1 className="campaign-title">🌐 Rider Campaign Hub</h1>
      <p className="campaign-subtitle">
        Join, lead or explore travel campaigns with passionate riders across the globe.
      </p>

      <div className="campaign-cards-flex-container">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <img src={campaign.image} alt={campaign.title} className="campaign-image" />
            <div className="campaign-info">
              <h2>{campaign.title}</h2>
              <p className="campaign-dates">🗓 {campaign.dates}</p>
              <p>{campaign.description}</p>
              <p>
                <strong>Route:</strong> {campaign.route}
              </p>

              <h4>Riders Joining:</h4>
              {loading && <p>Loading riders...</p>}
              {error && <p>{error}</p>}
              <div className="rider-preview-list">
                {riders.slice(0, 3).map((r) => (
                  <div key={r._id} className="rider-mini-card">
                    <img
                      src={`https://randomuser.me/api/portraits/lego/${Math.floor(
                        Math.random() * 10
                      )}.jpg`}
                      alt={r.name}
                    />
                    <div>
                      <strong>{r.name}</strong>
                      <p>{r.location}</p>
                      <p className="mini-rating">⭐ 4.8</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="campaign-actions">
                <button
                  onClick={() => navigate(`/campaign/${campaign.id}`, { state: campaign })}
                >
                  View Campaign
                </button>
                <button className="join-btn" onClick={() => alert("Redirect to Join Flow")}>
                  Join Campaign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rider Registration */}
      <div className="rider-register-form">
        <h2>🚀 Become a Rider</h2>
        <p>Join the RiderHub network and participate in global campaigns.</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            required
            value={riderForm.name}
            onChange={(e) => setRiderForm({ ...riderForm, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={riderForm.email}
            onChange={(e) => setRiderForm({ ...riderForm, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Location"
            required
            value={riderForm.location}
            onChange={(e) => setRiderForm({ ...riderForm, location: e.target.value })}
          />
          <input
            type="text"
            placeholder="Area of Expertise (e.g. Off-road, Photography)"
            required
            value={riderForm.expertise}
            onChange={(e) => setRiderForm({ ...riderForm, expertise: e.target.value })}
          />
          <button type="submit" className="join-btn">
            Register Now
          </button>
        </form>
      </div>
    </div>
  );


};

export default RiderHub;

