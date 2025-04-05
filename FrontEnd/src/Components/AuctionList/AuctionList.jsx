import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import AuctionCard from '../AuctionCard/AuctionCard';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch('http://localhost:5000/auctions');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch auctions');
        setAuctions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Ongoing Auctions</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          {auctions.map((auction) => (
            <Col xs={12} sm={6} md={4} lg={3} key={auction._id}>
              <AuctionCard auction={auction} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AuctionList;
