import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await api.get("/api/users/me", {
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
            src={user.avatar || "https://i.pravatar.cc/150"}
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
                  <img src="https://images.unsplash.com/photo-1529260830199-42c24126f198?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvbWV8ZW58MHx8MHx8fDA%3D" alt="" />
                  <div className="trip-overlay">
                    <h4>{trip.title}</h4>
                    <button onClick={() => navigate(`/place-details/${trip._id}`)}>
                      Revisit
                    </button>
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
