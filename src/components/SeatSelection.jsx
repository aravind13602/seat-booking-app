
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
        const availableSeats = res.data.filter((seat) => seat.status === 'available');
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
      {/* <button onClick={onLogout}>Logout</button> */}
      <h2 className='seath'>Choose Seats</h2>
      <svg width="85%" height="65" viewBox="0 45 1000 100">
        <path
          d="M0 100 Q 500 0, 1000 100"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
      <div className='light'></div>
      <div className="seats first-row">
        {seats.slice(0, 6).map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
            onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
          />
        ))}
      </div>

      <div className="seats middle-rows">
        {seats.slice(6, seats.length - 6).map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
            onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
          />
        ))}
      </div>

      <div className="seats last-row">
        {seats.slice(seats.length - 6).map((seat) => (
          <div
            key={seat.id}
            className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
            onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
          />
        ))}
      </div>

      <button onClick={handleConfirm} disabled={selectedSeats.length === 0}>
        Confirm
      </button>
      {error && <p>{error}</p>}
      {isAllSeatsReserved && <p>All seats are reserved</p>}
    </div>
  );
};

export default SeatSelection;
