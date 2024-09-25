import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserPage = ({ onLogout }) => {
  const [userSeats, setUserSeats] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  useEffect(() => {
    if (loggedInUser) {
      axios
        .get(`http://localhost:5174/seats?userId=${loggedInUser.id}`)
        .then((res) => setUserSeats(res.data))
        .catch(() => setError('Failed to load booked seats'));
    }
  }, [loggedInUser]);

  const handleBookMoreSeats = () => {
    navigate('/seats');
  };

  return (
    <div className="user-page">
      <h2>Welcome, {loggedInUser.phone}</h2>
      <button onClick={onLogout}>Logout</button>

      <h3>Your Booked Seats</h3>
      {error && <p>{error}</p>}
      {userSeats.length > 0 ? (
        <ul>
          {userSeats.map((seat) => (
            <li key={seat.id}>Seat {seat.id} - Status: {seat.status}</li>
          ))}
        </ul>
      ) : (
        <p>You have not booked any seats yet.</p>
      )}

      <button onClick={handleBookMoreSeats}>Book More Seats</button>
    </div>
  );
};

export default UserPage;
