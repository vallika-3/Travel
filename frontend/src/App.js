import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Reels from './pages/Reels';
import RewardsSavings from './pages/RewardsSavings';
import PrivateRoute from './components/PrivateRoute';
import Discover from './pages/Discover';
import PlaceDetails from './pages/PlaceDetails';
import BookingPage from './pages/ BookingPage';
import MyBookings from './pages/MyBookings';
import TripPlanner from './pages/TripPlanner';
import ExploreDestinations from './pages/ExploreDestinations';
import DestinationDetails from './pages/DestinationDetails';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/rewards" element={<RewardsSavings />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/place-details" element={<PlaceDetails />} />
        <Route path='/booking' element={<BookingPage />} />
        <Route path='/mybooking' element={<MyBookings />} />
        <Route path='/trip' element={<TripPlanner />} />
        <Route path='/explore' element={<ExploreDestinations />} />
        <Route path='/destination' element={<DestinationDetails />} />

        {/* Protected Routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Fallback Route - 404 */}
        <Route path="*" element={<div style={{ padding: '100px', textAlign: 'center', fontSize: '24px' }}>404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
