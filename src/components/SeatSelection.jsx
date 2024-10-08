
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SeatSelection.css';

const SeatSelection = ({ onLogout }) => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState('');
  const [isAllSeatsReserved, setIsAllSeatsReserved] = useState(false);
  const [loading, setLoading] = useState(true); 

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const location = useLocation();
  const navigate = useNavigate();

  const seatCount = location.state?.seatCount || 1;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.get('https://seat-backend.onrender.com/seats');
        setSeats(res.data);
        const availableSeats = res.data.filter((seat) => seat.status === 'available');
        if (availableSeats.length === 0) {
          setIsAllSeatsReserved(true);
        }
      } catch {
        setError('Failed to load seats');
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, []);

  const handleSelectSeat = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else if (selectedSeats.length < seatCount) {
      setSelectedSeats([...selectedSeats, seatId]);
    } else {
      alert(`You can't select more than ${seatCount} seats.`);
    }
  };

  const handleConfirm = async () => {
    if (selectedSeats.length !== seatCount) {
      alert(`You need to select exactly ${seatCount} seats.`);
      return;
    }

    try {
      await Promise.all(
        selectedSeats.map((seatId) =>
          axios.put(`https://seat-backend.onrender.com/seats/${seatId}`, {
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
      <h2 className="seath">Choose Seats</h2>
      <h2 className="seath">(You must select exactly {seatCount} seats)</h2>

      {loading ? (
        <p>Loading seats...</p>
      ) : (
        <>
          <svg width="100%" height="100" viewBox="0 0 1000 200">
            <defs>
              <radialGradient id="arc-light-gradient" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
                <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
              </radialGradient>
            </defs>
            <path d="M 100 100 Q 500 0, 950 100" fill="none" stroke="white" strokeWidth="2" />
            <path d="M 100 100 Q 500 0, 950 100 L 1200 350 L -200 350 Z" fill="url(#arc-light-gradient)" />
          </svg>

          <div className="theater-screen">
            <div className="screen-shadow" />
          </div>

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

          <button
            className="confirmbut"
            onClick={handleConfirm}
            disabled={selectedSeats.length !== seatCount}
          >
            Confirm
          </button>

          {error && <p>{error}</p>}
          {isAllSeatsReserved && <p>All seats are reserved</p>}


          <div className="seat-legend-container">
            <div className="legend-item">
              <div className="legend-seat selected-legend"></div>
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat reserved-legend"></div>
              <span>Reserved</span>
            </div>
            <div className="legend-item">
              <div className="legend-seat available-legend"></div>
              <span>Available</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SeatSelection;
