import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CampaignDetails.css';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', bike: '' });
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/campaigns/${id}`);
        const data = await res.json();
        if (data.success) {
          setCampaign(data.campaign);
        } else {
          setError(data.error || 'Failed to fetch campaign.');
        }
      } catch (err) {
        setError('Error fetching campaign.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  useEffect(() => {
    const targetDate = new Date('2025-07-10');
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        setTimeLeft({ days, hours, minutes });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="campaign-details-container">Loading...</div>;
  if (error) return <div className="campaign-details-container">{error}</div>;
  if (!campaign) return <div className="campaign-details-container">Campaign not found.</div>;

  return (
    <div className="campaign-details-container">
      <div className="campaign-hero">
        <img src={campaign.image} alt={campaign.title} />
        <div className="overlay-text">
          <h1>{campaign.title}</h1>
          <p>{campaign.dates}</p>
          {timeLeft && (
            <p className="countdown">
              Starts in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
            </p>
          )}
        </div>
      </div>

      <div className="campaign-body glass">
        <section className="campaign-summary">
          <h2>About This Campaign</h2>
          <p>{campaign.description}</p>
        </section>

        <section className="campaign-route">
          <h3>Route</h3>
          <p>{campaign.route}</p>
        </section>

        <section className="riders-section">
          <h3>🏍️ Riders Joining</h3>
          {campaign.riders && campaign.riders.length > 0 ? (
            <div className="rider-slider scroll-x">
              {campaign.riders.map((rider, idx) => (
                <div
                  key={idx}
                  className="rider-card-glass clickable"
                  onClick={() => navigate(`/rider/${idx}`)}
                >
                  <img src={rider.image} alt={rider.name} />
                  <div className="rider-info">
                    <h4>{rider.name}</h4>
                    <p>{rider.location}</p>
                    <span className="rating">⭐ {rider.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No riders have joined yet.</p>
          )}
        </section>

        <section className="map-section">
          <h3>Route Map</h3>
          <div className="map-container">
            <iframe
              title="Route Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.639777077156!2d77.18867731512996!3d32.24318398111662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3904874020e6cd69%3A0x7f75cf1324f25bcf!2sManali!5e0!3m2!1sen!2sin!4v1719066503382"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>

        <section className="gallery-section">
          <h3>Highlights</h3>
          <div className="gallery-scroll-wrapper">
            <div className="gallery-track">
              {[
                "https://source.unsplash.com/400x250/?mountains,ride",
                "https://source.unsplash.com/400x250/?bikers,landscape",
                "https://source.unsplash.com/400x250/?camping,india",
                "https://source.unsplash.com/400x250/?sunset,bike",
              ].map((src, idx) => (
                <div className="gallery-card" key={idx}>
                  <img src={src} alt={`slide-${idx}`} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h3>What Riders Say</h3>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <p>“The Himalayan campaign was a life-changer! Stunning views and amazing riders.”</p>
              <span>– Aarav Mehta</span>
            </div>
            <div className="testimonial-card">
              <p>“Loved the coastal ride! Beaches, culture, and great memories.”</p>
              <span>– Sanya Kapoor</span>
            </div>
          </div>
        </section>

        <div className="campaign-cta">
          <button className="join-btn" onClick={() => setShowModal(true)}>
            Join This Campaign
          </button>
          <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="join-modal glass">
            <h2>Join Campaign</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Thank you ${form.name}, you’ve joined!`);
                setShowModal(false);
                setForm({ name: '', email: '', bike: '' });
              }}
            >
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Bike Type"
                required
                value={form.bike}
                onChange={(e) => setForm({ ...form, bike: e.target.value })}
              />
              <button type="submit" className="join-btn">
                Confirm Join
              </button>
            </form>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
