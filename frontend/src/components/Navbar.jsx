import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(authStatus);
  }, [location]);

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          TravelX
        </Link>

        <div className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={closeMobileMenu}>Home</Link>
          <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''} onClick={closeMobileMenu}>Discover</Link>

          {isLoggedIn ? (
            <>
              <Link to="/reels" className={location.pathname === '/reels' ? 'active' : ''} onClick={closeMobileMenu}>Reels</Link>
              <Link to="/rewards" className={location.pathname === '/rewards' ? 'active' : ''} onClick={closeMobileMenu}>Rewards</Link>
              <Link to="/trip-planner" className={location.pathname === '/trip-planner' ? 'active' : ''} onClick={closeMobileMenu}>Trip Planner</Link>
              <Link to="/riders-hub" className={location.pathname === '/riders-hub' ? 'active' : ''} onClick={closeMobileMenu}>Riders Hub</Link>
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''} onClick={closeMobileMenu}>
                <img src="/assets/avatar.png" alt="Profile" className="avatar" />
              </Link>
              <button className="btn logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn login-btn" onClick={closeMobileMenu}>Login</Link>
              <Link to="/signup" className="btn signup-btn" onClick={closeMobileMenu}>Sign Up</Link>
            </>
          )}
        </div>

        <div className="mobile-icon" onClick={toggleMenu}>
          <span className={isMobileMenuOpen ? 'icon close' : 'icon'}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
