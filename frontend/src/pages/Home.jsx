import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import './Home.css';

const mockDestinations = [
  {
    id: 1,
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1564420179789-ede909db4882?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmlzJTIwbmlnaHR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZGl2ZXN8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'New York',
    image: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5ldyUyMHlvcmt8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    name: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1521292270410-a8c4d716d518?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpc3MlMjBhbHBzfGVufDB8fDB8fHww',
  },
  {
    id: 6,
    name: 'Rome',
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3De',
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
          onClick={() => navigate('/discover')} 
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
