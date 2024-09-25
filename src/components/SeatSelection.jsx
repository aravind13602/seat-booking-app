import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SeatSelection.css';

const SeatSelection = ({ onLogout }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [isAllSeatsReserved, setIsAllSeatsReserved] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:5174/seats')
      .then((res) => {
        setSeats(res.data);
        const availableSeats = res.data.filter(seat => seat.status === 'available');
        if (availableSeats.length === 0) {
          setIsAllSeatsReserved(true);
        }
      })
      .catch(() => setError('Failed to load seats'));
  }, []);

  const handleSelectSeat = (seatId) => {
    if (!selectedSeats.includes(seatId)) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    }
  };

  const handleConfirm = async () => {
    try {
      await Promise.all(
        selectedSeats.map((seatId) =>
          axios.put(`http://localhost:5174/seats/${seatId}`, {
            status: 'reserved',
            userId: loggedInUser.id,
          })
        )
      );
      setError('');
      alert('Seats confirmed!');
      navigate('/');
    } catch {
      setError('Failed to confirm seats');
    }
  };

  return (
    <div className="seat-selection">
      <h2>Select Your Seats</h2>
      <div className="seats">
        {seats.map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
            onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
          >
            {seat.id}
          </div>
        ))}
      </div>
      <button onClick={handleConfirm} disabled={selectedSeats.length === 0}>
        Confirm
      </button>
      {error && <p>{error}</p>}
      {isAllSeatsReserved && <p>All seats are reserved</p>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default SeatSelection;
