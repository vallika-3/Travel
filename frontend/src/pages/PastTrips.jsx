import React, { useState, useEffect } from 'react';
import './PastTrips.css';

const PastTrips = () => {
  const [trips, setTrips] = useState([]);
  const [reviewsVisible, setReviewsVisible] = useState({});
  const [reviewContent, setReviewContent] = useState({});

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/trips', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setTrips(data);
      } catch (err) {
        console.error('Error fetching trips:', err);
      }
    };
    fetchTrips();
  }, []);

  const toggleReview = (tripId) => {
    setReviewsVisible((prev) => ({ ...prev, [tripId]: !prev[tripId] }));
  };

  const handleReviewChange = (tripId, value) => {
    setReviewContent((prev) => ({ ...prev, [tripId]: value }));
  };

  const submitReview = async (tripId) => {
    const token = localStorage.getItem('token');
    const comment = reviewContent[tripId];
    if (!comment || comment.trim() === '') {
      alert('Please enter a review');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/api/trips/review/${tripId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment, rating: 5 }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Review submitted');
        setReviewContent((prev) => ({ ...prev, [tripId]: '' }));
        setReviewsVisible((prev) => ({ ...prev, [tripId]: false }));
      } else {
        alert('Failed to submit review');
      }
    } catch (err) {
      alert('Error submitting review');
    }
  };

  return (
    <div className="past-wrapper">
      <h1 className="past-title">Past Trips</h1>
      <p className="past-subtitle">Look back on your unforgettable journeys</p>

      {trips.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '40px', color: '#777' }}>Loading your trips...</p>
      ) : (
        <div className="past-grid">
          {trips.map((trip) => (
            <div className="trip-card glass" key={trip._id}>
              <div className="trip-img-wrapper">
                <img
                  src={trip.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                  alt={trip.title}
                  className="trip-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                  }}
                />
              </div>

              <div className="trip-info">
                <h3>{trip.title}</h3>
                <p className="trip-date">{new Date(trip.date).toLocaleDateString()}</p>
                <p className="trip-desc">{trip.description}</p>

                <button className="review-btn" onClick={() => toggleReview(trip._id)}>
                  {reviewsVisible[trip._id] ? 'Close Review' : 'Leave a Review'}
                </button>

                {reviewsVisible[trip._id] && (
                  <div className="review-box">
                    <textarea
                      placeholder="Share your experience..."
                      value={reviewContent[trip._id] || ''}
                      onChange={(e) => handleReviewChange(trip._id, e.target.value)}
                    />
                    <button className="submit-btn" onClick={() => submitReview(trip._id)}>
                      Submit
                    </button>
                  </div>
                )}

                {trip.reviews && trip.reviews.length > 0 && (
                  <div className="review-section">
                    <h4>Recent Reviews</h4>
                    {trip.reviews.slice(-2).map((review, index) => (
                      <p key={index} className="recent-review">“{review.comment}”</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PastTrips;