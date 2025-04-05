import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuctionCard.css';

function AuctionCard({ auction }) {
  const navigate = useNavigate();

  return (
    <div className="auction-card" onClick={() => navigate(`/bid/${auction._id}`)}>
      <img src={auction.image} alt={auction.title} />
      <h3>{auction.title}</h3>
      <p>Starting Bid: ${auction.startingBid}</p>
      <p>Current Bid: ${auction.currentBid}</p>
      <button className="bid-btn">Place a Bid</button>
    </div>
  );
}

export default AuctionCard;
