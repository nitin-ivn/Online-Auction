import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateAuction() {
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    minBid: '',
    startTime: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with API call
  };

  return (
    <div className="container create-auction my-5 animate__animated animate__fadeIn">
      <h2 className="mb-4 text-center">Create New Auction</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="url" className="form-control" name="image" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Minimum Bid ($)</label>
          <input type="number" className="form-control" name="minBid" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Start Time</label>
          <input type="datetime-local" className="form-control" name="startTime" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Create Auction</button>
      </form>
    </div>
  );
}

export default CreateAuction;
