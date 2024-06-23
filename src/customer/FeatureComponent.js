// FeatureComponent.js

import React from 'react';
import './FeatureComponent.css';

const FeatureComponent = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Jashanz Platform</h1>
          <p>Your one-stop destination for seamless event bookings and professional event management services.</p>
          <p>Whether it's DJ services, banquet halls, birthday cafes, or event management, Jashanz Platform has you covered.</p>
          <a href="#features" className="explore-btn">Explore Services</a>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="features-section">
        <h2>Our Services</h2>
        <div className="feature">
          <div className="icon dj"></div>
          <h3>DJ Services</h3>
          <p>Book professional DJs for your events and parties. From playlists to lighting, we've got it all covered.</p>
        </div>
        <div className="feature">
          <div className="icon banquet"></div>
          <h3>Banquet Halls</h3>
          <p>Find the perfect banquet halls for weddings, receptions, and corporate events. Discover elegant spaces with customizable options.</p>
        </div>
        <div className="feature">
          <div className="icon birthday"></div>
          <h3>Birthday Cafes</h3>
          <p>Celebrate birthdays in style with our selection of cozy and vibrant cafes. Enjoy delicious food and create lasting memories.</p>
        </div>
        <div className="feature">
          <div className="icon event"></div>
          <h3>Event Management</h3>
          <p>Let our professional event management team handle every detail of your special occasions. Sit back, relax, and enjoy the festivities.</p>
        </div>
        <div className="feature">
          <div className="icon host"></div>
          <h3>Hosts</h3>
          <p>Find charismatic hosts to ensure your event runs smoothly. From welcoming guests to managing the program, our hosts will charm your audience.</p>
        </div>
        <div className="feature">
          <div className="icon decorator"></div>
          <h3>Decorators</h3>
          <p>Transform your event space with our expert decorators. From themes to floral arrangements, they'll create an ambiance that wows your guests.</p>
        </div>
        <div className="feature">
          <div className="icon performer"></div>
          <h3>Performers</h3>
          <p>Elevate your event with talented performers. From live bands to magicians, we have a diverse range of entertainers to captivate your audience.</p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="call-to-action">
        <h2>Ready to plan your next event?</h2>
      </div>
    </div>
  );
}

export default FeatureComponent;
