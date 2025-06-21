import React, { useState } from 'react';
import './ExploreDestinations.css';

const destinations = [
  { id: 1, name: 'Bali, Indonesia', description: 'Beaches and temples.', image: 'https://source.unsplash.com/600x400/?bali', region: 'Asia', price: 2, days: 4, rating: 4.8 },
  { id: 2, name: 'Paris, France', description: 'Romantic city of lights.', image: 'https://source.unsplash.com/600x400/?paris', region: 'Europe', price: 3, days: 5, rating: 4.9 },
  { id: 3, name: 'Cape Town, South Africa', description: 'Mountains and coast.', image: 'https://source.unsplash.com/600x400/?capetown', region: 'Africa', price: 1, days: 3, rating: 4.6 },
  { id: 4, name: 'Kyoto, Japan', description: 'Culture and cherry blossoms.', image: 'https://source.unsplash.com/600x400/?kyoto', region: 'Asia', price: 2, days: 6, rating: 4.7 },
];

const ExploreDestinations = () => {
  const [region, setRegion] = useState('All');
  const [price, setPrice] = useState('All');
  const [duration, setDuration] = useState('All');
  const [sortBy, setSortBy] = useState('None');

  const filterDestinations = () => {
    let filtered = [...destinations];

    if (region !== 'All') filtered = filtered.filter(d => d.region === region);
    if (price !== 'All') filtered = filtered.filter(d => d.price === parseInt(price));
    if (duration !== 'All') {
      if (duration === 'Short') filtered = filtered.filter(d => d.days <= 3);
      else if (duration === 'Medium') filtered = filtered.filter(d => d.days <= 7 && d.days >= 4);
      else if (duration === 'Long') filtered = filtered.filter(d => d.days > 7);
    }

    switch (sortBy) {
      case 'Rating': return filtered.sort((a, b) => b.rating - a.rating);
      case 'Duration': return filtered.sort((a, b) => a.days - b.days);
      case 'Price': return filtered.sort((a, b) => a.price - b.price);
      default: return filtered;
    }
  };

  return (
    <div className="explore-page">
      <div className="explore-hero">
        <h1>Explore Dream Destinations</h1>
        <p>Sort, filter, and discover the perfect trip.</p>
      </div>

      <div className="explore-controls">
        <select onChange={(e) => setRegion(e.target.value)} value={region}>
          <option value="All">All Regions</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Africa">Africa</option>
        </select>

        <select onChange={(e) => setPrice(e.target.value)} value={price}>
          <option value="All">All Prices</option>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>

        <select onChange={(e) => setDuration(e.target.value)} value={duration}>
          <option value="All">All Durations</option>
          <option value="Short">1–3 Days</option>
          <option value="Medium">4–7 Days</option>
          <option value="Long">8+ Days</option>
        </select>

        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="None">Sort By</option>
          <option value="Rating">Rating</option>
          <option value="Duration">Duration</option>
          <option value="Price">Price</option>
        </select>
      </div>

      <div className="explore-grid">
        {filterDestinations().map(dest => (
          <div className="explore-card" key={dest.id}>
            <img src={dest.image} alt={dest.name} className="card-image" />
            <div className="card-body">
              <h2>{dest.name}</h2>
              <p>{dest.description}</p>
              <div className="meta-info">
                <span>⭐ {dest.rating}</span>
                <span>{dest.days} Days</span>
              </div>
              <div className="card-buttons">
                <button className="view-btn">View Details</button>
                <button className="book-btn">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDestinations;
