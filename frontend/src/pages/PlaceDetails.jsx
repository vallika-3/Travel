import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PlaceDetails.css';
import {
  FaStar,
  FaBus,
  FaUtensils,
  FaCalendarAlt,
} from 'react-icons/fa';

const PlaceDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [sortOption, setSortOption] = useState('price');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinationAndPackages = async () => {
      try {
        const destinationRes = await fetch(`http://localhost:5001/api/destinations/${id}`);
        const destinationData = await destinationRes.json();
        console.log("📍 Destination Name:", destinationData.name); // Debug log
        setDestination(destinationData);

        // Clean destination name before sending to backend
        const cleanName = destinationData.name.split(',')[0].trim();
        console.log("🔍 Querying packages for:", cleanName);

        const packagesRes = await fetch(`http://localhost:5001/api/packages/${cleanName}`);
        const packagesData = await packagesRes.json();
        console.log("📦 Fetched packages:", packagesData);

        setPackages(packagesData);
      } catch (err) {
        console.error("❌ Failed to load destination or packages:", err);
      }
    };

    fetchDestinationAndPackages();
  }, [id]);

  const handleSort = (option) => setSortOption(option);

  const sortedPackages = Array.isArray(packages)
    ? [...packages].sort((a, b) => {
        if (sortOption === 'price') return a.price - b.price;
        if (sortOption === 'rating') return b.rating - a.rating;
        if (sortOption === 'duration') return a.duration - b.duration;
        return 0;
      })
    : [];

  return (
    <div className="place-details-container">
      {destination ? (
        <>
          <div className="hero-section">
            <img
              src={destination.image}
              alt={destination.name}
              className="hero-image"
            />
            <div className="hero-title">{destination.name}, {destination.location}</div>
          </div>

          <div className="map-section">
            <iframe
              title="destination-map"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(destination.location)}&output=embed`}
              width="100%"
              height="400"
              frameBorder="0"
              style={{ borderRadius: '12px' }}
              allowFullScreen
            ></iframe>
          </div>

          <div className="filter-bar">
            <span>Sort by:</span>
            <button className={sortOption === 'price' ? 'active' : ''} onClick={() => handleSort('price')}>Price</button>
            <button className={sortOption === 'rating' ? 'active' : ''} onClick={() => handleSort('rating')}>Rating</button>
            <button className={sortOption === 'duration' ? 'active' : ''} onClick={() => handleSort('duration')}>Duration</button>
          </div>

          <h2 className="packages-title">Available Travel Packages</h2>
          {sortedPackages.length === 0 ? (
            <p style={{ fontSize: '18px', textAlign: 'center', marginTop: '40px' }}>
              No packages available for this destination.
            </p>
          ) : (
            <div className="packages-grid">
              {sortedPackages.map((pkg) => (
                <div key={pkg._id} className="package-card">
                  <div className="package-header">
                    <img src={pkg.logo} alt={pkg.provider} className="provider-logo" />
                    <div>
                      <h3>{pkg.provider}</h3>
                      <span className="rating"><FaStar /> {pkg.rating}</span>
                    </div>
                  </div>
                  <p className="price">₹{pkg.price}</p>
                  <p className="duration">{pkg.duration} Nights</p>

                  <div className="package-actions">
                    <button className="view-details-btn" onClick={() => setSelectedPackage(pkg)}>View Details</button>
                    <button className="book-now-btn" onClick={() => navigate(`/my-bookings`)}>Book Now</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedPackage && (
            <div className="modal-overlay" onClick={() => setSelectedPackage(null)}>
              <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={() => setSelectedPackage(null)}>×</button>
                <h2>{selectedPackage.provider} Details</h2>

                <div className="icons-section">
                  <span><FaUtensils /> {selectedPackage.foodIncluded ? 'Food Included' : 'No Food'}</span>
                  <span><FaBus /> {selectedPackage.transportIncluded ? 'Transport Included' : 'No Transport'}</span>
                </div>

                <div className="calendar-section">
                  <FaCalendarAlt /> <strong>Available Dates:</strong>
                  <ul>
                    {selectedPackage.availableDates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                </div>

                <div className="itinerary-section">
                  <h4>Itinerary</h4>
                  <pre>{selectedPackage.itinerary}</pre>
                </div>

                <div className="gallery-section">
                  <h4>Gallery</h4>
                  <div className="gallery-scroll">
                    {selectedPackage.galleryImages.map((img, index) => (
                      <img key={index} src={img} alt={`Gallery ${index}`} />
                    ))}
                  </div>
                </div>

                <div className="reviews-section">
                  <h4>Reviews</h4>
                  {selectedPackage.reviews && selectedPackage.reviews.length === 0 && <p>No reviews yet.</p>}
                  {selectedPackage.reviews && selectedPackage.reviews.map((review, index) => (
                    <div key={index} className="review-card">
                      <img src={review.avatar} alt={review.name} className="review-avatar" />
                      <div>
                        <strong>{review.name}</strong>
                        <p className="rating"><FaStar /> {review.rating}</p>
                        <p>{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <p style={{ padding: "60px", fontSize: "24px", textAlign: "center" }}>
          Loading destination details...
        </p>
      )}
    </div>
  );
};

export default PlaceDetails;
