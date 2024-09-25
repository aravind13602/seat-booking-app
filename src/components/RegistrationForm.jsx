import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5174/users', { phone, password });
      setSuccess('Registration successful');
      setError('');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {success && <p>{success}</p>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Registration;
