import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../main'; // Import Auth Context
import './BidPage.css';

function BidPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/auctions/${id}`)
      .then(response => setAuction(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleBid = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place a bid.");
        return;
      }
  
      await axios.post(
        "http://localhost:5000/bid",
        {
          auctionId: id,
          amount: bidAmount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
  
      alert("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to place bid");
    }
  };
  

  if (!auction) return <p>Loading auction...</p>;

  return (
    <div className="bid-page">
      <img src={auction.image} alt={auction.title} />
      <h2>{auction.title}</h2>
      <p>Starting Price: ${auction.startingBid}</p>
      <p>Current Bid: ${auction.currentBid}</p>

      <input
        type="number"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
        placeholder="Enter bid amount"
      />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
}

export default BidPage;
