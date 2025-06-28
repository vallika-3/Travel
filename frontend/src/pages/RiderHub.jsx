import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ✅ Step 1: Import api
import "./RiderHub.css";

const campaigns = [
  {
    id: 1,
    title: "Himalayan Adventure Trail",
    description: "Join fellow bikers on a 10-day expedition from Manali to Leh, through the most scenic mountain passes.",
    dates: "July 10 - July 20",
    route: "Manali → Sarchu → Leh → Pangong → Nubra → Manali",
    image: "https://images.unsplash.com/photo-1607836046730-3317bd58a31b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGltYWxheWFzfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "South India Coastal Ride",
    description: "Explore serene beaches and temples on this coastal trip from Chennai to Kanyakumari.",
    dates: "August 2 - August 9",
    route: "Chennai → Pondicherry → Rameswaram → Kanyakumari",
    image: "https://images.unsplash.com/photo-1446038202205-1c96430dbdab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29hc3RsaW5lfGVufDB8fDB8fHww",
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
        const res = await api.get("/api/riders"); // ✅ Step 2: Remove full URL
        setRiders(res.data.riders || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load riders.");
        setLoading(false);
      }
    };
    fetchRiders();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // ✅ Post new rider
      const res = await api.post("/api/riders", riderForm);
      const data = res.data;

      if (data.success) {
        alert(`✅ Thank you for registering, ${riderForm.name}!`);
        setRiderForm({ name: "", email: "", location: "", expertise: "" });

        // ✅ Refresh rider list
        const updatedRes = await api.get("/api/riders");
        setRiders(updatedRes.data.riders || []);
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error("Registration error:", err);
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
        src={
          r.logo ||
          `https://randomuser.me/api/portraits/lego/${Math.floor(
            Math.random() * 10
          )}.jpg`
        }
        alt={r.provider || "Provider"}
        className="provider-logo"
      />
      <strong>{r.name}</strong>
      <p>{r.location}</p>
      <p className="mini-rating">⭐ 4.8</p>
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

      {/* Rider Registration */ }
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
    </div >
  );


};

export default RiderHub;

