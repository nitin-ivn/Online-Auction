import React, { useState } from 'react';
import AuctionCard from '../AuctionCard/AuctionCard.jsx';
import './auctionList.css';

function AuctionList() {
  const auctionData = [
    { id: 1, image: 'https://picsum.photos/200/300', status: 'Live', startTime: '2025-03-25 18:00:00', minBid: 50 },
    { id: 2, image: 'https://picsum.photos/200/300', status: 'Upcoming', startTime: '2025-04-10 12:00:00', minBid: 100 },
    { id: 3, image: 'https://picsum.photos/200/300', status: 'Live', startTime: '2025-03-28 10:00:00', minBid: 75 },
    { id: 4, image: 'https://picsum.photos/200/300', status: 'Upcoming', startTime: '2025-05-05 14:00:00', minBid: 30 },
    { id: 1, image: 'https://picsum.photos/200/300', status: 'Live', startTime: '2025-03-25 18:00:00', minBid: 50 },
    { id: 2, image: 'https://picsum.photos/200/300', status: 'Upcoming', startTime: '2025-04-10 12:00:00', minBid: 100 },
    { id: 3, image: 'https://picsum.photos/200/300', status: 'Live', startTime: '2025-03-28 10:00:00', minBid: 75 },
    { id: 4, image: 'https://picsum.photos/200/300', status: 'Upcoming', startTime: '2025-05-05 14:00:00', minBid: 30 },
  ];

  // Filter state
  const [filter, setFilter] = useState({
    status: 'All',
    minBid: 0,
  });

  
  const handleStatusFilter = (e) => {
    setFilter({ ...filter, status: e.target.value });
  };

  const handleMinBidFilter = (e) => {
    setFilter({ ...filter, minBid: e.target.value });
  };

  const filteredAuctions = auctionData.filter((auction) => {
    const isStatusMatch = filter.status === 'All' || auction.status === filter.status;
    const isMinBidMatch = auction.minBid >= filter.minBid;
    return isStatusMatch && isMinBidMatch;
  });

  return (
    <div className="auction-list-container">
      <div className="filters">
        <div className="filter">
          <label>Status: </label>
          <select className='sel' onChange={handleStatusFilter} value={filter.status}>
            <option value="All">All</option>
            <option value="Live">Live</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>

        <div className="filter">
          <label>Min Bid: </label>
          <input 
            type="number" 
            value={filter.minBid} 
            onChange={handleMinBidFilter} 
            placeholder="Min Bid" 
            min="0"
          />
        </div>
      </div>

      <div className="auction-cards-grid">
        {filteredAuctions.map((auction) => (
          <AuctionCard 
            key={auction.id} 
            image={auction.image} 
            status={auction.status} 
            startTime={auction.startTime} 
            minBid={auction.minBid}
          />
        ))}
      </div>
    </div>
  );
}

export default AuctionList;
