// src/pages/BookingPage.jsx
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
  const navigate = useNavigate();

  // Mock Rome package data
  const selectedPackage = {
    destination: "Rome, Italy",
    provider: "Italian Adventures",
    price: 15000,
    galleryImages: [
      "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJvbWV8ZW58MHx8MHx8fDA%3D"
    ]
  };

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: 1,
  });
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setConfirmed(true);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="booking-container">
      <h1 className="booking-title">Book Your Trip to Rome</h1>

      <div className="booking-content">
        <div className="image-banner">
          <img src={selectedPackage.galleryImages[0]} alt="Rome Trip" />
        </div>

        <div className="form-section">
          <div className="step-indicator">
            Step {step} of 3
          </div>

          {!confirmed ? (
            <>
              {step === 1 && (
                <div className="form-group">
                  <label><FaUser /> Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <label><FaEnvelope /> Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />

                  <label><FaPhone /> Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="123-456-7890"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="form-group">
                  <label><FaCalendarAlt /> Travel Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />

                  <label>Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={formData.guests}
                    min="1"
                    onChange={handleChange}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="review-section">
                  <h3>Review Your Booking</h3>
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Phone:</strong> {formData.phone}</p>
                  <p><strong>Date:</strong> {formData.date}</p>
                  <p><strong>Guests:</strong> {formData.guests}</p>
                  <p><strong>Total:</strong> ₹{formData.guests * selectedPackage.price}</p>
                </div>
              )}

              <div className="button-group">
                {step > 1 && (
                  <button onClick={prevStep} className="back-btn">Back</button>
                )}
                <button onClick={nextStep} className="next-btn">
                  {step === 3 ? "Confirm Booking" : "Next"}
                </button>
              </div>
            </>
          ) : (
            <div className="confirmation-section">
              <FaCheckCircle size={64} color="green" />
              <h2>Booking Confirmed!</h2>
              <p>Thank you, {formData.name}! We've saved your booking to Rome.</p>
              <button
                onClick={() => navigate("/")}
                className="next-btn"
              >
                Back to Home
              </button>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
};

export default BookingPage;
