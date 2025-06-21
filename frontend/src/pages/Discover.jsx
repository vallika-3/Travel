import React, { useState } from 'react';
import './Discover.css';
import { FaHeart, FaStar } from 'react-icons/fa';

const mockDestinations = [
  {
    id: 1,
    name: 'Paris',
    location: 'France',
    price: '₹25,000/night',
    image: 'https://source.unsplash.com/600x400/?paris,travel',
    rating: 4.8,
    liked: false,
  },
  {
    id: 2,
    name: 'Maldives Villa',
    location: 'Maldives',
    price: '₹40,000/night',
    image: 'https://source.unsplash.com/600x400/?maldives,resort',
    rating: 4.9,
    liked: false,
  },
  {
    id: 3,
    name: 'Swiss Alps Chalet',
    location: 'Switzerland',
    price: '₹35,000/night',
    image: 'https://source.unsplash.com/600x400/?switzerland,mountains',
    rating: 4.7,
    liked: false,
  },
  {
    id: 4,
    name: 'Tokyo Apartment',
    location: 'Japan',
    price: '₹15,000/night',
    image: 'https://source.unsplash.com/600x400/?tokyo,city',
    rating: 4.6,
    liked: false,
  },
  {
    id: 5,
    name: 'Santorini Home',
    location: 'Greece',
    price: '₹28,000/night',
    image: 'https://source.unsplash.com/600x400/?santorini,travel',
    rating: 4.9,
    liked: false,
  },
  {
    id: 6,
    name: 'New York Loft',
    location: 'USA',
    price: '₹22,000/night',
    image: 'https://source.unsplash.com/600x400/?newyork,city',
    rating: 4.7,
    liked: false,
  },
];

const Discover = () => {
  const [destinations, setDestinations] = useState(mockDestinations);

  const toggleLike = (id) => {
    const updated = destinations.map((dest) =>
      dest.id === id ? { ...dest, liked: !dest.liked } : dest
    );
    setDestinations(updated);
  };

  const handleCardClick = (dest) => {
    console.log('Clicked:', dest);
    
  };

  return (
    <div className="discover-container">
      <h1 className="discover-title">Discover  Places</h1>
      <div className="discover-grid">
        {destinations.map((dest) => (
          <div
            key={dest.id}
            className="destination-card glass-card"
            onClick={() => handleCardClick(dest)}
          >
            <div className="card-image-wrapper">
              <img src={dest.image} alt={dest.name} />
              <div
                className={`like-button ${dest.liked ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(dest.id);
                }}
              >
                <FaHeart />
              </div>
            </div>
            <div className="destination-info">
              <div className="destination-header">
                <h3>{dest.name}</h3>
                <span className="rating">
                  <FaStar style={{ color: 'gold' }} /> {dest.rating}
                </span>
              </div>
              <p className="location">{dest.location}</p>
              <p className="price">{dest.price}</p>
              <button className="view-details">View Details →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
