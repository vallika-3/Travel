import React, { useState } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const [upcomingTrips, setUpcomingTrips] = useState([
    {
      id: '1',
      title: 'Manali to Leh Adventure',
      date: '2025-07-10',
      img: 'https://images.unsplash.com/photo-1627894533446-3ac443908f7b',
      location: 'Manali',
      temp: '24°C',
      progress: 60,
    },
    {
      id: '2',
      title: 'Goa Beachside Retreat',
      date: '2025-08-20',
      img: 'https://images.unsplash.com/photo-1570787838527-77f01c4d79aa',
      location: 'Goa',
      temp: '29°C',
      progress: 80,
    },
  ]);

  const exploreAgain = [
    {
      id: '3',
      title: 'Kerala Backwaters',
      img: 'https://images.unsplash.com/photo-1609051861260-6b04ad6f3c57',
    },
    {
      id: '4',
      title: 'Desert Trails',
      img: 'https://images.unsplash.com/photo-1585750051110-26b2b4e54a06',
    },
  ];

  const handleRemoveTrip = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to remove this trip?');
    if (confirmDelete) {
      setUpcomingTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== id));
    }
  };

  const handleAddToCalendar = (trip) => {
    const startDate = trip.date.replace(/-/g, '');
    const calendarURL = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(trip.title)}&dates=${startDate}/${startDate}&details=Trip to ${trip.location}`;
    window.open(calendarURL, '_blank');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome Back, Vallika</h1>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column glass">
          <div className="profile-section">
            <img
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="User"
              className="profile-image"
            />
            <h2>Vallika Sai Sree</h2>
            <p>Total Trips: <strong>8</strong></p>
            <p>Wishlist Items: <strong>4</strong></p>
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button onClick={() => navigate('/wishlist')}>Wishlist</button>
            <button onClick={() => navigate('/mybookings')}>My Bookings</button>
            <button onClick={() => navigate('/settings')}>Settings</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="section">
            <h2>Upcoming Trips</h2>
            <div className="card-list">
              {upcomingTrips.map((trip) => (
                <div className="card glass trip-card" key={trip.id}>
                  <img src={trip.img} alt={trip.title} />
                  <div className="card-info">
                    <h4>{trip.title}</h4>
                    <p>{trip.date}</p>

                    <div className="trip-meta">
                      <span>🌤️ {trip.temp}, Sunny</span>
                      <span>📍 {trip.location}</span>
                    </div>

                    <div className="progress-container">
                      <div className="progress-bar" style={{ width: `${trip.progress}%` }}></div>
                    </div>
                    <small>{trip.progress}% planned</small>

                    <div className="trip-actions">
                      <button onClick={() => handleAddToCalendar(trip)}> Add to Calendar</button>
                      <button onClick={() => navigate(`/place-details/${trip.id}`)}>View</button>
                      <button onClick={() => alert('Exporting summary...')}>📤 Export</button>
                      <button onClick={() => navigate(`/trip-planner?edit=${trip.id}`)}>Edit</button>
                      <button onClick={() => handleRemoveTrip(trip.id)}> Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2>Explore Again</h2>
            <div className="card-list">
              {exploreAgain.map((trip) => (
                <div className="card glass" key={trip.id}>
                  <img src={trip.img} alt={trip.title} />
                  <div className="card-info">
                    <h4>{trip.title}</h4>
                    <button onClick={() => navigate(`/place-details/${trip.id}`)}>Discover</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
