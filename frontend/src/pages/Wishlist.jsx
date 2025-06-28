import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ Use centralized axios instance
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await api.get(`/api/wishlist/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWishlist(res.data.trips || []);
      } catch (err) {
        console.error("❌ Failed to fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) fetchWishlist();
    else setLoading(false);
  }, [userId, token]);

  const handleRemove = async (tripId) => {
    try {
      await api.delete(`/api/wishlist/${userId}/${tripId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWishlist((prev) => prev.filter((item) => item.tripId !== tripId));
    } catch (err) {
      console.error("❌ Failed to remove from wishlist:", err);
    }
  };

  if (loading) return <p>Loading your wishlist...</p>;

  if (!userId || !token) {
    return <p>Please login to view your wishlist.</p>;
  }


  return (
    <div className="wishlist-wrapper">
      <h1 className="wishlist-title"> Your Wishlist</h1>
      <p className="wishlist-subtitle">Trips you’ve saved to explore later</p>

      {wishlist.length > 0 ? (
        <div className="wishlist-carousel">
          {wishlist.map((item) => (
            <div className="wishlist-card glass" key={item.tripId}>
              <img src={item.img} alt={item.title} className="wishlist-img" />
              <div className="wishlist-info">
                <span className="wishlist-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="wishlist-actions">
                  <button onClick={() => navigate('/booking')}>Book Now</button>
                  <button className="remove-btn" onClick={() => handleRemove(item.tripId)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-wishlist">
          <p>Your wishlist is empty. Start adding your dream trips!</p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
