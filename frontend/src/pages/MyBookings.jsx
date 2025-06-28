import React, { useState } from 'react';
import './MyBookings.css';

const bookingsMock = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    date: '15 June - 18 June',
    status: 'upcoming',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D',
    invoiceLink: '#',
  },
  {
    id: 2,
    destination: 'Paris, France',
    date: '10 May - 14 May',
    status: 'completed',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGFyaXN8ZW58MHx8MHx8fDA%3D',
    invoiceLink: '#',
  },
];

const MyBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  const handleCancel = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleInvoice = (booking) => {
    setSelectedBooking(booking);
    setShowInvoice(true);
  };

  const handleReview = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const handleRebook = (booking) => {
    alert(`Rebooking for ${booking.destination}... (redirect to booking form)`);
  };

  return (
    <div className="my-bookings-container">
      <h2>My Bookings</h2>
      <div className="bookings-grid">
        {bookingsMock.map((booking) => (
          <div className="booking-card" key={booking.id}>
            <img src={booking.image} alt={booking.destination} />
            <h3>{booking.destination}</h3>
            <p><strong>Date:</strong> {booking.date}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Price:</strong> ₹{booking.price}</p>
            <div className="booking-actions">
              <button onClick={() => handleInvoice(booking)}>View Invoice</button>
              {booking.status === 'upcoming' && (
                <button onClick={() => handleCancel(booking)}>Cancel Booking</button>
              )}
              {booking.status === 'completed' && (
                <>
                  <button onClick={() => handleReview(booking)}>Add Review</button>
                  <button onClick={() => handleRebook(booking)}>Rebook</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Invoice Modal */}
      {showInvoice && selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h3>Invoice for {selectedBooking.destination}</h3>
            <p>Amount Paid: ₹{selectedBooking.price}</p>
            <p>Booking Dates: {selectedBooking.date}</p>
            <a href={selectedBooking.invoiceLink} target="_blank" rel="noopener noreferrer">Download Invoice</a>
            <button onClick={() => setShowInvoice(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cancel Booking</h3>
            <p>Are you sure you want to cancel your booking for {selectedBooking.destination}?</p>
            <button onClick={() => {
              alert('Booking cancelled.');
              setShowCancelModal(false);
            }}>Yes, Cancel</button>
            <button onClick={() => setShowCancelModal(false)}>No</button>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Review for {selectedBooking.destination}</h3>
            <textarea placeholder="Write your review here..." rows={4}></textarea>
            <br />
            <label>Rating: 
              <select>
                <option>5 ⭐</option>
                <option>4 ⭐</option>
                <option>3 ⭐</option>
                <option>2 ⭐</option>
                <option>1 ⭐</option>
              </select>
            </label>
            <br />
            <button onClick={() => {
              alert('Review submitted!');
              setShowReviewModal(false);
            }}>Submit Review</button>
            <button onClick={() => setShowReviewModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
