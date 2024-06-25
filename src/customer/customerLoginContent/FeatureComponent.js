import React from 'react';
import './FeatureComponent.css';
import { Container, Grid, Typography, Button } from '@mui/material';
import { Icon } from '@mui/material';

const FeatureComponent = () => {
  const features = [
    { title: "DJ Services", iconClass: "dj" },
    { title: "Banquet Halls", iconClass: "banquet" },
    { title: "Birthday Cafes", iconClass: "birthday" },
    { title: "Event Management", iconClass: "event" },
    { title: "Performers", iconClass: "performer" },
    { title: "Decorators", iconClass: "decorator" },
    { title: "Hosts", iconClass: "host" }
  ];

  return (
    <Container className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <Typography variant="h1" component="h1" gutterBottom>
            Welcome to Jashanz Platform
          </Typography>
          <Typography variant="body1" paragraph>
            Your one-stop destination for seamless event bookings and professional event management services.
          </Typography>
          <Typography variant="body1" paragraph>
            Whether it's DJ services, banquet halls, birthday cafes, or event management, Jashanz Platform has you covered.
          </Typography>
        </div>
      </div>

      {/* Features Section */}
      <Grid container spacing={4} className="features-section">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} className="feature-item">
            <div className={`icon ${feature.iconClass}`} />
            <Typography variant="h6" className="feature-title">
              {feature.title}
            </Typography>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action Section */}
      <div className="call-to-action">
        <Typography variant="h2" component="h2" gutterBottom>
          Ready to plan your next event?
        </Typography>
     
      </div>
    </Container>
  );
}

export default FeatureComponent;
