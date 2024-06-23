import React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "#FFFFFF", // White background similar to iOS
        color: "#000000", // Black text color
        padding: "20px 0",
        boxShadow: "0px -1px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
      elevation={0} // No elevation to maintain flat design
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textPrimary" align="center">
              &copy; 2024 Zealous Virtuoso Pvt Ltd. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" color="textPrimary" align="center">
              <Link
                component={RouterLink}
                to="/contact-us"
                style={{
                  color: "#000000", // Black text color for the link
                  textDecoration: "none",
                  marginLeft: "20px",
                }}
              >
                Contact Us
              </Link>
              <Link
                component={RouterLink}
                to="/terms-and-conditions"
                style={{
                  color: "#000000", // Black text color for the link
                  textDecoration: "none",
                  marginLeft: "20px",
                }}
              >
                Terms and Conditions
              </Link>
              <Link
                component={RouterLink}
                to="/privacy-policy"
                style={{
                  color: "#000000", // Black text color for the link
                  textDecoration: "none",
                  marginLeft: "20px",
                }}
              >
                Privacy Policy
              </Link>
              <Link
                component={RouterLink}
                to="/refund-policy"
                style={{
                  color: "#000000", // Black text color for the link
                  textDecoration: "none",
                  marginLeft: "20px",
                }}
              >
                Refund Policy
              </Link>
             
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
