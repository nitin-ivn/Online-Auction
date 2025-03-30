import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to Our Auction Site</h1>
          <p>Bid on unique items, from antiques to modern tech</p>
          <button className="cta-button">Start Bidding</button>
        </div>
        <div className="hero-image">
          <img src="https://picsum.photos/800/400" alt="auction" />
        </div>
      </div>

      {/* Image Section */}
      <div className="image-section">
        <div className="image-item">
          <img src="https://picsum.photos/350/200" alt="item 1" />
        </div>
        <div className="image-item">
          <img src="https://picsum.photos/350/200" alt="item 2" />
        </div>
        <div className="image-item">
          <img src="https://picsum.photos/350/200" alt="item 3" />
        </div>
      </div>
      
      {/* Animated Features Section */}
      <div className="features">
        <div className="feature-item">
          <h3>Easy Registration</h3>
          <p>Registering is quick and simple.</p>
        </div>
        <div className="feature-item">
          <h3>Secure Bidding</h3>
          <p>Your bids are always safe with us.</p>
        </div>
        <div className="feature-item">
          <h3>24/7 Support</h3>
          <p>We’re here to help you anytime.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
