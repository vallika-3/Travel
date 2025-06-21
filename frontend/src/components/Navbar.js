import React, { useState } from 'react';
import './Navbar.css';
import { FaBars, FaTimes, FaPlaneDeparture } from 'react-icons/fa';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <FaPlaneDeparture className="logo-icon" />
          <span>TravelX</span>
        </div>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#home">Home</a>
          <a href="#discover">Discover</a>
          <a href="#packages">Packages</a>
          <a href="#bookings">Bookings</a>
          <a href="#login" className="login-btn">Login</a>
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
