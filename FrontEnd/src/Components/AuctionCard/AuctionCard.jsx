import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuctionCard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function AuctionCard({ auction }) {
  const navigate = useNavigate();

  return (
    <div
      className="card auction-card mb-4 shadow-sm h-100"
      onClick={() => navigate(`/bid/${auction._id}`)}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={auction.image}
        className="card-img-top"
        alt={auction.title}
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{auction.title}</h5>
        <p className="card-text mb-1">
          <strong>Starting Price:</strong> ${auction.startingPrice}
        </p>
        <p className="card-text">
          <strong>Current Bid:</strong> ${auction.highestBid}
        </p>
        <button className="btn btn-outline-primary w-100 mt-2">Place a Bid</button>
      </div>
    </div>
  );
}

export default AuctionCard;
