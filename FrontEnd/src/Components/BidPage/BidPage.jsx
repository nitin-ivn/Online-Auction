import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../main';
import './BidPage.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function BidPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/GetAuctions/${id}`)
      .then(response => setAuction(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleBid = async () => {
    try {
      const token = localStorage.getItem("authToken");
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

      axios.get(`http://localhost:5000/GetAuctions/${id}`)
      .then(response => setAuction(response.data))
      .catch(error => console.error(error));
      alert("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to place bid");
    }
  };

  if (!auction) return <p className="text-center mt-5">Loading auction...</p>;

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="bid-card p-4 shadow-sm animate-fade">
            <Row>
              <Col md={6} className="text-center mb-4 mb-md-0">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="img-fluid rounded auction-image"
                />
              </Col>
              <Col md={6}>
                <h2 className="fw-bold">{auction.title}</h2>
                <p className="text-muted">{auction.description}</p>
                <p><strong>Starting Price:</strong> ${auction.startingPrice}</p>
                <p><strong>Current Highest Bid:</strong> ${auction.highestBid}</p>
                <p><strong>Auction Ends At:</strong> {new Date(auction.endTime).toLocaleString()}</p>

                <Form className="mt-4">
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="number"
                      placeholder={`Minimum: $${auction.minimumBid}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="custom-input"
                    />
                  </Form.Group>
                  <Button variant="dark" className="w-100 custom-button" onClick={handleBid}>
                    Place Bid
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BidPage;
