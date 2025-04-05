import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main';
import './createAuction.css';

function CreateAuction() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    startingPrice: '',
    minimumBid: '',
    endTime: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Unauthorized. Please login.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/Createauction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setError('');
        setTimeout(() => navigate('/list'), 1500);
      } else {
        setMessage('');
        setError(data.message || 'Failed to create auction');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    }
  };

  return (
    <div className="auction-container">
      <form className="auction-form" onSubmit={handleSubmit}>
        <h2 className="auction-heading">Create Auction</h2>

        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="startingPrice"
          placeholder="Starting Price"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="minimumBid"
          placeholder="Minimum Bid Increment"
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="endTime"
          onChange={handleChange}
          required
        />

        <button type="submit" className="auction-btn">Submit</button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default CreateAuction;
