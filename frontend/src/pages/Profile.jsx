import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("Error loading profile:", err);
      }
    };

    fetchProfile();
  }, []);

  if (!userData) {
    return <div className="profile-wrapper">Loading profile...</div>;
  }

  const { user, trips, wishlist, bookings } = userData;

  return (
    <div className="profile-wrapper">
      <div className="profile-grid glassy fade-in">
        {/* Left Panel */}
        <div className="left-panel">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"} // Default avatar
            alt="Profile"
            className="profile-avatar"
          />
          <h2>{user.name}</h2>
          <p className="subtitle">Wanderlust | Trekker | Photographer</p>

          <div className="stats-grid">
            <div className="stat-card glassy">
              <h3>{trips?.length || 0}</h3>
              <p>Trips</p>
            </div>
            <div className="stat-card glassy">
              <h3>{wishlist?.length || 0}</h3>
              <p>Wishlist</p>
            </div>
            <div className="stat-card glassy">
              <h3>{bookings?.length || 0}</h3>
              <p>Days</p>
            </div>
          </div>

          <div className="action-buttons">
            <button onClick={() => navigate('/mybookings')}> My Bookings</button>
            <button onClick={() => navigate('/wishlist')}> Wishlist</button>
            <button onClick={() => navigate('/pasttrips')}> Past Trips</button>
            <button onClick={() => navigate('/settings')}> Settings</button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="section-title">✨ Saved Trips</div>
          <div className="carousel-container">
            {trips.length > 0 ? (
              trips.map((trip) => (
                <div className="carousel-card glassy" key={trip._id}>
                  <img src={trip.image || "https://via.placeholder.com/200x150"} alt={trip.title} />
                  <div className="trip-overlay">
                    <h4>{trip.title}</h4>
                    <button onClick={() => navigate(`/booking/${trip._id}`)}>Revisit</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="empty-msg">No trips found</p>
            )}
          </div>

          <div className="section-title">About You</div>
          <div className="about-box glassy">
            <p><strong>Preferred Destinations:</strong> Mountains, Beaches, Backwaters</p>
            <p><strong>Travel Style:</strong> Solo, Group Rides</p>
            <p><strong>Favorite Regions:</strong> Himalayas, Western Ghats, Coastal South</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
