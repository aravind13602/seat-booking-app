
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './SeatSelection.css';

// const SeatSelection = ({ onLogout }) => {
//   const [seats, setSeats] = useState([]);
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [error, setError] = useState('');
//   const [isAllSeatsReserved, setIsAllSeatsReserved] = useState(false);

//   const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get('http://localhost:5174/seats')
//       .then((res) => {
//         setSeats(res.data);
//         const availableSeats = res.data.filter((seat) => seat.status === 'available');
//         if (availableSeats.length === 0) {
//           setIsAllSeatsReserved(true);
//         }
//       })
//       .catch(() => setError('Failed to load seats'));
//   }, []);

//   const handleSelectSeat = (seatId) => {
//     if (!selectedSeats.includes(seatId)) {
//       setSelectedSeats([...selectedSeats, seatId]);
//     } else {
//       setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
//     }
//   };

//   const handleConfirm = async () => {
//     try {
//       await Promise.all(
//         selectedSeats.map((seatId) =>
//           axios.put(`http://localhost:5174/seats/${seatId}`, {
//             status: 'reserved',
//             userId: loggedInUser.id,
//           })
//         )
//       );
//       setError('');
//       alert('Seats confirmed!');
//       navigate('/');
//     } catch {
//       setError('Failed to confirm seats');
//     }
//   };

//   return (
//     <div className="seat-selection">
      
//       <h2 className='seath'>Choose Seats</h2>
//       <svg width="85%" height="65" viewBox="0 45 1000 100">
//         <path
//           d="M0 100 Q 500 0, 1000 100"
//           fill="none"
//           stroke="white"
//           strokeWidth="2"
//         />
        
//       </svg>
      
      
//       <div className="seats first-row">
//         {seats.slice(0, 6).map((seat) => (
//           <div
//             key={seat.id}
//             className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
//             onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
//           />
//         ))}
//       </div>

//       <div className="seats middle-rows">
//         {seats.slice(6, seats.length - 6).map((seat) => (
//           <div
//             key={seat.id}
//             className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
//             onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
//           />
//         ))}
//       </div>

//       <div className="seats last-row">
//         {seats.slice(seats.length - 6).map((seat) => (
//           <div
//             key={seat.id}
//             className={`seat ${seat.status} ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
//             onClick={() => seat.status === 'available' && handleSelectSeat(seat.id)}
//           />
//         ))}
//       </div>

//       <button className='confirmbut'onClick={handleConfirm} disabled={selectedSeats.length === 0}>
//         Confirm
//       </button>
//       {error && <p>{error}</p>}
//       {isAllSeatsReserved && <p>All seats are reserved</p>}
//     </div>
//   );
// };

// export default SeatSelection;
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
      <h2 className="seath">Choose Seats</h2>

      <svg width="70%" height="250" viewBox="0 0 1000 200">
        <defs>
          {/* Define a radial gradient with a heap-like effect */}
          <radialGradient id="arc-light-gradient" cx="50%" cy="0%" r="100%" fx="50%" fy="0%">
            <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 0.2 }} /> {/* Light at the top */}
            <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} /> {/* Transparent at the bottom */}
          </radialGradient>
        </defs>

        {/* The arc representing the movie screen */}
        <path
          d="M0 100 Q 500 0, 1000 100"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />

        {/* Heap-like light effect that spreads outward */}
        <path
          d="M0 100 Q 500 0, 1000 100 L 1200 350 L -200 350 Z"
          fill="url(#arc-light-gradient)"
        />
      </svg>


      {/* Seat rows */}
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

      <button className="confirmbut" onClick={handleConfirm} disabled={selectedSeats.length === 0}>
        Confirm
      </button>
      {error && <p>{error}</p>}
      {isAllSeatsReserved && <p>All seats are reserved</p>}
    </div>
  );
};

export default SeatSelection;
