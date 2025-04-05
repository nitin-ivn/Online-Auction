import React from 'react';
import './Home.css';
import image1 from "/img1.png"
import image2 from "/img2.jpg"
import image3 from "/img3.webp"
import image4 from "/img4.jpg"

function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to Our Auction Site</h1>
          <p>Bid on unique items, from antiques to modern tech</p>
          <button className="cta-button">Start Bidding</button>
        </div>
        <div className="hero-image">
          <img src={image1} alt="auction" />
        </div>
      </div>

      <div className="image-section">
        <div className="image-item">
          <img src={image2} alt="item 1" />
        </div>
        <div className="image-item">
          <img src={image3} alt="item 2" />
        </div>
        <div className="image-item">
          <img src={image4} alt="item 3" />
        </div>
      </div>
      
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
