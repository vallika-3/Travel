import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import './Home.css';

const mockDestinations = [
  {
    id: 1,
    name: 'Paris',
    image: 'https://source.unsplash.com/300x400/?paris,travel',
  },
  {
    id: 2,
    name: 'Maldives',
    image: 'https://source.unsplash.com/300x400/?maldives,beach',
  },
  {
    id: 3,
    name: 'New York',
    image: 'https://source.unsplash.com/300x400/?newyork,city',
  },
  {
    id: 4,
    name: 'Tokyo',
    image: 'https://source.unsplash.com/300x400/?tokyo,japan',
  },
  {
    id: 5,
    name: 'Swiss Alps',
    image: 'https://source.unsplash.com/300x400/?switzerland,mountains',
  },
  {
    id: 6,
    name: 'Rome',
    image: 'https://source.unsplash.com/300x400/?rome,italy',
  },
];

const Home = () => {
  const [modalImage, setModalImage] = useState(null);
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // ✅ Initialize navigation

  useEffect(() => {
    const interval = setInterval(() => {
      scrollToIndex((currentIndex + 1) % mockDestinations.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = (index) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].offsetWidth + 16;
      sliderRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + mockDestinations.length) % mockDestinations.length;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % mockDestinations.length;
    scrollToIndex(newIndex);
  };

  return (
    <div className="hero-container">
      <div className="hero-text">
        <h1>Find Your Next Adventure</h1>
        <p>Explore hidden gems and popular spots worldwide.</p>
        <button
          className="cta-button"
          onClick={() => navigate('/explore')} // ✅ Navigate to ExploreDestinations
        >
          Discover Destinations
        </button>
      </div>

      <div className="hero-slider-wrapper">
        <button className="slider-button prev" onClick={handlePrev}>
          &#10094;
        </button>

        <div className="hero-slider-horizontal" ref={sliderRef}>
          {mockDestinations.map((dest) => (
            <div
              key={dest.id}
              className="hero-slider-card-glass"
              onClick={() => setModalImage(dest.image)}
            >
              <img src={dest.image} alt={dest.name} />
              <div className="hero-slider-card-title">{dest.name}</div>
            </div>
          ))}
        </div>

        <button className="slider-button next" onClick={handleNext}>
          &#10095;
        </button>

        <div className="slider-dots">
          {mockDestinations.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => scrollToIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      {modalImage && (
        <div className="modal" onClick={() => setModalImage(null)}>
          <img src={modalImage} alt="Enlarged" className="modal-image" />
        </div>
      )}
    </div>
  );
};

export default Home;
