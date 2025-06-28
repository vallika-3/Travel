import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './RiderProfile.css';

const mockRiders = [
  {
    id: '1',
    name: 'Aarav Mehta',
    image: 'https://source.unsplash.com/400x400/?man,travel',
    banner: 'https://source.unsplash.com/1200x400/?himalayas,mountain',
    bio: 'Experienced rider specializing in the Himalayas. Always up for an adrenaline rush!',
    location: 'Himachal, India',
    trips: 14,
    rating: 4.9,
    expertise: ['Adventure Biking', 'Remote Routes'],
    socials: {
      instagram: 'https://instagram.com/aaravmehta',
      linkedin: 'https://linkedin.com/in/aaravmehta',
    },
    gallery: [
      'https://source.unsplash.com/600x400/?mountain,bike',
      'https://source.unsplash.com/600x400/?travel,india',
      'https://source.unsplash.com/600x400/?bikeroute',
    ],
    testimonials: [
      { name: 'Sanya Kapoor', feedback: 'Unforgettable Himalayan ride!' },
      { name: 'Rahul Menon', feedback: 'Disciplined and friendly leader.' },
    ],
  },
];

const RiderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const rider = mockRiders.find((r) => r.id === id);

  if (!rider) return <div className="rider-profile">Rider not found.</div>;

  return (
    <div className="rider-profile">
      <div className="profile-banner">
        <img src={rider.banner} alt="Banner" />
        <div className="banner-overlay">
          <h1>{rider.name}</h1>
          <p>📍 {rider.location}</p>
        </div>
      </div>

      <div className="profile-card-glass">
        <img src={rider.image} alt={rider.name} className="profile-img" />
        <p className="bio">{rider.bio}</p>
        <p className="expertise"><strong>Expertise:</strong> {rider.expertise.join(', ')}</p>
        <div className="meta">
          <span> Trips: {rider.trips}</span>
          <span>⭐ Rating: {rider.rating}</span>
        </div>
        <div className="links">
          <a href={rider.socials.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={rider.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <button onClick={() => navigate('/trip-planner')} className="glass-connect">
           Send Itinerary
        </button>
      </div>

      {/* Corrected Map Embed */}
      <section className="map-section">
        <h3> Route Overview</h3>
        <iframe
          title="Route Map"
          src="https://www.google.com/maps?q=Manali+India&output=embed"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </section>

      {/* Itinerary Timeline */}
      <section className="itinerary-section">
        <h3>📍 Itinerary Timeline</h3>
        <ul className="itinerary-timeline">
          {['Manali', 'Sarchu', 'Pangong', 'Return to Manali'].map((loc, i) => (
            <li key={i}>
              <div className="dot" />
              <div>
                <h4>{loc}</h4>
                <p>{[
                  'Gear & briefing', 'Rohtang ride & camp',
                  'Lake camping & stargazing', 'Farewell ride'
                ][i]}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Chat */}
      <section className="chat-section">
        <h3> Message {rider.name}</h3>
        <form className="chat-form" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
          <textarea placeholder="Your message..." required />
          <button type="submit">Send</button>
        </form>
      </section>

      {/* Gallery */}
      <div className="media-gallery">
        <h3> Gallery</h3>
        <div className="gallery-scroll">
          {rider.gallery.map((src, i) => <img key={i} src={src} alt={`Gallery ${i}`} />)}
        </div>
      </div>

      {/* Testimonials */}
      <div className="testimonial-section">
        <h3> Testimonials</h3>
        <div className="testimonial-list">
          {rider.testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <p>"{t.feedback}"</p>
              <h5>— {t.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiderProfile;
