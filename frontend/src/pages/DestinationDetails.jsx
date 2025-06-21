import React, { useState } from 'react';
import './DestinationDetails.css';

const mockDestinations = [
  {
    id: 1,
    name: 'Bali, Indonesia',
    region: 'Asia',
    image: 'https://source.unsplash.com/800x500/?bali',
    price: 24000,
    duration: 5,
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Paris, France',
    region: 'Europe',
    image: 'https://source.unsplash.com/800x500/?paris',
    price: 55000,
    duration: 4,
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Goa, India',
    region: 'Asia',
    image: 'https://source.unsplash.com/800x500/?goa',
    price: 18000,
    duration: 3,
    rating: 4.5,
  },
];

const DestinationDetails = () => {
  const [sortBy, setSortBy] = useState('price');

  const sorted = [...mockDestinations].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'duration') return a.duration - b.duration;
    return 0;
  });

  return (
    <div className="destination-container">
      <h1 className="destination-heading">Top Destinations</h1>

      <div className="filter-bar">
        <span>Sort by:</span>
        <button onClick={() => setSortBy('price')}>Price</button>
        <button onClick={() => setSortBy('rating')}>Rating</button>
        <button onClick={() => setSortBy('duration')}>Duration</button>
      </div>

      <div className="destination-grid">
        {sorted.map(dest => (
          <div key={dest.id} className="destination-card">
            <img src={dest.image} alt={dest.name} className="destination-img" />
            <h3>{dest.name}</h3>
            <p><strong>Region:</strong> {dest.region}</p>
            <p><strong>Duration:</strong> {dest.duration} Days</p>
            <p><strong>Price:</strong> ₹{dest.price}</p>
            <p><strong>Rating:</strong> ⭐ {dest.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DestinationDetails;
