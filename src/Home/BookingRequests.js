import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Paper,
  AppBar,
  IconButton,
} from "@mui/material";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import Header from "../Header";
import Footer from "../Footer";
import JashanService from "../service/JashanService";
import "./BookingRequests.css";

const BookingRequests = () => {
  const isLoggedIn = true;
  const [bookingData, setBookingData] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    bookingStatus: "",
    bookingDate: "",
    event: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    JashanService.get_current_user(token)
      .then((response) => {
        if (response && response.data) {
          setUserId(response.data.id);
          return JashanService.getBookingsInfo(response.data.id, token);
        } else {
          throw new Error("No user data received.");
        }
      })
      .then((res) => {
        if (res && res.data) {
          setBookingData(res.data);
        } else {
          throw Error("No booking data received.");
        }
      })
      .catch((error) => {
        console.error("Error in network request:", error);
      });
  }, []);

  const filteredBookings = bookingData.filter((booking) => {
    if (
      (filters.bookingStatus === "" ||
        booking.bookingStatus === filters.bookingStatus) &&
      (filters.bookingDate === "" ||
        booking.bookingDate === filters.bookingDate) &&
      (filters.event === "" || booking.eventName.includes(filters.event))
    ) {
      return true;
    }
    return false;
  });

  const handleViewEventClick = (eventId) => {
    navigate(`/bookevent/${eventId}`);
  };

  return (
    <div style={{backgroundColor:"#FFFFFF"}}>
      <AppBar position="static" color="default">
        <Header isLoggedIn={isLoggedIn} />
      </AppBar>
      <div className="booking-requests-container">
        <div className="booking-header">
          <strong className="booking-header-text">Booking Console</strong>
          <img
            className="booking-header-icon"
            src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/256/calendar-clock-icon.png"
            alt="bookings"
          />
        </div>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={4}>
            <Select
              fullWidth
              variant="outlined"
              value={filters.bookingStatus}
              onChange={(e) =>
                setFilters({ ...filters, bookingStatus: e.target.value })
              }
            >
              <MenuItem value="">Filter by Booking Status</MenuItem>
              <MenuItem value="ACCEPTED">Accepted</MenuItem>
              <MenuItem value="REJECTED">Rejected</MenuItem>
              <MenuItem value="PENDING">Pending</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              placeholder="Filter by Booking Date"
              value={filters.bookingDate}
              onChange={(e) =>
                setFilters({ ...filters, bookingDate: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="text"
              variant="outlined"
              placeholder="Filter by Program Name"
              value={filters.event}
              onChange={(e) =>
                setFilters({ ...filters, event: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} className="booking-grid">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    marginTop: "20px",
                    padding: 1,
                    textAlign: "center",
                    backgroundColor:
                      booking.bookingStatus === "ACCEPTED"
                        ? "#d4edda" // Green background for accepted bookings
                        : booking.bookingStatus === "REJECTED"
                        ? "#f8d7da" // Red background for rejected bookings
                        : "white", // Default background color
                  }}
                  className={`booking-paper ${
                    booking.bookingStatus === "ACCEPTED"
                      ? "accepted"
                      : booking.bookingStatus === "REJECTED"
                      ? "rejected"
                      : "pending"
                  }`}
                >
                  <div className="booking-paper-content">
                    <p className="booking-field">
                      <span className="booking-field-title">Program :</span>{" "}
                      <span className="booking-field-value">
                        {booking.eventName}
                      </span>
                    </p>
                    <p className="booking-field">
                      <span className="booking-field-title">Coordinator :</span>{" "}
                      <span className="booking-field-value">
                        {booking.adminFirmName}
                      </span>
                    </p>
                    <p className="booking-field">
                      <span className="booking-field-title">
                        Additional Services :
                      </span>{" "}
                      <span className="booking-field-value">
                        {booking.additionalServices}
                      </span>
                    </p>
                    <p className="booking-field">
                      <span className="booking-field-title">
                        Payment Amount :
                      </span>{" "}
                      <span className="booking-field-value">
                        {booking.bookingAmount}
                      </span>
                    </p>
                    <p className="booking-field">
                      <span className="booking-field-title">Booking Date :</span>{" "}
                      <span className="booking-field-value">
                        {booking.bookingDate}
                      </span>
                    </p>
                    <p className="booking-field">
                      <span className="booking-field-title">Booking Time :</span>{" "}
                      <span className="booking-field-value">
                        {booking.bookingTime}
                      </span>
                    </p>
                    <p className="booking-field">
                      <span className="booking-field-title">
                        Booking Status :
                      </span>{" "}
                      <span
                        className={
                          booking.bookingStatus === "ACCEPTED"
                            ? "text-success font-weight-bold"
                            : booking.bookingStatus === "REJECTED"
                            ? "text-danger font-weight-bold"
                            : "text-warning font-weight-bold"
                        }
                      >
                        {booking.bookingStatus !== "ACCEPTED" &&
                        booking.bookingStatus !== "REJECTED"
                          ? "PENDING"
                          : booking.bookingStatus}
                      </span>
                    </p>
                    {booking.bookingStatus === "ACCEPTED" && (
                      <p className="booking-field">
                        <span className="booking-field-title">
                          Contact Number :
                        </span>{" "}
                        <span className="booking-field-value">
                          {booking.adminContactNumber}
                        </span>
                      </p>
                    )}
                  </div>
                   <div className="text-right">
                    <IconButton
                    onClick={() => handleViewEventClick(booking.eventId)}
                  >
                    <RotateLeftIcon />
                  </IconButton>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <Grid item xs={12} className="no-booking-message">
              <Typography variant="body1" gutterBottom>
                No bookings available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default BookingRequests;
