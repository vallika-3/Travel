import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';


import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Reels from './pages/Reels';
import RewardsSavings from './pages/RewardsSavings';
import Discover from './pages/Discover';
import PlaceDetails from './pages/PlaceDetails';
import BookingPage from './pages/BookingPage';
import MyBookings from './pages/MyBookings';
import TripPlanner from './pages/TripPlanner';
import ExploreDestinations from './pages/ExploreDestinations';
import RiderHub from './pages/RiderHub';
import RiderProfile from './pages/RiderProfile';
import CampaignDetails from './pages/CampaignDetails';
import Wishlist from './pages/Wishlist';
import PastTrips from './pages/PastTrips';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import DestinationDetails from './pages/DestinationDetails';



import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reels" element={<Reels />} />
        <Route path="/rewards" element={<RewardsSavings />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/explore" element={<ExploreDestinations />} />
        <Route path="/place-details/:id" element={<PlaceDetails />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/trip-planner" element={<TripPlanner />} />
        <Route path="/riders-hub" element={<RiderHub />} />
        <Route path="/rider/:id" element={<RiderProfile />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/pasttrips" element={<PastTrips />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
       
     



        <Route path="/profile" element={<Profile />} />


        <Route
          path="*"
          element={
            <div style={{ padding: '100px', textAlign: 'center', fontSize: '24px' }}>
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
