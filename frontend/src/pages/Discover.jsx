import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Added this
import './Discover.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMountain, faUmbrellaBeach, faSun, faTree, faPersonHiking,
  faCity, faWater, faCampground, faSnowflake, faLandmark,
  faPaw, faFilter, faChevronLeft, faChevronRight
} from '@fortawesome/free-solid-svg-icons';

const CATEGORY_ICONS = {
  mountains: <FontAwesomeIcon icon={faMountain} size="lg" />,
  beach: <FontAwesomeIcon icon={faUmbrellaBeach} size="lg" />,
  desert: <FontAwesomeIcon icon={faSun} size="lg" />,
  forest: <FontAwesomeIcon icon={faTree} size="lg" />,
  trek: <FontAwesomeIcon icon={faPersonHiking} size="lg" />,
  city: <FontAwesomeIcon icon={faCity} size="lg" />,
  island: <FontAwesomeIcon icon={faWater} size="lg" />,
  countryside: <FontAwesomeIcon icon={faCampground} size="lg" />,
  snow: <FontAwesomeIcon icon={faSnowflake} size="lg" />,
  waterfall: <FontAwesomeIcon icon={faWater} size="lg" />,
  historical: <FontAwesomeIcon icon={faLandmark} size="lg" />,
  wildlife: <FontAwesomeIcon icon={faPaw} size="lg" />,
  all: <FontAwesomeIcon icon={faFilter} size="lg" />,
};

const CATEGORIES = [
  'all', 'mountains', 'beach', 'desert', 'forest', 'trek', 'city',
  'island', 'countryside', 'snow', 'waterfall', 'historical', 'wildlife'
];

const HERO_CAROUSEL_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1564420179789-ede909db4882?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmlzJTIwbmlnaHR8ZW58MHx8MHx8fDA%3D",
    alt: "Paris City Night"
  },
  {
    src: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZGl2ZXN8ZW58MHx8MHx8fDA%3D",
    alt: "Maldives Tropical Beach"
  },
  {
    src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG5ldyUyMHlvcmt8ZW58MHx8MHx8fDA%3D",
    alt: "New York Skyline"
  },
  {
    src: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Tokyo Cityscape"
  },
  {
    src: "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3dpc3MlMjBhbHBzfGVufDB8fDB8fHww",
    alt: "Swiss Alps Mountains"
  },
  {
    src: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9tZXxlbnwwfHwwfHx8MA%3D%3De",
    alt: "Rome Historic Landmarks"
  }
]



const Discover = () => {
  const [destinations, setDestinations] = useState([]);
  const [filters, setFilters] = useState({ location: '', price: '', category: 'all' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const carouselIntervalRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastTimeRef = useRef(0);
  const slideDuration = 5000;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDestinations = async () => {
  try {
    const { data } = await api.get('/api/destinations');
    setDestinations(data);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    setDestinations([]);
  }
};

    fetchDestinations();
  }, []);

  const toggleLike = (id) => {
    setDestinations((prev) =>
      prev.map((d) => (d._id === id ? { ...d, liked: !d.liked } : d))
    );
  };

  const filteredDestinations = Array.isArray(destinations)
    ? destinations.filter(({ location, price, category, name }) => {
        const matchesLocation = filters.location ? location.toLowerCase().includes(filters.location.toLowerCase()) : true;
        const matchesPrice = filters.price ? price <= parseInt(filters.price, 10) : true;
        const matchesCategory = filters.category === 'all' || category === filters.category;
        const matchesSearchTerm = searchTerm ? name.toLowerCase().includes(searchTerm.toLowerCase()) || location.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        return matchesLocation && matchesPrice && matchesCategory && matchesSearchTerm;
      })
    : [];

  const getSectionDestinations = (type) => {
    if (!Array.isArray(destinations)) return [];
    if (type === 'trending') return destinations.filter(d => d.trending);
    if (type === 'popular') return destinations.filter(d => d.rating >= 4.7 && !d.trending);
    if (type === 'topRated') return destinations.filter(d => d.rating >= 4.8 && !d.trending);
    return [];
  };

  const bookOfTheDay = Array.isArray(destinations) ? destinations.find((d) => d.trending) : null;

  const startCarouselTimer = () => {
    if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    setTimerProgress(0);
    lastTimeRef.current = performance.now();
    const animateProgress = (currentTime) => {
      const deltaTime = currentTime - lastTimeRef.current;
      setTimerProgress((prev) => {
        const progress = prev + (deltaTime / slideDuration) * 100;
        if (progress >= 100) {
          nextHeroImage();
          return 0;
        }
        return progress;
      });
      lastTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(animateProgress);
    };
    animationFrameRef.current = requestAnimationFrame(animateProgress);
  };

  const nextHeroImage = () => {
    setCurrentHeroImageIndex((prev) => (prev + 1) % HERO_CAROUSEL_IMAGES.length);
    startCarouselTimer();
  };

  const prevHeroImage = () => {
    setCurrentHeroImageIndex((prev) => (prev - 1 + HERO_CAROUSEL_IMAGES.length) % HERO_CAROUSEL_IMAGES.length);
    startCarouselTimer();
  };

  useEffect(() => {
    startCarouselTimer();
    return () => {
      if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="discover-container">
      {/* HERO SECTION */}
      <section className="discover-hero" style={{ backgroundImage: `url(${HERO_CAROUSEL_IMAGES[currentHeroImageIndex].src})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Uncover Hidden Gems</h1>
          <p>Your next favorite destination is just a scroll away.</p>
          <button className="hero-explore-btn" onClick={() => document.querySelector('.categories-container').scrollIntoView({ behavior: 'smooth' })}>
            Explore Now
          </button>
        </div>
        <button className="hero-arrow hero-arrow-left" onClick={prevHeroImage}><FontAwesomeIcon icon={faChevronLeft} /></button>
        <button className="hero-arrow hero-arrow-right" onClick={nextHeroImage}><FontAwesomeIcon icon={faChevronRight} /></button>
        <div className="carousel-pagination">
          {HERO_CAROUSEL_IMAGES.map((_, idx) => (
            <div key={idx} className={`pagination-dot ${currentHeroImageIndex === idx ? 'active' : ''}`}
              onClick={() => { setCurrentHeroImageIndex(idx); startCarouselTimer(); }}></div>
          ))}
          <div className="progress-bar-container"><div className="progress-bar" style={{ width: `${timerProgress}%` }}></div></div>
        </div>
      </section>

      {/* BOOK OF THE DAY */}
      {bookOfTheDay && (
        <section className="book-of-the-day">
          <h2>Top Pick of the Day</h2>
          <div className="featured-card" onClick={() => navigate(`/place-details/${bookOfTheDay._id}`)}>
            <img src={bookOfTheDay.image} alt={bookOfTheDay.name} />
            <div className="featured-info">
              <h3>{bookOfTheDay.name}</h3>
              <p>{bookOfTheDay.location} — ₹{bookOfTheDay.price}</p>
            </div>
          </div>
        </section>
      )}

      {/* CATEGORY FILTERS */}
      <section className="categories-container">
        {CATEGORIES.map((category) => (
          <button key={category} className={`category-item ${filters.category === category ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, category, location: '', price: '' })}>
            <div className="category-icon">{CATEGORY_ICONS[category]}</div>
            <span className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
          </button>
        ))}
      </section>

      {/* SEARCH + FILTER */}
      <section className="search-bar-wrapper">
        <input type="text" placeholder="Search destinations..." className="search-bar" value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <button className="filter-button" onClick={() => setShowFilterModal(true)}>
          <FontAwesomeIcon icon={faFilter} /> Filters
        </button>
      </section>

      {/* FILTERED RESULTS SECTION */}
      {(filters.category !== 'all' || searchTerm || filters.location || filters.price) && (
        <section className="filtered-results-section">
          <h3 className="section-title">Filtered Results</h3>
          <div className="discover-slider">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map(dest => (
                <div key={dest._id} className="slider-card" onClick={() => navigate(`/place-details/${dest._id}`)}>
                  <img src={dest.image} alt={dest.name} />
                  <div className="slider-info">
                    <h4>{dest.name}</h4>
                    <div className="pricing">₹{dest.price} <small>/ night</small></div>
                    <div className="rating">⭐ {dest.rating}</div>
                  </div>
                </div>
              ))
            ) : <p>No destinations match your filters.</p>}
          </div>
        </section>
      )}

      {/* CAROUSELS */}
      <section className="carousel-wrapper">
  {['trending', 'popular', 'topRated'].map((type) => (
    <div key={type} className="carousel-section">
      <h3 className="section-title">
        {type === 'trending' ? 'Trending Destinations' :
         type === 'popular' ? 'Popular Picks' : 'Top Rated'}
      </h3>

      <div className="discover-slider">
        {getSectionDestinations(type).map(dest => (
          <div key={dest._id} className="slider-card" onClick={() => navigate(`/place-details/${dest._id}`)}>
            <img src={dest.image} alt={dest.name} />
            <div className="slider-info">
              <h4>{dest.name}</h4>
              <div className="pricing">
                ₹{dest.price} <small>/ {dest.days || 1} {dest.days === 1 ? 'day' : 'days'}</small>
              </div>
              <div className="rating">⭐ {dest.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</section>


      {/* FAQ + NEWSLETTER */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <details><summary>How are destinations selected?</summary><p>Based on popularity, user reviews, and uniqueness.</p></details>
        <details><summary>Can I save destinations for later?</summary><p>Yes! Tap the heart icon to like.</p></details>
      </section>
      <section className="newsletter-section">
        <h2>Stay in the Loop!</h2>
        <p>Get travel tips and destinations in your inbox.</p>
        <input type="email" placeholder="Your Email" />
        <button>Subscribe</button>
      </section>

      {/* FILTER MODAL */}
      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Filter Destinations</h3>
            <div className="filter-group">
              <label htmlFor="filterLocation">Location</label>
              <input id="filterLocation" type="text" value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
            </div>
            <div className="filter-group">
              <label htmlFor="filterPrice">Max Price (₹)</label>
              <input id="filterPrice" type="number" value={filters.price}
                onChange={(e) => setFilters({ ...filters, price: e.target.value })} />
            </div>
            <div className="filter-buttons">
              <button onClick={() => setFilters({ location: '', price: '', category: 'all' })}>Clear All</button>
              <button onClick={() => setShowFilterModal(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discover;
