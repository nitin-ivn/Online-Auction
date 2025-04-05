import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import AuctionCard from '../AuctionCard/AuctionCard';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const res = await fetch('/api/auctions');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch auctions');
        setAuctions(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Ongoing Auctions</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {auctions.map((auction) => (
          <Col md={6} lg={4} key={auction._id}>
            <AuctionCard auction={auction} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AuctionList;
