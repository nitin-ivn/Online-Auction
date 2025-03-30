import React from 'react';
import './AuctionCard.css';

function AuctionCard({ image, status, startTime, minBid }) {
  return (
    <div className="auction-card">
      <div className="auction-card-image">
        <img src={image} alt="auction-item" />
      </div>
      <div className="auction-card-details">
        <div className="auction-status">{status}</div>
        <div className="start-time">Starts at: {startTime}</div>
        <div className="min-bid">Min Bid: ${minBid}</div>
        <button className="register-button">Register</button>
      </div>
    </div>

  );
}

export default AuctionCard;
