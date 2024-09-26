
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './userPage.css';

const UserPage = ({ onLogout }) => {
  const [userSeats, setUserSeats] = useState([]);
  const [error, setError] = useState('');
  const [seatsToBook, setSeatsToBook] = useState(0);
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(`https://seat-backend.onrender.com/seats`)
        .then((res) => setUserSeats(res.data))
        .catch(() => setError('Failed to load booked seats'));
    }
  }, [loggedInUser]);

  const availableSeatCount = userSeats.filter((seat) => seat.status === 'available').length;

  const handleBookMoreSeats = () => {
    if (seatsToBook > 0 && seatsToBook <= availableSeatCount) {
      navigate('/seats', { state: { seatCount: seatsToBook } });
    } else {
      alert('Please enter a valid number of seats to book.');
    }
  };

  const handleSeatsInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setSeatsToBook(isNaN(value) ? 0 : value);
  };

  return (
    <div className="user-page-container">
      <div className="user-page">
        <h2>Welcome, {loggedInUser.name}</h2>
        <h3>Available Seats: {availableSeatCount}</h3>
        {error && <p>{error}</p>}
        {availableSeatCount === 0 && <p>No available seats at the moment.</p>}

        <input
          type="number"
          min="1"
          max={availableSeatCount}
          value={seatsToBook}
          onChange={handleSeatsInputChange}
          placeholder="Enter seats to book"
          disabled={availableSeatCount === 0}
        />

        <button onClick={handleBookMoreSeats} disabled={seatsToBook === 0 || seatsToBook > availableSeatCount}>
          Book More Seats
        </button>

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default UserPage;


