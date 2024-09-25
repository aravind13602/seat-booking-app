import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './userPage.css';

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
    <div classname='user-page-container'>
    <div className="user-page">
      <h2>Welcome, {loggedInUser.name}</h2>
      

      <h3>Available Seats: {userSeats.filter(seat => seat.status === 'available').length}</h3>
      {error && <p>{error}</p>}
      {userSeats.filter(seat => seat.status === 'available').length === 0 && (
        <p>No available seats at the moment.</p>
      )}


      <button onClick={handleBookMoreSeats}>Book More Seats</button>
      <button onClick={onLogout}>Logout</button>
    </div>
    </div>
  );
};

export default UserPage;
