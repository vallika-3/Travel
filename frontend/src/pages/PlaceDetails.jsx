import React, { useState } from 'react';
import './PlaceDetails.css';
import {
  FaStar,
  FaBus,
  FaUtensils,
  FaCalendarAlt,
} from 'react-icons/fa';

const mockPackages = [
  {
    id: 1,
    provider: 'Travel Easy',
    logo: 'https://source.unsplash.com/100x100/?travel',
    price: 25000,
    duration: 3,
    rating: 4.8,
    itinerary: 'Day 1: Beach tour\nDay 2: Cultural sites\nDay 3: Free leisure',
    foodIncluded: true,
    transportIncluded: true,
    availableDates: ['15 June - 18 June', '22 June - 25 June', '1 July - 4 July'],
    galleryImages: [
      'https://source.unsplash.com/400x300/?beach',
      'https://source.unsplash.com/400x300/?temple',
      'https://source.unsplash.com/400x300/?mountains',
    ],
    reviews: [
      { name: 'Alice', rating: 5, comment: 'Amazing experience!', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { name: 'Bob', rating: 4, comment: 'Good value for money.', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
    ],
  },
  {
    id: 2,
    provider: 'Holiday Guru',
    logo: 'https://source.unsplash.com/100x100/?agency',
    price: 28500,
    duration: 4,
    rating: 4.6,
    itinerary: 'Day 1: City tour\nDay 2: Waterfalls\nDay 3: Beach\nDay 4: Shopping',
    foodIncluded: false,
    transportIncluded: true,
    availableDates: ['5 July - 8 July', '15 July - 18 July'],
    galleryImages: [
      'https://source.unsplash.com/400x300/?city',
      'https://source.unsplash.com/400x300/?shopping',
      'https://source.unsplash.com/400x300/?waterfall',
    ],
    reviews: [
      { name: 'John', rating: 5, comment: 'Loved the waterfalls!', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ],
  },
  {
    id: 3,
    provider: 'Wanderlust Travels',
    logo: 'https://source.unsplash.com/100x100/?tourism',
    price: 22000,
    duration: 2,
    rating: 4.7,
    itinerary: 'Day 1: Welcome Dinner\nDay 2: Main attractions\nDay 3: Departure',
    foodIncluded: true,
    transportIncluded: false,
    availableDates: ['20 July - 22 July', '25 July - 27 July'],
    galleryImages: [
      'https://source.unsplash.com/400x300/?adventure',
      'https://source.unsplash.com/400x300/?restaurant',
      'https://source.unsplash.com/400x300/?cityscape',
    ],
    reviews: [],
  },
];

const PlaceDetails = () => {
  const [sortOption, setSortOption] = useState('price');
  const [expandedId, setExpandedId] = useState(null);

  const handleSort = (option) => setSortOption(option);

  const sortedPackages = [...mockPackages].sort((a, b) => {
    if (sortOption === 'price') return a.price - b.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'duration') return a.duration - b.duration;
    return 0;
  });

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="place-details-container">
      <div className="hero-section">
        <img
          src="https://source.unsplash.com/1600x600/?bali,travel"
          alt="Destination"
          className="hero-image"
        />
        <div className="hero-title">Bali, Indonesia</div>
      </div>

      <div className="map-section">
        <iframe
          title="destination-map"
          src="https://maps.google.com/maps?q=bali&t=&z=10&ie=UTF8&iwloc=&output=embed"
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
      <div className="packages-grid">
        {sortedPackages.map((pkg) => (
          <div key={pkg.id} className={`package-card ${expandedId === pkg.id ? 'expanded' : ''}`}>
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
              <button className="view-details-btn" onClick={() => toggleExpand(pkg.id)}>
                {expandedId === pkg.id ? 'Close Details' : 'View Details'}
              </button>
              <button className="book-now-btn">Book Now</button>
            </div>

            {expandedId === pkg.id && (
              <div className="details-section">
                <div className="icons-section">
                  <span><FaUtensils /> {pkg.foodIncluded ? 'Food Included' : 'No Food'}</span>
                  <span><FaBus /> {pkg.transportIncluded ? 'Transport Included' : 'No Transport'}</span>
                </div>

                <div className="calendar-section">
                  <FaCalendarAlt /> <strong>Available Dates:</strong>
                  <ul>
                    {pkg.availableDates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                </div>

                <div className="itinerary-section">
                  <h4>Itinerary</h4>
                  <pre>{pkg.itinerary}</pre>
                </div>

                <div className="gallery-section">
                  <h4>Gallery</h4>
                  <div className="gallery-scroll">
                    {pkg.galleryImages.map((img, index) => (
                      <img key={index} src={img} alt={`Gallery ${index}`} />
                    ))}
                  </div>
                </div>

                <div className="reviews-section">
                  <h4>Reviews</h4>
                  {pkg.reviews.length === 0 && <p>No reviews yet.</p>}
                  {pkg.reviews.map((review, index) => (
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceDetails;
